import type { CptPageData } from './cpt-codes';

/** Tier-1 batch 2 — high-traffic codes added after launch set of 20. */
export const cptBatch2: Record<string, CptPageData> = {
  '99215': {
    code: '99215',
    title: 'CPT Code 99215 — Office Visit (High Complexity) Cost & Billing Guide',
    metaDescription:
      'CPT 99215 is a high-complexity established-patient office visit. See Medicare benchmarks, typical commercial ranges, and how to review your bill.',
    summary:
      'CPT 99215 bills for an established-patient office visit with high-complexity medical decision-making — often multiple serious problems, extensive data review, or high-risk management.',
    category: 'Office visits',
    categorySlug: 'office-visits',
    whatIs: [
      'CPT 99215 is the highest routine established-patient evaluation and management (E/M) level for office or outpatient visits. It reflects high-complexity medical decision-making: multiple chronic conditions that are worsening, extensive review of records or test results, drug therapy requiring intensive monitoring, or decisions with significant morbidity risk.',
      'It pays more than 99214 and 99213 on the Medicare Physician Fee Schedule. Providers must document history, exam, and decision-making (or time) supporting the level. It is not a procedure code — it represents the physician\'s cognitive work during the encounter.',
    ],
    whenUsed: [
      'Complex follow-ups — for example, heart failure with new symptoms, cancer surveillance with abnormal findings, or multiple unstable chronic diseases addressed in one visit.',
      'Visits requiring extensive interpretation of outside imaging, labs, or specialist records that change the treatment plan.',
      'High-risk medication management — new chemotherapy regimens, anticoagulation with bleeding concerns, or psychiatric medications with serious side effects.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 99215 are often roughly $165–$195 in many localities — substantially higher than 99213 or 99214 in the same ZIP.',
      'Hospital-owned clinic facility fees can add hundreds of dollars beyond the professional visit line.',
      'Use our Fair Price Calculator with your ZIP for a localized Medicare anchor and educational fair range.',
    ],
    billingIssues: [
      'Upcoding concerns when patients recall a brief visit but the bill shows 99215 — request documentation elements, not accusations.',
      'Duplicate E/M billing on the same date with other visit codes without appropriate modifiers.',
      'Facility fees at hospital outpatient departments inflating the total beyond the professional fee.',
    ],
    whatToDo: [
      'Compare the billed level to your after-visit summary and portal note.',
      'Run 99215 + ZIP through Fair Price to benchmark the professional fee.',
      'Ask billing which problems, data, and risk supported high complexity if the level surprises you.',
    ],
    relatedCodes: [
      { code: '99214', label: 'Office visit — moderate complexity' },
      { code: '99205', label: 'New patient — high complexity' },
      { code: '99213', label: 'Office visit — low complexity' },
    ],
    faq: [
      {
        question: 'What does CPT 99215 mean?',
        answer:
          'A follow-up doctor visit for an existing patient where medical decision-making was highly complex — multiple serious issues, extensive data review, or high-risk treatment decisions.',
      },
      {
        question: 'How much should 99215 cost?',
        answer:
          'Medicare often allows roughly $165–$195 depending on locality. Insured and self-pay totals vary; hospital clinic facility fees can push patient responsibility much higher.',
      },
      {
        question: '99214 vs 99215 — what is the difference?',
        answer:
          '99215 requires high complexity decision-making; 99214 is moderate. 99215 pays more when documentation supports the higher level.',
      },
      {
        question: 'Is 99215 always appropriate for specialists?',
        answer:
          'No. Specialty alone does not determine the code — documented complexity does. A specialist can bill 99213 when decision-making was straightforward.',
      },
      {
        question: 'Can I question a 99215 charge?',
        answer:
          'Yes — request itemization, coding clarification, or insurer review. Our tools compare to benchmarks; they do not provide legal advice.',
      },
    ],
  },

  '99204': {
    code: '99204',
    title: 'CPT Code 99204 — New Patient Visit (Moderate Complexity) Cost Guide',
    metaDescription:
      'CPT 99204 is a moderate-complexity new-patient office visit. Learn Medicare rates, billing context, and how to check your first-visit charge.',
    summary:
      'CPT 99204 bills for a new-patient office visit with moderate-complexity medical decision-making — common for first specialist consultations with multiple issues or workup.',
    category: 'Office visits',
    categorySlug: 'office-visits',
    whatIs: [
      'CPT 99204 is a new-patient evaluation and management code with moderate complexity. "New patient" means no face-to-face professional services from that physician or same-specialty group within the past three years. The visit covers history, exam, and decision-making for problems that exceed low complexity but do not reach high complexity.',
      'New-patient codes (99202–99205) generally pay more than established-patient equivalents because initial encounters require more comprehensive documentation. 99204 sits between 99203 (low) and 99205 (high) on the new-patient scale.',
    ],
    whenUsed: [
      'First visit to a specialist with a referral for a workup — cardiology, orthopedics, gastroenterology, etc.',
      'New primary care intake when multiple active problems or abnormal prior tests require moderate decision-making.',
      'Initial mental health evaluation when complexity exceeds 99203 but documentation does not support 99205.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 99204 are often roughly $165–$190 in many localities.',
      'First visits at hospital-owned clinics may include facility fees on top of the professional line.',
      'Compare your charge using Fair Price with code 99204 and your ZIP.',
    ],
    billingIssues: [
      'Billing new-patient 99204 when you recently saw the same group — established codes may apply.',
      'Upcoding to 99205 when documentation supports only moderate complexity.',
      'Bundling preventive elements with problem-oriented new-patient visits on the same day.',
    ],
    whatToDo: [
      'Verify new-patient status if you have seen the practice before.',
      'Separate professional vs facility charges on the itemized bill.',
      'Benchmark the 99204 line against Medicare in your area before paying self-pay balances.',
    ],
    relatedCodes: [
      { code: '99203', label: 'New patient — low complexity' },
      { code: '99205', label: 'New patient — high complexity' },
      { code: '99214', label: 'Established patient — moderate complexity' },
    ],
    faq: [
      {
        question: 'What is the difference between 99203 and 99204?',
        answer:
          '99203 is low-complexity new patient; 99204 is moderate complexity — typically more problems, data, or risk documented at the first visit.',
      },
      {
        question: 'How much should a new patient visit cost?',
        answer:
          'Medicare often allows roughly $165–$190 for 99204 in many areas. Self-pay and commercial allowed amounts differ; facility fees add separately.',
      },
      {
        question: 'Why is my first visit billed higher than follow-ups?',
        answer:
          'New-patient codes reflect additional history and exam work. Follow-up established-patient codes (99213, 99214) often have lower fee schedule amounts.',
      },
      {
        question: 'Can 99204 include procedures?',
        answer:
          'No — procedures like EKGs, biopsies, or injections bill with separate CPT codes when performed.',
      },
      {
        question: 'Is 99204 covered by insurance?',
        answer:
          'Usually yes when medically necessary and in-network, subject to deductible and copay rules.',
      },
    ],
  },

  '99283': {
    code: '99283',
    title: 'CPT Code 99283 — Emergency Room Visit (Moderate) Cost Guide',
    metaDescription:
      'CPT 99283 is a moderate-severity ER visit. Understand Medicare ER benchmarks, facility fees, and how to review emergency department charges.',
    summary:
      'CPT 99283 describes a moderate-severity emergency department evaluation and management visit — a common ER level between low-acuity 99282 and higher-complexity 99284.',
    category: 'Emergency',
    categorySlug: 'emergency',
    whatIs: [
      'CPT 99281–99285 are emergency department E/M codes based on medical decision-making severity, not time. 99283 indicates a moderate-severity presentation requiring a straightforward to moderate workup — for example, abdominal pain evaluated with labs, moderate asthma exacerbation, or an injury needing imaging but not critical care.',
      'The ER physician fee is only one line on the bill. Facility fees, imaging, labs, supplies, and observation charges are billed separately and often dominate the total.',
    ],
    whenUsed: [
      'Moderate-acuity complaints that need ED evaluation beyond urgent care capacity.',
      'Workups involving multiple tests or treatments but not meeting high-severity 99284 criteria.',
      'Patients triaged to mid-level acuity who require physician evaluation and disposition.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for the 99283 professional fee are often roughly $95–$120 in many localities — a fraction of the total ER bill.',
      'Total ER visits commonly reach $1,500–$5,000+ when facility, imaging, and lab charges combine.',
      'Use Fair Price to benchmark the 99283 physician line; review facility fees separately.',
    ],
    billingIssues: [
      'Confusing the physician E/M code with the entire ER bill total.',
      'Out-of-network ER physicians at in-network hospitals (surprise billing scenarios).',
      'Duplicate facility and professional charges for the same service elements.',
    ],
    whatToDo: [
      'Request a fully itemized bill separating facility, physician, imaging, and lab lines.',
      'Compare 99283 to Medicare benchmarks; use Surprise Bill Checker for OON scenarios.',
      'Ask about financial assistance and itemized coding clarification before paying in full.',
    ],
    relatedCodes: [
      { code: '99284', label: 'ER visit — high severity' },
      { code: '99285', label: 'ER visit — highest severity' },
      { code: '71046', label: 'Chest X-ray — two views' },
    ],
    faq: [
      {
        question: 'How much does an ER visit with 99283 cost?',
        answer:
          'The 99283 physician fee is often under $120 on Medicare benchmarks, but total ER bills frequently exceed thousands due to facility and ancillary charges.',
      },
      {
        question: '99283 vs 99284 — what is the difference?',
        answer:
          '99284 reflects high-severity decision-making; 99283 is moderate. Higher codes pay more when documentation supports greater complexity.',
      },
      {
        question: 'Why is my ER bill so much higher than CPT 99283?',
        answer:
          '99283 is the physician visit code only. Facility fees, CT scans, labs, and supplies are separate line items.',
      },
      {
        question: 'Can I dispute an ER level code?',
        answer:
          'You can request coding support and medical record review through billing or your insurer. Our tools help benchmark; they do not provide legal advice.',
      },
      {
        question: 'Does insurance cover 99283?',
        answer:
          'Usually subject to ER copays, deductibles, and network rules. Out-of-network ER physicians may trigger balance billing protections in some situations.',
      },
    ],
  },

  '70553': {
    code: '70553',
    title: 'CPT Code 70553 — MRI Brain With Contrast Cost & Billing Guide',
    metaDescription:
      'CPT 70553 is MRI brain with and without contrast. See typical Medicare imaging rates, facility vs professional fees, and how to review your bill.',
    summary:
      'CPT 70553 bills for magnetic resonance imaging (MRI) of the brain with and without contrast material — a common advanced imaging study for headaches, seizures, and neurological symptoms.',
    category: 'Imaging',
    categorySlug: 'imaging',
    whatIs: [
      'CPT 70553 is a radiology code for MRI brain performed with and without contrast. Related codes include 70551 (without contrast) and 70552 (with contrast only). The study includes technical performance and, in many settings, professional interpretation by a radiologist.',
      'Hospital outpatient MRI charges often include large facility fees. Independent imaging centers frequently offer lower cash prices for the same CPT code when clinically appropriate and ordered appropriately.',
    ],
    whenUsed: [
      'Persistent headaches, new neurological deficits, seizure evaluation, or suspected mass lesions when MRI is clinically indicated.',
      'Follow-up of known brain conditions when contrast enhancement changes management.',
      'Emergency and inpatient workups billed separately from outpatient imaging center rates.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 70553 vary by locality and setting — technical components often fall in a wide range when including both professional and facility payments.',
      'Hospital MRI bills for patients can exceed $2,000–$5,000; independent centers may offer $400–$1,200 cash pricing in competitive markets.',
      'Benchmark using Fair Price + ZIP; compare facility vs freestanding center quotes for non-emergency cases.',
    ],
    billingIssues: [
      'Billing both 70552 and 70553 inappropriately on the same encounter.',
      'Out-of-network radiology groups at in-network hospitals.',
      'High facility fees for identical CPT codes vs independent imaging centers.',
    ],
    whatToDo: [
      'For non-emergency cases, ask whether your order can be used at a freestanding MRI center.',
      'Request the radiology report and verify contrast use matches 70553.',
      'Compare total charges to Medicare benchmarks and ask about cash pricing.',
    ],
    relatedCodes: [
      { code: '70551', label: 'MRI brain without contrast' },
      { code: '70450', label: 'CT head without contrast' },
      { code: '99283', label: 'ER visit — moderate severity' },
    ],
    faq: [
      {
        question: 'How much should a brain MRI cost?',
        answer:
          'Totals vary enormously by facility. Medicare technical/professional components are often far below hospital chargemaster rates patients receive.',
      },
      {
        question: 'What is the difference between 70551 and 70553?',
        answer:
          '70551 is without contrast; 70553 includes both without and with contrast sequences in one billed study when performed.',
      },
      {
        question: 'Why is hospital MRI so expensive?',
        answer:
          'Facility fees, emergency surcharges, and out-of-network radiology groups can inflate totals beyond the Medicare fee schedule rate for the CPT code.',
      },
      {
        question: 'Can I shop for an MRI?',
        answer:
          'Often yes for non-emergency orders. Take your physician\'s order to an in-network or cash-priced imaging center.',
      },
      {
        question: 'Is 70553 covered by insurance?',
        answer:
          'Usually when medically necessary and prior authorization rules are met. High deductibles may leave large patient responsibility.',
      },
    ],
  },

  '93306': {
    code: '93306',
    title: 'CPT Code 93306 — Echocardiogram Complete Cost & Billing Guide',
    metaDescription:
      'CPT 93306 is a complete echocardiogram with Doppler. Learn typical Medicare heart ultrasound rates and how to review cardiology imaging bills.',
    summary:
      'CPT 93306 bills for a complete transthoracic echocardiogram with spectral and color Doppler — the standard "echo" heart ultrasound for structure and function.',
    category: 'Diagnostics',
    categorySlug: 'diagnostics',
    whatIs: [
      'CPT 93306 represents a complete echocardiogram including 2D imaging, M-mode when performed, and complete spectral and color Doppler evaluation. It is distinct from limited studies (93308) or stress echos (93350+ series).',
      'The fee may cover technical and professional components depending on setting — hospital outpatient, cardiology office, or mobile imaging.',
    ],
    whenUsed: [
      'Heart murmur evaluation, heart failure assessment, valve disease monitoring, and pre-operative cardiac clearance when indicated.',
      'Chest pain or shortness of breath workups when echo is clinically appropriate.',
      'Follow-up after heart attack, cardiomyopathy, or congenital heart conditions.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 93306 are often roughly $150–$220 in many localities depending on global vs split billing.',
      'Hospital outpatient echo charges can exceed $1,000–$2,500 with facility fees.',
      'Office-based cardiology labs may bill lower totals for the same CPT code.',
    ],
    billingIssues: [
      'Billing a complete 93306 when a limited study was performed.',
      'Duplicate professional reads when global billing already included interpretation.',
      'Facility fees added at hospital-owned cardiology clinics.',
    ],
    whatToDo: [
      'Confirm the study was a complete echo with Doppler, not a limited scan.',
      'Compare professional vs facility portions on itemized bills.',
      'Use Fair Price with 93306 and your ZIP for Medicare benchmark context.',
    ],
    relatedCodes: [
      { code: '93000', label: 'ECG complete' },
      { code: '93308', label: 'Echocardiogram — limited' },
      { code: '99214', label: 'Office visit — moderate complexity' },
    ],
    faq: [
      {
        question: 'What is CPT 93306 in plain English?',
        answer:
          'A complete ultrasound of the heart with Doppler — the standard echocardiogram ordered for many cardiac symptoms and monitoring.',
      },
      {
        question: 'How much should an echocardiogram cost?',
        answer:
          'Medicare benchmarks are often near $150–$220 for many areas. Hospital bills can list much higher totals with facility charges.',
      },
      {
        question: '93306 vs 93308?',
        answer:
          '93306 is complete with Doppler; 93308 is a limited follow-up study. Complete studies generally pay more.',
      },
      {
        question: 'Is an echo covered by insurance?',
        answer:
          'Usually when medically necessary and authorized if required. Preventive screening without indication may not be covered.',
      },
      {
        question: 'Can I get an echo at a cheaper location?',
        answer:
          'For non-urgent orders, ask whether an independent cardiology lab or outpatient center is in-network and how facility fees compare.',
      },
    ],
  },

  '96372': {
    code: '96372',
    title: 'CPT Code 96372 — Injection Administration Cost & Billing Guide',
    metaDescription:
      'CPT 96372 is therapeutic injection administration (IM or subcutaneous). Learn typical Medicare rates and common billing combinations.',
    summary:
      'CPT 96372 bills for therapeutic or diagnostic injection administration — intramuscular or subcutaneous — excluding vaccines, which use different codes.',
    category: 'Procedures',
    categorySlug: 'procedures',
    whatIs: [
      'CPT 96372 covers the act of administering an injection by intramuscular or subcutaneous route. The drug itself is billed separately with its own HCPCS/J-code when applicable. Vaccine administration uses 90471/90472 instead.',
      'You often see 96372 on the same visit as an office E/M code (99213, etc.) when the injection is a distinct service — modifier 25 may apply to the visit.',
    ],
    whenUsed: [
      'Antibiotic injections, steroid joint or muscle injections billed as IM, allergy shots, or biologic subcutaneous administration in office settings.',
      'Urgent care and primary care visits where medication is given by injection rather than oral prescription.',
      'Hospital outpatient clinics administering injectable medications.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 96372 alone are often modest — roughly $25–$35 in many localities for the administration fee.',
      'The drug charge (e.g., steroid, biologic) may dominate the total bill.',
      'Benchmark the administration line separately from drug costs using Fair Price.',
    ],
    billingIssues: [
      'Billing 96372 when injection was integral to a procedure already paid globally.',
      'Unbundling drug and administration incorrectly or duplicating administration on same drug.',
      'Confusing vaccine administration codes with 96372.',
    ],
    whatToDo: [
      'Identify drug J-code charges separately from 96372 on the itemized bill.',
      'Ask whether the visit and injection were distinct services supporting both E/M and 96372.',
      'Compare administration fee to Medicare benchmarks in your ZIP.',
    ],
    relatedCodes: [
      { code: '90471', label: 'Immunization administration' },
      { code: '99213', label: 'Office visit — low complexity' },
      { code: '20610', label: 'Joint injection — major joint' },
    ],
    faq: [
      {
        question: 'What does 96372 cover?',
        answer:
          'The service of giving an IM or subcutaneous injection — not the medication itself, which bills separately.',
      },
      {
        question: 'How much should injection administration cost?',
        answer:
          'Medicare often allows roughly $25–$35 for 96372 in many areas. Total cost depends heavily on the drug billed.',
      },
      {
        question: 'Why was I billed 99213 and 96372?',
        answer:
          'Common when a visit and injection are both medically necessary and documented as distinct services.',
      },
      {
        question: 'Is 96372 the same as a flu shot admin fee?',
        answer:
          'No — vaccines typically use 90471/90472. 96372 is for therapeutic/diagnostic injections.',
      },
      {
        question: 'Can 96372 be denied by insurance?',
        answer:
          'Yes if payer rules consider the injection bundled into another service or not medically necessary.',
      },
    ],
  },

  '87880': {
    code: '87880',
    title: 'CPT Code 87880 — Strep Test (Rapid Antigen) Cost & Billing Guide',
    metaDescription:
      'CPT 87880 is a rapid strep antigen test. See typical Medicare lab rates, urgent care billing, and how to check your throat swab charge.',
    summary:
      'CPT 87880 bills for a rapid strep test (Group A Streptococcus direct optical immunoassay) — the quick in-office throat swab done at urgent care and primary care.',
    category: 'Laboratory',
    categorySlug: 'laboratory',
    whatIs: [
      'CPT 87880 is a Clinical Laboratory Improvement Amendments (CLIA) waived test code for rapid strep antigen detection. Results are available in minutes during the visit, unlike send-out throat cultures (87070) that take days.',
      'The test fee is separate from the office or urgent care visit E/M code. Both commonly appear on the same bill.',
    ],
    whenUsed: [
      'Sore throat evaluation when clinician suspects streptococcal pharyngitis and wants immediate results.',
      'Urgent care and primary care triage to decide on antibiotics.',
      'Sometimes paired with visit codes 99213, 99203, or urgent care equivalents.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 87880 are often roughly $18–$28 in many localities.',
      'Urgent care total visits with strep test may run $150–$350+ depending on E/M level and self-pay policies.',
      'Compare 87880 separately from the visit charge using Fair Price.',
    ],
    billingIssues: [
      'Billing 87880 when a culture alone was sent without rapid test documentation.',
      'Duplicate strep tests on the same date.',
      'High urgent care facility fees dwarfing the lab line itself.',
    ],
    whatToDo: [
      'Match the billed test to what was performed — rapid in-office vs send-out culture.',
      'Benchmark 87880 against Medicare in your ZIP.',
      'Review E/M level separately if the total urgent care bill seems high.',
    ],
    relatedCodes: [
      { code: '87070', label: 'Throat culture' },
      { code: '99213', label: 'Office visit — low complexity' },
      { code: '87804', label: 'Influenza rapid test' },
    ],
    faq: [
      {
        question: 'How much should a strep test cost?',
        answer:
          'Medicare often allows under $30 for 87880 in many areas. Urgent care totals include separate visit fees.',
      },
      {
        question: '87880 vs throat culture?',
        answer:
          '87880 is the rapid in-office antigen test; 87070 is a culture that may take days. Different codes and costs.',
      },
      {
        question: 'Is rapid strep covered by insurance?',
        answer:
          'Usually when medically necessary. Some plans apply lab copays separately from office visit copays.',
      },
      {
        question: 'Can I be billed for strep test and visit?',
        answer:
          'Yes — the test and evaluation are typically separate billable services when documented appropriately.',
      },
      {
        question: 'Why was my urgent care bill so high with 87880?',
        answer:
          'The strep test is often a small line. The E/M visit level and facility or self-pay policies drive most of the total.',
      },
    ],
  },

  '47562': {
    code: '47562',
    title: 'CPT Code 47562 — Laparoscopic Cholecystectomy Cost & Billing Guide',
    metaDescription:
      'CPT 47562 is laparoscopic gallbladder removal. Understand surgeon Medicare benchmarks, facility fees, and how to review surgery bills.',
    summary:
      'CPT 47562 describes laparoscopic cholecystectomy — minimally invasive gallbladder removal — one of the most common general surgery procedures in the US.',
    category: 'Surgery',
    categorySlug: 'surgery',
    whatIs: [
      'CPT 47562 covers laparoscopic removal of the gallbladder. Open cholecystectomy uses 47600. The surgeon\'s professional fee is one line; anesthesia, facility, pathology, and pre/post-op care bill separately.',
      'Same-day surgery centers (ASC) often produce lower total episode costs than hospital inpatient settings for uncomplicated cases.',
    ],
    whenUsed: [
      'Symptomatic gallstones, biliary colic, or acute cholecystitis when surgery is indicated.',
      'Elective laparoscopic approach when clinically appropriate — most common method today.',
    ],
    typicalCosts: [
      'Medicare surgeon allowed amounts for 47562 are often roughly $700–$900 in many localities for the professional component.',
      'Total episodes commonly reach $8,000–$20,000+ including facility, anesthesia, and supplies.',
      'Use Fair Price to benchmark the 47562 surgeon line — not the entire surgical bill.',
    ],
    billingIssues: [
      'Patient confusion between surgeon fee and total hospital/ASC charge.',
      'Out-of-network anesthesia or assistant surgeon surprise bills.',
      'Conversion to open procedure (47600) billed vs planned laparoscopic 47562 — verify operative report.',
    ],
    whatToDo: [
      'Request itemized bills and EOB separating surgeon, facility, anesthesia, and pathology.',
      'For elective cases, compare ASC vs hospital estimates in advance.',
      'Benchmark 47562 professional fee with your ZIP in Fair Price.',
    ],
    relatedCodes: [
      { code: '47600', label: 'Open cholecystectomy' },
      { code: '00790', label: 'Anesthesia for intra-abdominal procedures' },
      { code: '99213', label: 'Post-op office visit' },
    ],
    faq: [
      {
        question: 'How much does gallbladder surgery cost?',
        answer:
          'Total costs vary widely by facility and region. CPT 47562 reflects the surgeon\'s procedure fee only — often under $1,000 on Medicare benchmarks.',
      },
      {
        question: '47562 vs 47600?',
        answer:
          '47562 is laparoscopic (minimally invasive); 47600 is open surgery. Different codes and fee schedule amounts.',
      },
      {
        question: 'Why is my surgery bill so much higher than 47562?',
        answer:
          'Facility, anesthesia, implants/supplies, and hospital stay charges are billed separately from the surgeon\'s CPT line.',
      },
      {
        question: 'Can I choose surgery center vs hospital?',
        answer:
          'For many elective cases, yes — ask your surgeon about ASC options and in-network estimates.',
      },
      {
        question: 'Is laparoscopic cholecystectomy covered by insurance?',
        answer:
          'Generally yes when medically necessary and in-network, subject to deductible and coinsurance.',
      },
    ],
  },

  '90834': {
    code: '90834',
    title: 'CPT Code 90834 — Psychotherapy 45 Minutes Cost & Billing Guide',
    metaDescription:
      'CPT 90834 is 45-minute psychotherapy. Learn typical Medicare mental health rates, telehealth billing, and how to review therapy bills.',
    summary:
      'CPT 90834 bills for individual psychotherapy, approximately 45 minutes face-to-face with the patient — a common mental health visit code.',
    category: 'Mental health',
    categorySlug: 'mental-health',
    whatIs: [
      'CPT 90834 is a timed psychotherapy code for individual treatment, typically 38–52 minutes of face-to-face time. 90837 is 60 minutes; 90832 is 30 minutes. Psychiatrists may bill E/M plus psychotherapy with appropriate add-on rules; psychologists and licensed counselors typically bill psychotherapy codes alone.',
      'Telehealth psychotherapy often uses the same codes with modifier and place-of-service rules per payer — especially post-public health emergency policy changes.',
    ],
    whenUsed: [
      'Standard weekly or biweekly therapy sessions with psychologists, LCSWs, LMHCs, or psychiatrists providing talk therapy.',
      'Cognitive behavioral therapy, trauma processing, and other modalities when documented as psychotherapy time.',
      'Outpatient mental health treatment not bundled into facility inpatient stays.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 90834 are often roughly $95–$115 in many localities for non-facility settings.',
      'Commercial copays for mental health are often $20–$50 in-network; out-of-network can be much higher.',
      'Cash-pay therapy may run $100–$200 per session depending on region and provider credentials.',
    ],
    billingIssues: [
      'Billing 90834 when session time documentation supports only 90832.',
      'Incorrect telehealth modifiers or place-of-service causing denials.',
      'Balance billing when provider is out-of-network despite in-network facility.',
    ],
    whatToDo: [
      'Verify in-network mental health benefits and session copays before starting care.',
      'Compare billed 90834 to Medicare benchmarks if self-pay or out-of-network.',
      'Request superbills for out-of-network reimbursement if your plan allows.',
    ],
    relatedCodes: [
      { code: '90837', label: 'Psychotherapy — 60 minutes' },
      { code: '90832', label: 'Psychotherapy — 30 minutes' },
      { code: '99214', label: 'Office visit — with med management' },
    ],
    faq: [
      {
        question: 'What does CPT 90834 mean?',
        answer:
          'Individual psychotherapy session of about 45 minutes — the most common outpatient therapy billing code.',
      },
      {
        question: 'How much should therapy cost per session?',
        answer:
          'Medicare often allows roughly $95–$115 in many areas. Commercial copays and cash rates vary widely.',
      },
      {
        question: '90834 vs 90837?',
        answer:
          '90834 is ~45 minutes; 90837 is ~60 minutes. Higher time thresholds support the longer code when documented.',
      },
      {
        question: 'Is online therapy billed as 90834?',
        answer:
          'Often yes when payer telehealth policies allow, with appropriate modifiers and documentation of real-time interaction.',
      },
      {
        question: 'Is mental health covered like medical visits?',
        answer:
          'Federal parity rules require comparable coverage in many plans, but copays, networks, and visit limits still vary.',
      },
    ],
  },

  '99396': {
    code: '99396',
    title: 'CPT Code 99396 — Preventive Visit Age 40–64 Cost & Billing Guide',
    metaDescription:
      'CPT 99396 is a periodic preventive exam for established patients age 40–64. Learn Medicare vs commercial preventive billing and surprise charges.',
    summary:
      'CPT 99396 bills for a periodic comprehensive preventive medicine evaluation for an established patient aged 40–64 — often called an annual physical in that age band.',
    category: 'Preventive',
    categorySlug: 'preventive',
    whatIs: [
      'CPT 99381–99397 are preventive medicine E/M codes by age and new vs established status. 99396 is established patient, age 40–64. They cover a comprehensive history and exam focused on prevention — not problem-oriented sick visits.',
      'Problem-oriented work during the same encounter may bill separately (99213+ with modifier 25) and can trigger cost-sharing even when the preventive visit is covered at $0 on many commercial plans.',
    ],
    whenUsed: [
      'Annual wellness-style physicals for adults 40–64 without a primary acute complaint dominating the visit.',
      'Health maintenance exams including age-appropriate screening discussions.',
      'Medicare uses different G-code wellness visits — 99396 is common on commercial insurance bills.',
    ],
    typicalCosts: [
      'In-network commercial plans often cover 99396 at 100% as preventive — $0 patient cost when no separate problem visit is billed.',
      'Medicare does not use 99396 for standard Part B wellness — it uses AWV G-codes; 99396 appears more on private insurance EOBs.',
      'Labs and imaging ordered at preventive visits may bill separately and may not be preventive-covered.',
    ],
    billingIssues: [
      'Surprise bills when 99396 and 99214 appear same day — problem visit may not be preventive-covered.',
      'Charging preventive code when visit was entirely problem-focused.',
      'Labs (80053, etc.) billed as diagnostic rather than preventive without proper coding.',
    ],
    whatToDo: [
      'Ask upfront whether the visit is preventive-only or includes problem complaints that bill separately.',
      'Review EOB for split preventive vs diagnostic lab lines after an annual physical.',
      'Use Fair Price for any non-preventive codes on the same statement.',
    ],
    relatedCodes: [
      { code: '99395', label: 'Preventive — established 18–39' },
      { code: '99397', label: 'Preventive — established 65+' },
      { code: '99213', label: 'Problem visit — low complexity' },
    ],
    faq: [
      {
        question: 'Is an annual physical free?',
        answer:
          'Many in-network commercial plans cover 99396 preventive visits at no cost. Separate problem visits, labs, or out-of-network care may still cost you.',
      },
      {
        question: '99396 vs 99213 on the same day?',
        answer:
          'Possible when both preventive exam and significant problem-oriented work occur — modifier 25 on the problem code. The problem portion may not be free.',
      },
      {
        question: 'Does Medicare pay 99396?',
        answer:
          'Traditional Medicare uses Annual Wellness Visit G-codes, not 99396. You may still see 99396 on Medicare Advantage or commercial plan EOBs.',
      },
      {
        question: 'Why did I get a bill after my free physical?',
        answer:
          'Labs, imaging, or a separately billed problem visit (99213/99214) are common reasons. Diagnostic coding on labs triggers cost-sharing.',
      },
      {
        question: 'What age range is 99396 for?',
        answer:
          'Established patient preventive exam for ages 40 through 64. Other age bands use adjacent 9939x codes.',
      },
    ],
  },
};
