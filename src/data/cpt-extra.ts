import type { CptPageData } from './cpt-codes';

export const extraCptPages: Record<string, CptPageData> = {
  '99214': {
    code: '99214',
    title: 'CPT Code 99214 — Office Visit (Moderate Complexity) Cost & Billing Guide',
    metaDescription:
      'CPT 99214 is a moderate-complexity established-patient office visit. See typical Medicare costs, fair price ranges, and how to review your itemized bill.',
    summary:
      'CPT 99214 is one of the most frequently billed evaluation and management codes for follow-up doctor visits where medical decision-making is moderately complex — common in primary care and specialist follow-ups.',
    category: 'Office visits',
    categorySlug: 'office-visits',
    whatIs: [
      'CPT 99214 describes an office or outpatient evaluation and management (E/M) visit for a patient who already has an established relationship with the provider. The visit involves a moderate level of medical decision-making. That typically means addressing multiple problems, reviewing outside data such as labs or imaging, adjusting medications with some risk, or managing a condition that is not fully stable. This is not a procedure code — it represents the physician or qualified clinician\'s work in evaluating you, making clinical decisions, and documenting the encounter.',
      'In the current E/M coding framework used by Medicare and most commercial payers, the level is determined by the complexity of problems addressed, the amount and complexity of data reviewed, and the risk associated with management options. Time can also support the code when documented appropriately. Providers choose 99214 when the documented work exceeds a straightforward 99213 visit but does not rise to the high-complexity threshold of 99215. You will see this code on bills from primary care physicians, internists, cardiologists, endocrinologists, psychiatrists in outpatient settings, and many other specialties when the visit itself was the main service.',
      'Because 99214 pays more than 99213 on the Medicare Physician Fee Schedule, it appears on a large share of outpatient bills — and patients often wonder whether the level matches their experience. A short visit can still support 99214 if documentation reflects moderate complexity, while a longer visit billed at 99213 may be appropriate if decision-making was straightforward. Understanding the code helps you compare your charge to benchmarks and ask informed questions, not to assume the provider did anything improper.',
    ],
    whenUsed: [
      'Follow-up visits for chronic conditions that require medication adjustments, new symptoms, or interpretation of recent test results — for example, worsening asthma, uncontrolled diabetes, or new side effects from treatment.',
      'Visits where the clinician reviews and incorporates outside records, specialist notes, hospital discharge summaries, or multiple lab panels into the plan of care.',
      'Evaluation of a new problem with moderate risk — such as chest pain worked up in the office, significant abdominal symptoms, or mental health visits requiring medication changes with monitoring.',
      'Step-up from 99213 when documentation supports more problems, more data, or higher risk. It sits below 99215 (high complexity) and above 99213 (low complexity) on the established-patient office visit scale.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 99214 vary by locality. Nationally, the non-facility rate is often roughly $125–$145 before patient cost-sharing — noticeably higher than 99213 in the same ZIP code.',
      'Hospital-owned outpatient clinics and academic medical centers may bill a facility fee in addition to the physician visit code, which can push the patient-facing total well above the professional fee alone.',
      'Commercial insurance allowed amounts differ from Medicare. Self-pay and uninsured patients are sometimes charged two to five times the Medicare rate depending on the provider\'s chargemaster and discount policies.',
      'Use the ZIP lookup on our Fair Price Calculator to see a localized Medicare allowed amount and educational fair range for 99214 in your area.',
    ],
    billingIssues: [
      'Upcoding concerns arise when patients see 99214 but their after-visit summary describes only a simple refill or single stable condition — you can request coding clarification and visit documentation rather than assuming an error.',
      'Duplicate E/M charges on the same date of service with another visit code, or billing both a preventive wellness visit and a problem-oriented 99214 without proper modifier use.',
      'Facility fees added when the visit occurred in a hospital outpatient department, making the same clinical encounter cost more than at an independent physician office.',
      'Telehealth visits billed as in-person 99214 without appropriate place-of-service codes, modifiers, or payer-specific telehealth policies.',
    ],
    whatToDo: [
      'Request an itemized bill and compare the CPT code to your after-visit summary, patient portal note, or receipt — note how many issues were addressed and whether labs or outside records were discussed.',
      'Run code 99214 and your ZIP through our Fair Price Calculator to see how your charge compares to Medicare benchmarks and our educational fair range.',
      'If the level seems higher than expected, ask the billing office which documentation elements supported 99214 — history, exam, decision-making, or time. You are seeking explanation, not making accusations.',
      'Uninsured or high-deductible patients should ask about self-pay discounts, prompt-pay reductions, or financial assistance before paying a chargemaster rate in full.',
    ],
    relatedCodes: [
      { code: '99213', label: 'Office visit — low complexity' },
      { code: '99215', label: 'Office visit — high complexity' },
      { code: '99203', label: 'New patient — low complexity' },
    ],
    faq: [
      {
        question: 'What does CPT 99214 mean in plain English?',
        answer:
          'It means a follow-up doctor visit for an existing patient where the clinician addressed moderately complex medical issues — such as adjusting treatment for a worsening condition, reviewing multiple test results, or managing several active problems at once.',
      },
      {
        question: 'How much should a 99214 office visit cost?',
        answer:
          'Medicare often allows roughly $125–$145 depending on locality. With commercial insurance, your allowed amount and copay will differ. Uninsured patients may see $200–$400 or more before discounts, especially at hospital-owned clinics with facility fees.',
      },
      {
        question: 'Is 99214 covered by insurance?',
        answer:
          'Generally yes when the visit is medically necessary and the provider is in-network, subject to your deductible, copay, and plan rules. Preventive visits billed separately may follow different cost-sharing.',
      },
      {
        question: "What's the difference between 99213 and 99214?",
        answer:
          '99213 reflects low-complexity decision-making; 99214 reflects moderate complexity — typically more problems, more data review, or higher management risk. 99214 usually pays more. The correct code depends on documented clinical work, not visit length alone.',
      },
      {
        question: 'Can I dispute or question a 99214 charge?',
        answer:
          'You can request an itemized bill, ask for coding clarification, appeal through your insurer if applicable, or seek financial assistance. Our tools help you compare prices to benchmarks; they do not provide legal advice.',
      },
    ],
  },

  '99203': {
    code: '99203',
    title: 'CPT Code 99203 — New Patient Office Visit Cost & Billing Guide',
    metaDescription:
      'CPT 99203 is a low-complexity new-patient office visit. Learn typical Medicare rates, billing context, and how to check your first-visit charge fairly.',
    summary:
      'CPT 99203 bills for a new-patient office or outpatient visit with straightforward medical decision-making — often a first appointment with a primary care doctor or specialist.',
    category: 'Office visits',
    categorySlug: 'office-visits',
    whatIs: [
      'CPT 99203 is an evaluation and management (E/M) code for a new patient office or outpatient visit with a low level of medical decision-making. "New patient" has a specific coding definition: you have not received face-to-face professional services from that physician or same-specialty group practice within the past three years. The visit covers the clinician\'s work in taking a history, performing an exam, and developing a treatment plan for problems that are relatively straightforward — for example, a single uncomplicated issue, a routine new-patient intake, or initial evaluation of a stable chronic condition.',
      'New-patient visit codes (99202 through 99205) parallel established-patient codes (99212 through 99215) but generally carry higher relative value on the Medicare fee schedule because new patient encounters typically require more comprehensive history and exam documentation. 99203 is the low-complexity tier — above 99202 (straightforward) and below 99204 (moderate complexity). It is commonly seen on first visits to primary care, dermatology, orthopedics, and other specialties when the clinical picture is not highly complex.',
      'This code does not include procedures performed during the visit — immunizations, skin biopsies, EKGs, and other services bill separately when documented. Patients comparing first-visit bills should look at the full itemized statement, not only the E/M line. Understanding 99203 helps you benchmark the visit portion against Medicare rates in your ZIP code.',
    ],
    whenUsed: [
      'First appointment with a new primary care physician for a general health concern, medication transfer, or initial workup of a single uncomplicated problem.',
      'New specialist consultations where the referral is for a focused, relatively straightforward issue — such as a stable rash, mild musculoskeletal complaint, or routine endocrine follow-up from another provider.',
      'Initial psychiatric or behavioral health intake when documentation supports low-complexity decision-making rather than extensive risk assessment or multiple comorbidities.',
      'Any new-patient encounter where problems, data reviewed, and risk do not meet the moderate-complexity threshold for 99204 — the next step up on the new-patient scale.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 99203 are often roughly $110–$130 in many localities for the non-facility setting — somewhat higher than established-patient 99213 because of the new-patient designation.',
      'Hospital-affiliated physician groups may add facility fees when the visit occurs in a hospital outpatient clinic, increasing total patient responsibility beyond the professional fee.',
      'Self-pay new-patient visits at urgent care or concierge practices vary widely — from near Medicare rates with a cash discount to several hundred dollars at hospital-owned sites.',
      'Enter your ZIP in our Fair Price Calculator to see localized Medicare benchmarks and an educational fair range for 99203.',
    ],
    billingIssues: [
      'Billing as a new patient when you have seen the same physician or same-specialty group within three years — established-patient codes (99213, etc.) should apply instead.',
      'Upcoding to 99204 or 99205 when documentation supports only low complexity — compare your visit summary to the billed level.',
      'Bundling confusion when preventive "welcome" or annual wellness elements are billed alongside a problem-oriented new-patient visit on the same day.',
      'Out-of-network new-patient visits at large health systems producing surprise bills higher than in-network primary care alternatives.',
    ],
    whatToDo: [
      'Confirm whether you truly qualify as a new patient under coding rules — if you saw the same group recently, ask whether 99203 is correct.',
      'Compare your professional fee and any facility fee separately; hospital clinic visits often cost more than independent offices for the same code.',
      'Use our calculator with code 99203 and your ZIP to see Medicare-based fair range estimates before paying a self-pay balance.',
      'Ask about new-patient self-pay packages or financial assistance if the chargemaster rate is far above benchmarks.',
    ],
    relatedCodes: [
      { code: '99204', label: 'New patient — moderate complexity' },
      { code: '99213', label: 'Established patient — low complexity' },
      { code: '99214', label: 'Established patient — moderate complexity' },
    ],
    faq: [
      {
        question: 'What makes a patient "new" for CPT 99203?',
        answer:
          'Generally, you are new to that physician or to physicians of the same specialty in the same group if you have not had a face-to-face professional encounter with them in the past three years. Rules are detailed; billing offices can clarify your status.',
      },
      {
        question: 'How much should a new patient visit (99203) cost?',
        answer:
          'Medicare often allows roughly $110–$130 depending on locality. Commercial copays for specialist new visits are often $40–$75 or more. Uninsured patients may face $150–$350+ before discounts.',
      },
      {
        question: 'Is 99203 more expensive than 99213?',
        answer:
          'Usually yes on the Medicare fee schedule because new-patient visits require more comprehensive documentation. The same clinic might bill 99203 for your first visit and 99213 for later follow-ups.',
      },
      {
        question: 'Why was I charged 99203 and other codes on the same day?',
        answer:
          'Procedures or tests performed during the visit — labs, EKG, injections — often bill separately from the visit code when medically necessary and documented.',
      },
      {
        question: 'Can I question a 99203 charge?',
        answer:
          'Yes. Request an itemized bill, verify new-patient status, and compare to Medicare benchmarks. Our tools support price comparison; they are not legal or coding audit services.',
      },
    ],
  },

  '99284': {
    code: '99284',
    title: 'CPT Code 99284 — Emergency Room Visit (High Severity) Cost & Billing Guide',
    metaDescription:
      'CPT 99284 is a high-severity ER visit code. Understand facility vs. physician fees, typical total costs, and how to review your emergency department bill.',
    summary:
      'CPT 99284 describes an emergency department visit with a high level of medical decision-making — common on bills for significant but not life-threatening ER presentations.',
    category: 'Emergency',
    categorySlug: 'emergency',
    whatIs: [
      'CPT 99284 is an emergency department evaluation and management (E/M) code indicating a visit with high severity and high complexity medical decision-making. In plain terms, it represents an ER encounter where the clinician addressed a serious or complicated problem requiring substantial workup — advanced imaging, multiple labs, IV medications, specialist consultation, or careful risk assessment — but the patient\'s condition did not meet the highest acuity level billed as 99285. Emergency E/M codes describe the physician or advanced practice provider\'s cognitive service in the ED, not the hospital facility charge.',
      'ER billing is almost always split: you will typically see a professional fee (the doctor or ED group) and a facility fee (the hospital). Code 99284 may appear on the physician bill, the facility bill, or both depending on how the hospital contracts and bills. Facility fees for high-severity ED visits are often the largest line item patients see. The CPT code level reflects documented acuity, number of diagnostic studies, and risk — not simply how long you waited or whether you were admitted.',
      '99284 sits in the middle-upper range of ED visit codes (99281–99285). Lower codes apply to minor complaints; 99285 applies to the most critical presentations. Because emergency care is seldom shoppable in advance, understanding 99284 helps you interpret an EOB after the fact and compare physician and facility portions to benchmarks. High-deductible patients should note that the E/M level does not predict total cost — imaging and labs added during the same visit often exceed the physician fee.',
    ],
    whenUsed: [
      'Significant abdominal pain, chest pain, or headache workups requiring multiple tests and observation but without admission or maximum-acuity documentation.',
      'Moderate to severe injuries — fractures, lacerations needing repair, or sprains requiring imaging and pain management beyond a minimal visit.',
      'Infections or dehydration treated with IV fluids and medications in the ED with extensive evaluation.',
      'Psychiatric or behavioral emergencies requiring extended ED evaluation and coordination when documentation supports high severity but not the highest level.',
    ],
    typicalCosts: [
      'The physician professional fee for 99284 under Medicare is often roughly $175–$220 in many localities — only a fraction of the total ER bill.',
      'Hospital facility fees for a 99284-level visit commonly reach hundreds to several thousand dollars depending on region, trauma designation, and services rendered.',
      'Total patient responsibility after insurance varies enormously with deductible status, network rules, and whether the ED and physicians are in-network.',
      'Use our tools to benchmark individual line items; a full ER episode includes many codes beyond 99284 alone.',
    ],
    billingIssues: [
      'Facility fee sticker shock — patients focus on 99284 but the hospital facility charge may be many times the physician fee.',
      'Out-of-network emergency physicians or radiologists billing separately from an in-network hospital, creating balance bills.',
      'Upcoding to 99285 or downcoding to 99283 when acuity documentation does not match — request an itemized bill and ED summary.',
      'Duplicate charges for observation hours, critical care, or procedures that should bundle with or replace part of the ED E/M under payer rules.',
    ],
    whatToDo: [
      'Request separate itemized bills for the hospital (facility) and the emergency physician group; compare each to your EOB.',
      'Check whether your plan\'s emergency protections apply — many plans limit patient cost-sharing for true emergency services at out-of-network facilities.',
      'Benchmark the 99284 professional line against Medicare rates for your ZIP; negotiate self-pay facility portions if uninsured.',
      'Ask for a detailed account of all CPT codes on the visit — labs, imaging, and procedures often exceed the E/M line.',
    ],
    relatedCodes: [
      { code: '99285', label: 'ER visit — highest severity' },
      { code: '99283', label: 'ER visit — moderate severity' },
      { code: '70450', label: 'CT head without contrast' },
    ],
    faq: [
      {
        question: 'What does CPT 99284 mean on my ER bill?',
        answer:
          'It indicates a high-severity emergency department visit — substantial evaluation and treatment for a serious problem, documented at the 99284 acuity level rather than minor (99281–99282) or maximum (99285).',
      },
      {
        question: 'How much does a 99284 ER visit cost?',
        answer:
          'The physician fee is often under $250 with Medicare benchmarks, but total ER bills including facility fees, imaging, and labs frequently reach $1,500–$5,000 or more before insurance adjustments.',
      },
      {
        question: 'Why are there two 99284 charges?',
        answer:
          'Hospitals and emergency physician groups bill separately. You may see similar E/M levels on both the facility and professional statements.',
      },
      {
        question: 'Is 99284 always correct for a serious ER visit?',
        answer:
          'Not necessarily. Coding depends on documented medical decision-making and acuity. You can request coding clarification if the level seems inconsistent with your record.',
      },
      {
        question: 'Can I dispute a high ER bill?',
        answer:
          'You can appeal with your insurer, request itemization, apply for hospital financial assistance, or compare charges to benchmarks. Our site helps with price context, not legal representation.',
      },
    ],
  },

  '99285': {
    code: '99285',
    title: 'CPT Code 99285 — Emergency Room Visit (Highest Severity) Cost & Billing Guide',
    metaDescription:
      'CPT 99285 is the highest-severity ER visit code. Learn how facility fees drive total cost, Medicare physician benchmarks, and emergency bill review steps.',
    summary:
      'CPT 99285 represents the highest level emergency department visit — used when documentation supports maximum acuity and complexity, often seen with serious trauma, chest pain protocols, or stroke workups.',
    category: 'Emergency',
    categorySlug: 'emergency',
    whatIs: [
      'CPT 99285 is the top-level emergency department evaluation and management code on the standard five-level ED scale (99281 through 99285). It indicates a visit with the highest severity presenting problems and the highest complexity medical decision-making — for example, life-threatening conditions, extensive differential diagnosis workup, multiple consultants, high-risk treatments, or decision-making about admission versus discharge for a critically ill patient. Like other ED E/M codes, it describes the emergency clinician\'s professional service, not the entire hospital charge.',
      'Patients often assume 99285 means they were "in critical condition," but coding is based on documented decision-making elements — problem severity, data reviewed, and risk — rather than lay perceptions alone. A visit can support 99285 when the workup was extensive and risk was high even if the ultimate diagnosis was benign. Conversely, serious symptoms do not automatically guarantee 99285 if documentation supports a lower level. The code frequently appears alongside many other line items: CT scans, labs, EKGs, IV drugs, and observation time. When reviewing your bill, treat each ancillary study as its own benchmark opportunity.',
      'Uninsured and high-deductible patients facing a 99285 bill should review every line item and explore financial assistance programs. Federal law provides some emergency billing protections, but they do not eliminate all balances. Document the medical reason for the visit, keep all EOBs, and ask whether any charges reflect optional services. Comparing physician 99285 fees to Medicare benchmarks gives you a starting point for self-pay negotiation with professional billing offices.',
    ],
    whenUsed: [
      'Major trauma evaluation, stroke alert workups, acute coronary syndrome protocols, or severe respiratory distress requiring extensive ED management.',
      'Critical presentations such as sepsis evaluation, serious overdose, or unstable arrhythmia with high-risk treatment decisions.',
      'Complex multi-system complaints requiring numerous studies and specialist involvement before disposition.',
      'Any ED encounter where documented acuity and decision-making meet criteria for the highest standard ED E/M level rather than 99284.',
    ],
    typicalCosts: [
      'Medicare physician allowed amounts for 99285 are often roughly $220–$280 in many localities — higher than 99284 but still a modest share of total ER spending.',
      'Facility fees for 99285-level encounters at major hospitals routinely exceed $2,000–$8,000 before adjustments, depending on region and services. Urban trauma centers and teaching hospitals often bill at the upper end of that range.',
      'Ancillary charges — CT, MRI, blood work, cardiac monitoring — can add substantially beyond the E/M lines.',
      'Benchmark individual codes with your ZIP; total responsibility depends on insurance, network status, and deductible.',
    ],
    billingIssues: [
      'Misunderstanding 99285 as the full bill amount when facility and ancillary charges dwarf the physician E/M fee.',
      'Balance billing from out-of-network ED physicians, anesthesiologists, or radiologists at in-network hospitals.',
      'Observation or critical care codes billed in addition to 99285 when payer bundling rules may apply — worth asking for a coded itemization.',
      'Self-pay patients charged full chargemaster rates without automatic charity screening.',
    ],
    whatToDo: [
      'Obtain complete itemized bills from hospital and all professional groups; match each line to your EOB.',
      'If uninsured, immediately ask for financial assistance, Medicaid screening, and prompt-pay discounts — do not assume the first bill is final.',
      'Compare 99285 physician fees to Medicare benchmarks; challenge unclear duplicate E/M or observation charges through the billing office.',
      'Document emergency circumstances for insurance appeals if out-of-network cost-sharing seems excessive under federal or state surprise-billing rules.',
    ],
    relatedCodes: [
      { code: '99284', label: 'ER visit — high severity' },
      { code: '99291', label: 'Critical care — first hour' },
      { code: '70450', label: 'CT head without contrast' },
    ],
    faq: [
      {
        question: 'What does CPT 99285 mean?',
        answer:
          'It is the highest standard emergency department visit code — indicating maximum documented severity and complexity of medical decision-making for that ED encounter.',
      },
      {
        question: 'How much does a 99285 ER visit cost out of pocket?',
        answer:
          'Highly variable. Physician fees often fall under $300 with Medicare reference rates, but total ER bills with facility and ancillary charges can exceed $10,000 before insurance; your deductible and coinsurance determine what you owe.',
      },
      {
        question: 'Does 99285 mean I was admitted to the hospital?',
        answer:
          'No. Many 99285 visits end in discharge. The code reflects ED evaluation intensity, not inpatient status. Admission would involve additional inpatient E/M or observation codes.',
      },
      {
        question: 'Can 99285 be billed with critical care codes?',
        answer:
          'Critical care (99291/99292) has specific time and clinical criteria. Payers have bundling rules; duplicate payment for the same time period is often not allowed. Ask for coding explanation if both appear.',
      },
      {
        question: 'What should I do if I cannot afford a 99285 bill?',
        answer:
          'Contact hospital financial counseling, ask about charity care and payment plans, and verify insurance processed the claim correctly. Compare charges to benchmarks to support negotiation.',
      },
    ],
  },

  '70450': {
    code: '70450',
    title: 'CPT Code 70450 — CT Head Without Contrast Cost & Billing Guide',
    metaDescription:
      'CPT 70450 is a CT scan of the head without contrast. See typical Medicare imaging rates, ER vs. outpatient pricing differences, and head CT bill review tips.',
    summary:
      'CPT 70450 bills for a computed tomography scan of the head or brain without contrast material — a common emergency and outpatient imaging study for headache, trauma, and neurological symptoms.',
    category: 'Imaging',
    categorySlug: 'imaging',
    whatIs: [
      'CPT 70450 describes a computed tomography (CT) examination of the head, including the brain and surrounding structures, performed without intravenous contrast. CT uses X-rays and computer reconstruction to produce cross-sectional images. It is faster than MRI and widely available in emergency departments, hospitals, and outpatient imaging centers. The code typically covers the technical component (scanner operation and image acquisition) and, depending on billing arrangement, may be reported globally with professional interpretation or split between facility and radiologist.',
      'Contrast-enhanced head CT uses different codes (such as 70460). CT angiography of the head has separate codes as well. Patients should match the billed code to the radiology report — "without contrast" versus "with contrast" affects both coding and patient preparation. 70450 is among the most common imaging studies ordered in the ED for head injury, sudden severe headache, stroke evaluation, and altered mental status when CT is clinically appropriate. After you receive the bill, compare the imaging site on the claim to where you actually had the scan — billing location errors occasionally occur.',
      'Imaging costs vary more by site of service than by the CPT code alone. The same 70450 performed in a freestanding imaging center, hospital outpatient department, or emergency room can produce dramatically different patient balances because of facility fee structures. Medicare pays technical and professional components under the physician fee schedule and hospital outpatient rules respectively; commercial and self-pay rates follow different contracts. When your clinician orders a non-emergency head CT, asking where the order can be fulfilled may save hundreds or thousands of dollars without changing the clinical study.',
    ],
    whenUsed: [
      'Head trauma evaluation in the ED or urgent care when clinical guidelines support CT imaging.',
      'Sudden severe headache, suspected stroke or intracranial hemorrhage workup when CT is the initial study.',
      'New neurological deficits, syncope with high-risk features, or altered mental status per clinician judgment.',
      'Stroke alert or trauma activation pathways in the ED when non-contrast head CT is the initial neuroimaging study — timing is clinical, but site-of-service still affects what you owe.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 70450 in independent imaging settings are often roughly $80–$130 combined technical and professional in many localities.',
      'Hospital outpatient and especially emergency department charges for the same CPT code can reach $500–$3,000 or more before insurance adjustments.',
      'Cash-pay pricing at standalone centers is often $200–$500; always ask for a written estimate when scheduling non-emergency scans.',
      'Use our ZIP-based calculator for Medicare anchors; compare facility vs. professional portions on itemized bills.',
    ],
    billingIssues: [
      'High facility fees when 70450 is performed in a hospital ED rather than a scheduled outpatient center.',
      'Billing contrast codes when the report documents non-contrast study only.',
      'Out-of-network radiology interpretation charge from groups contracted separately from the hospital — a frequent source of balance bills on otherwise in-network ED visits.',
      'Duplicate CT billing on the same date without documented medical necessity for repeat imaging.',
    ],
    whatToDo: [
      'For non-emergency needs, ask whether your order can be done at an independent imaging center with published cash prices — many centers list head CT self-pay rates online for comparison.',
      'Request the radiology report and confirm "without contrast" matches 70450.',
      'Compare total charges to Medicare fair ranges; separate hospital facility from radiologist professional fees.',
      'If uninsured, negotiate before paying chargemaster rates — many imaging centers offer substantial self-pay discounts and payment plans for scheduled head CT.',
    ],
    relatedCodes: [
      { code: '70460', label: 'CT head with contrast' },
      { code: '70551', label: 'MRI brain without contrast' },
      { code: '99284', label: 'ER visit — high severity' },
    ],
    faq: [
      {
        question: 'What is CPT 70450?',
        answer:
          'It is a CT scan of the head/brain without contrast dye — a standard imaging study for many neurological and trauma evaluations.',
      },
      {
        question: 'How much should a head CT cost?',
        answer:
          'Medicare benchmarks are often under $150 in office-based settings. Hospital and ER bills frequently run several hundred to a few thousand dollars including facility fees. Always separate the 70450 technical/professional lines from ED facility surcharges when comparing.',
      },
      {
        question: 'Why was my ER head CT so expensive?',
        answer:
          'Emergency department facility charges and trauma surcharges inflate totals. The CPT code may be the same as at an imaging center; the billing entity differs.',
      },
      {
        question: 'Is 70450 the same as a brain MRI?',
        answer:
          'No. CT (70450) and MRI (different codes) are distinct modalities with different CPT codes, costs, and clinical uses.',
      },
      {
        question: 'Can I shop for a cheaper head CT?',
        answer:
          'Often yes for non-emergency cases with a physician order. Compare in-network and cash prices at standalone imaging centers.',
      },
    ],
  },

  '72148': {
    code: '72148',
    title: 'CPT Code 72148 — MRI Lumbar Spine Without Contrast Cost & Billing Guide',
    metaDescription:
      'CPT 72148 is an MRI of the lumbar spine without contrast. Learn Medicare imaging benchmarks, hospital facility fee traps, and how to review your MRI bill.',
    summary:
      'CPT 72148 describes magnetic resonance imaging of the lumbar spine without contrast — frequently ordered for back pain, radiculopathy, and disc disease evaluation when conservative care has not resolved symptoms or when surgery is being planned.',
    category: 'Imaging',
    categorySlug: 'imaging',
    whatIs: [
      'CPT 72148 covers magnetic resonance imaging (MRI) of the lumbar spine without intravenous contrast. MRI uses magnetic fields and radio waves rather than ionizing radiation to produce detailed images of discs, nerves, spinal canal, and surrounding soft tissues. It is a standard study when clinicians need more detail than X-ray for lower back pain with neurological symptoms, suspected disc herniation, spinal stenosis, infection suspicion, or pre-surgical planning. The code reflects a non-contrast protocol; contrast-enhanced lumbar MRI uses different CPT codes.',
      'MRI billing often splits into technical component (equipment, technologist, facility) and professional component (radiologist interpretation). Hospital outpatient departments, ambulatory surgery centers with MRI suites, and freestanding imaging centers all bill 72148 but with different charge structures. Prior authorization from commercial insurers is common for lumbar MRI, which affects whether the claim is paid but not the underlying CPT definition.',
      'Lumbar MRI is one of the more expensive outpatient imaging studies patients encounter. Understanding 72148 helps you compare scheduled outpatient pricing to hospital rates and interpret itemized bills that may list facility, professional, and add-on charges separately. Many insurers require step therapy — trying conservative treatment first — before authorizing elective lumbar MRI, which affects timing but not the meaning of the code on your eventual bill. Open MRI and closed MRI may bill the same 72148 when the protocol matches.',
    ],
    whenUsed: [
      'Persistent or severe low back pain with leg symptoms suggesting radiculopathy when imaging is clinically indicated.',
      'Suspected disc herniation, spinal stenosis, or cauda equina evaluation per physician judgment.',
      'Pre-operative planning for spine surgery or post-operative assessment when MRI is appropriate.',
      'Workers compensation and personal injury cases where lumbar MRI is ordered after conservative treatment fails — billing entity may differ from standard outpatient imaging.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 72148 are often roughly $300–$450 in many localities depending on global vs. split billing and site of service. Independent imaging centers frequently publish cash rates online for comparison shopping before authorization is complete.',
      'Hospital outpatient MRI charges commonly exceed $1,500–$4,000 chargemaster before discounts; standalone centers often charge less for cash pay.',
      'Commercial allowed amounts vary; patients with high deductibles may owe most of the negotiated rate.',
      'Enter your ZIP in our Fair Price Calculator for localized Medicare-based benchmarks.',
    ],
    billingIssues: [
      'Facility fee premiums at hospital-owned MRI suites versus independent imaging centers for identical 72148 studies.',
      'Billing with contrast codes when non-contrast protocol was performed — verify the radiology report.',
      'Multiple spine segments or additional sequences billed as separate codes when bundling rules may apply.',
      'Out-of-network radiology groups interpreting in-network hospital MRIs — verify both the imaging site and the reading group are in-network before your appointment when you have a choice.',
    ],
    whatToDo: [
      'For elective back pain imaging, compare cash and in-network prices at freestanding MRI centers before scheduling at a hospital — the 72148 code is identical, but the total charge often is not.',
      'Confirm prior authorization if required by your plan to avoid coverage denials — a denied 72148 claim can still leave you with a bill if the scan was already performed.',
      'Request itemized technical and professional charges; benchmark 72148 against Medicare in your ZIP.',
      'Uninsured patients should ask for written self-pay quotes — hospital and independent center prices often differ by thousands.',
    ],
    relatedCodes: [
      { code: '72141', label: 'MRI cervical spine without contrast' },
      { code: '72158', label: 'MRI lumbar spine with contrast' },
      { code: '97110', label: 'Therapeutic exercises (PT)' },
    ],
    faq: [
      {
        question: 'What does CPT 72148 cover?',
        answer:
          'An MRI of the lower (lumbar) spine without contrast dye — detailed imaging of discs, nerves, and spinal structures.',
      },
      {
        question: 'How much does a lumbar MRI cost?',
        answer:
          'Medicare benchmarks are often $300–$500 in many areas. Hospital bills can exceed $2,000–$4,000 before insurance; cash imaging centers may offer $400–$800. Prior authorization delays do not change the CPT code on the final claim.',
      },
      {
        question: 'Do I need prior authorization for 72148?',
        answer:
          'Many commercial plans require it for non-emergency lumbar MRI. Medicare generally does not use prior auth the same way but has coverage rules. Check with your insurer.',
      },
      {
        question: 'Why is hospital MRI more expensive than an imaging center?',
        answer:
          'Facility fee schedules, overhead, and contract differences — not a different CPT code — usually explain the gap.',
      },
      {
        question: 'Will MRI results change my back pain treatment?',
        answer:
          'Clinical decisions depend on symptoms and exam, not imaging alone. Billing questions are separate from medical necessity discussions with your clinician.',
      },
    ],
  },

  '85025': {
    code: '85025',
    title: 'CPT Code 85025 — Complete Blood Count (CBC) Cost & Billing Guide',
    metaDescription:
      'CPT 85025 is a complete blood count with automated differential. See typical lab costs, common billing pairs like 36415, and how to check fair prices.',
    summary:
      'CPT 85025 bills for a complete blood count (CBC) with automated white blood cell differential — one of the most common laboratory tests in primary care, ER, and hospital settings.',
    category: 'Laboratory',
    categorySlug: 'laboratory',
    whatIs: [
      'CPT 85025 represents a complete blood count (CBC) with an automated differential. The CBC measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. The differential classifies white blood cell types (neutrophils, lymphocytes, etc.). Laboratories report this as a single panel code when performed together on an automated analyzer. It is distinct from 85027 (CBC without differential) and from manual differential codes when a technologist performs a manual slide review separately. Results are usually available within hours at hospital labs and reference laboratories.',
      'Blood is collected via venipuncture — often billed separately as 36415 — then analyzed in a clinical laboratory. The lab may be hospital-based, physician-office, or a reference lab such as Quest or Labcorp. 85025 appears on routine physical labs, infection workups, anemia evaluation, medication monitoring, and pre-operative testing. Medicare and commercial payers generally cover medically necessary CBC testing subject to plan rules.',
      'Although individual test components sound basic, hospital lab chargemaster rates can mark up 85025 dramatically compared to Medicare clinical lab fee schedule amounts. Patients reviewing bills should confirm the test matches the lab report and watch for duplicate panels on the same date. A single blood draw may generate 85025 plus 36415 plus other panels — always evaluate the full lab portion of the claim, not one line in isolation. Reference lab names on your EOB may differ from where you physically had blood drawn. Quest, Labcorp, and hospital labs all use the same 85025 code when performing the panel.',
    ],
    whenUsed: [
      'Routine health screening and annual physical labs when clinically ordered.',
      'Fever, infection suspicion, fatigue, or bruising workups in primary care or emergency settings.',
      'Monitoring chemotherapy, immunosuppressive drugs, or conditions affecting blood counts.',
      'Pre-operative and hospital admission laboratory panels that include a CBC with differential — often bundled on the same requisition as metabolic panels or type-and-screen for surgery.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 85025 are often roughly $10–$15 in many localities under the clinical laboratory fee schedule.',
      'Hospital lab charges may list $75–$200 or more for the same test when part of an ED or inpatient encounter.',
      'Direct-to-consumer and cash lab channels often charge $15–$35 for a CBC with differential — a practical benchmark for uninsured patients comparing hospital outpatient lab quotes.',
      'Pair 85025 with ZIP lookup in our calculator; add 36415 if venipuncture billed separately.',
    ],
    billingIssues: [
      'Unbundling — billing individual CBC components in addition to 85025 for the same automated panel.',
      'Duplicate 85025 on the same date from ED and reference lab without distinct medical necessity.',
      'Out-of-network hospital lab pricing during inpatient or emergency stays.',
      'Charging hospital facility fees on top of lab line items for outpatient draws sent to a reference lab — the 85025 assay may process off-site even when blood was drawn at a hospital clinic.',
    ],
    whatToDo: [
      'Match 85025 on your bill to the lab report titled CBC with differential.',
      'For routine labs, compare hospital pricing to standalone lab cash prices when timing allows — the same 85025 assay is often processed on identical equipment at a fraction of hospital list prices.',
      'Check whether blood was drawn in-network but sent to an out-of-network reference laboratory.',
      'Use Medicare benchmarks to identify outlier charges before paying self-pay balances in full — hospital lab 85025 lines are a common place to start negotiation.',
    ],
    relatedCodes: [
      { code: '85027', label: 'CBC without differential' },
      { code: '36415', label: 'Venipuncture (blood draw)' },
      { code: '80053', label: 'Comprehensive metabolic panel' },
    ],
    faq: [
      {
        question: 'What is included in CPT 85025?',
        answer:
          'A complete blood count plus automated white blood cell differential — red cell indices, platelets, and WBC subtypes reported together. Your lab report should list each component even though billing uses one panel code.',
      },
      {
        question: 'How much should a CBC with differential cost?',
        answer:
          'Medicare often allows under $15. Retail labs may charge $20–$40. Hospital-associated bills can be much higher, especially when the draw occurred in an emergency department and the sample was processed by a hospital lab.',
      },
      {
        question: 'Why was I billed 85025 and 36415?',
        answer:
          '85025 is the lab test; 36415 is the blood draw procedure. Both commonly appear on the same claim when separately payable. Evaluate the combined total against benchmarks, not either line alone.',
      },
      {
        question: '85025 vs. 85027 — what is the difference?',
        answer:
          '85025 includes the automated differential; 85027 is CBC without differential. The ordered test should match your symptoms and clinician request.',
      },
      {
        question: 'Can I get a CBC cheaper without a doctor visit?',
        answer:
          'Some states allow direct-access lab testing; policies vary. You still need appropriate medical follow-up for abnormal results. Compare published cash prices before using a hospital outpatient lab for convenience.',
      },
    ],
  },

  '84443': {
    code: '84443',
    title: 'CPT Code 84443 — TSH Thyroid Test Cost & Billing Guide',
    metaDescription:
      'CPT 84443 is a thyroid-stimulating hormone (TSH) blood test. Learn typical Medicare lab rates, billing with thyroid panels, and how to check your charge.',
    summary:
      'CPT 84443 bills for a thyroid-stimulating hormone (TSH) assay — a standard blood test used to screen for and monitor thyroid over- and under-activity.',
    category: 'Laboratory',
    categorySlug: 'laboratory',
    whatIs: [
      'CPT 84443 describes a laboratory assay for thyroid-stimulating hormone (TSH). TSH is produced by the pituitary gland and regulates thyroid hormone production. Measuring TSH is the most common initial test for suspected hypothyroidism or hyperthyroidism and is used to monitor patients on levothyroxine or other thyroid treatments. The code covers the immunoassay performed on a blood sample — typically collected via venipuncture billed separately as 36415. Abnormal results often prompt additional thyroid tests billed under separate CPT codes.',
      'TSH is often ordered alone as a screening test or alongside free T4 (84439) and other thyroid markers when fuller evaluation is needed. It may appear on the same bill as comprehensive metabolic panels or CBC codes from the same draw. Medicare and most insurers cover medically necessary thyroid testing, though frequency limits may apply for repeat screening. Reference labs and hospital labs use the same CPT code when performing the assay. Home collection kits marketed to consumers may route to the same 84443 billing when processed by a certified lab.',
      'Despite being a single-analyte test, TSH charges on hospital bills can far exceed Medicare clinical lab fee schedule amounts. Patients comparing fair prices should look at the performing laboratory entity and whether the draw occurred in a high-cost facility setting. Thyroid monitoring often repeats 84443 at regular intervals; tracking allowed amounts over time helps you notice if a new lab contract or facility change increased your out-of-pocket cost. Morning vs. afternoon draws do not change the CPT code. Many patients on levothyroxine have 84443 drawn one to two times per year. Compare hospital vs. retail lab pricing before establishing a long-term monitoring routine. Our fair price tool accepts 84443 with your ZIP code.',
    ],
    whenUsed: [
      'Screening for thyroid dysfunction when symptoms, exam, or family history warrant testing.',
      'Monitoring hypothyroidism or hyperthyroidism treatment — dose adjustments often follow TSH trends.',
      'Annual follow-up for patients on long-term levothyroxine replacement therapy.',
      'Infertility, depression, fatigue, or postpartum follow-up workups when thyroid disease is in the differential and the clinician orders TSH as an initial or monitoring test.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 84443 are often roughly $20–$30 in many localities.',
      'Hospital lab line items may charge $100–$250 for the same assay when embedded in ED or outpatient facility claims.',
      'Cash lab pricing for TSH alone is often $25–$50 at direct-access laboratories, sometimes bundled with free or low-cost venipuncture at retail lab locations.',
      'Benchmark 84443 with your ZIP in our Fair Price Calculator alongside related thyroid codes if billed together.',
    ],
    billingIssues: [
      'Billing TSH with redundant thyroid panel component codes when a bundled panel code might apply.',
      'Duplicate TSH draws on the same date without clinical justification.',
      'Out-of-network reference lab processing for in-network blood draws.',
      'Preventive vs. diagnostic labeling affecting cost-sharing when TSH is ordered during an annual physical that also addresses symptoms — clarify with your clinician how the visit is documented.',
    ],
    whatToDo: [
      'Confirm the lab report shows TSH and matches 84443 on the itemized bill.',
      'If paying cash for routine monitoring, compare hospital lab vs. standalone lab pricing — standing orders for levothyroxine monitoring can mean repeated 84443 charges several times per year.',
      'Check EOB for medical necessity denials on repeated screening — appeal with clinician support if appropriate.',
      'Compare your charge to Medicare benchmarks before paying inflated self-pay balances — repeating 84443 for thyroid monitoring makes fair pricing especially important over time.',
    ],
    relatedCodes: [
      { code: '84439', label: 'Free thyroxine (T4)' },
      { code: '36415', label: 'Venipuncture (blood draw)' },
      { code: '80053', label: 'Comprehensive metabolic panel' },
    ],
    faq: [
      {
        question: 'What does CPT 84443 measure?',
        answer:
          'Thyroid-stimulating hormone (TSH) in your blood — a key screen for overactive or underactive thyroid function. Results are interpreted relative to your symptoms and whether you take thyroid medication.',
      },
      {
        question: 'How much should a TSH test cost?',
        answer:
          'Medicare often allows $20–$30. Cash labs may charge $25–$50. Hospital bills can be several times higher. If 84443 repeats every few months for monitoring, small per-test overcharges add up over a year.',
      },
      {
        question: 'Do I need to fast for a TSH blood test?',
        answer:
          'Usually no fasting requirement for TSH alone — follow your clinician\'s or lab\'s instructions for your specific orders.',
      },
      {
        question: 'Why was TSH billed with other lab codes?',
        answer:
          'Same blood draw often runs multiple tests — CBC, CMP, or free T4 each have separate CPT codes when performed.',
      },
      {
        question: 'How often will insurance pay for 84443?',
        answer:
          'Coverage depends on medical necessity and plan rules. Monitoring on thyroid medication is commonly covered; screening frequency may be limited. Keep EOBs when 84443 repeats to spot policy changes.',
      },
    ],
  },

  '36415': {
    code: '36415',
    title: 'CPT Code 36415 — Blood Draw (Venipuncture) Cost & Billing Guide',
    metaDescription:
      'CPT 36415 is routine venipuncture for blood collection. See how draw fees pair with lab panels, typical Medicare rates, and phlebotomy billing review tips.',
    summary:
      'CPT 36415 describes routine collection of venous blood by venipuncture — the standard "blood draw" fee you often see alongside lab test codes like 85025 or 80053.',
    category: 'Laboratory',
    categorySlug: 'laboratory',
    whatIs: [
      'CPT 36415 covers routine venipuncture for the collection of one or more blood specimens from a peripheral vein. It represents the phlebotomist or clinician\'s service in inserting the needle, drawing blood into tubes, and handling initial specimen steps — not the laboratory analysis of the blood. When you see 85025 (CBC), 80053 (CMP), or 84443 (TSH) on a bill, 36415 often appears as a separate line for the draw itself. Capillary finger-stick collection uses a different code (36416). Fasting labs use the same venipuncture code when drawn from an arm vein.',
      'Whether 36415 is paid separately from panel codes depends on payer bundling rules and setting. Medicare often allows 36415 in addition to lab tests when drawn in a physician office or certain outpatient settings; hospital inpatient and some bundled encounters may package the draw differently. Patients frequently question a "small" blood draw carrying a sizable charge — the fee reflects a discrete procedural service in coding systems, not the complexity of the lab tests that follow. A skilled phlebotomist may complete the draw in minutes while multiple tests run on the same tubes.',
      'Blood drawn in an emergency department, hospital outpatient lab, or physician office may carry different charge amounts for the same 36415 code. Comparing draw fees across settings helps uninsured patients schedule labs at lower-cost sites when clinically appropriate. Some employer wellness programs include phlebotomy in a bundle; hospital systems may not — always ask whether 36415 will appear before your appointment. Pediatric draws may use different coding in some settings. Standing lab orders for chronic disease may repeat 36415 on each visit date. The draw fee is the same code whether one or five tubes are filled.',
    ],
    whenUsed: [
      'Any venous blood collection for laboratory testing — routine panels, single tests, or therapeutic drug monitoring.',
      'Hospital, ED, urgent care, and primary care draws sent to on-site or reference laboratories.',
      'Pre-operative and admission labs requiring standard venipuncture rather than existing line draws.',
      'Paired with one or multiple lab CPT codes from the same encounter when documentation supports separate billing.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 36415 are often roughly $3–$8 in many localities — modest compared to many lab tests.',
      'Hospital and ED chargemasters may list $15–$50 or more for venipuncture when part of facility claims.',
      'Some cash lab promotions include the draw in a bundled panel price; others itemize 36415 separately — ask for a written quote listing each CPT code before your appointment.',
      'Evaluate 36415 alongside panel codes in our calculator using your ZIP for full picture.',
    ],
    billingIssues: [
      'Duplicate venipuncture charges on the same date for a single draw event.',
      'Billing 36415 when blood was obtained from an existing central line using a different collection code.',
      'Facility fees inflating the patient perception of a "needle stick" cost in ED settings — the draw may be a small line item but triggers higher facility tier charges on the same claim.',
      'Capillary stick (36416) documented but venipuncture (36415) billed.',
    ],
    whatToDo: [
      'Confirm one draw event per date — multiple 36415 lines may warrant a billing question.',
      'Ask whether cash lab packages include phlebotomy or bill 36415 separately.',
      'Compare draw plus panel total to Medicare benchmarks, not just the panel alone — 36415 is easy to overlook because the dollar amount is small.',
      'For routine labs, using a standalone lab may reduce both draw and test charges versus hospital outpatient labs — ask whether your clinician can send orders to a reference lab you choose.',
    ],
    relatedCodes: [
      { code: '85025', label: 'CBC with differential' },
      { code: '80053', label: 'Comprehensive metabolic panel' },
      { code: '36416', label: 'Capillary blood collection' },
    ],
    faq: [
      {
        question: 'What is CPT 36415?',
        answer:
          'Routine venous blood draw by needle — the standard phlebotomy service coded when blood is sent for lab tests. One draw can support multiple test codes from the same tubes.',
      },
      {
        question: 'Why am I charged for a blood draw and the lab test?',
        answer:
          'Coding treats collection (36415) and analysis (e.g., 85025) as separate services. Payers may bundle them in some settings but often allow both.',
      },
      {
        question: 'How much should a blood draw cost?',
        answer:
          'Medicare often allows under $10. Hospital bills may list higher amounts, especially in ED contexts.',
      },
      {
        question: 'Is 36415 included in my annual physical?',
        answer:
          'The visit may be preventive, but lab draw and tests are often billed separately under diagnostic benefits depending on what was ordered and findings.',
      },
      {
        question: 'Can I refuse to pay a high venipuncture fee?',
        answer:
          'You can request itemization, compare to benchmarks, and negotiate self-pay amounts. Services already rendered create billing obligations; contact the office early if the draw fee seems out of line.',
      },
    ],
  },

  '77067': {
    code: '77067',
    title: 'CPT Code 77067 — Screening Mammogram Cost & Billing Guide',
    metaDescription:
      'CPT 77067 is screening mammography bilateral. Learn ACA preventive coverage rules, typical cash prices, facility fees, and how to read your mammogram bill.',
    summary:
      'CPT 77067 is the standard code for bilateral screening mammography — the preventive breast cancer screening test millions of women receive annually, often with specific insurance cost-sharing rules.',
    category: 'Imaging',
    categorySlug: 'imaging',
    whatIs: [
      'CPT 77067 describes screening mammography, including computer-aided detection (CAD) when performed, bilateral (both breasts). This is the code used for routine preventive mammograms in asymptomatic women — not diagnostic mammography for patients with symptoms, abnormal prior results, or known cancer follow-up, which uses different codes such as 77065 or 77066. Screening mammography is a low-dose X-ray examination designed to detect breast cancer early. 77067 replaced older G-code screening descriptors in Medicare billing and is the code patients most often search when questioning a "free" preventive mammogram bill that still lists charges.',
      'Under the Affordable Care Act, non-grandfathered health plans must cover recommended preventive services — including screening mammography for eligible women — without patient cost-sharing when network and coding criteria are met. That means no copay, deductible, or coinsurance for qualifying screening 77067 when performed in-network and billed correctly. However, patients still receive EOBs showing charges. Problems arise when a screening mammogram is reclassified as diagnostic, when facility fees from hospital systems attach unexpectedly, or when 3-D tomosynthesis (often 77063 add-on) is billed with separate cost-sharing.',
      '77067 is a high-visibility billing code because millions of women receive mammograms yearly and many encounter surprise bills — technical vs. professional split, out-of-network radiology, or bundled vs. unbundled 3-D imaging. Knowing the code helps you verify preventive coverage, compare cash prices ($100–$250 at many centers), and dispute incorrect diagnostic coding. If your EOB shows cost-sharing for a routine screening visit, escalate with both the imaging center and insurer promptly. Keep your appointment confirmation showing "screening" if you need it for appeals.',
    ],
    whenUsed: [
      'Routine breast cancer screening in asymptomatic women per USPSTF and clinician guidance — typically starting at age 40 or 50 depending on guidelines and risk.',
      'Annual or biennial preventive mammography for average-risk women without new breast symptoms or abnormal findings requiring diagnostic workup.',
      'Medicare screening mammography for eligible beneficiaries when criteria for screening vs. diagnostic are met — including annual screening benefits that differ from diagnostic mammography cost-sharing rules.',
      'Workplace or community screening events using standard bilateral screening mammography protocols.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 77067 are often roughly $120–$180 in many localities for global or combined technical/professional payment.',
      'In-network preventive screening under ACA-compliant plans should be $0 patient cost-sharing when billed as 77067 screening without diagnostic conversion.',
      'Cash self-pay screening mammograms at independent centers often run $100–$250; hospital outpatient departments may charge more.',
      'Add-on 3-D tomosynthesis (77063) may carry separate cost-sharing — ask before the appointment.',
    ],
    billingIssues: [
      'Diagnostic upcoding — billing 77065/77066 instead of 77067 when the visit was scheduled as routine screening, triggering deductible and copay.',
      'Surprise bills from out-of-network radiologists reading mammograms at in-network facilities.',
      'Facility fees at hospital-owned imaging centers when a standalone mammography suite would have been in-network preventive.',
      'Separate professional component charges patients assumed were "completely covered" preventive services.',
    ],
    whatToDo: [
      'Schedule screening mammograms in-network and confirm the order says "screening" not "diagnostic" unless you have symptoms or prior abnormalities.',
      'Ask whether 3-D tomosynthesis is included or billed separately (77063) and whether your plan covers it preventively.',
      'If billed diagnostically for a routine screening visit, ask the facility and insurer to rebill under screening benefits with supporting documentation.',
      'Compare cash prices if uninsured — many centers publish screening mammogram self-pay rates far below hospital chargemasters.',
    ],
    relatedCodes: [
      { code: '77063', label: 'Screening mammography — 3-D tomosynthesis add-on' },
      { code: '77066', label: 'Diagnostic mammography — bilateral' },
      { code: '76641', label: 'Breast ultrasound' },
    ],
    faq: [
      {
        question: 'Is CPT 77067 a screening or diagnostic mammogram?',
        answer:
          '77067 is screening mammography bilateral for preventive use in asymptomatic patients. Diagnostic studies for symptoms, lumps, or abnormal prior results use different codes such as 77066.',
      },
      {
        question: 'Should my screening mammogram be free?',
        answer:
          'ACA-compliant in-network preventive coverage should charge you $0 for qualifying 77067 screening. Diagnostic coding, out-of-network readers, facility fees, or 3-D add-ons may still produce patient responsibility.',
      },
      {
        question: 'Why did I get a bill after a "free" mammogram?',
        answer:
          'Common reasons: diagnostic rebilling, out-of-network reader, 3-D add-on cost-sharing, or deductible applied due to wrong code category. Request itemization, your order type, and appeal with your insurer if screening criteria were met.',
      },
      {
        question: 'How much does a screening mammogram cost without insurance?',
        answer:
          'Cash screening prices are often $100–$250 at dedicated mammography centers; hospitals may charge more. Medicare benchmarks help compare fairness.',
      },
      {
        question: 'What is the difference between 77067 and 77063?',
        answer:
          '77067 is the base bilateral screening mammogram. 77063 is an add-on for digital breast tomosynthesis (3-D) when performed with screening mammography — may bill separately.',
      },
    ],
  },

  '76700': {
    code: '76700',
    title: 'CPT Code 76700 — Abdominal Ultrasound Complete Cost & Billing Guide',
    metaDescription:
      'CPT 76700 is a complete abdominal ultrasound. See typical Medicare imaging rates, ER vs. outpatient pricing, and steps to review your ultrasound bill.',
    summary:
      'CPT 76700 bills for a complete ultrasound examination of the abdomen — commonly ordered for abdominal pain, liver and gallbladder evaluation, and kidney assessment.',
    category: 'Imaging',
    categorySlug: 'imaging',
    whatIs: [
      'CPT 76700 describes a complete abdominal ultrasound examination. Ultrasound uses sound waves to image organs in the abdomen — typically including the liver, gallbladder, bile ducts, pancreas, kidneys, spleen, and inferior vena cava when clinically indicated. "Complete" indicates a full survey rather than a limited or single-organ study (which uses codes such as 76705 for limited abdominal ultrasound). The performing sonographer acquires images; a physician or radiologist interprets them. Billing may be global or split between technical and professional components. No radiation is used, which makes ultrasound attractive for many first-line evaluations.',
      'Abdominal ultrasound is often the first-line imaging for suspected gallstones, liver abnormalities, hydronephrosis, or ascites because it avoids radiation and is widely available. It appears in emergency departments, hospitals, and outpatient imaging centers. Doppler studies of abdominal vessels may involve additional codes when documented. Patients comparing costs should note whether the study was done on an inpatient, ED, or scheduled outpatient basis — site of service strongly affects charges. Physician offices with in-house ultrasound may bill global fees differently than hospital radiology departments.',
      'Complete abdominal ultrasound is less expensive than CT or MRI for many indications but hospital facility fees can still produce surprisingly high patient balances for 76700 alone. Medicare outpatient imaging rates provide a useful anchor for fair price discussions. When abdominal pain is not emergent, scheduling ultrasound outpatient rather than through the ED often reduces both wait-related stress and total charges. Doppler add-ons for vessels use separate codes when billed. Same-day ED ultrasound with other imaging should be itemized clearly on your statement. Pregnancy-related indications follow the same 76700 coding when a complete abdominal survey is performed. Use our ZIP lookup to benchmark 76700 fairly in your area.',
    ],
    whenUsed: [
      'Right upper quadrant or epigastric pain suggesting gallstones, cholecystitis, or liver pathology.',
      'Abnormal liver enzymes follow-up, suspected fatty liver, or focal liver lesion initial characterization.',
      'Kidney stone or hydronephrosis evaluation when ultrasound is the appropriate first study.',
      'Pregnancy-related abdominal pain or appendicitis rule-out when ultrasound is the first imaging choice before CT — still billed as 76700 when a complete abdominal survey is performed.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for 76700 are often roughly $100–$180 in many outpatient localities.',
      'Hospital ED and outpatient department charges may reach $400–$1,500 or more before insurance for the same CPT code.',
      'Independent imaging and physician-office ultrasound may offer lower cash prices — often $150–$350 for complete abdominal studies when scheduled outside the hospital system.',
      'Use ZIP-based Medicare benchmarks in our Fair Price Calculator to evaluate your itemized charge.',
    ],
    billingIssues: [
      'Billing limited abdominal code (76705) vs. complete (76700) inconsistently with documented images.',
      'ED facility fees dominating the bill for ultrasound that could have been outpatient-scheduled in non-urgent cases.',
      'Separate radiology interpretation from out-of-network groups.',
      'Duplicate ultrasound billing same day with other abdominal imaging without distinct indication — compare timestamps and reports if CT and ultrasound appear together.',
    ],
    whatToDo: [
      'For non-emergency abdominal pain already under evaluation, ask if ultrasound can be scheduled outpatient rather than in the ED.',
      'Request the ultrasound report and confirm "complete" study supports 76700.',
      'Compare technical and professional fees to Medicare fair ranges separately.',
      'Uninsured patients should get cash quotes from non-hospital imaging centers when timing allows — many publish complete abdominal ultrasound prices lower than hospital outpatient departments.',
    ],
    relatedCodes: [
      { code: '76705', label: 'Abdominal ultrasound — limited' },
      { code: '74176', label: 'CT abdomen and pelvis without contrast' },
      { code: '99284', label: 'ER visit — high severity' },
    ],
    faq: [
      {
        question: 'What organs does CPT 76700 cover?',
        answer:
          'A complete abdominal ultrasound surveys major abdominal organs — typically liver, gallbladder, pancreas, kidneys, spleen, and related structures as documented in the radiology report.',
      },
      {
        question: 'How much should an abdominal ultrasound cost?',
        answer:
          'Medicare benchmarks often fall under $200 outpatient. Hospital ED bills can be several times higher due to facility charges. A scheduled 76700 at an imaging center is often the most economical option for non-urgent cases.',
      },
      {
        question: '76700 vs. 76705 — what is the difference?',
        answer:
          '76700 is a complete abdominal exam; 76705 is limited to a single organ or quadrant. The order and images should match the billed code.',
      },
      {
        question: 'Do I need to fast for abdominal ultrasound?',
        answer:
          'Often yes for gallbladder evaluation — follow your clinician\'s prep instructions. Billing code is the same regardless of prep.',
      },
      {
        question: 'Is ultrasound cheaper than CT for abdominal pain?',
        answer:
          'Often yes, especially for gallbladder and kidney indications. Clinical choice is your physician\'s; cost comparison helps when options are equivalent. Ask whether ultrasound is sufficient before agreeing to CT.',
      },
    ],
  },

  '29881': {
    code: '29881',
    title: 'CPT Code 29881 — Knee Arthroscopy With Meniscectomy Cost & Billing Guide',
    metaDescription:
      'CPT 29881 is knee arthroscopy with partial meniscectomy. Understand surgeon vs. facility fees, Medicare benchmarks, and outpatient knee surgery bill review.',
    summary:
      'CPT 29881 describes knee arthroscopy with partial meniscectomy — a common outpatient orthopedic procedure for torn meniscus cartilage, with surgeon and facility fees billed separately.',
    category: 'Surgery',
    categorySlug: 'surgery',
    whatIs: [
      'CPT 29881 covers arthroscopic partial meniscectomy of the knee — minimally invasive surgery using a scope to trim or remove damaged portions of meniscus cartilage. It is one of the most frequently performed orthopedic procedures in the United States, often done in ambulatory surgery centers (ASCs) or hospital outpatient departments. The surgeon\'s professional fee is reported with 29881; anesthesia, facility, implants/disposables, and post-operative physical therapy bill under separate codes. Recovery often includes crutches and several weeks of physical therapy billed under codes such as 97110.',
      'Arthroscopic knee surgery codes distinguish meniscectomy (removal/trimming) from meniscus repair (29882, 29883), which involves suturing tissue and carries different relative values. Bilateral procedures, additional compartment work, and chondroplasty may involve additional or modifier reporting. Patients reviewing a knee scope bill should expect multiple line items beyond 29881 alone — anesthesia (often 01382 or similar), facility fee, and sometimes DME for crutches or braces. Surgeon global periods may limit separate E/M follow-up billing for a defined post-op window.',
      'Total episode cost varies widely by ASC vs. hospital outpatient setting, geographic region, and insurance network. Medicare physician fee schedule amounts for 29881 provide a benchmark for the surgeon\'s portion only — typically hundreds of dollars for the procedure line, not the full surgery bill patients remember. Ask whether your surgeon operates at both an ASC and hospital so you can compare facility estimates when you have a choice. Post-operative DME such as crutches may add separate HCPCS lines. Physical therapy within the global period may still bill separately under therapy benefits. Workers compensation and auto injury claims use the same 29881 code with different payer fee schedules. Benchmark the 29881 surgeon line separately from facility fees using our ZIP-based fair price calculator tool in your region.',
    ],
    whenUsed: [
      'Symptomatic meniscal tear with mechanical symptoms — locking, catching, or pain — when conservative treatment failed and surgery is appropriate.',
      'Degenerative meniscus tears in select patients when arthroscopic partial meniscectomy is clinically indicated.',
      'Combined with other arthroscopic knee work when separately documented and coded per operative report.',
      'Outpatient same-day surgery in ASC or hospital outpatient setting for eligible patients.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for the surgeon\'s 29881 professional fee are often roughly $600–$900 in many localities — not the full episode cost.',
      'ASC facility fees commonly add $2,000–$5,000; hospital outpatient may be higher.',
      'Anesthesia professional fees often add $400–$800 or more depending on case length and region — confirm whether your anesthesiologist is in-network separately from the surgeon and ASC.',
      'Request itemized estimates before elective surgery; benchmark 29881 separately in our calculator.',
    ],
    billingIssues: [
      'Confusing surgeon 29881 line with total surgery cost — facility and anesthesia dominate many bills.',
      'Coding meniscectomy (29881) when operative report describes repair (29882/29883) — patients can request operative notes.',
      'Out-of-network ASC or anesthesiologist at in-network hospital creating balance bills.',
      'Duplicate chondroplasty or synovectomy codes that may bundle with meniscectomy under some payer edits — request the operative report if multiple knee scope codes appear.',
    ],
    whatToDo: [
      'For elective surgery, get written good faith estimates listing surgeon, facility, and anesthesia separately.',
      'Confirm in-network status for all parties — ASC, surgeon, anesthesia — before scheduling.',
      'Compare 29881 surgeon fee to Medicare benchmarks; negotiate self-pay facility portions if uninsured.',
      'Review post-op PT bills (97110, etc.) separately — not included in 29881, and PT often begins within days of surgery with multiple units per visit.',
    ],
    relatedCodes: [
      { code: '29882', label: 'Knee arthroscopy — meniscus repair' },
      { code: '27447', label: 'Total knee replacement' },
      { code: '97110', label: 'Therapeutic exercises (PT)' },
    ],
    faq: [
      {
        question: 'What does CPT 29881 mean?',
        answer:
          'Knee arthroscopy with partial removal or trimming of meniscus cartilage — a common outpatient knee surgery. Repair procedures use different codes if the meniscus is sutured rather than trimmed.',
      },
      {
        question: 'How much does meniscus surgery cost?',
        answer:
          'Total episodes often run $5,000–$15,000 or more including facility and anesthesia. The 29881 surgeon line alone is only part of the total. Choosing an in-network ASC instead of hospital outpatient can reduce facility charges substantially.',
      },
      {
        question: 'Is 29881 outpatient or inpatient?',
        answer:
          'Usually outpatient same-day surgery at an ASC or hospital outpatient department, but setting depends on patient health and facility policy.',
      },
      {
        question: 'Why are there so many charges besides 29881?',
        answer:
          'Surgery episodes include facility, anesthesia, supplies, and sometimes DME and physical therapy — each billed with distinct codes.',
      },
      {
        question: 'Can I choose an ASC to lower cost?',
        answer:
          'For elective cases, ASCs are often less expensive than hospital outpatient departments. Verify network coverage, surgeon privileges, and that anesthesia is also in-network.',
      },
    ],
  },

  '45378': {
    code: '45378',
    title: 'CPT Code 45378 — Diagnostic Colonoscopy Cost & Billing Guide',
    metaDescription:
      'CPT 45378 is a diagnostic colonoscopy. Learn preventive vs. diagnostic billing, Medicare screening rules, typical costs, and surprise bill prevention.',
    summary:
      'CPT 45378 describes diagnostic colonoscopy — examination of the colon with an endoscope — used for cancer screening, symptom evaluation, and polyp surveillance, with important preventive coverage nuances.',
    category: 'Surgery',
    categorySlug: 'surgery',
    whatIs: [
      'CPT 45378 covers diagnostic colonoscopy — insertion of a colonoscope to examine the rectum and colon. It is the base colonoscopy code when no biopsy, polyp removal, or other therapeutic intervention is performed during the same session. When polyps are removed or biopsies taken, different codes apply (such as 45385 for snare polypectomy). Colonoscopy is central to colorectal cancer screening for average-risk adults and follow-up after positive stool tests or prior polyps. Medicare and commercial insurers have detailed rules distinguishing screening colonoscopy from diagnostic colonoscopy based on symptoms, history, and findings at the time of the procedure.',
      'Preventive screening colonoscopy is often covered without cost-sharing under ACA rules for eligible adults, but if a polyp is removed or the procedure is classified as diagnostic due to symptoms, patients may owe deductible or copay portions. Billing offices sometimes bill 45378 with modifiers or alternate codes for screening encounters. Facility fees from hospital outpatient endoscopy units can substantially exceed ambulatory surgery center pricing for the same procedural work. Always confirm sedation coverage and whether an anesthesiologist or nurse anesthetist bills separately.',
      '45378 appears on millions of claims yearly. Patients frequently question bills after "free" screening colonoscopy when polyp removal triggers cost-sharing or when out-of-network anesthesia or pathology adds charges. Understanding the code supports informed conversations with insurers and billing offices. Bring a written list of in-network providers to your prep appointment and confirm how your plan treats polyp findings during screening. Sedation choices affect anesthesia billing but not the base colonoscopy CPT when no polypectomy occurs. Bowel prep kits from the pharmacy are separate retail costs for most patients. Virtual colonoscopy uses entirely different imaging codes, not 45378.',
    ],
    whenUsed: [
      'Colorectal cancer screening starting at age 45 per current USPSTF guidance for average-risk individuals when colonoscopy is the chosen modality.',
      'Diagnostic evaluation of rectal bleeding, anemia, chronic diarrhea, or positive FIT/Cologuard requiring colonoscopy.',
      'Surveillance after prior polyps or cancer history per gastroenterology interval guidelines.',
      'Incomplete prior colonoscopy completion or evaluation when no therapeutic intervention occurs (45378).',
    ],
    typicalCosts: [
      'Medicare allowed amounts for physician and facility components vary; total Medicare payments for colonoscopy episodes often fall roughly $800–$1,500 combined depending on setting.',
      'Screening colonoscopy under ACA may be $0 in-network for the patient when no polyp removal cost-sharing applies — plans differ on polyp findings.',
      'Cash prices at ASCs may run $1,500–$3,500 all-inclusive for colonoscopy; hospital outpatient endoscopy can exceed $5,000–$10,000 chargemaster before contractual discounts are applied.',
      'Benchmark components separately; anesthesia and pathology are additional lines on many bills.',
    ],
    billingIssues: [
      'Screening-to-diagnostic reclassification when polyps are found — patient cost-sharing may apply per plan rules.',
      'Out-of-network anesthesiology or pathology at in-network endoscopy centers.',
      'Billing therapeutic polypectomy codes in addition to or instead of 45378 without clear operative report.',
      'Facility vs. ASC price disparity for clinically similar colonoscopy services — hospital endoscopy units may charge substantially more than ambulatory surgery centers for the same physician.',
    ],
    whatToDo: [
      'Before screening colonoscopy, confirm in-network facility, gastroenterologist, anesthesia, and pathology lab.',
      'Ask your plan how polyp removal during screening affects your cost-sharing — policies vary.',
      'Request itemized bills and operative report; verify 45378 vs. polypectomy codes match what was done.',
      'Uninsured patients should seek ASC cash bundles and hospital financial assistance comparisons — colonoscopy is elective enough to price-shop in most cases.',
    ],
    relatedCodes: [
      { code: '45385', label: 'Colonoscopy with snare polypectomy' },
      { code: '45330', label: 'Sigmoidoscopy — diagnostic' },
      { code: 'G0121', label: 'Medicare screening colonoscopy' },
    ],
    faq: [
      {
        question: 'What is the difference between screening and diagnostic colonoscopy billing?',
        answer:
          'Screening is for asymptomatic preventive care; diagnostic addresses symptoms or surveillance history. Coding and patient cost-sharing differ. The procedure may use 45378 or screening-specific codes depending on context.',
      },
      {
        question: 'How much should a colonoscopy cost?',
        answer:
          'Total episode costs vary from under $2,000 at ASCs to over $8,000 at hospitals before insurance. Medicare combined payments are often under $1,500. Ask for an all-in estimate that lists anesthesia and pathology separately.',
      },
      {
        question: 'Why did I owe money after a free screening colonoscopy?',
        answer:
          'Polyp removal, diagnostic coding, out-of-network anesthesia or pathology, or hospital facility fees may trigger patient responsibility despite preventive screening expectations. Keep your screening referral paperwork.',
      },
      {
        question: 'Does 45378 include biopsy or polyp removal?',
        answer:
          '45378 is diagnostic without biopsy or removal. If polyps were removed, additional CPT codes typically apply.',
      },
      {
        question: 'Can I choose where to have colonoscopy?',
        answer:
          'Often yes for elective procedures. ASCs are frequently less expensive than hospital outpatient endoscopy — verify network, quality credentials, and anesthesia contracts before prep day.',
      },
    ],
  },

  '66984': {
    code: '66984',
    title: 'CPT Code 66984 — Cataract Surgery Cost & Billing Guide',
    metaDescription:
      'CPT 66984 is extracapsular cataract removal with IOL implant. See Medicare surgeon fees, facility costs, premium lens upsells, and cataract bill review tips.',
    summary:
      'CPT 66984 describes cataract surgery with intraocular lens (IOL) implant — one of the most common surgical procedures in the US, with separate surgeon, facility, and optional premium lens charges.',
    category: 'Surgery',
    categorySlug: 'surgery',
    whatIs: [
      'CPT 66984 covers extracapsular cataract removal with insertion of an intraocular lens prosthesis — standard modern cataract surgery. The cloudy natural lens is removed and replaced with an artificial IOL to restore vision. This is typically an outpatient procedure at an ambulatory surgery center or hospital outpatient department. The surgeon\'s professional fee uses 66984; the facility, anesthesia, pre-operative testing, and post-operative drops bill separately. Complex cataract cases may use 66982 instead when documentation supports greater complexity. Most patients return home the same day with eye drops prescribed at the pharmacy.',
      'Medicare and most commercial plans cover standard monofocal IOL cataract surgery when medically necessary, subject to deductibles and coinsurance. Patients may face additional out-of-pocket costs for premium IOL upgrades — multifocal, toric astigmatism-correcting lenses — which are often not covered beyond the standard lens allowance. Billing confusion arises when marketing promises "zero copay cataract surgery" while premium lens upgrades, laser-assisted fees, or out-of-network facility charges remain patient responsibility. Always get the standard-path estimate in writing before elective lens upgrades. Part B covers the surgeon; facility fees follow outpatient surgery benefit rules.',
      'Cataract surgery is high-volume and competitive in many markets. Medicare physician fee schedule rates for 66984 provide a surgeon-fee anchor, but total patient experience includes facility and anesthesia often exceeding the surgeon line. Bilateral surgery involves separate dates or modifiers per coding rules. Before signing premium lens paperwork, confirm in writing what your insurer pays toward a standard monofocal IOL so optional upgrades are a deliberate choice. Post-op eye drops may be retail pharmacy cost rather than part of 66984. Complications requiring YAG laser capsulotomy later use different codes and benefits. Monofocal toric vs. standard monofocal pricing differs by plan. Our fair price calculator benchmarks the 66984 surgeon line using your local ZIP code and regional Medicare rates.',
    ],
    whenUsed: [
      'Visually significant cataract impairing daily activities when surgery is clinically appropriate.',
      'Standard IOL implantation during cataract removal for Medicare and commercially insured patients.',
      'Outpatient same-day surgical procedure typically lasting under an hour.',
      'Second-eye cataract surgery on a later date when bilateral cataracts are treated — each eye is a separate surgical episode with its own 66984 surgeon fee and facility charges.',
    ],
    typicalCosts: [
      'Medicare allowed amounts for surgeon 66984 are often roughly $800–$1,100 per eye in many localities.',
      'ASC facility fees commonly add $1,500–$3,500; anesthesia may add $300–$700.',
      'Premium IOL upgrades may cost $1,500–$4,000+ per eye out of pocket beyond standard coverage — marketing materials may not include this in advertised surgery prices.',
      'Benchmark surgeon 66984 in our calculator; request full episode estimates including lens choice.',
    ],
    billingIssues: [
      'Premium lens and laser-assisted charges billed to patient when standard monofocal IOL is covered benefit.',
      'Out-of-network ASC or anesthesia despite in-network surgeon.',
      'Billing complex cataract code 66982 when 66984 documentation would suffice — affects reimbursement not usually patient choice.',
      'Separate pre-op testing (A-scan, biometry) at unexpected out-of-network labs — confirm where measurements are sent before cataract surgery scheduling.',
    ],
    whatToDo: [
      'Before surgery, get written breakdown: surgeon, facility, anesthesia, standard vs. premium IOL costs.',
      'Understand which IOL type is covered — declining premium upgrades avoids optional charges.',
      'Confirm all providers in-network for each eye and surgical date.',
      'Compare surgeon 66984 to Medicare benchmarks; appeal billing errors with itemized EOB support — premium lens lines should be clearly labeled optional.',
    ],
    relatedCodes: [
      { code: '66982', label: 'Complex cataract surgery with IOL' },
      { code: '92136', label: 'Ophthalmic biometry' },
      { code: 'V2632', label: 'Intraocular lens HCPCS' },
    ],
    faq: [
      {
        question: 'What does CPT 66984 include?',
        answer:
          'Standard cataract removal surgery with insertion of a single intraocular lens — the surgeon\'s procedural service. Facility, anesthesia, biometry, and premium lens upgrades are billed with separate codes.',
      },
      {
        question: 'How much does cataract surgery cost per eye?',
        answer:
          'Total standard episodes often run $3,000–$6,000 before insurance including facility and anesthesia. Premium lenses add thousands out of pocket. Request a line-item good faith estimate before choosing lens upgrades.',
      },
      {
        question: 'Does Medicare cover 66984?',
        answer:
          'Yes for medically necessary cataract surgery with standard monofocal IOL, subject to Part B deductible and coinsurance. Upgrades cost extra.',
      },
      {
        question: 'Why is my cataract bill higher than 66984?',
        answer:
          '66984 is surgeon fee only. Facility, anesthesia, pre-op testing, post-op drops, and premium IOL options are separate charges that together make up the episode cost.',
      },
      {
        question: 'Can I shop for cataract surgery?',
        answer:
          'Yes for elective timing. Compare ASC vs. hospital outpatient costs, surgeon experience, and in-network status — not just advertised screening promotions that omit facility and lens upgrade fees.',
      },
    ],
  },

  '97110': {
    code: '97110',
    title: 'CPT Code 97110 — Physical Therapy Therapeutic Exercise Cost & Billing Guide',
    metaDescription:
      'CPT 97110 is therapeutic exercises in physical therapy. Learn per-visit Medicare rates, 15-minute unit billing, visit caps, and how to review PT bills.',
    summary:
      'CPT 97110 bills for therapeutic exercises in physical therapy — one of the most common rehabilitation codes, often appearing multiple units per visit for strength and range-of-motion work.',
    category: 'Physical therapy',
    categorySlug: 'physical-therapy',
    whatIs: [
      'CPT 97110 describes therapeutic procedure(s) using therapeutic exercises to develop strength, endurance, range of motion, and flexibility. It is a timed code reported in 15-minute units when performed by a physical therapist, physical therapy assistant (with supervision), or occupational therapist depending on setting and state practice rules. Each unit represents 15 minutes of direct one-on-one contact with the patient performing exercise activities — not passive modalities like hot packs, which use different codes. Multiple units of 97110 can appear on a single visit when documentation supports the time spent. Group gym-style classes are not billed as 97110.',
      'Physical therapy bills often list several codes per session — 97110 plus 97140 (manual therapy), 97530 (therapeutic activities), or neuromuscular re-education (97112). Commercial and Medicare outpatient therapy benefits may impose visit caps, prior authorization, or medical necessity review. Medicare historically used therapy cap exceptions; current rules depend on setting and congressional updates — patients should verify active benefit limits with Medicare or supplemental plans. Total visit cost is the sum of all timed codes on that date of service.',
      '97110 appears after orthopedic surgery (knee replacement, meniscectomy), stroke rehab, back pain programs, and sports injuries. Understanding unit-based billing helps patients interpret why one PT visit generates multiple lines and compare per-unit charges to Medicare therapy fee schedule amounts. If your therapist recommends twelve visits, multiply expected units per session to estimate total cost-sharing before you begin. Home exercise programs are not billed as 97110 — only supervised clinic time counts. Telehealth PT may use 97110 when payer policies allow real-time therapeutic exercise supervision. Gym memberships and home equipment are never substitutes for billable 97110 units.',
    ],
    whenUsed: [
      'Post-operative knee or shoulder rehabilitation requiring supervised strengthening and range-of-motion exercises.',
      'Chronic low back or neck pain programs with active exercise components documented by the therapist.',
      'Recovery from injury — sprains, strains, fractures — when therapeutic exercise is the primary intervention.',
      'Balance and gait training after stroke or fall when structured therapeutic exercise is the primary billable intervention during the timed treatment session.',
    ],
    typicalCosts: [
      'Medicare allowed amounts per 15-minute unit of 97110 are often roughly $28–$38 in many localities — a visit with three units might total $85–$115 before cost-sharing.',
      'Commercial copays for PT are often $30–$60 per visit regardless of unit count, depending on plan design — though high-deductible plans may apply full allowed amounts until the deductible is met.',
      'Cash-pay PT packages vary — $75–$150 per visit at private clinics when insurance is not used, sometimes with discounts for pre-paid visit packages.',
      'Multiply units on your bill when benchmarking; our calculator accepts 97110 with your ZIP.',
    ],
    billingIssues: [
      'Billing more 97110 units than documented direct treatment time — patients can request treatment notes.',
      'Using 97110 for passive modalities or group exercise when one-on-one therapeutic exercise criteria are not met.',
      'Therapy cap or prior authorization denials leaving unexpected self-pay balances.',
      'Out-of-network PT at hospital-owned rehab departments vs. independent clinics — the same 97110 units may cost more at hospital-affiliated sites.',
    ],
    whatToDo: [
      'Ask how many units and which codes will be billed per visit before starting a course of therapy.',
      'Verify in-network status and whether prior authorization is required for your plan.',
      'Compare per-unit 97110 charges to Medicare benchmarks if billed amounts seem high.',
      'Request an itemized statement showing units and dates; match to your PT treatment log — clinics should document minutes supporting each 97110 unit.',
    ],
    relatedCodes: [
      { code: '97112', label: 'Neuromuscular re-education' },
      { code: '97140', label: 'Manual therapy' },
      { code: '27447', label: 'Total knee replacement' },
    ],
    faq: [
      {
        question: 'What does CPT 97110 mean on my PT bill?',
        answer:
          'Therapeutic exercises — active strengthening, stretching, and ROM work performed with your therapist, billed in 15-minute units.',
      },
      {
        question: 'How much should physical therapy cost per visit?',
        answer:
          'With Medicare, three units of 97110 might total roughly $90–$115 allowed before coinsurance. Commercial copays are often fixed per visit. Cash pay varies by clinic and region.',
      },
      {
        question: 'Why are there multiple 97110 lines on one visit?',
        answer:
          'Each line is typically one 15-minute unit. Two units ≈ 30 minutes of therapeutic exercise; three units ≈ 45 minutes, when documented.',
      },
      {
        question: 'Is 97110 covered after knee surgery?',
        answer:
          'Usually yes when medically necessary and prescribed, subject to plan limits, network rules, and any prior authorization requirements.',
      },
      {
        question: 'Can I dispute PT billing units?',
        answer:
          'You can request therapy notes showing time and activities, then ask the billing office or insurer to review. Our tools compare unit rates to Medicare benchmarks in your ZIP.',
      },
    ],
  },
};
