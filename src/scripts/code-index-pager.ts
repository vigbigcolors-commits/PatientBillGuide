const PAGE_SIZE_DEFAULT = 24;

function getVisibleItems(root: HTMLElement, category: string) {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-code-item]'));
  if (category === 'all') return items;
  return items.filter((el) => el.dataset.category === category);
}

function renderPage(
  root: HTMLElement,
  page: number,
  category: string,
  pageSize: number,
) {
  const items = getVisibleItems(root, category);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  for (const el of root.querySelectorAll<HTMLElement>('[data-code-item]')) {
    el.hidden = true;
  }

  const pageItems = items.slice(start, end);
  for (const el of pageItems) {
    el.hidden = false;
  }

  const status = root.querySelector<HTMLElement>('[data-pager-status]');
  const prev = root.querySelector<HTMLButtonElement>('[data-pager-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-pager-next]');

  if (status) {
    const from = items.length === 0 ? 0 : start + 1;
    const to = Math.min(end, items.length);
    status.textContent =
      items.length === 0
        ? 'No codes in this category'
        : `Showing ${from}–${to} of ${items.length} · Page ${safePage} of ${totalPages}`;
  }

  if (prev) prev.disabled = safePage <= 1;
  if (next) next.disabled = safePage >= totalPages;

  root.dataset.currentPage = String(safePage);
  root.dataset.currentCategory = category;

  return safePage;
}

export function initCodeIndexPager(root: HTMLElement) {
  const pageSize = Number.parseInt(root.dataset.pageSize ?? '', 10) || PAGE_SIZE_DEFAULT;
  const filter = document.getElementById('code-category-filter') as HTMLSelectElement | null;

  let page = 1;
  let category = filter?.value ?? 'all';

  const go = (nextPage: number) => {
    page = renderPage(root, nextPage, category, pageSize);
  };

  root.querySelector('[data-pager-prev]')?.addEventListener('click', () => {
    page = Number.parseInt(root.dataset.currentPage ?? '1', 10);
    go(page - 1);
  });

  root.querySelector('[data-pager-next]')?.addEventListener('click', () => {
    page = Number.parseInt(root.dataset.currentPage ?? '1', 10);
    go(page + 1);
  });

  filter?.addEventListener('change', () => {
    category = filter.value;
    go(1);
  });

  go(1);
}

const root = document.getElementById('code-index-pager');
if (root) initCodeIndexPager(root);
