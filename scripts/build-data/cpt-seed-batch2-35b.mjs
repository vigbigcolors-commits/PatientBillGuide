/**
 * Batch 2 scale — Day 4: 35 CPT codes from CMS MPFS (part 2 → 200 total).
 * Regenerate seed: node scripts/build-data/build-batch2-seed-day4.mjs
 */

/** @type {Record<string, { description_short: string; national_median: number }>} */
export const CPT_CODES_BATCH2_35B = {};

function add(code, description_short, national_median) {
  CPT_CODES_BATCH2_35B[code] = {
    description_short,
    national_median: Math.round(national_median * 100) / 100,
  };
}

[
  ['97530', 'Therapeutic activities', 35.07],
  ['97535', 'Self-care home management training', 32.4],
  ['92567', 'Tympanometry', 16.03],
  ['90472', 'Immunization administration, each additional', 16.03],
  ['96374', 'IV push, single or initial substance', 37.74],
  ['36591', 'Collection of blood specimen from central venous line', 30.39],
  ['96413', 'Chemotherapy IV infusion, first hour', 133.27],
  ['92004', 'Ophthalmological exam, new patient, comprehensive', 149.64],
  ['11102', 'Tangential biopsy of skin', 95.53],
  ['17110', 'Destruction of benign lesions, up to 14', 111.22],
  ['90832', 'Psychotherapy, about 30 minutes', 85.84],
  ['90836', 'Psychotherapy, about 45 minutes with E/M', 103.21],
  ['90838', 'Psychotherapy, about 60 minutes with E/M', 136.61],
  ['90839', 'Psychotherapy for crisis, first 60 minutes', 160.32],
  ['90847', 'Family psychotherapy with patient present', 109.55],
  ['90853', 'Group psychotherapy', 30.39],
  ['96365', 'IV infusion for therapy, initial hour', 67.14],
  ['96369', 'Subcutaneous infusion for therapy, initial', 144.96],
  ['69200', 'Removal of foreign body from external ear', 81.83],
  ['69420', 'Myringotomy (ear drainage), local anesthesia', 191.72],
  ['69421', 'Myringotomy (ear drainage), general anesthesia', 137.95],
  ['51700', 'Bladder irrigation or medication instillation', 78.16],
  ['51701', 'Insertion of temporary bladder catheter', 45.43],
  ['57452', 'Colposcopy of the cervix', 125.59],
  ['57454', 'Colposcopy with biopsy and endocervical curettage', 166],
  ['11400', 'Excision of benign skin lesion, 0.5 cm or less', 127.93],
  ['11104', 'Punch biopsy of skin', 121.25],
  ['17004', 'Destruction of premalignant lesions, 15 or more', 162.33],
  ['93017', 'Cardiovascular stress test, tracing only', 39.08],
  ['93308', 'Limited or follow-up echocardiogram', 101.2],
  ['94726', 'Lung volume measurement (plethysmography)', 63.8],
  ['94729', 'Lung diffusing capacity (DLCO) test', 63.46],
  ['99406', 'Tobacco cessation counseling, 3–10 minutes', 15.36],
  ['99407', 'Tobacco cessation counseling, over 10 minutes', 29.06],
  ['99490', 'Chronic care management, first 20 minutes', 66.13],
].forEach(([c, d, m]) => add(c, d, m));

export const CPT_BATCH2_35B_LIST = [
  "97530",
  "97535",
  "92567",
  "90472",
  "96374",
  "36591",
  "96413",
  "92004",
  "11102",
  "17110",
  "90832",
  "90836",
  "90838",
  "90839",
  "90847",
  "90853",
  "96365",
  "96369",
  "69200",
  "69420",
  "69421",
  "51700",
  "51701",
  "57452",
  "57454",
  "11400",
  "11104",
  "17004",
  "93017",
  "93308",
  "94726",
  "94729",
  "99406",
  "99407",
  "99490"
];
