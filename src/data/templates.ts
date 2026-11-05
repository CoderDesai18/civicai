import type { DocTemplate } from '../types'

export const TEMPLATES: DocTemplate[] = [
  {
    id: 'rent-draft',
    name: { en: 'Rent / leave-and-licence outline', hi: 'किराया / लीव-एंड-लाइसेंस रूपरेखा', mr: 'भाडे / लीव्ह-अँड-लायसन्स रूपरेषा' },
    description: {
      en: 'A heading list for a leave-and-licence style draft. Not a stamped deed.',
      hi: 'लीव-एंड-लाइसेंस शैली की शीर्षक सूची। स्टांपित विलेख नहीं।',
      mr: 'लीव्ह-अँड-लायसन्स शैलीची शीर्षके. स्टँप केलेला दस्तऐवज नाही.',
    },
    fields: [
      { id: 'city', label: { en: 'City', hi: 'शहर', mr: 'शहर' }, placeholder: 'Pune' },
      { id: 'licensor', label: { en: 'Licensor name', hi: 'लाइसेंसर नाम', mr: 'लायसेन्सर नाव' }, placeholder: 'Full name' },
      { id: 'licensee', label: { en: 'Licensee name', hi: 'लाइसेंसी नाम', mr: 'लायसेन्सी नाव' }, placeholder: 'Full name' },
      { id: 'premises', label: { en: 'Premises address', hi: 'पता', mr: 'पत्ता' }, placeholder: 'Flat / building / PIN' },
      { id: 'fee', label: { en: 'Monthly fee (₹)', hi: 'मासिक शुल्क (₹)', mr: 'मासिक शुल्क (₹)' }, placeholder: '22000' },
      { id: 'deposit', label: { en: 'Deposit (₹)', hi: 'जमा (₹)', mr: 'ठेव (₹)' }, placeholder: '88000' },
      { id: 'start', label: { en: 'Start date', hi: 'आरंभ तिथि', mr: 'सुरुवात तारीख' }, placeholder: '2026-06-01' },
      { id: 'months', label: { en: 'Months', hi: 'महीने', mr: 'महिने' }, placeholder: '11' },
    ],
  },
  {
    id: 'application-letter',
    name: { en: 'Simple application letter', hi: 'साधारण आवेदन पत्र', mr: 'साधा अर्ज पत्र' },
    description: {
      en: 'A plain letter skeleton to an office. Not a prescribed government form.',
      hi: 'कार्यालय को सादा पत्र। निर्धारित सरकारी फॉर्म नहीं।',
      mr: 'कार्यालयास साधे पत्र. विहित शासकीय फॉर्म नाही.',
    },
    fields: [
      { id: 'to', label: { en: 'Addressed to', hi: 'संबोधित', mr: 'संबोधित' }, placeholder: 'The Tehsildar, Pune' },
      { id: 'from', label: { en: 'Your name', hi: 'आपका नाम', mr: 'तुमचे नाव' }, placeholder: 'Full name' },
      { id: 'subject', label: { en: 'Subject', hi: 'विषय', mr: 'विषय' }, placeholder: 'Request for income certificate' },
      { id: 'facts', label: { en: 'Facts in your words', hi: 'आपके शब्दों में तथ्य', mr: 'तुमच्या शब्दांत तथ्ये' }, placeholder: 'I reside at… I need the certificate for…' },
    ],
  },
  {
    id: 'authorization',
    name: { en: 'Authorization letter', hi: 'प्राधिकार पत्र', mr: 'अधिकृत पत्र' },
    description: {
      en: 'Lets another person collect papers. Offices may insist on their own format.',
      hi: 'दूसरे व्यक्ति को कागज़ लेने देता है। कार्यालय अपना प्रारूप माँग सकते हैं।',
      mr: 'दुसऱ्याला कागद घेऊ देते. कार्यालय स्वतःचा नमुना मागू शकते.',
    },
    fields: [
      { id: 'authoriser', label: { en: 'Your name', hi: 'आपका नाम', mr: 'तुमचे नाव' }, placeholder: 'Full name' },
      { id: 'agent', label: { en: 'Authorised person', hi: 'अधिकृत व्यक्ति', mr: 'अधिकृत व्यक्ती' }, placeholder: 'Full name' },
      { id: 'task', label: { en: 'What they may do', hi: 'वे क्या कर सकते हैं', mr: 'ते काय करू शकतात' }, placeholder: 'Collect income certificate acknowledgement' },
      { id: 'office', label: { en: 'Office name', hi: 'कार्यालय', mr: 'कार्यालय' }, placeholder: 'Aaple Sarkar Seva Kendra' },
    ],
  },
  {
    id: 'declaration',
    name: { en: 'Self-declaration outline', hi: 'स्व-घोषणा रूपरेखा', mr: 'स्व-घोषणा रूपरेषा' },
    description: {
      en: 'Information headings only. Not a notarised affidavit and not a court form.',
      hi: 'केवल सूचना शीर्षक। नोटरी शपथपत्र या न्यायालय फॉर्म नहीं।',
      mr: 'फक्त माहिती शीर्षके. नोटरी प्रतिज्ञापत्र किंवा न्यायालय फॉर्म नाही.',
    },
    fields: [
      { id: 'name', label: { en: 'Declarant name', hi: 'घोषणाकर्ता', mr: 'घोषणाकर्ता' }, placeholder: 'Full name' },
      { id: 'address', label: { en: 'Address', hi: 'पता', mr: 'पत्ता' }, placeholder: 'As on ID' },
      { id: 'statement', label: { en: 'Statement', hi: 'कथन', mr: 'विधान' }, placeholder: 'I state that…' },
    ],
  },
  {
    id: 'notice',
    name: { en: 'Simple written notice outline', hi: 'साधारण लिखित सूचना', mr: 'साधी लेखी नोटीस' },
    description: {
      en: 'A notice skeleton. Not a statutory eviction or legal-demand notice.',
      hi: 'सूचना की रूपरेखा। वैधानिक बेदखली या विधिक माँग सूचना नहीं।',
      mr: 'नोटीस रूपरेषा. वैधानिक बेदखली किंवा कायदेशीर मागणी नोटीस नाही.',
    },
    fields: [
      { id: 'from', label: { en: 'From', hi: 'प्रेषक', mr: 'प्रेषक' }, placeholder: 'Name' },
      { id: 'to', label: { en: 'To', hi: 'प्राप्तकर्ता', mr: 'प्राप्तकर्ता' }, placeholder: 'Name' },
      { id: 'subject', label: { en: 'Subject', hi: 'विषय', mr: 'विषय' }, placeholder: 'Notice regarding…' },
      { id: 'body', label: { en: 'What you want to say', hi: 'आप क्या कहना चाहते हैं', mr: 'तुम्ही काय सांगू इच्छिता' }, placeholder: 'Facts and request only' },
    ],
  },
]

export function fillTemplate(id: string, values: Record<string, string>): string {
  const v = (k: string) => values[k]?.trim() || '[to be filled by the user]'
  const disclaimer =
    '\n\n---\nThis is a draft/template for informational purposes. Review with a qualified professional where appropriate. CivicAI does not generate fabricated legal citations and this text is not a stamped, registered or court document.'

  switch (id) {
    case 'rent-draft':
      return `LEAVE AND LICENCE — INFORMATIONAL OUTLINE
City: ${v('city')}
Licensor: ${v('licensor')}
Licensee: ${v('licensee')}
Premises: ${v('premises')}
Monthly licence fee: ₹${v('fee')}
Security deposit: ₹${v('deposit')}
Start date: ${v('start')}
Suggested term: ${v('months')} months

Headings the parties may discuss with a professional:
1. Parties and premises description
2. Licence fee, due date, mode of payment
3. Deposit — amount, deductions, refund timeline
4. Lock-in and notice
5. Maintenance, utilities, repairs
6. Use restrictions and visitors
7. Registration and stamp duty — who pays
8. Inventory of fittings
9. Dispute resolution forum
${disclaimer}`
    case 'application-letter':
      return `To
${v('to')}

Subject: ${v('subject')}

Respected Sir/Madam,

I, ${v('from')}, respectfully submit the following:

${v('facts')}

I request you to consider this application as per the applicable rules of your office. I will produce original documents when asked.

Yours faithfully,
${v('from')}
${disclaimer}`
    case 'authorization':
      return `AUTHORIZATION LETTER (INFORMATIONAL)

I, ${v('authoriser')}, hereby authorise ${v('agent')} to ${v('task')} at ${v('office')}.

This authorisation is only for the task written above. The office may insist on identity proofs and its own format.

Date: ________
Signature of ${v('authoriser')}
${disclaimer}`
    case 'declaration':
      return `SELF-DECLARATION OUTLINE (NOT AN AFFIDAVIT)

I, ${v('name')}, residing at ${v('address')}, state as follows:

${v('statement')}

I understand that a false statement to a public authority can have consequences under applicable law. This outline is not notarised.

Date: ________    Signature: ________
${disclaimer}`
    case 'notice':
      return `WRITTEN NOTICE OUTLINE (NOT A STATUTORY NOTICE)

From: ${v('from')}
To: ${v('to')}
Subject: ${v('subject')}

${v('body')}

Please reply in writing. This outline is not a lawyer’s notice and does not start a court clock by itself.
${disclaimer}`
    default:
      return 'Reliable official template was not found for this request.'
  }
}
