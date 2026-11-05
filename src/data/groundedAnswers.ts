import type { GroundedAnswer } from '../types'

export const GROUNDED: GroundedAnswer[] = [
  {
    id: 'q-art21',
    question: 'What is Article 21?',
    keywords: ['article 21', 'art 21', 'right to life', 'personal liberty', 'अनुच्छेद 21'],
    answer: {
      en: 'Article 21 of the Constitution of India states that no person shall be deprived of life or personal liberty except according to procedure established by law. CivicAI will not apply this article to your personal facts or predict a court result.',
      hi: 'भारत के संविधान का अनुच्छेद 21 कहता है कि किसी व्यक्ति को प्राण या दैहिक स्वतंत्रता से विधि द्वारा स्थापित प्रक्रिया के अनुसार ही वंचित किया जाएगा। सिविकएआई आपके तथ्यों पर निर्णय नहीं देता।',
      mr: 'भारतीय संविधानाचा अनुच्छेद २१ सांगतो की कोणत्याही व्यक्तीला प्राण किंवा वैयक्तिक स्वातंत्र्यापासून कायद्याने स्थापित प्रक्रियेनुसारच वंचित करता येईल. सिविकएआय तुमच्या तथ्यांवर निर्णय देत नाही.',
    },
    source: {
      title: 'Constitution of India — Article 21',
      department: 'Legislative Department',
      url: 'https://legislative.gov.in/constitution-of-india/',
      sourceType: 'indiacode',
      actOrScheme: 'Constitution of India',
      sectionRef: 'Article 21',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    confidence: 'high',
    relatedHref: '/constitution/art-21',
  },
  {
    id: 'q-art14',
    question: 'What is Article 14 / right to equality?',
    keywords: ['article 14', 'equality', 'equal protection', 'right to equality'],
    answer: {
      en: 'Article 14 says the State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. It is a Fundamental Right. CivicAI cannot decide whether a particular rule violates it.',
      hi: 'अनुच्छेद 14 कहता है राज्य किसी व्यक्ति को विधि के समक्ष समता या विधियों के समान संरक्षण से वंचित नहीं करेगा। सिविकएआई यह नहीं तय करता कि कोई नियम इसका उल्लंघन करता है।',
      mr: 'अनुच्छेद १४ सांगतो राज्य कोणत्याही व्यक्तीला कायद्यासमोर समानता किंवा कायद्यांचे समान संरक्षण नाकारणार नाही. एखादा नियम उल्लंघन करतो का हे सिविकएआय ठरवत नाही.',
    },
    source: {
      title: 'Constitution of India — Article 14',
      department: 'Legislative Department',
      url: 'https://legislative.gov.in/constitution-of-india/',
      sourceType: 'indiacode',
      actOrScheme: 'Constitution of India',
      sectionRef: 'Article 14',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    confidence: 'high',
    relatedHref: '/constitution/art-14',
  },
  {
    id: 'q-tenant',
    question: 'What are my rights as a tenant?',
    keywords: ['tenant', 'landlord', 'deposit', 'rent', 'leave and licence', 'licensee'],
    answer: {
      en: 'Tenant / licensee rights depend on the signed paper, whether it is a lease or leave-and-licence, and on state rent or stamp rules. CivicAI can help you read your document. It cannot list a universal set of “tenant rights” for every Indian city, and it cannot say you will win a deposit dispute.',
      hi: 'किरायेदार / लाइसेंसी अधिकार हस्ताक्षरित कागज़, पट्टा या लीव-एंड-लाइसेंस, और राज्य नियमों पर निर्भर हैं। सिविकएआई दस्तावेज़ पढ़ने में मदद करता है, हर शहर के सार्वभौमिक अधिकार नहीं बताता।',
      mr: 'भाडेकरू / परवानाधारक हक्क सही केलेल्या कागदावर, भाडेपट्टा की लीव्ह-अँड-लायसन्स, व राज्य नियमांवर अवलंबून. सिविकएआय कागद वाचण्यास मदत करते; प्रत्येक शहराचे सार्वत्रिक हक्क सांगत नाही.',
    },
    confidence: 'medium',
    relatedHref: '/rent-checker?demo=1',
  },
  {
    id: 'q-deposit',
    question: 'What happens if a landlord refuses to return my deposit?',
    keywords: ['deposit', 'refund', 'landlord refuses', 'security deposit'],
    answer: {
      en: 'If a deposit is not returned, the next step depends on what your agreement says and on the applicable state process. Typical practical steps people consider: written reminder, keep proof of payment, and advice from a qualified professional. CivicAI cannot say you will recover the money or that a clause is illegal.',
      hi: 'जमा न लौटने पर अगला कदम आपके समझौते और राज्य प्रक्रिया पर निर्भर है। लिखित स्मरण और भुगतान प्रमाण रखें। सिविकएआई यह नहीं कहता कि धन लौटेगा या खंड अवैध है।',
      mr: 'ठेव न परत मिळाल्यास पुढील पाऊल करार व राज्य प्रक्रियेवर अवलंबून. लेखी स्मरण व भरणा पुरावा ठेवा. पैसे मिळतील किंवा खंड अवैध आहे असे सिविकएआय म्हणत नाही.',
    },
    confidence: 'medium',
    relatedHref: '/dictionary/damages',
  },
  {
    id: 'q-indemnity',
    question: 'What is the meaning of indemnity?',
    keywords: ['indemnity', 'indemnify'],
    answer: {
      en: 'Indemnity is a promise to make good specified loss. See the Legal Dictionary entry. The Indian Contract Act, 1872 contains provisions on indemnity — read the official Act on India Code rather than this paraphrase.',
      hi: 'क्षतिपूर्ति निर्दिष्ट हानि भरने का वचन है। शब्दकोश देखें। भारतीय संविदा अधिनियम इंडिया कोड पर पढ़ें।',
      mr: 'क्षतिपूर्ती म्हणजे निर्दिष्ट हानी भरण्याचे वचन. शब्दकोश पहा. भारतीय संविदा अधिनियम इंडिया कोडवर वाचा.',
    },
    source: {
      title: 'India Code — Indian Contract Act, 1872',
      department: 'Legislative Department',
      url: 'https://www.indiacode.nic.in',
      sourceType: 'indiacode',
      actOrScheme: 'Indian Contract Act, 1872',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    confidence: 'medium',
    relatedHref: '/dictionary/indemnity',
  },
  {
    id: 'q-termination',
    question: 'What does termination clause mean?',
    keywords: ['termination clause', 'terminate', 'end the agreement'],
    answer: {
      en: 'A termination clause says how the contract can be ended — notice, lock-in, and what must be paid. Always read the exact wording in your paper. CivicAI will not say a termination is valid.',
      hi: 'समाप्ति खंड बताता है अनुबंध कैसे समाप्त होगा — सूचना, लॉक-इन, भुगतान। अपने कागज़ के शब्द पढ़ें।',
      mr: 'समाप्ती खंड सांगतो करार कसा संपेल — नोटीस, लॉक-इन, भरणा. तुमच्या कागदाचे शब्द वाचा.',
    },
    confidence: 'high',
    relatedHref: '/dictionary/termination',
  },
  {
    id: 'q-dpdp',
    question: 'What can I do if a company misuses my personal data?',
    keywords: ['misuses personal data', 'personal data', 'company data', 'privacy', 'dpdp'],
    answer: {
      en: 'The Digital Personal Data Protection Act, 2023 sets duties for Data Fiduciaries and rights such as access, correction, erasure and grievance redressal (see official sections). Practical navigation: write to the organisation, keep copies, then follow official Board / government channels as implemented. This is general information, not legal advice, and not a finding that a company committed an offence.',
      hi: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 न्यासी कर्तव्य और पहुँच, सुधार, मिटाना, शिकायत अधिकार देता है। संस्था को लिखें, प्रतियाँ रखें, फिर आधिकारिक बोर्ड चैनल। यह अपराध का निष्कर्ष नहीं।',
      mr: 'डिजिटल वैयक्तिक डेटा संरक्षण अधिनियम, २०२३ विश्वस्त कर्तव्ये व प्रवेश, दुरुस्ती, मिटवणे, तक्रार अधिकार देतो. संस्थेला लिहा, प्रती ठेवा, नंतर अधिकृत मंडळ मार्ग. हा अपराधाचा निष्कर्ष नाही.',
    },
    source: {
      title: 'India Code — Digital Personal Data Protection Act, 2023',
      department: 'Legislative Department',
      url: 'https://www.indiacode.nic.in/handle/123456789/22037',
      sourceType: 'indiacode',
      actOrScheme: 'Digital Personal Data Protection Act, 2023',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    confidence: 'high',
    relatedHref: '/laws/dpdp-2023',
  },
]

export function answerQuestion(q: string): GroundedAnswer | null {
  const s = q.trim().toLowerCase()
  if (!s) return null
  const hit = GROUNDED.find((g) => g.keywords.some((k) => s.includes(k) || k.includes(s)))
  return hit ?? null
}

export function answerFromDocument(q: string, extractedText: string): { found: boolean; quote: string } {
  const s = q.trim().toLowerCase()
  const lines = extractedText.split('\n').map((l) => l.trim()).filter(Boolean)
  const keys = s.split(/\s+/).filter((w) => w.length > 3)
  const line = lines.find((l) => keys.some((k) => l.toLowerCase().includes(k)))
  if (!line) return { found: false, quote: '' }
  return { found: true, quote: line }
}
