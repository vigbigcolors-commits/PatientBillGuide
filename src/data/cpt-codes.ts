export interface CptFaq {
  question: string;
  answer: string;
}

export interface CptPageData {
  code: string;
  title: string;
  metaDescription: string;
  summary: string;
  category: string;
  categorySlug: string;
  whatIs: string[];
  whenUsed: string[];
  typicalCosts: string[];
  billingIssues: string[];
  whatToDo: string[];
  relatedCodes: { code: string; label: string }[];
  faq: CptFaq[];
}

import { extraCptPages } from './cpt-extra';
import { cptBatch2 } from './cpt-batch-2';

export const launchCptCodes = [
  '99213', '99214', '99215', '99203', '99204', '99283', '99284', '99285',
  '93000', '93306', '71046', '70450', '72148', '70553',
  '80053', '85025', '84443', '36415', '87880',
  '77067', '76700', '27447', '29881', '45378', '47562', '66984',
  '97110', '90834', '99396', '96372',
] as const;

export type LaunchCptCode = (typeof launchCptCodes)[number];

export const cptPages: Record<LaunchCptCode, CptPageData> = {
  '99213': {
    code: '99213',
    title: 'CPT Code 99213 — Office Visit Cost & Billing Guide',
    metaDescription:
      'CPT 99213 is a low-complexity established-patient office visit. See typical Medicare costs, fair price ranges, and how to check your bill.',
    summary:
      'CPT 99213 is one of the most common billing codes for a routine follow-up doctor visit with an established patient and straightforward medical decision-making.',
    category: 'Office visits',
    categorySlug: 'office-visits',
    whatIs: [
      'CPT 99213 describes an office or outpatient visit for a patient who already has an established relationship with the provider. The visit involves a low level of medical decision-making — for example, managing a stable chronic condition, following up on lab results, or addressing a minor new complaint.',
      'This is an evaluation and management (E/M) code, not a procedure code. You will often see it on primary care, specialist, and urgent-care bills when the main service was the visit itself rather than surgery or imaging.',
      'The code reflects documentation requirements set by CMS and the AMA coding framework. Providers choose a level based on history, exam, and decision-making — not simply how long you were in the room.',
    ],
    whenUsed: [
      'Follow-up visits for conditions that are stable or improving, such as well-controlled high blood pressure or routine diabetes monitoring.',
      'Short visits to review test results that do not require complex treatment changes.',
      'Minor acute issues — a simple rash, mild URI symptoms, or medication refill with limited assessment.',
      'It is a step below 99214 (moderate complexity) and above 99212 (straightforward). If documentation supports more problems or data review, a higher code may be appropriate.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 99213 vary by locality. Nationally, the non-facility rate is often near $95–$110 before patient cost-sharing.',
      'Hospital-owned clinics and emergency departments may bill facility fees separately, which can make the total bill much higher than the physician visit code alone.',
      'Self-pay and uninsured patients are sometimes charged several times the Medicare rate. Our fair range uses 1.5×–2.5× Medicare as an educational benchmark — not a legal cap.',
      'Use the ZIP lookup below to see a localized Medicare allowed amount and fair range for your area.',
    ],
    billingIssues: [
      'Upcoding to 99214 or 99215 when documentation supports only a lower level — compare visit notes if you request them.',
      'Duplicate visit charges on the same date of service with another E/M code (modifier rules apply).',
      'Facility fees added when the visit occurred in a hospital outpatient department.',
      'Telehealth visits billed as in-person 99213 without appropriate modifiers or place-of-service codes.',
    ],
    whatToDo: [
      'Request an itemized bill and compare the CPT code to your visit summary or after-visit summary.',
      'Run your code and ZIP through our Fair Price Calculator to see how your charge compares to Medicare benchmarks.',
      'If the level seems high, ask the billing office which documentation elements supported the code — you are asking for explanation, not accusing fraud.',
      'For uninsured patients, ask about a self-pay or prompt-pay discount before paying the full chargemaster rate.',
    ],
    relatedCodes: [
      { code: '99214', label: 'Office visit — moderate complexity' },
      { code: '99212', label: 'Office visit — straightforward' },
      { code: '99203', label: 'New patient — low complexity' },
    ],
    faq: [
      {
        question: 'What does CPT 99213 mean in plain English?',
        answer:
          'It means a follow-up doctor visit for an existing patient where the medical issues were relatively simple — for example, checking a stable condition or discussing routine lab results.',
      },
      {
        question: 'How much should 99213 cost?',
        answer:
          'Medicare often pays providers roughly $95–$115 for this visit depending on location. Commercial and self-pay charges vary widely; many patients see $150–$300+ before insurance adjustments.',
      },
      {
        question: 'Is 99213 covered by insurance?',
        answer:
          'Usually yes for medically necessary visits, subject to your deductible, copay, and network rules. Your EOB may show a different allowed amount than Medicare.',
      },
      {
        question: "What's the difference between 99213 and 99214?",
        answer:
          '99214 requires moderate complexity decision-making — more problems, data, or risk. 99214 typically pays more. Both are common; the right code depends on documented clinical work.',
      },
      {
        question: 'Can I dispute a 99213 charge?',
        answer:
          'You can ask for an itemized bill, a coding clarification, or a financial assistance review. Our tools help you compare prices; they do not provide legal advice.',
      },
    ],
  },

  '93000': {
    code: '93000',
    title: 'CPT Code 93000 — ECG / EKG Cost & Billing Guide',
    metaDescription:
      'CPT 93000 is a complete electrocardiogram (ECG/EKG). Learn typical Medicare rates, billing context, and how to check your heart test charge.',
    summary:
      'CPT 93000 bills for a standard 12-lead electrocardiogram with tracing and interpretation — the common "EKG" or "ECG" heart rhythm test.',
    category: 'Diagnostics',
    categorySlug: 'diagnostics',
    whatIs: [
      'CPT 93000 represents a complete electrocardiogram: the test is performed, a tracing is recorded, and a physician or qualified clinician interprets the results.',
      'Related codes split the work: 93005 is tracing only, and 93010 is interpretation only. A single complete service is usually reported with 93000 when one provider does both.',
      'EKGs are quick, non-invasive tests used to check heart rhythm, rate, and signs of ischemia or other abnormalities.',
    ],
    whenUsed: [
      'Pre-operative clearance, chest pain evaluation, palpitations, or annual physicals when clinically indicated.',
      'Emergency department and urgent care visits where cardiac monitoring is part of the workup.',
      'Follow-up for known arrhythmias, pacemakers, or medication effects on the heart.',
      'Bundled with office visits in some settings — you may see 93000 on the same bill as 99213 or an ER code.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 93000 are relatively low — often about $15–$22 in many localities for the professional component.',
      'Hospital and ER settings may add facility charges, making the patient-facing total much higher than the lab or office rate.',
      'Some providers include EKG in a global visit fee; others bill it separately. Both can be valid depending on contracts and setting.',
      'Use our calculator below with your ZIP to see localized Medicare benchmarks.',
    ],
    billingIssues: [
      'Billing 93000 twice on the same date without medical necessity for repeat testing.',
      'Unbundling when the EKG was integral to an office visit package (payer-specific rules vary).',
      'Charging a hospital facility fee plus a professional EKG fee for a test done in an outpatient clinic.',
      'Using 93000 when only tracing (93005) or only read (93010) was performed.',
    ],
    whatToDo: [
      'Confirm you received a complete EKG with interpretation, not just a tracing.',
      'Compare your charge to the Medicare-based fair range for your ZIP.',
      'If billed in the ER along with a high facility fee, ask which line items are professional vs. facility.',
      'For cash-pay patients, ask whether the EKG can be billed at an office rate vs. hospital outpatient rate.',
    ],
    relatedCodes: [
      { code: '93005', label: 'ECG tracing only' },
      { code: '93010', label: 'ECG interpretation only' },
      { code: '99213', label: 'Office visit — low complexity' },
    ],
    faq: [
      {
        question: 'What is the difference between ECG and EKG?',
        answer: 'They are the same test. EKG comes from the German spelling (Elektrokardiogramm); ECG is the English abbreviation.',
      },
      {
        question: 'How much should an EKG cost?',
        answer:
          'Medicare often allows under $25 for 93000 in many areas. Hospital bills can list hundreds of dollars when facility fees are included.',
      },
      {
        question: 'Why was I charged separately for an EKG at my physical?',
        answer:
          'Screening rules and payer policies differ. Some plans cover preventive visits but bill diagnostic tests separately if symptoms or findings warrant them.',
      },
      {
        question: 'Can 93000 be billed with an office visit on the same day?',
        answer:
          'Yes, when medically necessary and properly documented. Modifier 25 may apply to the visit if the EKG was a distinct service.',
      },
      {
        question: 'Is a high EKG charge a billing error?',
        answer:
          'Not always. Facility fees and out-of-network settings can inflate totals. Compare to benchmarks and request an itemized bill before assuming an error.',
      },
    ],
  },

  '71046': {
    code: '71046',
    title: 'CPT Code 71046 — Chest X-Ray (2 Views) Cost Guide',
    metaDescription:
      'CPT 71046 is a two-view chest radiograph. See typical Medicare pricing, common billing issues, and check your imaging charge.',
    summary:
      'CPT 71046 describes a chest X-ray with two views — typically front (PA) and side (lateral) — to evaluate lungs, heart size, and chest structures.',
    category: 'Imaging',
    categorySlug: 'imaging',
    whatIs: [
      'CPT 71046 is a radiologic exam code for a two-view chest X-ray. It is among the most frequently ordered imaging studies in primary care, emergency medicine, and pre-operative clearance.',
      'One-view chest X-rays use 71045. Additional views or special techniques may use different codes.',
      'The fee covers the technical component (performing the study) and, in many settings, professional interpretation by a radiologist.',
    ],
    whenUsed: [
      'Cough, fever, shortness of breath, chest pain, or suspected pneumonia.',
      'Pre-operative assessment and ICU monitoring.',
      'Follow-up of known lung conditions when a simple radiograph is sufficient.',
      'Workplace or screening contexts where a two-view chest film is required.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 71046 are often near $25–$35 for the technical/professional payment in office or independent imaging center settings.',
      'Hospital outpatient and emergency department charges can be several hundred dollars for the same study due to facility and trauma surcharges.',
      'Independent imaging centers are often less expensive than hospital-based radiology for cash-pay patients.',
      'Enter your ZIP below for a localized Medicare benchmark and fair range estimate.',
    ],
    billingIssues: [
      'Billing both 71045 and 71046 inappropriately on the same encounter.',
      'Separate radiologist read fee when a global fee was already paid.',
      'High facility fees for a study performed in a hospital-owned clinic vs. standalone imaging center.',
      'Charging for two views when only one view was documented.',
    ],
    whatToDo: [
      'Ask whether the study was performed at a hospital facility or independent center — location affects price.',
      'Compare your total to Medicare-based fair ranges; ER chest X-rays are often priced very differently than urgent care.',
      'Request the radiology report and number of views to match the billed code.',
      'If uninsured, ask for the cash price before the scan when possible.',
    ],
    relatedCodes: [
      { code: '71045', label: 'Chest X-ray — single view' },
      { code: '70450', label: 'CT head without contrast' },
      { code: '99283', label: 'ER visit — moderate severity' },
    ],
    faq: [
      {
        question: 'How much should a chest X-ray cost?',
        answer:
          'Medicare benchmarks are often under $40 for 71046 in many localities. Patient bills from hospitals can exceed $300–$800 with facility fees.',
      },
      {
        question: 'What does "two views" mean on my bill?',
        answer:
          'Usually a front-to-back (PA) view and a side (lateral) view. Both images help radiologists see overlapping structures more clearly.',
      },
      {
        question: 'Why is my hospital chest X-ray so expensive?',
        answer:
          'Facility fees, emergency department surcharges, and out-of-network radiology groups can all increase the total beyond the Medicare physician fee schedule rate.',
      },
      {
        question: 'Is 71046 the same at urgent care and the hospital?',
        answer:
          'The clinical test is similar, but billing entities and facility fees differ. Location often matters more than the CPT code itself.',
      },
      {
        question: 'Can I shop around for a chest X-ray?',
        answer:
          'Often yes for non-emergency cases. Ask your doctor for an order you can take to an imaging center with published cash prices.',
      },
    ],
  },

  '80053': {
    code: '80053',
    title: 'CPT Code 80053 — Comprehensive Metabolic Panel Cost Guide',
    metaDescription:
      'CPT 80053 is a comprehensive metabolic panel (CMP) blood test. Learn typical lab costs, billing basics, and check your charge.',
    summary:
      'CPT 80053 is a common blood test panel that measures electrolytes, kidney function, liver enzymes, glucose, and related chemistry markers in one draw.',
    category: 'Laboratory',
    categorySlug: 'laboratory',
    whatIs: [
      'The comprehensive metabolic panel (CMP) bundles multiple chemistry tests into one order code. It typically includes glucose, calcium, sodium, potassium, CO₂, chloride, BUN, creatinine, albumin, total protein, and liver enzymes (AST, ALT, alkaline phosphatase, bilirubin).',
      '80053 is distinct from 80048 (basic metabolic panel), which omits most liver tests.',
      'Labs bill the panel as a single CPT code rather than listing each component separately when performed together.',
    ],
    whenUsed: [
      'Annual physicals and chronic disease monitoring (diabetes, kidney disease, liver disease).',
      'Medication monitoring — for example, diuretics, statins, or drugs that affect electrolytes.',
      'Hospital admission, pre-operative labs, and emergency workups.',
      'Follow-up after abnormal prior results.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 80053 are often modest — roughly $10–$16 in many areas for the clinical laboratory fee.',
      'Hospital lab charges and "facility" markup can push patient responsibility much higher, especially out-of-network.',
      'Direct-to-consumer and cash lab sites may charge $15–$50; hospital bills can be $100–$500+ depending on setting.',
      'Use the ZIP tool below for a Medicare anchor in your locality.',
    ],
    billingIssues: [
      'Billing individual component codes in addition to 80053 for the same panel (unbundling).',
      'Duplicate lab draws on the same date for the same panel.',
      'Out-of-network hospital lab pricing for blood drawn during an inpatient or ER stay.',
      'Charging a phlebotomy draw (36415) plus panel when a bundle policy expects one line.',
    ],
    whatToDo: [
      'Match the billed code to the lab report — confirm it was a full CMP vs. a smaller panel.',
      'If uninsured, compare hospital lab pricing to standalone lab cash prices for non-urgent draws.',
      'Check whether your sample was sent to an out-of-network reference lab.',
      'Use our fair price tool to see if your charge is an outlier relative to Medicare benchmarks.',
    ],
    relatedCodes: [
      { code: '80048', label: 'Basic metabolic panel' },
      { code: '85025', label: 'CBC with differential' },
      { code: '36415', label: 'Venipuncture (blood draw)' },
    ],
    faq: [
      {
        question: 'What is included in a comprehensive metabolic panel?',
        answer:
          'Typically glucose, electrolytes, kidney markers (BUN, creatinine), liver enzymes, bilirubin, and proteins. Exact components can vary slightly by lab.',
      },
      {
        question: 'How much should a CMP blood test cost?',
        answer:
          'Medicare often allows under $20. Retail cash labs may charge $20–$50. Hospital-associated bills can be much higher.',
      },
      {
        question: 'Why was I billed 80053 and 36415?',
        answer:
          '80053 is the panel; 36415 is the blood draw procedure. Both can appear on the same bill when separately payable.',
      },
      {
        question: 'Is fasting required for CPT 80053?',
        answer:
          'Glucose is part of the panel; fasting may be requested depending on why the test was ordered. Follow your clinician’s instructions.',
      },
      {
        question: 'Can lab charges be negotiated?',
        answer:
          'Self-pay patients often can request cash pricing or financial assistance. Compare your bill to benchmarks before paying in full.',
      },
    ],
  },

  '27447': {
    code: '27447',
    title: 'CPT Code 27447 — Total Knee Replacement Cost Guide',
    metaDescription:
      'CPT 27447 is total knee arthroplasty. Understand Medicare surgeon benchmarks, facility fees, and how to review a knee surgery bill.',
    summary:
      'CPT 27447 describes total knee arthroplasty — surgical replacement of the knee joint — and is one of the largest common orthopedic charges patients see on itemized bills.',
    category: 'Surgery',
    categorySlug: 'surgery',
    whatIs: [
      'CPT 27447 covers total knee replacement surgery when the entire joint is resurfaced with prosthetic components. It is a major orthopedic procedure, usually performed in a hospital or ambulatory surgery center.',
      'The surgeon’s professional fee is only one part of the total cost. Anesthesia, implant devices, facility fees, physical therapy, and post-acute care are billed separately with their own codes.',
      'Partial knee replacements and revisions use different CPT codes. 27447 specifically indicates total arthroplasty of the knee.',
    ],
    whenUsed: [
      'Advanced knee osteoarthritis with pain and functional limitation not relieved by conservative treatment.',
      'Certain post-traumatic arthritis or deformity when total replacement is clinically appropriate.',
      'Increasingly, some cases move to outpatient surgery centers; billing still uses 27447 for the procedure when documented.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for the surgeon’s professional fee for 27447 are often roughly $1,200–$1,500 in many localities — but this is not the full surgery cost.',
      'Total knee episodes commonly reach tens of thousands of dollars when hospital, implant, anesthesia, and rehab charges are included.',
      'Our calculator shows the Medicare physician fee schedule anchor for 27447 in your ZIP. Use it to discuss one line item, not the entire episode.',
      'Always request an itemized bill and separate facility vs. professional charges for major surgery.',
    ],
    billingIssues: [
      'Confusing the surgeon fee (27447) with the global hospital charge — patients may think one line is the entire surgery.',
      'Duplicate or overlapping charges for assistant surgeon, DME, or therapy without clear documentation.',
      'Implant device charges listed separately at high markup.',
      'Out-of-network anesthesiology or hospital-based providers creating surprise balance bills.',
    ],
    whatToDo: [
      'Request a full itemized bill and an EOB if insured — compare professional vs. facility portions.',
      'Use our tool to benchmark the 27447 surgeon line against Medicare in your locality.',
      'Ask the hospital for an advance estimate (good faith estimate) for uninsured or self-pay patients.',
      'Review physical therapy and DME codes separately; they are not included in 27447.',
    ],
    relatedCodes: [
      { code: '27446', label: 'Knee arthroplasty with medial and lateral compartments' },
      { code: '97110', label: 'Therapeutic exercises (PT)' },
      { code: '01961', label: 'Anesthesia for knee procedure' },
    ],
    faq: [
      {
        question: 'How much does total knee replacement cost?',
        answer:
          'Total episode costs vary from roughly $20,000 to $60,000+ depending on facility, implants, and region. CPT 27447 alone reflects the surgeon’s procedure fee, not the entire amount.',
      },
      {
        question: 'What does Medicare pay for 27447?',
        answer:
          'Medicare pays the surgeon an allowed amount often near $1,200–$1,500 in many areas, plus separate hospital, anesthesia, and device payments under different rules.',
      },
      {
        question: 'Why is my knee surgery bill so much higher than CPT 27447?',
        answer:
          '27447 is one line. Facility fees, implants, anesthesia, imaging, and rehab are billed separately.',
      },
      {
        question: 'Can I compare hospitals for knee replacement?',
        answer:
          'Yes for elective cases. Ask for written estimates and check whether the facility and surgeons are in-network.',
      },
      {
        question: 'Does a high 27447 charge mean overcharging?',
        answer:
          'Not necessarily. Compare to benchmarks, verify network status, and request coding support from the billing office before drawing conclusions.',
      },
    ],
  },
};

export function getCptPage(code: string): CptPageData | undefined {
  if (code in cptPages) return cptPages[code as LaunchCptCode];
  return extraCptPages[code];
}

export const allCptPages: Record<string, CptPageData> = {
  ...cptPages,
  ...extraCptPages,
  ...cptBatch2,
};

export const cptCodeList = launchCptCodes.map((code) => {
  const page = allCptPages[code];
  return {
    code,
    label: page.summary.slice(0, 80) + '…',
    category: page.category,
  };
});
