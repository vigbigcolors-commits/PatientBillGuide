/** Hand-written supplements for existing GSC opportunity pages. Keep this list intentionally small. */
export const cptEditorialUpdates = {
  '94729': {
    heading: 'How to review a CPT 94729 line on a bill or EOB',
    dateModified: '2026-10-15',
    paragraphs: [
      'CPT 94729 is a pulmonary-function testing line, not a diagnosis. It can appear beside other breathing tests because a pulmonary evaluation may include more than one measurement. Seeing multiple pulmonary codes on the same date is not enough to call a charge duplicate.',
      'Match the service date, ordering or interpreting clinician, and place of service across the provider bill and EOB. If the line was performed in a hospital department or independent testing facility, the statement may also contain technical or facility charges that the physician-fee reference does not include.',
      'If the patient responsibility looks unfamiliar, ask billing for a line-item explanation before paying. For an insured claim, compare the provider bill with the EOB’s allowed amount, plan payment, deductible, and coinsurance fields; the EOB is the plan’s record of how the claim was processed.',
    ],
  },
  '69200': {
    heading: 'Questions to ask about a CPT 69200 charge',
    dateModified: '2026-10-15',
    paragraphs: [
      'CPT 69200 is a procedure line related to removing a foreign body from the external ear. The code alone does not identify the reason for the visit, whether a separate evaluation service was justified, or what an insurer agreed to pay.',
      'Check that the date, clinician, and ear-related service on the itemized bill match the visit you remember. A repeated-looking line can have a separate explanation, such as treatment on both sides or a distinct service, so request clarification rather than assuming an error.',
      'For a hospital or urgent-care visit, separate facility and professional charges can appear on different statements. Compare each statement with the EOB before paying an insured balance, and ask for the coding rationale if the line does not match the care you received.',
    ],
  },
  '76705': {
    heading: 'What to compare before paying for a limited abdominal ultrasound',
    dateModified: '2026-10-15',
    paragraphs: [
      'CPT 76705 is a limited abdominal ultrasound line. “Limited” describes the scope of the imaging service, not a diagnosis and not a conclusion about what the test found. A bill cannot tell you whether the result was normal or whether another test was medically necessary.',
      'Start by matching the date and imaging location to your appointment. Then check whether the bill separates the imaging facility’s technical charge from a radiologist or clinician interpretation. A hospital outpatient or emergency setting may have charges that are not represented by a physician-fee reference for the code alone.',
      'If you have insurance, compare the bill with the EOB’s allowed amount and patient-responsibility fields. If you are self-pay and the care was not urgent, ask the provider for a written cash quote and financial-assistance information before making a payment decision.',
    ],
  },
  '99304': {
    heading: 'How to check an initial nursing-facility care line',
    dateModified: '2026-10-15',
    paragraphs: [
      'CPT 99304 can appear on a clinician’s claim for initial nursing-facility care. It is separate from the facility’s room, board, nursing, therapy, pharmacy, and supply charges. A single CPT line therefore cannot explain the total cost of a nursing-facility stay.',
      'Compare the date of service, billing clinician, and place of service on the claim with the admission or initial assessment records you have. If the provider bill and EOB disagree, ask the insurer whether the claim was processed in-network and ask billing for the itemized professional-service record.',
      'Use a CMS fee-schedule result only as a public physician-fee reference. It does not determine coverage, replace plan rules, or set the facility’s charge. For a balance you do not understand, request a written explanation before paying or appealing.',
    ],
  },
} as const;

export type CptEditorialUpdateCode = keyof typeof cptEditorialUpdates;
