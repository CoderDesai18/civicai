import type { RentReview } from '../types'

export const SAMPLE_RENT_TEXT = `LEAVE AND LICENCE AGREEMENT (SAMPLE FOR DEMONSTRATION)
This agreement is made at Pune on 01 June 2026

LICENSOR: R. Deshpande, adult, residing at Kothrud, Pune
LICENSEE: A. Sharma, adult, residing at currently Pune

PREMISES: Flat No. 12, second floor, “Sample Residency”, Kothrud, Pune 411038
TERM: Eleven (11) months commencing 01 June 2026 and ending 30 April 2027
LICENCE FEE: Rs. 22,000 (Rupees Twenty Two Thousand only) per month, payable on or before the 5th day of each English calendar month
SECURITY DEPOSIT: Rs. 88,000 (Rupees Eighty Eight Thousand only) interest-free, paid on signing
LOCK-IN: The Licensee shall not terminate this licence during the first six (6) months. If the Licensee vacates during lock-in, the Licensee shall pay licence fee for the remaining lock-in period.
NOTICE: After lock-in, either party may terminate by giving thirty (30) days’ written notice.
SUBLICENCE: The Licensee shall not sublicence or part with possession without prior written consent of the Licensor.
MAINTENANCE: Society maintenance of Rs. 2,400 per month shall be paid by the Licensee. Electricity and water as per meter shall be paid by the Licensee.
REPAIRS: Day-to-day repairs shall be borne by the Licensee. Structural repairs shall be borne by the Licensor.
PENALTY: Delayed licence fee shall attract interest at 18% per month.
DISPUTE RESOLUTION: Courts in Pune shall have jurisdiction. The parties may also attempt mediation.
REGISTRATION: The parties shall take steps for registration / stamping as required by applicable law. Stamp duty allocation is not set out in this sample page.
REFUND OF DEPOSIT: The security deposit shall be refunded after adjusting dues. Timeline and inspection process are not specified on this page.

This is a CivicAI demonstration extract. It is not a stamped or registered instrument.`

export const RENT_DEMO: RentReview = {
  id: 'demo-rent-pune',
  documentName: 'Pune_Leave_and_Licence_Sample.pdf',
  documentType: {
    en: 'Leave and licence / rent agreement (sample)',
    hi: 'लीव एंड लाइसेंस / किराया समझौता (नमूना)',
    mr: 'लीव्ह अँड लायसन्स / भाडे करार (नमुना)',
  },
  extractedText: SAMPLE_RENT_TEXT,
  basics: [
    { id: 'landlord', label: { en: 'Licensor (landlord side)', hi: 'लाइसेंसर (मकान मालिक पक्ष)', mr: 'लायसेन्सर (मालक बाजू)' }, value: 'R. Deshpande', confidence: 'high', page: 1, evidenceText: 'LICENSOR: R. Deshpande, adult, residing at Kothrud, Pune', confirmed: false, sensitive: true },
    { id: 'tenant', label: { en: 'Licensee (occupant)', hi: 'लाइसेंसी (अधिभोगी)', mr: 'लायसेन्सी (राहणारा)' }, value: 'A. Sharma', confidence: 'high', page: 1, evidenceText: 'LICENSEE: A. Sharma, adult, residing at currently Pune', confirmed: false, sensitive: true },
    { id: 'property', label: { en: 'Premises', hi: 'परिसर', mr: 'जागा' }, value: 'Flat No. 12, Sample Residency, Kothrud, Pune 411038', confidence: 'high', page: 1, evidenceText: 'PREMISES: Flat No. 12, second floor, “Sample Residency”, Kothrud, Pune 411038', confirmed: false },
    { id: 'duration', label: { en: 'Agreement duration', hi: 'अवधि', mr: 'कालावधी' }, value: '11 months (01 Jun 2026 – 30 Apr 2027)', confidence: 'high', page: 1, evidenceText: 'TERM: Eleven (11) months commencing 01 June 2026 and ending 30 April 2027', confirmed: false },
    { id: 'rent', label: { en: 'Monthly licence fee', hi: 'मासिक शुल्क', mr: 'मासिक शुल्क' }, value: '₹22,000 due on or before the 5th', confidence: 'high', page: 1, evidenceText: 'LICENCE FEE: Rs. 22,000 ... payable on or before the 5th day', confirmed: false },
    { id: 'deposit', label: { en: 'Security deposit', hi: 'प्रतिभूति निक्षेप', mr: 'सुरक्षा ठेव' }, value: '₹88,000 interest-free', confidence: 'high', page: 1, evidenceText: 'SECURITY DEPOSIT: Rs. 88,000 (Rupees Eighty Eight Thousand only) interest-free', confirmed: false },
    { id: 'paydate', label: { en: 'Payment date', hi: 'भुगतान तिथि', mr: 'भरणा तारीख' }, value: 'On or before the 5th of each month', confidence: 'high', page: 1, evidenceText: 'payable on or before the 5th day of each English calendar month', confirmed: false },
  ],
  clauses: [
    {
      id: 'c-deposit',
      title: { en: 'Security deposit refund', hi: 'जमा राशि वापसी', mr: 'ठेव परत' },
      originalText: 'The security deposit shall be refunded after adjusting dues. Timeline and inspection process are not specified on this page.',
      explanation: {
        en: 'The paper says the deposit will be returned after adjusting dues, but it does not say when, or how inspection and deductions will work.',
        hi: 'कागज़ कहता है बकाया काटकर जमा लौटेगी, पर कब और निरीक्षण कैसे होगा नहीं लिखता।',
        mr: 'कागद म्हणतो बाकी वजा करून ठेव परत मिळेल, पण केव्हा व तपासणी कशी हे लिहिले नाही.',
      },
      whyItMatters: {
        en: 'Unclear refund timing is a common source of later disagreement. This is not a finding that the clause is unlawful.',
        hi: 'अस्पष्ट वापसी समय बाद के विवाद का कारण बन सकता है। यह अवैधता का निष्कर्ष नहीं।',
        mr: 'अस्पष्ट परत तारीख नंतरच्या वादाचे कारण होऊ शकते. हा अवैधतेचा निष्कर्ष नाही.',
      },
      questions: [
        { en: 'When and under what conditions will the deposit be refunded?', hi: 'जमा राशि कब और किन शर्तों पर लौटेगी?', mr: 'ठेव केव्हा व कोणत्या अटींवर परत मिळेल?' },
        { en: 'How will deductions be listed and disputed?', hi: 'कटौती कैसे सूचीबद्ध और विवादित होगी?', mr: 'कपात कशी सूचीबद्ध व विवादित होईल?' },
      ],
      flag: 'important',
      relatedTopic: { en: 'Contract terms on restitution / deposit — verify any state rent or stamp rules separately.', hi: 'वापसी / जमा संबंधी संविदा शर्तें — राज्य किराया या स्टांप नियम अलग से जाँचें।', mr: 'परत / ठेव संविदा अटी — राज्य भाडे किंवा स्टँप नियम वेगळे तपासा.' },
    },
    {
      id: 'c-lockin',
      title: { en: 'Lock-in period', hi: 'लॉक-इन अवधि', mr: 'लॉक-इन कालावधी' },
      originalText: 'The Licensee shall not terminate this licence during the first six (6) months. If the Licensee vacates during lock-in, the Licensee shall pay licence fee for the remaining lock-in period.',
      explanation: {
        en: 'The occupant cannot end the licence in the first six months without paying fee for the leftover lock-in months.',
        hi: 'पहले छह महीने अधिभोगी लाइसेंस समाप्त नहीं कर सकता जब तक शेष लॉक-इन का शुल्क न दे।',
        mr: 'पहिल्या सहा महिन्यात राहणारा परवाना संपवू शकत नाही जोवर उर्वरित लॉक-इन शुल्क भरत नाही.',
      },
      whyItMatters: {
        en: 'This may require further review under the applicable contract and state rules. CivicAI does not call the clause illegal.',
        hi: 'लागू अनुबंध और राज्य नियमों के अधीन और समीक्षा हो सकती है। सिविकएआई खंड को अवैध नहीं कहता।',
        mr: 'लागू करार व राज्य नियमांखाली अधिक तपासणी लागू शकते. सिविकएआय खंड अवैध म्हणत नाही.',
      },
      questions: [
        { en: 'Is the lock-in mutual, or only on the occupant?', hi: 'क्या लॉक-इन दोनों पर है या केवल अधिभोगी पर?', mr: 'लॉक-इन दोघांवर आहे की फक्त राहणाऱ्यावर?' },
        { en: 'What happens if the licensor cannot provide peaceful use?', hi: 'यदि लाइसेंसर शांतिपूर्ण उपयोग न दे तो क्या?', mr: 'लायसेन्सर शांततापूर्ण वापर न देऊ शकल्यास काय?' },
      ],
      flag: 'review',
      relatedTopic: { en: 'Indian Contract Act concepts of consideration and compensation — official text on India Code. Not a verdict on this clause.', hi: 'भारतीय संविदा अधिनियम — इंडिया कोड। इस खंड पर फैसला नहीं।', mr: 'भारतीय संविदा अधिनियम — इंडिया कोड. या खंडावर निकाल नाही.' },
    },
    {
      id: 'c-notice',
      title: { en: 'Notice period', hi: 'सूचना अवधि', mr: 'नोटीस कालावधी' },
      originalText: 'After lock-in, either party may terminate by giving thirty (30) days’ written notice.',
      explanation: {
        en: 'After six months, either side may end the licence with 30 days’ written notice.',
        hi: 'छह महीने बाद कोई भी पक्ष 30 दिन की लिखित सूचना से समाप्त कर सकता है।',
        mr: 'सहा महिन्यांनंतर कोणतीही बाजू ३० दिवसांच्या लेखी नोटिशीने संपवू शकते.',
      },
      whyItMatters: {
        en: 'The notice is written and mutual after lock-in. Confirm how notice must be delivered (email / registered post).',
        hi: 'लॉक-इन के बाद सूचना पारस्परिक है। वितरण विधि की पुष्टि करें।',
        mr: 'लॉक-इन नंतर नोटीस परस्पर आहे. कशी द्यायची ते निश्चित करा.',
      },
      questions: [{ en: 'Must notice be on paper, or is email enough?', hi: 'क्या सूचना कागज़ पर चाहिए या ईमेल पर्याप्त?', mr: 'नोटीस कागदावर हवी की ईमेल पुरेसे?' }],
      flag: 'normal',
    },
    {
      id: 'c-penalty',
      title: { en: 'Late-fee interest', hi: 'विलंब ब्याज', mr: 'विलंब व्याज' },
      originalText: 'Delayed licence fee shall attract interest at 18% per month.',
      explanation: {
        en: 'Late payment is written to attract 18% interest every month. Whether that figure would be enforced is a legal question CivicAI will not decide.',
        hi: 'देरी पर 18% मासिक ब्याज लिखा है। लागू होगा या नहीं, सिविकएआई तय नहीं करता।',
        mr: 'उशिराला १८% मासिक व्याज लिहिले आहे. लागू होईल का हे सिविकएआय ठरवत नाही.',
      },
      whyItMatters: {
        en: 'This clause may require further review under the applicable law/state rules. Do not treat the printed rate as a court-approved figure.',
        hi: 'लागू विधि/राज्य नियमों के अधीन समीक्षा हो सकती है। छपी दर को न्यायालय-स्वीकृत न मानें।',
        mr: 'लागू कायदा/राज्य नियमांखाली तपासणी लागू शकते. छापलेला दर न्यायालय-मान्य मानू नका.',
      },
      questions: [{ en: 'Is there a grace period before interest starts?', hi: 'ब्याज से पहले कोई छूट अवधि है?', mr: 'व्याजापूर्वी सवलत कालावधी आहे का?' }],
      flag: 'review',
    },
    {
      id: 'c-stamp',
      title: { en: 'Registration / stamping', hi: 'पंजीकरण / स्टांप', mr: 'नोंदणी / स्टँप' },
      originalText: 'The parties shall take steps for registration / stamping as required by applicable law. Stamp duty allocation is not set out in this sample page.',
      explanation: {
        en: 'The sample mentions registration and stamping but does not say who pays stamp duty or whether it has already been done.',
        hi: 'नमूना पंजीकरण/स्टांप कहता है पर शुल्क कौन देगा या हो चुका है नहीं लिखता।',
        mr: 'नमुना नोंदणी/स्टँप सांगतो पण शुल्क कोण देईल किंवा झाले आहे ते लिहित नाही.',
      },
      whyItMatters: {
        en: 'Maharashtra leave-and-licence practice often involves stamp duty and registration. Confirm current IGR Maharashtra requirements — CivicAI does not replace the Inspector General of Registration.',
        hi: 'महाराष्ट्र में अक्सर स्टांप और पंजीकरण होता है। वर्तमान आईजीआर आवश्यकताएँ जाँचें।',
        mr: 'महाराष्ट्रात अनेकदा स्टँप व नोंदणी होते. सध्याच्या आयजीआर गरजा तपासा.',
      },
      questions: [{ en: 'Who will pay stamp duty and appear for registration?', hi: 'स्टांप शुल्क कौन देगा और पंजीकरण पर कौन जाएगा?', mr: 'स्टँप शुल्क कोण देईल व नोंदणीला कोण येईल?' }],
      flag: 'important',
      relatedSource: {
        title: 'Inspector General of Registration, Maharashtra',
        department: 'Revenue Department, Government of Maharashtra',
        url: 'https://igrmaharashtra.gov.in',
        sourceType: 'state',
        actOrScheme: 'Maharashtra stamp / registration information',
        lastVerified: '2026-08-01',
        version: 'prototype-1.0',
      },
    },
    {
      id: 'c-jurisdiction',
      title: { en: 'Jurisdiction', hi: 'अधिकारिता', mr: 'अधिकारिता' },
      originalText: 'Courts in Pune shall have jurisdiction. The parties may also attempt mediation.',
      explanation: {
        en: 'Disputes are written to go to courts in Pune, with optional mediation first.',
        hi: 'विवाद पुणे न्यायालयों में, वैकल्पिक मध्यस्थता के साथ।',
        mr: 'वाद पुणे न्यायालयांत, पर्यायी मध्यस्थीसह.',
      },
      whyItMatters: {
        en: 'The chosen forum is named. Whether a court accepts exclusive jurisdiction is not something CivicAI decides.',
        hi: 'मंच नामित है। अनन्य अधिकारिता न्यायालय स्वीकारेगा या नहीं, सिविकएआई तय नहीं करता।',
        mr: 'मंच नमूद आहे. अनन्य अधिकारिता न्यायालय स्वीकारेल का हे सिविकएआय ठरवत नाही.',
      },
      questions: [],
      flag: 'normal',
      relatedTopic: { en: 'See Legal Dictionary: Jurisdiction.', hi: 'कानूनी शब्दकोश: अधिकारिता।', mr: 'कायदेशीर शब्दकोश: अधिकारिता.' },
    },
  ],
  clear: [
    { en: 'Parties, premises, 11-month term, monthly fee and due date are written clearly.', hi: 'पक्ष, परिसर, 11 महीने, मासिक शुल्क और तिथि स्पष्ट हैं।', mr: 'पक्ष, जागा, ११ महिने, मासिक शुल्क व तारीख स्पष्ट आहेत.' },
    { en: 'Notice after lock-in is 30 days and applies to both sides.', hi: 'लॉक-इन के बाद 30 दिन की सूचना दोनों पर है।', mr: 'लॉक-इन नंतर ३० दिवसांची नोटीस दोन्ही बाजूंना आहे.' },
  ],
  attention: [
    { en: 'Deposit refund has no timeline.', hi: 'जमा वापसी की समय-सीमा नहीं।', mr: 'ठेव परत करण्याची मुदत नाही.' },
    { en: '18% per month late interest may require further review.', hi: '18% मासिक विलंब ब्याज की और समीक्षा हो सकती है।', mr: '१८% मासिक विलंब व्याजाची अधिक तपासणी लागू शकते.' },
    { en: 'Lock-in fee on early exit is one-sided on this page.', hi: 'जल्दी निकलने पर लॉक-इन शुल्क इस पृष्ठ पर एकतरफा है।', mr: 'लवकर निघताना लॉक-इन शुल्क या पृष्ठावर एकतर्फी आहे.' },
  ],
  missing: [
    { en: 'Refund timeline and inspection process for the deposit.', hi: 'जमा की वापसी समय-सीमा और निरीक्षण प्रक्रिया।', mr: 'ठेवीची परत मुदत व तपासणी प्रक्रिया.' },
    { en: 'Who pays stamp duty / appears for registration.', hi: 'स्टांप शुल्क कौन देगा / पंजीकरण पर कौन जाएगा।', mr: 'स्टँप शुल्क कोण देईल / नोंदणीला कोण येईल.' },
    { en: 'Inventory of fittings and their condition.', hi: 'फिटिंग्स की सूची और स्थिति।', mr: 'फिटिंग्जची यादी व स्थिती.' },
  ],
  suggestedQuestions: [
    { en: 'When and under what conditions will the deposit be refunded?', hi: 'जमा कब और किन शर्तों पर लौटेगी?', mr: 'ठेव केव्हा व कोणत्या अटींवर परत मिळेल?' },
    { en: 'Can the lock-in be made mutual?', hi: 'क्या लॉक-इन पारस्परिक हो सकता है?', mr: 'लॉक-इन परस्पर होऊ शकते का?' },
    { en: 'Who bears stamp duty and registration?', hi: 'स्टांप और पंजीकरण कौन वहन करेगा?', mr: 'स्टँप व नोंदणी कोण सोसेल?' },
  ],
  createdAt: '2026-08-19T10:00:00+05:30',
  prototype: true,
}
