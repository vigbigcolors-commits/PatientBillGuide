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
  ['99234', 'Procedure code 99234', 88.18],
  ['99235', 'Procedure code 99235', 142.96],
  ['99236', 'Procedure code 99236', 189.72],
  ['99304', 'Procedure code 99304', 81.16],
  ['99305', 'Procedure code 99305', 140.95],
  ['99306', 'Procedure code 99306', 193.06],
  ['99307', 'Procedure code 99307', 42.09],
  ['99308', 'Procedure code 99308', 78.83],
  ['99309', 'Procedure code 99309', 114.57],
  ['99310', 'Procedure code 99310', 163.33],
  ['76705', 'Diagnostic imaging or radiology', 86.17],
  ['90471', 'Immunization administration, first injection', 22.04],
  ['29880', 'Surgical or procedural service', 533.08],
  ['47563', 'Surgical or procedural service', 684.38],
  ['59400', 'Routine obstetric care, vaginal delivery', 2214.48],
  ['52000', 'Cystourethroscopy', 215.77],
  ['51702', 'Surgical or procedural service', 65.47],
  ['97112', 'Neuromuscular re-education (physical therapy)', 32.73],
  ['97140', 'Manual therapy techniques', 27.72],
  ['90837', 'Medicine procedure or service', 167],
  ['92507', 'Speech therapy treatment', 76.15],
  ['64483', 'Surgical or procedural service', 264.87],
  ['93307', 'Medicine procedure or service', 137.95],
  ['45381', 'Surgical or procedural service', 490.33],
  ['66982', 'Surgical or procedural service', 630.61],
  ['27448', 'Surgical or procedural service', 762.54],
  ['92014', 'Ophthalmological exam, established, comprehensive', 127.26],
  ['92012', 'Ophthalmological exam, established patient', 90.52],
  ['69210', 'Removal of impacted cerumen', 47.76],
  ['11750', 'Surgical or procedural service', 157.65],
  ['17000', 'Surgical or procedural service', 66.47],
  ['99341', 'Procedure code 99341', 49.1],
  ['99342', 'Procedure code 99342', 78.83],
  ['99350', 'Procedure code 99350', 193.06],
  ['76770', 'Diagnostic imaging or radiology', 106.21],
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
