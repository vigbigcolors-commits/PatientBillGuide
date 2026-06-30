#!/usr/bin/env node
/**
 * Generate src/data/cpt-batch-100.ts — 100 CPT guide pages from CPT_CODES_150 seed.
 * Picks codes not already covered in cpt-codes.ts, cpt-extra.ts, or cpt-batch-2.ts.
 */
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CPT_CODES_150 } from './build-data/cpt-seed-150.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/data/cpt-batch-100.ts');

const EXISTING_FILES = [
  join(ROOT, 'src/data/cpt-codes.ts'),
  join(ROOT, 'src/data/cpt-extra.ts'),
  join(ROOT, 'src/data/cpt-batch-2.ts'),
];

/** @param {string} code @param {string} descShort */
function getCategory(code, descShort) {
  const n = Number.parseInt(code, 10);
  const d = descShort.toLowerCase();

  if (n >= 99201 && n <= 99215) return { category: 'Office visits', categorySlug: 'office-visits' };
  if (n >= 99241 && n <= 99245) return { category: 'Consultations', categorySlug: 'office-visits' };
  if ((n >= 99381 && n <= 99397) || (n >= 99401 && n <= 99402)) {
    return { category: 'Preventive', categorySlug: 'preventive' };
  }
  if (n >= 99281 && n <= 99285) return { category: 'Emergency', categorySlug: 'emergency' };
  if (n >= 99221 && n <= 99239) return { category: 'Hospital care', categorySlug: 'hospital-care' };
  if (n >= 99291 && n <= 99292) return { category: 'Critical care', categorySlug: 'emergency' };

  if (
    d.includes('mammog') ||
    d.includes('dexa') ||
    d.includes('tomosynthesis') ||
    d.includes('x-ray') ||
    d.includes('ct ') ||
    d.includes('mri') ||
    d.includes('ultrasound') ||
    d.includes('radiograph') ||
    (n >= 70010 && n <= 79999)
  ) {
    return { category: 'Imaging', categorySlug: 'imaging' };
  }

  if (
    d.includes('panel') ||
    d.includes('blood') ||
    d.includes('urinalysis') ||
    d.includes('culture') ||
    d.includes('venipuncture') ||
    d.includes('capillary') ||
    d.includes('antigen') ||
    d.includes('vitamin') ||
    d.includes('thyroxine') ||
    d.includes('creatinine') ||
    d.includes('ferritin') ||
    d.includes('hemoglobin') ||
    (n >= 80047 && n <= 89999)
  ) {
    return { category: 'Laboratory', categorySlug: 'laboratory' };
  }

  if (
    d.includes('echocard') ||
    d.includes('electrocardiogram') ||
    d.includes('ecg') ||
    d.includes('stress test') ||
    d.includes('spirometry') ||
    d.includes('nebulizer') ||
    d.includes('pulse ox') ||
    (n >= 93000 && n <= 94799)
  ) {
    return { category: 'Diagnostics', categorySlug: 'diagnostics' };
  }

  if (
    d.includes('physical therapy') ||
    d.includes('therapeutic exercise') ||
    d.includes('manual therapy') ||
    d.includes('neuromuscular') ||
    (n >= 97110 && n <= 97535)
  ) {
    return { category: 'Physical therapy', categorySlug: 'physical-therapy' };
  }
  if (d.includes('speech')) return { category: 'Speech therapy', categorySlug: 'physical-therapy' };
  if (d.includes('psychotherapy') || (n >= 90832 && n <= 90899)) {
    return { category: 'Mental health', categorySlug: 'mental-health' };
  }

  if (
    d.includes('vaccine') ||
    d.includes('immunization') ||
    d.includes('injection') ||
    d.includes('infusion') ||
    d.includes('chemotherapy')
  ) {
    return { category: 'Procedures', categorySlug: 'procedures' };
  }
  if (d.includes('ophthalmological')) return { category: 'Ophthalmology', categorySlug: 'diagnostics' };

  if (n >= 10021 && n <= 69990) return { category: 'Surgery', categorySlug: 'surgery' };
  if (n >= 90000 && n <= 99199) return { category: 'Medicine', categorySlug: 'procedures' };

  return { category: 'Procedures', categorySlug: 'procedures' };
}

/** @param {string} desc */
function toTitleLabel(desc) {
  const trimmed = desc.replace(/\s*\(.*$/, '').trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/** @param {number} median */
function formatMedian(median) {
  return median.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

/** @param {number} median */
function fairRange(median) {
  const low = Math.round(median * 1.5);
  const high = Math.round(median * 2.5);
  return `$${low.toLocaleString()}–$${high.toLocaleString()}`;
}

function getExistingCodes() {
  const codes = new Set();
  for (const file of EXISTING_FILES) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/^\s+'(\d{4,5})':\s*\{/gm)) codes.add(m[1]);
    for (const m of text.matchAll(/launchCptCodes\s*=\s*\[([\s\S]*?)\]/g)) {
      for (const c of m[1].matchAll(/'(\d{4,5})'/g)) codes.add(c[1]);
    }
  }
  return codes;
}

function getSeedOrder() {
  const seed = readFileSync(join(ROOT, 'scripts/build-data/cpt-seed-150.mjs'), 'utf8');
  return [...seed.matchAll(/\['(\d{4,5})'/g)].map((m) => m[1]);
}

/**
 * @param {string} code
 * @param {{ description_short: string; national_median: number }} seed
 * @param {{ category: string; categorySlug: string }} cat
 */
function generatePage(code, seed, cat) {
  const desc = seed.description_short;
  const label = toTitleLabel(desc);
  const median = seed.national_median;
  const medStr = formatMedian(median);
  const fair = fairRange(median);
  const slug = cat.categorySlug;

  const settingNote =
    slug === 'laboratory'
      ? 'Hospital and emergency department labs often mark up the same test far above independent lab or physician-office draw rates.'
      : slug === 'imaging'
        ? 'Independent imaging centers and physician offices are often less expensive than hospital outpatient radiology for the same CPT code.'
        : slug === 'emergency' || slug === 'hospital-care'
          ? 'Facility fees, trauma surcharges, and out-of-network providers can push patient responsibility well above the professional fee schedule line.'
          : slug === 'surgery'
            ? 'Surgeon professional fees are only one line on a surgery bill — anesthesia, facility, implants, and post-acute care bill separately.'
            : slug === 'office-visits' || slug === 'preventive'
              ? 'Hospital-owned outpatient clinics may add facility fees on top of the physician visit code.'
              : 'Setting, network status, and whether the site bills as hospital outpatient versus office-based care often matter more than the code number alone.';

  const whatIs = [
    `CPT ${code} is a Current Procedural Terminology code used on US medical bills to describe ${desc.toLowerCase()}. On an itemized statement or explanation of benefits, this number tells payers and patients which service was reported. It is not a diagnosis code — it represents the procedure, test, or visit type the provider documented.`,
    `Our plain-English summary is original and educational: ${label}. Medicare and most commercial insurers use this code (or a closely related variant) when the clinical documentation matches the service definition. The allowed amount depends on the Medicare Physician Fee Schedule or clinical lab fee schedule in your locality, not on the hospital chargemaster alone.`,
    `National Medicare data often places the median allowed amount near ${medStr} for this code, though your ZIP code and place of service can move that figure up or down. PatientBillGuide uses CMS public data for benchmarks — we do not claim your bill is wrong simply because it exceeds Medicare; we help you compare and ask informed questions.`,
    `Understanding CPT ${code} helps you separate the professional component (physician or qualified clinician work) from facility fees, anesthesia, devices, and other lines that frequently appear on the same encounter. ${settingNote}`,
  ];

  const whenUsed = [
    `Providers report CPT ${code} when ${desc.toLowerCase()} is performed and documented according to payer and coding guidelines. The clinical scenario must support the service — for example, medical necessity, appropriate site of service, and complete documentation.`,
    `You may see this code after primary care visits, specialist appointments, urgent care, emergency department care, outpatient surgery, imaging centers, or standalone labs, depending on what was ordered. It may appear alone or alongside evaluation-and-management visit codes, anesthesia, or supply charges.`,
    `Related services sometimes use adjacent CPT numbers with different technical or professional splits. If your bill lists multiple similar codes on one date, ask which services were actually performed rather than assuming duplicate billing.`,
    `Insurance plans, Medicare Advantage, Medicaid managed care, and self-pay policies all interpret medical necessity differently. A code that is standard on commercial plans may still require prior authorization or be subject to copays distinct from office visits.`,
  ];

  const typicalCosts = [
    `Medicare fee schedule data suggests a national median allowed amount near ${medStr} for CPT ${code} in many localities. That is an anchor for comparison, not a maximum price providers must charge.`,
    `An educational fair range for uninsured or high-deductible comparison is often about ${fair} — roughly 1.5× to 2.5× the Medicare benchmark. Commercial negotiated rates and in-network allowed amounts will differ.`,
    `${settingNote} Always request an itemized bill and, if insured, compare to your explanation of benefits.`,
    `Use the Fair Price Calculator on this page with your ZIP code to see a localized Medicare allowed amount when our launch data includes your locality. Cash-pay discounts and financial assistance may reduce charges that look high relative to benchmarks.`,
  ];

  const billingIssues = [
    `Unbundling — billing separate component codes when a single comprehensive code like ${code} already includes the work — is a common review topic. Compare line items to operative notes, lab reports, or imaging reports.`,
    `Duplicate charges for the same service on one date of service, or mismatched place-of-service codes (telehealth vs in-person, hospital outpatient vs office), can change allowed amounts and patient responsibility.`,
    `Out-of-network providers at in-network facilities (common with anesthesia, radiology, pathology, and emergency care) may bill amounts above your plan's allowed rate.`,
    `Upcoding to a higher-level CPT when documentation supports a lower level, or using ${code} when a more specific or less extensive code would apply, are reasons patients request coding clarification — not accusations of fraud.`,
  ];

  const whatToDo = [
    `Request an itemized bill and match CPT ${code} to clinical records: visit summary, lab report, radiology report, or operative note.`,
    `Run code ${code} and your ZIP through our Fair Price Calculator to see Medicare-based benchmarks and an educational fair range.`,
    `If insured, compare the provider bill to your EOB — note allowed amount, deductible, coinsurance, and whether the provider was in-network.`,
    `For self-pay patients, ask about prompt-pay discounts, charity care, or cash pricing before paying chargemaster rates in full. You are seeking explanation and fair comparison, not legal advice.`,
  ];

  const faq = [
    {
      question: `What does CPT ${code} mean in plain English?`,
      answer: `It identifies ${desc.toLowerCase()} on a medical bill. Insurers use it with diagnosis codes and modifiers to decide payment. Our summary: ${label}.`,
    },
    {
      question: `How much should CPT ${code} cost?`,
      answer: `Medicare benchmarks often center near ${medStr} nationally, with local variation. Many patients see higher charges — ${fair} is an educational uninsured comparison range, not a legal cap.`,
    },
    {
      question: `Is CPT ${code} covered by insurance?`,
      answer: `Usually when medically necessary and in-network, subject to deductible, copay, and plan rules. Preventive, screening, and emergency services follow different cost-sharing rules.`,
    },
    {
      question: `Why is my bill higher than the Medicare rate for ${code}?`,
      answer: `Hospital facility fees, out-of-network providers, and chargemaster pricing can exceed Medicare. The CPT code alone does not include every line on a surgical or emergency episode.`,
    },
    {
      question: `Can I question or dispute a ${code} charge?`,
      answer: `You can request itemization, coding clarification, insurer appeal, or financial assistance review. Our tools compare prices to CMS benchmarks; they do not provide legal advice.`,
    },
  ];

  return {
    code,
    title: `CPT Code ${code} — ${label} Cost & Billing Guide`,
    metaDescription: `CPT ${code} is ${desc.toLowerCase()}. See typical Medicare costs near ${medStr}, fair price ranges, and how to review your itemized bill.`,
    summary: `CPT ${code} bills for ${desc.toLowerCase()} — a commonly seen line on US medical statements. Medicare national median benchmarks are often near ${medStr}.`,
    category: cat.category,
    categorySlug: cat.categorySlug,
    whatIs,
    whenUsed,
    typicalCosts,
    billingIssues,
    whatToDo,
    faq,
  };
}

/** @param {Record<string, ReturnType<typeof generatePage>>} pages */
function pickRelatedCodes(code, categorySlug, pages, existingByCategory) {
  const pool = [
    ...(existingByCategory.get(categorySlug) ?? []),
    ...Object.keys(pages).filter((c) => {
      const p = pages[c];
      return p.categorySlug === categorySlug && c !== code;
    }),
  ];
  const unique = [...new Set(pool)].filter((c) => c !== code).sort();
  return unique.slice(0, 3).map((c) => {
    const seed = CPT_CODES_150[c];
    const lbl = seed ? toTitleLabel(seed.description_short) : `CPT ${c}`;
    return { code: c, label: lbl.length > 55 ? lbl.slice(0, 52) + '…' : lbl };
  });
}

/** @param {string} s */
function tsQuote(s) {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/** @param {string[]} arr */
function tsStringArray(arr, indent) {
  return `[\n${arr.map((s) => `${indent}  ${tsQuote(s)},`).join('\n')}\n${indent}]`;
}

/** @param {ReturnType<typeof generatePage> & { relatedCodes: { code: string; label: string }[] }} page */
function formatPage(page) {
  const i = '    ';
  const ii = '      ';
  return `${i}'${page.code}': {
${i}  code: ${tsQuote(page.code)},
${i}  title: ${tsQuote(page.title)},
${i}  metaDescription: ${tsQuote(page.metaDescription)},
${i}  summary: ${tsQuote(page.summary)},
${i}  category: ${tsQuote(page.category)},
${i}  categorySlug: ${tsQuote(page.categorySlug)},
${i}  whatIs: ${tsStringArray(page.whatIs, i)},
${i}  whenUsed: ${tsStringArray(page.whenUsed, i)},
${i}  typicalCosts: ${tsStringArray(page.typicalCosts, i)},
${i}  billingIssues: ${tsStringArray(page.billingIssues, i)},
${i}  whatToDo: ${tsStringArray(page.whatToDo, i)},
${i}  relatedCodes: [
${page.relatedCodes.map((r) => `${ii}{ code: ${tsQuote(r.code)}, label: ${tsQuote(r.label)} },`).join('\n')}
${i}  ],
${i}  faq: [
${page.faq
  .map(
    (f) =>
      `${ii}{\n${ii}  question: ${tsQuote(f.question)},\n${ii}  answer: ${tsQuote(f.answer)},\n${ii}},`,
  )
  .join('\n')}
${i}  ],
${i}},`;
}

/** @param {ReturnType<typeof generatePage>} page */
function wordCount(page) {
  const parts = [
    page.title,
    page.metaDescription,
    page.summary,
    ...page.whatIs,
    ...page.whenUsed,
    ...page.typicalCosts,
    ...page.billingIssues,
    ...page.whatToDo,
    ...page.faq.flatMap((f) => [f.question, f.answer]),
  ];
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

function main() {
  const existing = getExistingCodes();
  const ordered = getSeedOrder();
  const selected = ordered.filter((c) => CPT_CODES_150[c] && !existing.has(c)).slice(0, 100);

  if (selected.length !== 100) {
    throw new Error(`Expected 100 new codes, got ${selected.length} (${existing.size} existing)`);
  }

  /** @type {Record<string, ReturnType<typeof generatePage>>} */
  const pages = {};
  for (const code of selected) {
    const seed = CPT_CODES_150[code];
    const cat = getCategory(code, seed.description_short);
    pages[code] = generatePage(code, seed, cat);
  }

  const existingByCategory = new Map();
  for (const code of existing) {
    const seed = CPT_CODES_150[code];
    if (!seed) continue;
    const cat = getCategory(code, seed.description_short);
    if (!existingByCategory.has(cat.categorySlug)) existingByCategory.set(cat.categorySlug, []);
    existingByCategory.get(cat.categorySlug).push(code);
  }

  for (const code of selected) {
    const page = pages[code];
    page.relatedCodes = pickRelatedCodes(code, page.categorySlug, pages, existingByCategory);
    while (page.relatedCodes.length < 3) {
      const filler = selected.find((c) => c !== code && !page.relatedCodes.some((r) => r.code === c));
      if (!filler) break;
      const seed = CPT_CODES_150[filler];
      page.relatedCodes.push({
        code: filler,
        label: toTitleLabel(seed.description_short).slice(0, 55),
      });
    }
  }

  const shortPages = selected.filter((c) => wordCount(pages[c]) < 800);
  if (shortPages.length) {
    console.warn(`Warning: ${shortPages.length} pages under 800 words:`, shortPages.join(', '));
  }

  const body = Object.keys(pages)
    .sort()
    .map((c) => formatPage({ ...pages[c], relatedCodes: pages[c].relatedCodes }))
    .join('\n\n');

  const file = `import type { CptPageData } from './cpt-codes';

/** Auto-generated batch — 100 CPT guides from CPT_CODES_150 seed. Regenerate: npm run generate:cpt-pages */
export const cptBatch100: Record<string, CptPageData> = {
${body}
};
`;

  writeFileSync(OUT, file, 'utf8');
  console.log(`Wrote ${OUT}`);
  console.log(`Codes (${selected.length}): ${selected.join(', ')}`);
  const counts = selected.map((c) => wordCount(pages[c]));
  console.log(
    `Word counts: min=${Math.min(...counts)}, max=${Math.max(...counts)}, avg=${Math.round(counts.reduce((a, b) => a + b, 0) / counts.length)}`,
  );
}

main();
