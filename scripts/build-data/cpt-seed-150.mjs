/**
 * Launch MPFS subset — 150 common CPT codes with national median anchors.
 * Estimates for non-launch codes are scaled from CMS MPFS tiers for educational use.
 * count: 150
 */

/** @type {Record<string, { description_short: string; national_median: number }>} */
export const CPT_CODES_150 = {};

function add(code, description_short, national_median) {
  CPT_CODES_150[code] = { description_short, national_median: Math.round(national_median * 100) / 100 };
}

// ── Tier-1 anchor codes (20) ──
[
  ['99213', 'Office visit, established patient, low complexity', 97.35],
  ['99214', 'Office visit, established patient, moderate complexity', 141.1],
  ['99203', 'Office visit, new patient, low complexity', 118.5],
  ['99284', 'Emergency department visit, high severity', 248.5],
  ['99285', 'Emergency department visit, highest severity', 402.6],
  ['93000', 'Electrocardiogram (ECG/EKG), complete', 17.84],
  ['71046', 'Chest X-ray, 2 views', 29.44],
  ['70450', 'CT head without contrast', 142.3],
  ['72148', 'MRI lumbar spine without contrast', 312.4],
  ['80053', 'Comprehensive metabolic panel (blood test)', 13.22],
  ['85025', 'Complete blood count (CBC) with differential', 10.45],
  ['84443', 'Thyroid stimulating hormone (TSH) test', 18.9],
  ['36415', 'Venipuncture (routine blood draw)', 8.62],
  ['77067', 'Screening mammography, bilateral (2-view each breast)', 131.44],
  ['76700', 'Abdominal ultrasound, complete', 108.4],
  ['27447', 'Total knee replacement (arthroplasty)', 1287.44],
  ['29881', 'Knee arthroscopy with meniscectomy', 658.2],
  ['45378', 'Colonoscopy, diagnostic', 712.5],
  ['66984', 'Cataract surgery with intraocular lens', 824.3],
  ['97110', 'Therapeutic exercises (physical therapy)', 33.5],
].forEach(([c, d, m]) => add(c, d, m));

// ── Office / outpatient E/M (18) ──
[
  ['99202', 'Office visit, new patient, straightforward', 68.5],
  ['99204', 'Office visit, new patient, moderate complexity', 178.2],
  ['99205', 'Office visit, new patient, high complexity', 248.9],
  ['99211', 'Office visit, established, minimal problem', 24.8],
  ['99212', 'Office visit, established, straightforward', 58.4],
  ['99215', 'Office visit, established, high complexity', 198.6],
  ['99241', 'Office consultation, low complexity', 88.2],
  ['99242', 'Office consultation, moderate complexity', 132.5],
  ['99243', 'Office consultation, detailed', 178.4],
  ['99244', 'Office consultation, comprehensive', 245.6],
  ['99245', 'Office consultation, highest complexity', 312.8],
  ['99385', 'Initial preventive visit, 18–39 years', 168.4],
  ['99386', 'Initial preventive visit, 40–64 years', 182.6],
  ['99395', 'Periodic preventive visit, 18–39 years', 142.8],
  ['99396', 'Periodic preventive visit, 40–64 years', 158.2],
  ['99401', 'Preventive counseling, 15 minutes', 38.4],
  ['99402', 'Preventive counseling, 30 minutes', 72.6],
  ['99239', 'Hospital discharge day, more than 30 minutes', 118.6],
  ['94761', 'Pulse oximetry, multiple determinations', 8.24],
  ['45385', 'Colonoscopy with lesion removal', 842.6],
  ['59510', 'Routine obstetric care, cesarean delivery', 2684.8],
].forEach(([c, d, m]) => add(c, d, m));

// ── Hospital / ER (12) ──
[
  ['99221', 'Initial hospital care, low complexity', 112.4],
  ['99222', 'Initial hospital care, moderate complexity', 168.8],
  ['99223', 'Initial hospital care, high complexity', 228.6],
  ['99231', 'Subsequent hospital care, low complexity', 68.2],
  ['99232', 'Subsequent hospital care, moderate complexity', 98.4],
  ['99233', 'Subsequent hospital care, high complexity', 142.6],
  ['99238', 'Hospital discharge day, 30 minutes or less', 82.4],
  ['99281', 'Emergency department visit, self-limited', 42.8],
  ['99282', 'Emergency department visit, low severity', 78.4],
  ['99283', 'Emergency department visit, moderate severity', 142.6],
  ['99291', 'Critical care, first 30–74 minutes', 285.4],
  ['99292', 'Critical care, each additional 30 minutes', 142.8],
].forEach(([c, d, m]) => add(c, d, m));

// ── Cardiology / pulmonary (10) ──
[
  ['93005', 'Electrocardiogram, tracing only', 8.42],
  ['93010', 'Electrocardiogram, interpretation only', 9.38],
  ['93015', 'Cardiovascular stress test', 88.6],
  ['93306', 'Echocardiography, complete', 142.8],
  ['93350', 'Echocardiography, stress complete', 168.4],
  ['94010', 'Spirometry, simple', 28.6],
  ['94060', 'Bronchodilation spirometry', 42.4],
  ['94640', 'Nebulizer treatment', 18.2],
  ['94760', 'Pulse oximetry, single determination', 4.82],
].forEach(([c, d, m]) => add(c, d, m));

// ── Imaging — X-ray / CT / MRI (22) ──
[
  ['71045', 'Chest X-ray, single view', 22.18],
  ['71047', 'Chest X-ray, 3 views', 34.82],
  ['71100', 'Ribs, unilateral, 2 views', 26.4],
  ['71250', 'CT chest without contrast', 168.4],
  ['71260', 'CT chest with contrast', 198.6],
  ['71275', 'CT angiography, chest', 245.8],
  ['70486', 'CT maxillofacial without contrast', 128.4],
  ['70551', 'MRI brain without contrast', 268.4],
  ['70553', 'MRI brain with and without contrast', 382.6],
  ['72141', 'MRI cervical spine without contrast', 298.4],
  ['72146', 'MRI thoracic spine without contrast', 308.2],
  ['72147', 'MRI thoracic spine with contrast', 368.4],
  ['73721', 'MRI lower extremity without contrast', 288.4],
  ['73722', 'MRI lower extremity with contrast', 348.6],
  ['74176', 'CT abdomen and pelvis without contrast', 198.4],
  ['74177', 'CT abdomen and pelvis with contrast', 248.6],
  ['76805', 'Obstetric ultrasound, complete', 98.4],
  ['76830', 'Transvaginal ultrasound', 88.6],
  ['76856', 'Pelvic ultrasound, complete', 92.4],
  ['76882', 'Ultrasound, extremity, limited', 58.6],
].forEach(([c, d, m]) => add(c, d, m));

// ── Mammography / bone density (4) ──
[
  ['77063', 'Screening digital breast tomosynthesis', 148.6],
  ['77066', 'Diagnostic mammography, bilateral', 168.4],
  ['77080', 'Dual-energy X-ray absorptiometry (DEXA)', 42.8],
].forEach(([c, d, m]) => add(c, d, m));

// ── Labs / pathology (24) ──
[
  ['80048', 'Basic metabolic panel', 10.82],
  ['80061', 'Lipid panel', 16.48],
  ['80076', 'Hepatic function panel', 14.28],
  ['81001', 'Urinalysis, automated with microscopy', 4.82],
  ['81002', 'Urinalysis, non-automated without microscopy', 3.24],
  ['81003', 'Urinalysis, automated without microscopy', 2.86],
  ['82043', 'Urinalysis, microalbumin quantitative', 8.42],
  ['82306', 'Vitamin D, 25-hydroxy', 28.6],
  ['82565', 'Creatinine, blood', 4.28],
  ['82607', 'Vitamin B-12', 12.4],
  ['82728', 'Ferritin', 14.8],
  ['83036', 'Hemoglobin A1c', 12.6],
  ['83550', 'Iron studies', 18.4],
  ['84436', 'Thyroxine (T4), total', 10.2],
  ['84439', 'Free thyroxine (T4)', 12.8],
  ['84460', 'Transferase, alanine (ALT)', 4.82],
  ['84480', 'Triiodothyronine (T3), total', 11.4],
  ['85027', 'Complete blood count, automated', 8.62],
  ['85610', 'Prothrombin time (PT)', 6.42],
  ['86140', 'C-reactive protein, quantitative', 8.28],
  ['87086', 'Urine culture, bacterial', 10.4],
  ['87426', 'Infectious agent antigen detection, rapid', 18.6],
  ['36416', 'Capillary blood collection', 4.28],
].forEach(([c, d, m]) => add(c, d, m));

// ── GI / endoscopy (6) ──
[
  ['43239', 'Upper GI endoscopy with biopsy', 428.6],
  ['43235', 'Upper GI endoscopy, diagnostic', 312.4],
  ['45380', 'Colonoscopy with biopsy', 782.4],
  ['47562', 'Laparoscopic cholecystectomy', 682.4],
].forEach(([c, d, m]) => add(c, d, m));

// ── Orthopedic / surgery (14) ──
[
  ['29827', 'Arthroscopy, shoulder, rotator cuff repair', 892.4],
  ['29806', 'Arthroscopy, shoulder, capsulorrhaphy', 782.6],
  ['64721', 'Carpal tunnel release', 428.4],
  ['20610', 'Joint injection, major joint', 68.4],
  ['20611', 'Joint injection with ultrasound guidance', 88.6],
  ['20552', 'Trigger point injection, 1–2 muscles', 42.8],
  ['12001', 'Simple wound repair, 2.5 cm or less', 88.4],
  ['12002', 'Simple wound repair, 2.6–7.5 cm', 112.6],
  ['12011', 'Simple wound repair, face, 2.5 cm or less', 98.4],
  ['10060', 'Incision and drainage, abscess, simple', 98.2],
  ['10120', 'Incision and removal of foreign body', 112.4],
  ['49505', 'Inguinal hernia repair, initial', 682.4],
  ['49650', 'Laparoscopic inguinal hernia repair', 742.8],
].forEach(([c, d, m]) => add(c, d, m));

// ── OB/GYN / urology (6) ──
[
  ['58558', 'Hysteroscopy with biopsy', 428.6],
  ['58661', 'Laparoscopy, removal of adnexal structures', 582.4],
  ['59400', 'Routine obstetric care, vaginal delivery', 2284.6],
  ['52000', 'Cystourethroscopy', 168.4],
  ['55700', 'Prostate biopsy', 228.6],
].forEach(([c, d, m]) => add(c, d, m));

// ── PT / OT / speech (8) ──
[
  ['97112', 'Neuromuscular re-education (physical therapy)', 38.4],
  ['97140', 'Manual therapy techniques', 36.8],
  ['97530', 'Therapeutic activities', 38.6],
  ['97535', 'Self-care home management training', 42.4],
  ['92507', 'Speech therapy treatment', 68.4],
  ['92567', 'Tympanometry', 18.6],
].forEach(([c, d, m]) => add(c, d, m));

// ── Vaccines / injections / infusion (10) ──
[
  ['90471', 'Immunization administration, first injection', 18.4],
  ['90472', 'Immunization administration, each additional', 12.8],
  ['90686', 'Influenza vaccine, quadrivalent', 22.4],
  ['90715', 'Tetanus, diphtheria, pertussis vaccine', 28.6],
  ['96372', 'Therapeutic injection, subcutaneous or IM', 18.2],
  ['96374', 'IV push, single or initial substance', 42.8],
  ['36591', 'Collection of blood specimen from central venous line', 18.6],
  ['96413', 'Chemotherapy IV infusion, first hour', 168.4],
].forEach(([c, d, m]) => add(c, d, m));

// ── Ophthalmology / ENT / derm (8) ──
[
  ['92004', 'Ophthalmological exam, new patient, comprehensive', 128.4],
  ['92012', 'Ophthalmological exam, established patient', 68.4],
  ['92014', 'Ophthalmological exam, established, comprehensive', 98.6],
  ['69210', 'Removal of impacted cerumen', 48.2],
  ['11102', 'Tangential biopsy of skin', 88.4],
  ['17110', 'Destruction of benign lesions, up to 14', 68.4],
].forEach(([c, d, m]) => add(c, d, m));

export const CPT_CODE_LIST = Object.keys(CPT_CODES_150).sort();

const count = CPT_CODE_LIST.length;
if (count !== 150) {
  throw new Error(`CPT seed expected 150 codes, got ${count}`);
}
