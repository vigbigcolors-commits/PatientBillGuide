import { loadCptIndex } from '../lib/pricing/loader';

const MAX_SUGGESTIONS = 8;
const POPULAR_CODES = ['99213', '99214', '71046', '77067', '93000', '80053', '27447'];

export function filterCptSuggestions(
  codes: [string, string][],
  query: string,
  limit = MAX_SUGGESTIONS,
): [string, string][] {
  const q = query.trim();
  if (!q) {
    const popular = new Set(POPULAR_CODES);
    const picks: [string, string][] = [];
    for (const code of POPULAR_CODES) {
      const match = codes.find(([c]) => c === code);
      if (match) picks.push(match);
    }
    if (picks.length >= limit) return picks.slice(0, limit);
    for (const entry of codes) {
      if (!popular.has(entry[0])) picks.push(entry);
      if (picks.length >= limit) break;
    }
    return picks.slice(0, limit);
  }

  if (/^\d+$/.test(q)) {
    return codes.filter(([code]) => code.startsWith(q)).slice(0, limit);
  }

  const lower = q.toLowerCase();
  const prefixMatches: [string, string][] = [];
  const descMatches: [string, string][] = [];

  for (const entry of codes) {
    const [code, desc] = entry;
    if (code.startsWith(q)) {
      prefixMatches.push(entry);
    } else if (desc.toLowerCase().includes(lower)) {
      descMatches.push(entry);
    }
    if (prefixMatches.length + descMatches.length >= limit * 2) break;
  }

  return [...prefixMatches, ...descMatches].slice(0, limit);
}

export function bindCptTypeahead(root: ParentNode = document): void {
  const input = root.querySelector<HTMLInputElement>('#cpt');
  const list = root.querySelector<HTMLUListElement>('#cpt-suggestions');
  if (!input || !list) return;

  let index: [string, string][] | null = null;
  let activeIndex = -1;

  const hideList = () => {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    activeIndex = -1;
  };

  const showList = () => {
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };

  const selectSuggestion = (code: string) => {
    input.value = code;
    hideList();
    input.focus();
  };

  const renderSuggestions = (matches: [string, string][]) => {
    list.innerHTML = '';
    if (matches.length === 0) {
      hideList();
      return;
    }

    matches.forEach(([code, desc], i) => {
      const li = document.createElement('li');
      li.id = `cpt-opt-${code}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
      li.className = 'cpt-suggestion';
      li.innerHTML = `<span class="cpt-suggestion__code">${code}</span><span class="cpt-suggestion__desc">${desc}</span>`;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        selectSuggestion(code);
      });
      list.appendChild(li);
    });
    if (activeIndex >= 0) {
      input.setAttribute('aria-activedescendant', `cpt-opt-${matches[activeIndex][0]}`);
    } else {
      input.removeAttribute('aria-activedescendant');
    }
    showList();
  };

  const setActiveOption = (options: NodeListOf<HTMLLIElement>, next: number) => {
    activeIndex = next;
    options.forEach((opt, i) => opt.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false'));
    const id = options[activeIndex]?.id;
    if (id) input.setAttribute('aria-activedescendant', id);
    options[activeIndex]?.scrollIntoView({ block: 'nearest' });
  };

  const ensureIndex = async () => {
    if (index) return index;
    const data = await loadCptIndex();
    index = data.codes;
    return index;
  };

  const updateSuggestions = async () => {
    try {
      const codes = await ensureIndex();
      const matches = filterCptSuggestions(codes, input.value);
      activeIndex = -1;
      renderSuggestions(matches);
    } catch {
      hideList();
    }
  };

  input.addEventListener('input', () => {
    void updateSuggestions();
  });

  input.addEventListener('focus', () => {
    void updateSuggestions();
  });

  input.addEventListener('blur', () => {
    setTimeout(hideList, 150);
  });

  input.addEventListener('keydown', (e) => {
    const options = list.querySelectorAll<HTMLLIElement>('[role="option"]');
    if (list.hidden || options.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveOption(options, Math.min(activeIndex + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveOption(options, Math.max(activeIndex - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const code = options[activeIndex]?.querySelector('.cpt-suggestion__code')?.textContent;
      if (code) selectSuggestion(code);
    } else if (e.key === 'Escape') {
      hideList();
    }
  });
}
