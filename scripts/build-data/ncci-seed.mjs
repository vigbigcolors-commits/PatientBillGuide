/**
 * CMS NCCI Procedure-to-Procedure (PTP) launch subset.
 * column1 = comprehensive / primary; column2 = often bundled component.
 * modifier 0 = not allowed same day without appropriate modifier.
 * Source: CMS National Correct Coding Initiative (representative launch pairs).
 */

/** @type {{ column1: string; column2: string; modifier: 0 | 1; rationale: string }[]} */
export const NCCI_PTP_PAIRS = [
  { column1: '99213', column2: '36415', modifier: 0, rationale: 'Venipuncture bundled with office visit' },
  { column1: '99214', column2: '36415', modifier: 0, rationale: 'Venipuncture bundled with office visit' },
  { column1: '99203', column2: '36415', modifier: 0, rationale: 'Venipuncture bundled with office visit' },
  { column1: '99204', column2: '36415', modifier: 0, rationale: 'Venipuncture bundled with office visit' },
  { column1: '99213', column2: '36416', modifier: 0, rationale: 'Capillary draw bundled with office visit' },
  { column1: '99214', column2: '36416', modifier: 0, rationale: 'Capillary draw bundled with office visit' },
  { column1: '99213', column2: '93000', modifier: 0, rationale: 'ECG often included in office visit work' },
  { column1: '99214', column2: '93000', modifier: 0, rationale: 'ECG often included in office visit work' },
  { column1: '99203', column2: '93000', modifier: 0, rationale: 'ECG often included in office visit work' },
  { column1: '93000', column2: '93005', modifier: 0, rationale: 'Tracing component of complete ECG' },
  { column1: '93000', column2: '93010', modifier: 0, rationale: 'Interpretation component of complete ECG' },
  { column1: '80053', column2: '84460', modifier: 0, rationale: 'ALT included in comprehensive metabolic panel' },
  { column1: '80053', column2: '82565', modifier: 0, rationale: 'Creatinine included in comprehensive metabolic panel' },
  { column1: '80053', column2: '84443', modifier: 0, rationale: 'Individual test vs panel unbundling' },
  { column1: '80048', column2: '82565', modifier: 0, rationale: 'Creatinine included in basic metabolic panel' },
  { column1: '85025', column2: '85027', modifier: 0, rationale: 'CBC variant unbundling' },
  { column1: '45378', column2: '45380', modifier: 0, rationale: 'Colonoscopy with biopsy vs diagnostic' },
  { column1: '45378', column2: '45385', modifier: 0, rationale: 'Colonoscopy with removal vs diagnostic' },
  { column1: '45380', column2: '45385', modifier: 0, rationale: 'Colonoscopy procedure hierarchy' },
  { column1: '99284', column2: '99285', modifier: 0, rationale: 'Only one ER visit level per encounter' },
  { column1: '99283', column2: '99284', modifier: 0, rationale: 'Only one ER visit level per encounter' },
  { column1: '99213', column2: '99214', modifier: 0, rationale: 'Only one office visit level same day' },
  { column1: '99203', column2: '99204', modifier: 0, rationale: 'Only one new patient visit level same day' },
  { column1: '71046', column2: '71045', modifier: 0, rationale: 'Chest X-ray view hierarchy' },
  { column1: '71046', column2: '71047', modifier: 0, rationale: 'Chest X-ray view hierarchy' },
  { column1: '70450', column2: '70486', modifier: 0, rationale: 'Head CT vs facial CT same session' },
  { column1: '72148', column2: '72141', modifier: 0, rationale: 'Spine MRI region hierarchy' },
  { column1: '77067', column2: '77063', modifier: 0, rationale: 'Screening mammography vs tomosynthesis' },
  { column1: '77067', column2: '77066', modifier: 0, rationale: 'Screening vs diagnostic mammography' },
  { column1: '27447', column2: '29881', modifier: 0, rationale: 'Major knee surgery vs arthroscopy same day' },
  { column1: '29881', column2: '29827', modifier: 0, rationale: 'Knee arthroscopy procedure hierarchy' },
  { column1: '99284', column2: '93000', modifier: 0, rationale: 'ECG often bundled in ER visit' },
  { column1: '99284', column2: '71046', modifier: 0, rationale: 'Chest X-ray with ER visit review' },
  { column1: '99284', column2: '80053', modifier: 0, rationale: 'Panel labs with ER visit context' },
  { column1: '99213', column2: '96372', modifier: 1, rationale: 'Injection may be separate with modifier' },
  { column1: '99214', column2: '96372', modifier: 1, rationale: 'Injection may be separate with modifier' },
  { column1: '97110', column2: '97112', modifier: 0, rationale: 'PT modalities same session hierarchy' },
  { column1: '97110', column2: '97530', modifier: 0, rationale: 'PT modalities same session hierarchy' },
  { column1: '66984', column2: '92004', modifier: 0, rationale: 'Surgery vs exam same day' },
  { column1: '43239', column2: '43235', modifier: 0, rationale: 'Upper endoscopy with biopsy vs diagnostic' },
  { column1: '47562', column2: '43235', modifier: 0, rationale: 'Unrelated endoscopy same day review' },
  { column1: '99291', column2: '99292', modifier: 0, rationale: 'Critical care add-on coding rules' },
  { column1: '99222', column2: '99223', modifier: 0, rationale: 'Only one initial hospital care level' },
  { column1: '99232', column2: '99233', modifier: 0, rationale: 'Only one subsequent hospital care level' },
];
