#!/usr/bin/env node
/**
 * Generate a CPT batch file from a seed module.
 * Usage: node scripts/generate-cpt-batch.mjs --seed batch2-35 --out cpt-batch-scale-35 --count 35
 */
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CPT_CODES_BATCH2_35, CPT_BATCH2_35_LIST } from './build-data/cpt-seed-batch2-35.mjs';
import { CPT_CODES_BATCH2_35B, CPT_BATCH2_35B_LIST } from './build-data/cpt-seed-batch2-35b.mjs';
import { CPT_CODES_150 } from './build-data/cpt-seed-150.mjs';

const isDay4 = process.argv.includes('--day4');

const BATCH_CONFIG = isDay4
  ? {
      seed: CPT_CODES_BATCH2_35B,
      list: CPT_BATCH2_35B_LIST,
      outFile: 'cpt-batch-scale-35b.ts',
      exportName: 'cptBatchScale35b',
      label: 'Batch 2 scale — Day 4 part 2 (35 CPT → 200 total)',
      count: 35,
    }
  : {
      seed: CPT_CODES_BATCH2_35,
      list: CPT_BATCH2_35_LIST,
      outFile: 'cpt-batch-scale-35.ts',
      exportName: 'cptBatchScale35',
      label: 'Batch 2 scale — 35 CPT guides (Day 3)',
      count: 35,
    };

const ALL_SEEDS = { ...CPT_CODES_150, ...CPT_CODES_BATCH2_35, ...CPT_CODES_BATCH2_35B };

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const EXISTING_FILES = [
  join(ROOT, 'src/data/cpt-codes.ts'),
  join(ROOT, 'src/data/cpt-extra.ts'),
  join(ROOT, 'src/data/cpt-batch-2.ts'),
  join(ROOT, 'src/data/cpt-batch-100.ts'),
  join(ROOT, 'src/data/cpt-batch-scale-35.ts'),
  join(ROOT, 'src/data/cpt-batch-scale-35b.ts'),
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
  if (n >= 99304 && n <= 99310) return { category: 'Nursing facility', categorySlug: 'nursing-facility' };
  if (n >= 99341 && n <= 99350) return { category: 'Home visits', categorySlug: 'home-visits' };

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
  if (d.includes('cystourethroscopy') || d.includes('catheter')) {
    return { category: 'Urology', categorySlug: 'procedures' };
  }

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
    try {
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(/^\s+'(\d{4,5})':\s*\{/gm)) codes.add(m[1]);
    } catch {
      // file may not exist yet
    }
  }
  return codes;
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

  // DECISIONS #48: every long paragraph must include CPT ${code} so batches cannot ship identical bodies.
  const v = Number.parseInt(code, 10) % 3;
  const settingNote =
    slug === 'laboratory'
      ? [
          `Hospital and ED labs often mark up CPT ${code} far above independent lab or office-draw rates.`,
          `CPT ${code} drawn in a hospital or ED commonly costs more than the same test at an independent lab.`,
          `Expect higher chargemaster markups for CPT ${code} in hospital/ED labs versus outpatient labs.`,
        ][v]
      : slug === 'imaging'
        ? [
            `Independent imaging centers and offices often charge less than hospital outpatient radiology for CPT ${code}.`,
            `For CPT ${code}, freestanding imaging or office rates are frequently below hospital outpatient radiology.`,
            `Hospital outpatient pricing for CPT ${code} commonly exceeds independent imaging centers — confirm site of service.`,
          ][v]
        : slug === 'emergency' || slug === 'hospital-care'
          ? [
              `Facility fees, trauma surcharges, and OON clinicians can push what you owe for CPT ${code} well above the professional fee line.`,
              `For CPT ${code}, facility/trauma add-ons and out-of-network providers often dwarf the MPFS professional amount.`,
              `Patient responsibility on CPT ${code} can spike from facility fees, trauma charges, or OON billing.`,
            ][v]
          : slug === 'surgery'
            ? [
                `The professional fee for CPT ${code} is only one surgery line — anesthesia, facility, implants, and post-acute care bill separately.`,
                `CPT ${code} rarely equals the full surgical episode: anesthesia, facility, implants, and aftercare are separate.`,
                `Treat CPT ${code} as the surgeon/clinician line only; facility, anesthesia, implants, and post-acute charges stack on top.`,
              ][v]
            : slug === 'office-visits' || slug === 'preventive'
              ? [
                  `Hospital-owned outpatient clinics may add a facility fee on top of CPT ${code}.`,
                  `When CPT ${code} is billed from a hospital-owned clinic, a separate facility fee often appears.`,
                  `CPT ${code} from a hospital outpatient department can include facility charges beyond the physician line.`,
                ][v]
              : [
                  `For CPT ${code}, setting, network status, and hospital-outpatient vs office billing often matter more than the code digits alone.`,
                  `Place of service and network status around CPT ${code} usually drive patient cost more than the CPT number by itself.`,
                  `Whether CPT ${code} was billed from an office or hospital outpatient department — plus network status — often outweighs the code label.`,
                ][v];

  const whatIs = [
    `CPT ${code} is a Current Procedural Terminology code used on US medical bills to describe ${desc.toLowerCase()}. On an itemized statement or explanation of benefits, this number tells payers and patients which service was reported. It is not a diagnosis code — it represents the procedure, test, or visit type the provider documented.`,
    `Our plain-English summary for CPT ${code} is original and educational: ${label}. Medicare and most commercial insurers use this code (or a closely related variant) when the clinical documentation matches the service definition. The allowed amount depends on the Medicare Physician Fee Schedule or clinical lab fee schedule in your locality, not on the hospital chargemaster alone.`,
    [
      `CMS MPFS data often puts a national median near ${medStr} for CPT ${code}; ZIP and place of service can move that figure. PatientBillGuide uses public CMS benchmarks so you can compare — a higher charge alone is not proof the bill is wrong.`,
      `For CPT ${code}, national Medicare medians frequently land near ${medStr}, with local and site-of-service variation. We publish CMS-based anchors for questions, not accusations that your bill is incorrect.`,
      `A typical Medicare allowed median for CPT ${code} is near ${medStr} nationally, but locality and setting change the number. Our tools use CMS public data to help you ask informed questions, not to declare fraud.`,
    ][v],
    `Understanding CPT ${code} helps you separate the professional component (physician or qualified clinician work) from facility fees, anesthesia, devices, and other lines that frequently appear on the same encounter. ${settingNote}`,
  ];

  const whenUsed = [
    `Providers report CPT ${code} when ${desc.toLowerCase()} is performed and documented according to payer and coding guidelines. The clinical scenario must support the service — for example, medical necessity, appropriate site of service, and complete documentation.`,
    [
      `CPT ${code} may show up after primary care, specialty, urgent care, ED, outpatient surgery, imaging, or lab encounters — alone or next to an E/M, anesthesia, or supply line.`,
      `Bills often list CPT ${code} following clinic, specialty, urgent, emergency, surgical, imaging, or lab visits; it can stand alone or sit beside visit or ancillary charges.`,
      `Expect CPT ${code} on statements from offices, specialists, urgent care, EDs, ASC/outpatient surgery, imaging centers, or labs, sometimes with a separate E/M or supply code.`,
    ][v],
    [
      `Services near CPT ${code} may use adjacent codes with different technical vs professional splits. If several similar lines share one date, ask which services were actually performed before assuming a duplicate.`,
      `Adjacent CPT numbers can split technical and professional work differently from CPT ${code}. Multiple similar lines on one day deserve a clarification request, not an automatic duplicate accusation.`,
      `If your claim shows CPT ${code} plus look-alike codes the same day, confirm each service in the note — adjacent CPTs often differ by component, not by error alone.`,
    ][v],
    [
      `Commercial plans, Medicare Advantage, Medicaid managed care, and self-pay rules treat medical necessity for CPT ${code} differently — prior auth or separate cost-sharing can still apply even when the code is common.`,
      `Coverage for CPT ${code} depends on the payer: Medicare Advantage, Medicaid MCO, commercial, and self-pay policies may require prior authorization or cost-sharing unlike a simple office visit.`,
      `A familiar CPT ${code} can still need prior auth or carry copays that differ from office-visit rules under commercial, MA, Medicaid managed care, or self-pay policies.`,
    ][v],
  ];

  const typicalCosts = [
    `Medicare fee schedule data suggests a national median allowed amount near ${medStr} for CPT ${code} in many localities. That is an anchor for comparison, not a maximum price providers must charge.`,
    [
      `An educational uninsured or high-deductible comparison band for CPT ${code} is often about ${fair} (roughly 1.5×–2.5× Medicare). Commercial contracted rates will differ.`,
      `For cash-pay or high-deductible review of CPT ${code}, about ${fair} is a common educational fair range (~1.5×–2.5× Medicare) — not a legal ceiling.`,
      `Self-pay comparison for CPT ${code} often uses about ${fair} as an educational fair range (about 1.5× to 2.5× the Medicare benchmark); insurer negotiated amounts vary.`,
    ][v],
    `${settingNote} Always request an itemized bill for CPT ${code} and, if insured, compare to your explanation of benefits.`,
    [
      `Run CPT ${code} through the Fair Price Calculator on this page with your ZIP for a localized Medicare allowed amount when our data covers your area. Ask about cash-pay or financial assistance if the charge looks high versus that benchmark.`,
      `Enter CPT ${code} and your ZIP in Fair Price here to see a locality Medicare figure when available. Prompt-pay discounts or charity care can still lower self-pay amounts above that anchor.`,
      `Compare CPT ${code} in the on-page Fair Price tool by ZIP when launch data includes your locality; cash pricing or assistance programs may reduce chargemaster-style bills.`,
    ][v],
  ];

  const billingIssues = [
    `Unbundling — billing separate component codes when a single comprehensive code like ${code} already includes the work — is a common review topic. Compare line items to operative notes, lab reports, or imaging reports.`,
    [
      `For CPT ${code}, duplicate same-day lines or wrong place-of-service (telehealth vs in-person, hospital outpatient vs office) can change allowed amounts and what you owe.`,
      `Watch CPT ${code} for repeated same-date charges or POS mismatches (telehealth/office/hospital outpatient) — those shifts often change patient responsibility.`,
      `Same-day repeats of CPT ${code} or telehealth vs facility POS errors commonly alter allowed amounts; request a corrected claim if the setting is wrong.`,
    ][v],
    [
      `Even when the facility is in-network, an out-of-network clinician tied to CPT ${code} (anesthesia, radiology, pathology, ED) may bill above your plan allowed rate.`,
      `CPT ${code} billed by an out-of-network provider inside an in-network hospital or ASC can exceed plan-allowed amounts — common with anesthesia, radiology, pathology, and ED coverage.`,
      `Network status for the clinician reporting CPT ${code} matters separately from the facility; OON anesthesia/radiology/pathology/ED bills often exceed in-network allowed rates.`,
    ][v],
    `Upcoding to a higher-level CPT when documentation supports a lower level, or using ${code} when a more specific or less extensive code would apply, are reasons patients request coding clarification — not accusations of fraud.`,
  ];

  const whatToDo = [
    `Request an itemized bill and match CPT ${code} to clinical records: visit summary, lab report, radiology report, or operative note.`,
    `Run code ${code} and your ZIP through our Fair Price Calculator to see Medicare-based benchmarks and an educational fair range.`,
    [
      `If insured, line up the CPT ${code} provider bill with your EOB: allowed amount, deductible, coinsurance, and network status.`,
      `Insured patients should match CPT ${code} on the bill to the EOB — check allowed amount, deductible, coinsurance, and whether the provider was in-network.`,
      `Compare CPT ${code} charges to the EOB fields for allowed amount, deductible, coinsurance, and in-network vs out-of-network status.`,
    ][v],
    [
      `Self-pay: ask for prompt-pay, charity care, or cash pricing on CPT ${code} before paying full chargemaster rates. This is for comparison and questions — not legal advice.`,
      `If you are self-pay on CPT ${code}, request cash or prompt-pay discounts (or financial assistance) before settling chargemaster totals. Educational comparison only — not legal advice.`,
      `Before paying list price for CPT ${code}, self-pay patients should ask about cash pricing, prompt-pay discounts, or charity care. Tools here explain benchmarks; they are not legal advice.`,
    ][v],
  ];

  const faq = [
    {
      question: `What does CPT ${code} mean in plain English?`,
      answer: `It identifies ${desc.toLowerCase()} on a medical bill (CPT ${code}). Insurers use it with diagnosis codes and modifiers to decide payment. Our summary: ${label}.`,
    },
    {
      question: `How much should CPT ${code} cost?`,
      answer: [
        `Medicare benchmarks for CPT ${code} often center near ${medStr} nationally, with local variation. Many patients see higher charges — ${fair} is an educational uninsured comparison range, not a legal cap.`,
        `National Medicare figures for CPT ${code} commonly sit near ${medStr}. Higher bills are common; ${fair} is an educational self-pay comparison band, not a price law.`,
        `Expect Medicare reference amounts near ${medStr} for CPT ${code}, varying by ZIP. Charges of about ${fair} appear in educational uninsured ranges and are not a legal maximum.`,
      ][v],
    },
    {
      question: `Is CPT ${code} covered by insurance?`,
      answer: [
        `CPT ${code} is often covered when medically necessary and in-network, subject to deductible, copay, and plan rules. Preventive, screening, and emergency benefits may use different cost-sharing.`,
        `Coverage for CPT ${code} usually requires medical necessity and in-network status, then deductible/copay rules apply; preventive, screening, and ED benefits can differ.`,
        `Insurers commonly cover CPT ${code} when necessary and in-network, after cost-sharing. Screening, preventive, and emergency cost-sharing may not match a standard visit.`,
      ][v],
    },
    {
      question: `Why is my bill higher than the Medicare rate for ${code}?`,
      answer: [
        `Facility fees, out-of-network clinicians, and chargemaster rates for visits involving CPT ${code} can exceed Medicare. One CPT line never represents every charge on a surgical or ED episode.`,
        `Bills with CPT ${code} often run above Medicare because of facility fees, OON providers, or chargemaster pricing — the code alone is not the whole episode cost.`,
        `Medicare is only one benchmark for CPT ${code}; hospital fees, OON billing, and chargemaster prices routinely sit higher, and other lines may appear on the same encounter.`,
      ][v],
    },
    {
      question: `Can I question or dispute a ${code} charge?`,
      answer: [
        `You can request itemization, coding clarification, an insurer appeal, or financial assistance review for CPT ${code}. Our tools compare CMS benchmarks only — not legal advice.`,
        `For a CPT ${code} charge, ask for itemization, coding notes, appeal rights, or charity-care review. Benchmarks here are educational, not legal advice.`,
        `Questioning a CPT ${code} line can mean itemization, coder review, plan appeal, or assistance programs. PatientBillGuide compares CMS data; it does not give legal advice.`,
      ][v],
    },
  ];

  return {
    code,
    title: `CPT ${code} — ${label}`,
    metaDescription: `CPT ${code} (${label}): Medicare costs near ${medStr}, fair range by ZIP, and how to review your itemized bill. Free browser tool.`,
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
    const seed = ALL_SEEDS[c];
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
  const { seed, list, outFile, exportName, label, count } = BATCH_CONFIG;
  const existing = getExistingCodes();
  const selected = list.filter((c) => seed[c] && !existing.has(c));

  if (selected.length !== count) {
    throw new Error(`Expected ${count} new codes, got ${selected.length} (${existing.size} existing)`);
  }

  /** @type {Record<string, ReturnType<typeof generatePage>>} */
  const pages = {};
  for (const code of selected) {
    const row = seed[code];
    const cat = getCategory(code, row.description_short);
    pages[code] = generatePage(code, row, cat);
  }

  const existingByCategory = new Map();
  for (const code of existing) {
    const seed = ALL_SEEDS[code];
    if (!seed) continue;
    const cat = getCategory(code, seed.description_short);
    if (!existingByCategory.has(cat.categorySlug)) existingByCategory.set(cat.categorySlug, []);
    existingByCategory.get(cat.categorySlug).push(code);
  }

  for (const code of selected) {
    const page = pages[code];
    page.relatedCodes = pickRelatedCodes(code, page.categorySlug, pages, existingByCategory);
  }

  const shortPages = selected.filter((c) => wordCount(pages[c]) < 800);
  if (shortPages.length) {
    console.warn(`Warning: ${shortPages.length} pages under 800 words:`, shortPages.join(', '));
  }

  const body = Object.keys(pages)
    .sort()
    .map((c) => formatPage({ ...pages[c], relatedCodes: pages[c].relatedCodes }))
    .join('\n\n');

  const OUT = join(ROOT, 'src/data', outFile);
  const regenCmd = isDay4
    ? 'node scripts/build-data/build-batch2-seed-day4.mjs && node scripts/generate-cpt-batch.mjs --day4'
    : 'npm run generate:cpt-batch';
  const file = `import type { CptPageData } from './cpt-codes';

/** Auto-generated ${label}. Regenerate: ${regenCmd} */
export const ${exportName}: Record<string, CptPageData> = {
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
