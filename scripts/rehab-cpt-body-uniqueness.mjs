/**
 * Uniquify exact-duplicate CPT boilerplate paragraphs by injecting the CPT code
 * and rotating wording variants. Preserves hand-written pages that already
 * mention the code in those sentences.
 *
 * Usage: node scripts/rehab-cpt-body-uniqueness.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const FILES = [
  'src/data/cpt-codes.ts',
  'src/data/cpt-extra.ts',
  'src/data/cpt-batch-2.ts',
  'src/data/cpt-batch-100.ts',
  'src/data/cpt-batch-scale-35.ts',
  'src/data/cpt-batch-scale-35b.ts',
].map((f) => path.resolve(f));

/** @type {{ match: string | RegExp, build: (code: string, i: number) => string }[]} */
const REPLACERS = [
  {
    match:
      'You may see this code after primary care visits, specialist appointments, urgent care, emergency department care, outpatient surgery, imaging centers, or standalone labs, depending on what was ordered. It may appear alone or alongside evaluation-and-management visit codes, anesthesia, or supply charges.',
    build: (code, i) =>
      [
        `CPT ${code} may show up after primary care, specialty, urgent care, ED, outpatient surgery, imaging, or lab encounters — alone or next to an E/M, anesthesia, or supply line.`,
        `Bills often list CPT ${code} following clinic, specialty, urgent, emergency, surgical, imaging, or lab visits; it can stand alone or sit beside visit or ancillary charges.`,
        `Expect CPT ${code} on statements from offices, specialists, urgent care, EDs, ASC/outpatient surgery, imaging centers, or labs, sometimes with a separate E/M or supply code.`,
      ][i % 3],
  },
  {
    match:
      'Related services sometimes use adjacent CPT numbers with different technical or professional splits. If your bill lists multiple similar codes on one date, ask which services were actually performed rather than assuming duplicate billing.',
    build: (code, i) =>
      [
        `Services near CPT ${code} may use adjacent codes with different technical vs professional splits. If several similar lines share one date, ask which services were actually performed before assuming a duplicate.`,
        `Adjacent CPT numbers can split technical and professional work differently from CPT ${code}. Multiple similar lines on one day deserve a clarification request, not an automatic duplicate accusation.`,
        `If your claim shows CPT ${code} plus look-alike codes the same day, confirm each service in the note — adjacent CPTs often differ by component, not by error alone.`,
      ][i % 3],
  },
  {
    match:
      'Insurance plans, Medicare Advantage, Medicaid managed care, and self-pay policies all interpret medical necessity differently. A code that is standard on commercial plans may still require prior authorization or be subject to copays distinct from office visits.',
    build: (code, i) =>
      [
        `Commercial plans, Medicare Advantage, Medicaid managed care, and self-pay rules treat medical necessity for CPT ${code} differently — prior auth or separate cost-sharing can still apply even when the code is common.`,
        `Coverage for CPT ${code} depends on the payer: Medicare Advantage, Medicaid MCO, commercial, and self-pay policies may require prior authorization or cost-sharing unlike a simple office visit.`,
        `A familiar CPT ${code} can still need prior auth or carry copays that differ from office-visit rules under commercial, MA, Medicaid managed care, or self-pay policies.`,
      ][i % 3],
  },
  {
    match:
      'Use the Fair Price Calculator on this page with your ZIP code to see a localized Medicare allowed amount when our launch data includes your locality. Cash-pay discounts and financial assistance may reduce charges that look high relative to benchmarks.',
    build: (code, i) =>
      [
        `Run CPT ${code} through the Fair Price Calculator on this page with your ZIP for a localized Medicare allowed amount when our data covers your area. Ask about cash-pay or financial assistance if the charge looks high versus that benchmark.`,
        `Enter CPT ${code} and your ZIP in Fair Price here to see a locality Medicare figure when available. Prompt-pay discounts or charity care can still lower self-pay amounts above that anchor.`,
        `Compare CPT ${code} in the on-page Fair Price tool by ZIP when launch data includes your locality; cash pricing or assistance programs may reduce chargemaster-style bills.`,
      ][i % 3],
  },
  {
    match:
      'Duplicate charges for the same service on one date of service, or mismatched place-of-service codes (telehealth vs in-person, hospital outpatient vs office), can change allowed amounts and patient responsibility.',
    build: (code, i) =>
      [
        `For CPT ${code}, duplicate same-day lines or wrong place-of-service (telehealth vs in-person, hospital outpatient vs office) can change allowed amounts and what you owe.`,
        `Watch CPT ${code} for repeated same-date charges or POS mismatches (telehealth/office/hospital outpatient) — those shifts often change patient responsibility.`,
        `Same-day repeats of CPT ${code} or telehealth vs facility POS errors commonly alter allowed amounts; request a corrected claim if the setting is wrong.`,
      ][i % 3],
  },
  {
    match:
      "Out-of-network providers at in-network facilities (common with anesthesia, radiology, pathology, and emergency care) may bill amounts above your plan's allowed rate.",
    build: (code, i) =>
      [
        `Even when the facility is in-network, an out-of-network clinician tied to CPT ${code} (anesthesia, radiology, pathology, ED) may bill above your plan allowed rate.`,
        `CPT ${code} billed by an out-of-network provider inside an in-network hospital or ASC can exceed plan-allowed amounts — common with anesthesia, radiology, pathology, and ED coverage.`,
        `Network status for the clinician reporting CPT ${code} matters separately from the facility; OON anesthesia/radiology/pathology/ED bills often exceed in-network allowed rates.`,
      ][i % 3],
  },
  {
    // TypeScript source stores the apostrophe escaped: plan\'s
    match:
      "Out-of-network providers at in-network facilities (common with anesthesia, radiology, pathology, and emergency care) may bill amounts above your plan\\'s allowed rate.",
    build: (code, i) =>
      [
        `Even when the facility is in-network, an out-of-network clinician tied to CPT ${code} (anesthesia, radiology, pathology, ED) may bill above your plan allowed rate.`,
        `CPT ${code} billed by an out-of-network provider inside an in-network hospital or ASC can exceed plan-allowed amounts — common with anesthesia, radiology, pathology, and ED coverage.`,
        `Network status for the clinician reporting CPT ${code} matters separately from the facility; OON anesthesia/radiology/pathology/ED bills often exceed in-network allowed rates.`,
      ][i % 3],
  },
  {
    match:
      'If insured, compare the provider bill to your EOB — note allowed amount, deductible, coinsurance, and whether the provider was in-network.',
    build: (code, i) =>
      [
        `If insured, line up the CPT ${code} provider bill with your EOB: allowed amount, deductible, coinsurance, and network status.`,
        `Insured patients should match CPT ${code} on the bill to the EOB — check allowed amount, deductible, coinsurance, and whether the provider was in-network.`,
        `Compare CPT ${code} charges to the EOB fields for allowed amount, deductible, coinsurance, and in-network vs out-of-network status.`,
      ][i % 3],
  },
  {
    match:
      'For self-pay patients, ask about prompt-pay discounts, charity care, or cash pricing before paying chargemaster rates in full. You are seeking explanation and fair comparison, not legal advice.',
    build: (code, i) =>
      [
        `Self-pay: ask for prompt-pay, charity care, or cash pricing on CPT ${code} before paying full chargemaster rates. This is for comparison and questions — not legal advice.`,
        `If you are self-pay on CPT ${code}, request cash or prompt-pay discounts (or financial assistance) before settling chargemaster totals. Educational comparison only — not legal advice.`,
        `Before paying list price for CPT ${code}, self-pay patients should ask about cash pricing, prompt-pay discounts, or charity care. Tools here explain benchmarks; they are not legal advice.`,
      ][i % 3],
  },
  {
    match:
      'Usually when medically necessary and in-network, subject to deductible, copay, and plan rules. Preventive, screening, and emergency services follow different cost-sharing rules.',
    build: (code, i) =>
      [
        `CPT ${code} is often covered when medically necessary and in-network, subject to deductible, copay, and plan rules. Preventive, screening, and emergency benefits may use different cost-sharing.`,
        `Coverage for CPT ${code} usually requires medical necessity and in-network status, then deductible/copay rules apply; preventive, screening, and ED benefits can differ.`,
        `Insurers commonly cover CPT ${code} when necessary and in-network, after cost-sharing. Screening, preventive, and emergency cost-sharing may not match a standard visit.`,
      ][i % 3],
  },
  {
    match:
      'Hospital facility fees, out-of-network providers, and chargemaster pricing can exceed Medicare. The CPT code alone does not include every line on a surgical or emergency episode.',
    build: (code, i) =>
      [
        `Facility fees, out-of-network clinicians, and chargemaster rates for visits involving CPT ${code} can exceed Medicare. One CPT line never represents every charge on a surgical or ED episode.`,
        `Bills with CPT ${code} often run above Medicare because of facility fees, OON providers, or chargemaster pricing — the code alone is not the whole episode cost.`,
        `Medicare is only one benchmark for CPT ${code}; hospital fees, OON billing, and chargemaster prices routinely sit higher, and other lines may appear on the same encounter.`,
      ][i % 3],
  },
  {
    match:
      'You can request itemization, coding clarification, insurer appeal, or financial assistance review. Our tools compare prices to CMS benchmarks; they do not provide legal advice.',
    build: (code, i) =>
      [
        `You can request itemization, coding clarification, an insurer appeal, or financial assistance review for CPT ${code}. Our tools compare CMS benchmarks only — not legal advice.`,
        `For a CPT ${code} charge, ask for itemization, coding notes, appeal rights, or charity-care review. Benchmarks here are educational, not legal advice.`,
        `Questioning a CPT ${code} line can mean itemization, coder review, plan appeal, or assistance programs. PatientBillGuide compares CMS data; it does not give legal advice.`,
      ][i % 3],
  },
  // Category setting notes (exact, no code)
  {
    match:
      'Setting, network status, and whether the site bills as hospital outpatient versus office-based care often matter more than the code number alone.',
    build: (code, i) =>
      [
        `For CPT ${code}, setting, network status, and hospital-outpatient vs office billing often matter more than the code digits alone.`,
        `Place of service and network status around CPT ${code} usually drive patient cost more than the CPT number by itself.`,
        `Whether CPT ${code} was billed from an office or hospital outpatient department — plus network status — often outweighs the code label.`,
      ][i % 3],
  },
  {
    match:
      'Surgeon professional fees are only one line on a surgery bill — anesthesia, facility, implants, and post-acute care bill separately. Always request an itemized bill and, if insured, compare to your explanation of benefits.',
    build: (code, i) =>
      [
        `The professional fee for CPT ${code} is only one surgery line — anesthesia, facility, implants, and post-acute care bill separately. Request itemization and compare to your EOB if insured.`,
        `CPT ${code} rarely equals the full surgical episode: anesthesia, facility, implants, and aftercare are separate. Get an itemized bill and match it to the EOB when you have insurance.`,
        `Treat CPT ${code} as the surgeon/clinician line only; facility, anesthesia, implants, and post-acute charges stack on top. Itemize and compare to the EOB.`,
      ][i % 3],
  },
  {
    match:
      'Independent imaging centers and physician offices are often less expensive than hospital outpatient radiology for the same CPT code. Always request an itemized bill and, if insured, compare to your explanation of benefits.',
    build: (code, i) =>
      [
        `Independent imaging centers and offices often charge less than hospital outpatient radiology for CPT ${code}. Request an itemized bill and compare to your EOB if insured.`,
        `For CPT ${code}, freestanding imaging or office rates are frequently below hospital outpatient radiology. Itemize the claim and check the EOB when covered.`,
        `Hospital outpatient pricing for CPT ${code} commonly exceeds independent imaging centers — confirm site of service on the itemized bill and EOB.`,
      ][i % 3],
  },
  {
    match:
      'Hospital and emergency department labs often mark up the same test far above independent lab or physician-office draw rates. Always request an itemized bill and, if insured, compare to your explanation of benefits.',
    build: (code, i) =>
      [
        `Hospital and ED labs often mark up CPT ${code} far above independent lab or office-draw rates. Request itemization and compare to your EOB if insured.`,
        `CPT ${code} drawn in a hospital or ED commonly costs more than the same test at an independent lab. Itemize and match the EOB when you have coverage.`,
        `Expect higher chargemaster markups for CPT ${code} in hospital/ED labs versus outpatient labs — verify with an itemized bill and EOB.`,
      ][i % 3],
  },
  {
    match:
      'Facility fees, trauma surcharges, and out-of-network providers can push patient responsibility well above the professional fee schedule line. Always request an itemized bill and, if insured, compare to your explanation of benefits.',
    build: (code, i) =>
      [
        `Facility fees, trauma surcharges, and OON clinicians can push what you owe for CPT ${code} well above the professional fee line. Itemize and compare to the EOB if insured.`,
        `For CPT ${code}, facility/trauma add-ons and out-of-network providers often dwarf the MPFS professional amount — request itemization and check the EOB.`,
        `Patient responsibility on CPT ${code} can spike from facility fees, trauma charges, or OON billing. Use the itemized bill and EOB to separate those lines.`,
      ][i % 3],
  },
  {
    match:
      'Hospital-owned outpatient clinics may add facility fees on top of the physician visit code. Always request an itemized bill and, if insured, compare to your explanation of benefits.',
    build: (code, i) =>
      [
        `Hospital-owned outpatient clinics may add a facility fee on top of CPT ${code}. Request an itemized bill and compare to your EOB if insured.`,
        `When CPT ${code} is billed from a hospital-owned clinic, a separate facility fee often appears. Itemize the visit and match the EOB.`,
        `CPT ${code} from a hospital outpatient department can include facility charges beyond the physician line — confirm on the itemized statement and EOB.`,
      ][i % 3],
  },
];

/** Soft: uniquify Medicare median template when identical across codes with same $ */
const MEDIAN_RE =
  /National Medicare data often places the median allowed amount near (\$[\d,]+) for this code, though your ZIP code and place of service can move that figure up or down\. PatientBillGuide uses CMS public data for benchmarks — we do not claim your bill is wrong simply because it exceeds Medicare; we help you compare and ask informed questions\./g;

const FAIR_RE =
  /An educational fair range for uninsured or high-deductible comparison is often about (\$[\d,]+–\$[\d,]+) — roughly 1\.5× to 2\.5× the Medicare benchmark\. Commercial negotiated rates and in-network allowed amounts will differ\./g;

const FAQ_COST_RE =
  /Medicare benchmarks often center near (\$[\d,]+) nationally, with local variation\. Many patients see higher charges — (\$[\d,]+–\$[\d,]+) is an educational uninsured comparison range, not a legal cap\./g;

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function patchBlock(block, code, variantIndex) {
  let out = block;
  let n = 0;
  for (const r of REPLACERS) {
    const needle = typeof r.match === 'string' ? r.match : null;
    if (!needle || !out.includes(needle)) continue;
    // Skip if this page already has a unique hand-written variant (code already in that sentence nearby)
    const replacement = r.build(code, variantIndex);
    const parts = out.split(needle);
    if (parts.length === 1) continue;
    out = parts.join(replacement);
    n += parts.length - 1;
  }

  out = out.replace(MEDIAN_RE, (_, med) => {
    n += 1;
    const opts = [
      `CMS MPFS data often puts a national median near ${med} for CPT ${code}; ZIP and place of service can move that figure. PatientBillGuide uses public CMS benchmarks so you can compare — a higher charge alone is not proof the bill is wrong.`,
      `For CPT ${code}, national Medicare medians frequently land near ${med}, with local and site-of-service variation. We publish CMS-based anchors for questions, not accusations that your bill is incorrect.`,
      `A typical Medicare allowed median for CPT ${code} is near ${med} nationally, but locality and setting change the number. Our tools use CMS public data to help you ask informed questions, not to declare fraud.`,
    ];
    return opts[variantIndex % 3];
  });

  out = out.replace(FAIR_RE, (_, fair) => {
    n += 1;
    const opts = [
      `An educational uninsured or high-deductible comparison band for CPT ${code} is often about ${fair} (roughly 1.5×–2.5× Medicare). Commercial contracted rates will differ.`,
      `For cash-pay or high-deductible review of CPT ${code}, about ${fair} is a common educational fair range (~1.5×–2.5× Medicare) — not a legal ceiling.`,
      `Self-pay comparison for CPT ${code} often uses about ${fair} as an educational fair range (about 1.5× to 2.5× the Medicare benchmark); insurer negotiated amounts vary.`,
    ];
    return opts[variantIndex % 3];
  });

  out = out.replace(FAQ_COST_RE, (_, med, fair) => {
    n += 1;
    const opts = [
      `Medicare benchmarks for CPT ${code} often center near ${med} nationally, with local variation. Many patients see higher charges — ${fair} is an educational uninsured comparison range, not a legal cap.`,
      `National Medicare figures for CPT ${code} commonly sit near ${med}. Higher bills are common; ${fair} is an educational self-pay comparison band, not a price law.`,
      `Expect Medicare reference amounts near ${med} for CPT ${code}, varying by ZIP. Charges of about ${fair} appear in educational uninsured ranges and are not a legal maximum.`,
    ];
    return opts[variantIndex % 3];
  });

  return { out, n };
}

let total = 0;
for (const file of FILES) {
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  const starts = [...src.matchAll(/(?:^|\n)(\s*)'(\d{5})'\s*:\s*\{/g)];
  if (!starts.length) continue;

  // Rebuild from end so offsets stay valid
  for (let p = starts.length - 1; p >= 0; p--) {
    const code = starts[p][2];
    const start = starts[p].index + (starts[p][0].startsWith('\n') ? 1 : 0);
    const end = p + 1 < starts.length ? starts[p + 1].index + (starts[p + 1][0].startsWith('\n') ? 1 : 0) : src.length;
    const block = src.slice(start, end);
    const variantIndex = Number.parseInt(code, 10) % 97;
    const { out, n } = patchBlock(block, code, variantIndex);
    if (n > 0) {
      src = src.slice(0, start) + out + src.slice(end);
      total += n;
    }
  }
  fs.writeFileSync(file, src);
  console.log('patched', path.basename(file));
}

console.log('total replacements', total);
