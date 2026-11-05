import type { AnalysisResult } from '../types'

function mini(
  id: string,
  name: string,
  type: string,
  purpose: string,
  fields: { label: string; value: string; conf: 'high' | 'medium' | 'low'; ev: string }[],
  notice: string[],
  text: string,
): AnalysisResult {
  return {
    id,
    documentName: name,
    documentType: { en: type, hi: type, mr: type },
    purpose: { en: purpose, hi: purpose, mr: purpose },
    issuingAuthority: 'Sample private document (prototype extract)',
    language: 'English',
    status: 'Preliminary analysis — confirm every field',
    explanation: notice.map((n) => ({ en: n, hi: n, mr: n })),
    fields: fields.map((f, i) => ({
      id: `${id}-f${i}`,
      label: { en: f.label, hi: f.label, mr: f.label },
      value: f.value,
      confidence: f.conf,
      page: 1,
      evidenceText: f.ev,
      confirmed: false,
    })),
    requirements: [],
    actions: [
      {
        id: `${id}-a1`,
        what: { en: 'Read each flagged item and confirm with the other party in writing.', hi: 'प्रत्येक चिह्नित मद पढ़ें और दूसरे पक्ष से लिखित पुष्टि करें।', mr: 'प्रत्येक खूण बाब वाचा व दुसऱ्या बाजूकडून लेखी खात्री करा.' },
        where: { en: 'Your copy of the agreement', hi: 'आपकी प्रति', mr: 'तुमची प्रत' },
        documents: [],
        nextStep: { en: 'CivicAI does not say a clause is illegal. Consider a qualified professional.', hi: 'सिविकएआई खंड अवैध नहीं कहता।', mr: 'सिविकएआय खंड अवैध म्हणत नाही.' },
        mode: 'offline',
      },
    ],
    schemeIds: [],
    evidenceTrail: [
      {
        id: `${id}-e1`,
        type: 'document',
        title: { en: `Uploaded: ${name}`, hi: name, mr: name },
        detail: { en: 'Prototype sample', hi: 'नमूना', mr: 'नमुना' },
      },
    ],
    qualityIssues:
      fields.some((f) => f.conf === 'low')
        ? [
            {
              type: 'low_ocr',
              severity: 'warning',
              message: {
                en: 'Some information could not be read confidently. Please verify the highlighted fields.',
                hi: 'कुछ जानकारी आत्मविश्वास से नहीं पढ़ी गई।',
                mr: 'काही माहिती विश्वासासह वाचली नाही.',
              },
            },
          ]
        : [],
    extractedText: text,
    createdAt: '2026-08-19T11:00:00+05:30',
    prototype: true,
  }
}

export const EXTRA_ANALYSES: Record<string, AnalysisResult> = {
  'demo-employment': mini(
    'demo-employment',
    'Sample_Employment_Offer.pdf',
    'Employment offer / appointment letter (sample)',
    'Record the role, pay and notice written on a sample offer — not a binding HR decision.',
    [
      { label: 'Employer', value: 'Sample Tech Pvt Ltd, Pune', conf: 'high', ev: 'Employer: Sample Tech Pvt Ltd, Pune' },
      { label: 'Role', value: 'Associate analyst', conf: 'high', ev: 'Designation: Associate analyst' },
      { label: 'CTC mentioned', value: '₹4,80,000 per annum', conf: 'high', ev: 'CTC: Rs. 4,80,000 per annum' },
      { label: 'Notice period', value: '30 days after confirmation', conf: 'medium', ev: 'Notice: 30 days after confirmation' },
      { label: 'Probation', value: '6 months — exit terms faint', conf: 'low', ev: 'Probation: 6 months [exit terms faint]' },
    ],
    [
      'This sample looks like an employment offer. It is not CivicAI telling you to accept or reject the job.',
      'Notice period after confirmation is written as 30 days. Probation exit terms are faint — we did not invent them.',
    ],
    'EMPLOYMENT OFFER (SAMPLE)\nEmployer: Sample Tech Pvt Ltd, Pune\nDesignation: Associate analyst\nCTC: Rs. 4,80,000 per annum\nNotice: 30 days after confirmation\nProbation: 6 months [exit terms faint]',
  ),
  'demo-loan': mini(
    'demo-loan',
    'Sample_Personal_Loan_Key_Facts.pdf',
    'Personal loan key-fact statement (sample)',
    'Surface amounts and tenure printed on a sample key-fact sheet.',
    [
      { label: 'Principal', value: '₹2,00,000', conf: 'high', ev: 'Loan amount: Rs. 2,00,000' },
      { label: 'Tenure', value: '36 months', conf: 'high', ev: 'Tenure: 36 months' },
      { label: 'Interest (as printed)', value: 'See official sanction letter — rate line unclear', conf: 'low', ev: 'ROI: [unclear]' },
      { label: 'Prepayment', value: 'Charges “as per bank policy” — not a number', conf: 'medium', ev: 'Foreclosure: as per bank policy' },
    ],
    [
      'This is a sample key-fact sheet, not a sanction. CivicAI will not invent an interest rate that is unclear on the page.',
      'Ask the lender for the official sanction letter and most important terms sheet before signing.',
    ],
    'PERSONAL LOAN KEY FACTS (SAMPLE)\nLoan amount: Rs. 2,00,000\nTenure: 36 months\nROI: [unclear]\nForeclosure: as per bank policy',
  ),
  'demo-insurance': mini(
    'demo-insurance',
    'Sample_Health_Policy_Cover_Note.pdf',
    'Health insurance cover note (sample)',
    'List the sum insured and waiting-period line printed on a sample cover note.',
    [
      { label: 'Sum insured', value: '₹5,00,000', conf: 'high', ev: 'Sum insured: Rs. 5,00,000' },
      { label: 'Policy period', value: '01 Apr 2026 – 31 Mar 2027', conf: 'high', ev: 'Period: 01 Apr 2026 to 31 Mar 2027' },
      { label: 'Waiting period line', value: 'Printed as “as per policy wording”', conf: 'medium', ev: 'Waiting period: as per policy wording' },
    ],
    [
      'A cover note is not the full policy wording. CivicAI does not decide whether a claim will be paid.',
      'Read the official policy document and IRDAI-prescribed information from the insurer.',
    ],
    'HEALTH COVER NOTE (SAMPLE)\nSum insured: Rs. 5,00,000\nPeriod: 01 Apr 2026 to 31 Mar 2027\nWaiting period: as per policy wording',
  ),
}
