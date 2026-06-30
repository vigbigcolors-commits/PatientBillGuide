/** Disclaimer page — legal provisions, human notes, and UI blocks. */

export const disclaimerMeta = {
  updated: '2026-06-29',
  title: 'Disclaimer — Medical, Legal & Tool Limitations',
  description:
    'PatientBillGuide disclaimer: educational tools only — not medical, legal, or insurance advice. No savings guarantees. Billing flags are not fraud accusations. Read our full limitations before you rely on any result.',
};

export const disclaimerPillars = [
  {
    id: 'shield-1',
    symbol: '◆',
    label: 'Education only',
    text: 'Guides and tools explain public data — they do not diagnose, represent, or negotiate for you.',
  },
  {
    id: 'shield-2',
    symbol: '◇',
    label: 'No professional hat',
    text: 'We are not clinicians, attorneys, brokers, or Medicare counselors.',
  },
  {
    id: 'shield-3',
    symbol: '◆',
    label: 'No outcome promise',
    text: 'We do not guarantee lower bills, successful appeals, or specific dollar results.',
  },
  {
    id: 'shield-4',
    symbol: '◇',
    label: 'Flags ≠ verdicts',
    text: 'Automated checks surface possible concerns with confidence — never default fraud labels.',
  },
];

export const disclaimerQuickRead = [
  { tone: 'navy', text: 'Not medical advice — ever.' },
  { tone: 'slate', text: 'Not legal or insurance advice — templates are starting points only.' },
  { tone: 'amber', text: 'No guarantee of savings or dispute success.' },
  { tone: 'teal', text: '"Bill looks normal" is a valid, intended outcome.' },
];

export interface DisclaimerSection {
  id: string;
  title: string;
  human: string;
  provisions: string[];
  tone: 'navy' | 'slate' | 'amber' | 'iron';
}

export const disclaimerSections: DisclaimerSection[] = [
  {
    id: 'purpose',
    title: '1. Purpose of this site',
    human:
      'PatientBillGuide exists because medical paperwork is confusing — not because we think every bill is wrong. Our job is to translate public Medicare data and billing patterns into language you can use before you pay or call an office.',
    provisions: [
      'All content, calculators, analyzers, and templates on PatientBillGuide.com are offered for general educational and informational purposes only.',
      'Nothing on this site is tailored to your medical history, insurance contract, provider agreements, state law, or financial situation.',
      'Use of the site does not create a doctor-patient, attorney-client, insurer-insured, fiduciary, or agency relationship between you and PatientBillGuide, its operators, or contributors.',
      'You remain solely responsible for decisions you make regarding care, payment, appeals, and communications with providers and payers.',
    ],
    tone: 'navy',
  },
  {
    id: 'medical',
    title: '2. Not medical advice',
    human:
      'If you are worried about symptoms, treatment, or whether a service was appropriate — that is a conversation for your clinician, not a billing website.',
    provisions: [
      'PatientBillGuide does not provide medical advice, diagnosis, treatment recommendations, or clinical opinions.',
      'CPT summaries, cost context, and billing flags describe administrative codes and payment patterns — not whether a service was medically necessary or appropriate for you.',
      'Do not delay or avoid seeking professional medical care because of anything you read or calculate on this site.',
      'In a medical emergency, call 911 (or your local emergency number) — do not use this site for urgent health decisions.',
    ],
    tone: 'slate',
  },
  {
    id: 'legal',
    title: '3. Not legal or insurance advice',
    human:
      'Dispute letters and guides help you organize facts in plain English. They are not a law firm retainer and they are not a substitute for reading your actual plan documents.',
    provisions: [
      'PatientBillGuide is not a law firm, patient advocate practice, insurance agency, or licensed insurance producer.',
      'Dispute Letter Builder output consists of editable starting templates — not legal documents, legal advice, or guaranteed-effective correspondence.',
      'We do not interpret your insurance policy, ERISA plan, network contract, surprise-billing protections, or state-specific consumer remedies as applied to your case.',
      'For legal disputes, coverage denials with complex appeals, or questions about your rights under contract or statute, consult a qualified attorney or your state insurance department as appropriate.',
      'Medicare beneficiaries may also contact SHIP (State Health Insurance Assistance Program) counselors for free, unbiased Medicare help.',
    ],
    tone: 'navy',
  },
  {
    id: 'financial',
    title: '4. No financial or savings guarantees',
    human:
      'A fair benchmark is a reference point for questions — not a promise that a hospital will match it or that your insurer will reopen a claim.',
    provisions: [
      'We do not guarantee that use of our tools or content will reduce your bills, secure refunds, win appeals, or produce any specific financial outcome.',
      'Medicare allowed amounts and documented fair-range heuristics (e.g., approximately 1.5×–2.5× Medicare) are educational references derived from public CMS data — not quotes, offers, or payment commitments from any provider.',
      'Past examples, hypotheticals, or user experiences (if published) describe individual circumstances and are not predictions of your results.',
      'You should independently verify amounts, dates of service, codes, and balances with your provider and payer before making payment decisions.',
    ],
    tone: 'amber',
  },
  {
    id: 'tools',
    title: '5. Tools, data & methodology limits',
    human:
      'We show our math and our sources on purpose. When data or your paste is incomplete, results may be incomplete too — and we say so.',
    provisions: [
      'Tools are designed to run comparisons and pattern checks in your browser using public JSON bundles (e.g., CMS Physician Fee Schedule, NCCI edit chunks, ZIP-to-locality maps). See our Methodology hub for vintages and formulas.',
      'Client-side processing means we do not intentionally operate a server-side pipeline that stores your pasted bill or EOB for analysis. That architectural choice does not eliminate all privacy or security risks on your device, network, or browser.',
      'Benchmarks center on physician professional fees from MPFS where applicable — not hospital facility chargemasters, implant pass-through costs, anesthesia time units, or non-covered services unless explicitly stated.',
      'OCR of scanned PDFs, handwritten bills, photos, and non-standard statement formats are outside the designed scope of text-paste tools.',
      'Automated parsers may miss lines, misread columns, or fail on unusual layouts. Confidence levels describe data match quality — not legal certainty.',
      'When public-data rules find nothing unusual, reporting that a bill "looks normal" is an intended outcome, not a failure of the tool.',
    ],
    tone: 'iron',
  },
  {
    id: 'flags',
    title: '6. Billing flags & language standards',
    human:
      'We would rather you ask a specific question than panic over a headline. Our language is deliberately careful.',
    provisions: [
      'Bill Auditor and related features describe findings as possible billing concerns, patterns worth asking about, or items to verify — not as accusations of fraud, illegal billing, or intentional wrongdoing.',
      'We do not label providers, staff, or institutions as fraudulent without competent legal process and evidence — which this site does not conduct.',
      'NCCI unbundling signals, duplicate-line detection, and price-above-benchmark notices are rule-based, educational alerts tied to documented public rules and heuristics.',
      'A finding with lower confidence means the underlying data match or parse quality was weaker — not that the underlying charge is necessarily correct.',
      'Absence of a flag does not prove a bill is correct in all respects — only that configured public-data checks did not surface the patterns we test for.',
    ],
    tone: 'slate',
  },
  {
    id: 'reliance',
    title: '7. No reliance; your verification duty',
    human:
      'Treat every result as a draft for your own checklist — then confirm with the people who actually hold your contract and chart.',
    provisions: [
      'You agree not to rely on PatientBillGuide as the sole basis for medical, legal, insurance, or major financial decisions.',
      'Before paying, appealing, or signing correspondence, verify codes, dates of service, allowed amounts, and patient responsibility with your provider and insurer (or Medicare/Summary Notice as applicable).',
      'You are responsible for redacting or protecting sensitive information on your device when using browser-based tools.',
      'If anything on the site conflicts with official payer communications, provider statements, or applicable law, those official sources control.',
    ],
    tone: 'navy',
  },
  {
    id: 'liability',
    title: '8. Disclaimer of warranties; limitation of liability',
    human:
      'This section is the structural steel. We build carefully, but no website can assume the weight of your real-world contracts and care decisions.',
    provisions: [
      'THE SITE AND ALL CONTENT, TOOLS, DATA BUNDLES, AND TEMPLATES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, COMPLETENESS, NON-INFRINGEMENT, OR QUIET ENJOYMENT.',
      'WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF HARMFUL COMPONENTS, OR THAT RESULTS WILL BE ACCURATE OR RELIABLE FOR YOUR SPECIFIC SITUATION.',
      'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PATIENTBILLGUIDE, ITS OPERATORS, CONTRIBUTORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SITE — EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
      'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, OUR AGGREGATE LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SITE SHALL NOT EXCEED THE GREATER OF (A) U.S. $100 OR (B) THE AMOUNT YOU PAID US TO USE THE SITE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM (TYPICALLY $0 BECAUSE CORE TOOLS ARE FREE).',
      'SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.',
    ],
    tone: 'iron',
  },
  {
    id: 'third-party',
    title: '9. Third parties, links & advertising',
    human:
      'We link to government sources and may link to partners in the future — always with eyes open.',
    provisions: [
      'References to CMS, Medicare, insurers, or other third parties are for identification and education. We are not endorsed by or affiliated with them unless explicitly stated.',
      'Outbound links may lead to third-party sites with their own terms and privacy practices. We do not control and are not responsible for third-party content.',
      'We may display privacy-conscious analytics or advertising (e.g., Google AdSense) after launch. Ad partners may use cookies or similar technologies under their policies. See our Privacy Policy.',
      'Affiliate relationships, if any, will be disclosed on relevant pages. Affiliate links do not change the editorial standard that core educational tools remain free.',
    ],
    tone: 'slate',
  },
  {
    id: 'changes',
    title: '10. Changes; entire understanding',
    human:
      'If we tighten language or add a tool, we update this page and note material changes. The goal is always the same: honest limits.',
    provisions: [
      'We may update this Disclaimer at any time. The "Last updated" date at the top reflects the latest revision.',
      'Continued use of the site after changes constitutes acceptance of the revised Disclaimer for new use from that date forward.',
      'This Disclaimer is read together with our Terms of Use, Privacy Policy, Methodology / Limitations pages, and in-tool notices. If there is a conflict, the more specific in-tool notice or signed agreement (if any) may control for that feature.',
      'Material corrections to formulas, data, or engine behavior are logged on our Corrections page when applicable.',
    ],
    tone: 'navy',
  },
];

export const disclaimerNotList = [
  'A hospital, physician group, insurer, or government agency',
  'A law firm, medical practice, or licensed insurance broker',
  'A substitute for emergency services, clinical judgment, or legal representation',
  'A guarantor of billing outcomes, coverage decisions, or payment amounts',
  'An investigator that determines fraud or criminal conduct',
];

export const disclaimerIsList = [
  'An independent educational project with documented public-data methodology',
  'A plain-English guide to bills, EOBs, and common CPT codes',
  'A set of free browser-based checks you can run without uploading to our servers',
  'A source of careful language, confidence levels, and published limitations',
  'A site that treats "looks normal" as a successful clarity outcome',
];

export const disclaimerCalmSteps = [
  {
    step: 'Pause',
    text: 'You do not have to solve a bill in one sitting. Gather the bill, EOB or MSN, and any plan documents.',
  },
  {
    step: 'Check',
    text: 'Use our tools to organize codes and compare public benchmarks — then write down specific questions.',
  },
  {
    step: 'Verify',
    text: 'Call billing or your insurer with dates, CPT lines, and dollar columns — not anger alone.',
  },
  {
    step: 'Escalate',
    text: 'When stakes are high, use SHIP, state insurance help, certified advocates, or an attorney as appropriate.',
  },
];

export const disclaimerFaqs = [
  {
    question: 'Can I sue someone based on PatientBillGuide results?',
    answer:
      'No. Our tools and content are educational. They are not legal advice, evidence collection services, or expert reports. Consult a qualified attorney about disputes, deadlines, and strategy.',
  },
  {
    question: 'Does a billing flag mean my provider committed fraud?',
    answer:
      'No. Flags indicate patterns worth asking about under public rules or heuristics — with a stated confidence level. We do not accuse anyone of fraud or illegal conduct.',
  },
  {
    question: 'Is "bill looks normal" a real result?',
    answer:
      'Yes. Many itemized bills pass our configured public-data checks. That outcome means we did not surface duplicate patterns, unbundling concerns, or extreme outliers — not that you should ignore your own judgment or official statements.',
  },
  {
    question: 'Are dispute letters from this site legally binding?',
    answer:
      'No. They are editable templates to help you start correspondence. Review, customize, and verify before sending. Consider professional review for high-stakes disputes.',
  },
  {
    question: 'Does client-side processing mean my data is 100% private?',
    answer:
      'It means we do not intentionally receive your pasted bill on our analysis servers. Your device, browser extensions, network, and any cloud sync you use still matter. See our Privacy Policy.',
  },
  {
    question: 'Who wrote this disclaimer?',
    answer:
      'PatientBillGuide publishes this Disclaimer as part of our YMYL transparency standard. It is designed to be read alongside our Methodology and Terms of Use. Questions: contact page.',
  },
];
