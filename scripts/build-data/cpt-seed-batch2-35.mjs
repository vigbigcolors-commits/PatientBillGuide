/**
 * Batch 2 scale — 35 CPT codes from CMS MPFS (Day 3).
 * Regenerate seed: node scripts/build-data/build-batch2-seed.mjs
 */

/** @type {Record<string, { description_short: string; national_median: number }>} */
export const CPT_CODES_BATCH2_35 = {};

function add(code, description_short, national_median) {
  CPT_CODES_BATCH2_35[code] = {
    description_short,
    national_median: Math.round(national_median * 100) / 100,
  };
}

[
  ['99234', 'Same-day observation admit/discharge, low complexity', 88.18],
  ['99235', 'Same-day observation admit/discharge, moderate complexity', 142.96],
  ['99236', 'Same-day observation admit/discharge, high complexity', 189.72],
  ['99304', 'Initial nursing facility care, low complexity', 81.16],
  ['99305', 'Initial nursing facility care, moderate complexity', 140.95],
  ['99306', 'Initial nursing facility care, high complexity', 193.06],
  ['99307', 'Subsequent nursing facility care, straightforward', 42.09],
  ['99308', 'Subsequent nursing facility care, low complexity', 78.83],
  ['99309', 'Subsequent nursing facility care, moderate complexity', 114.57],
  ['99310', 'Subsequent nursing facility care, high complexity', 163.33],
  ['76705', 'Limited abdominal ultrasound', 86.17],
  ['90471', 'Immunization administration, first injection', 22.04],
  ['29880', 'Knee arthroscopy with meniscectomy, medial and lateral', 533.08],
  ['47563', 'Laparoscopic gallbladder removal with cholangiography', 684.38],
  ['59400', 'Routine obstetric care, vaginal delivery', 2214.48],
  ['52000', 'Cystourethroscopy', 215.77],
  ['51702', 'Insertion of temporary indwelling bladder catheter', 65.47],
  ['97112', 'Neuromuscular re-education (physical therapy)', 32.73],
  ['97140', 'Manual therapy techniques', 27.72],
  ['90837', 'Psychotherapy, about 60 minutes', 167],
  ['92507', 'Speech therapy treatment', 76.15],
  ['64483', 'Spinal nerve injection, lumbar or sacral, with imaging', 264.87],
  ['93307', 'Complete transthoracic echocardiogram', 137.95],
  ['45381', 'Colonoscopy with submucosal injection', 490.33],
  ['66982', 'Complex cataract surgery with intraocular lens', 630.61],
  ['27448', 'Osteotomy of the femur', 762.54],
  ['92014', 'Ophthalmological exam, established, comprehensive', 127.26],
  ['92012', 'Ophthalmological exam, established patient', 90.52],
  ['69210', 'Removal of impacted cerumen', 47.76],
  ['11750', 'Excision of nail or nail bed tissue', 157.65],
  ['17000', 'Destruction of first premalignant skin lesion', 66.47],
  ['99341', 'Home visit, new patient, low complexity', 49.1],
  ['99342', 'Home visit, new patient, moderate complexity', 78.83],
  ['99350', 'Home visit, established patient, high complexity', 193.06],
  ['76770', 'Complete retroperitoneal ultrasound', 106.21],
].forEach(([c, d, m]) => add(c, d, m));

export const CPT_BATCH2_35_LIST = [
  "99234",
  "99235",
  "99236",
  "99304",
  "99305",
  "99306",
  "99307",
  "99308",
  "99309",
  "99310",
  "76705",
  "90471",
  "29880",
  "47563",
  "59400",
  "52000",
  "51702",
  "97112",
  "97140",
  "90837",
  "92507",
  "64483",
  "93307",
  "45381",
  "66982",
  "27448",
  "92014",
  "92012",
  "69210",
  "11750",
  "17000",
  "99341",
  "99342",
  "99350",
  "76770"
];
