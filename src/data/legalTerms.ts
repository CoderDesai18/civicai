import type { LegalTerm } from '../types'

export const TERMS: LegalTerm[] = [
  {
    id: 'indemnity',
    term: { en: 'Indemnity', hi: 'क्षतिपूर्ति / इन्डेम्निटी', mr: 'क्षतिपूर्ती / इंडेम्निटी' },
    legalMeaning: {
      en: 'A promise by one party to make good specified loss or liability suffered by another, as defined in the contract and, where applicable, in the Indian Contract Act, 1872 (see official text on indemnity).',
      hi: 'एक पक्ष का वचन कि वह दूसरे की निर्दिष्ट हानि की भरपाई करेगा, अनुबंध और लागू होने पर भारतीय संविदा अधिनियम के अनुसार।',
      mr: 'एक पक्ष दुसऱ्याच्या निर्दिष्ट हानीची भरपाई करेल असे वचन, करार व लागू भारतीय संविदा अधिनियमानुसार.',
    },
    simpleMeaning: {
      en: 'If something listed goes wrong, one side agrees to pay the other for that loss — only as the clause is written.',
      hi: 'यदि लिखी बात गलत हो जाए तो एक पक्ष दूसरे का नुकसान भरेगा — जैसा खंड कहता है।',
      mr: 'लिहिलेली गोष्ट चुकली तर एक बाजू दुसऱ्याचे नुकसान भरते — खंड जसे लिहिले आहे.',
    },
    example: {
      en: 'A vendor may indemnify a customer against third-party intellectual-property claims arising from the software.',
      hi: 'विक्रेता सॉफ्टवेयर से जुड़े तृतीय-पक्ष बौद्धिक संपदा दावों से ग्राहक की क्षतिपूर्ति कर सकता है।',
      mr: 'विक्रेता सॉफ्टवेअरमुळे होणाऱ्या तृतीय-पक्ष बौद्धिक संपदा दाव्यांपासून ग्राहकाची क्षतिपूर्ती करू शकतो.',
    },
    appearsIn: {
      en: 'Service agreements, NDAs, leases, insurance and government contracts.',
      hi: 'सेवा अनुबंध, एनडीए, पट्टे, बीमा और सरकारी ठेके।',
      mr: 'सेवा करार, एनडीए, भाडेपट्टे, विमा व शासकीय करार.',
    },
    related: ['liability', 'damages', 'default'],
    keywords: ['indemnity', 'indemnify', 'hold harmless', 'क्षतिपूर्ति'],
  },
  {
    id: 'liability',
    term: { en: 'Liability', hi: 'दायित्व', mr: 'दायित्व' },
    legalMeaning: {
      en: 'A legally recognised responsibility to do something or to pay for loss, arising from contract, statute or other law.',
      hi: 'कुछ करने या हानि का भुगतान करने की कानूनी जिम्मेदारी — अनुबंध, अधिनियम या अन्य विधि से।',
      mr: 'काही करण्याची किंवा हानी भरण्याची कायदेशीर जबाबदारी — करार, कायदा किंवा इतर विधितून.',
    },
    simpleMeaning: {
      en: 'Who can be asked to pay or fix a problem if things go wrong.',
      hi: 'गलती होने पर किसे भुगतान या सुधार के लिए कहा जा सकता है।',
      mr: 'चूक झाल्यास कोणाला पैसे भरण्यास किंवा दुरुस्तीस सांगता येते.',
    },
    example: {
      en: 'A limitation-of-liability clause may cap how much one party can be asked to pay.',
      hi: 'दायित्व-सीमा खंड यह सीमित कर सकता है कि एक पक्ष से कितना माँगा जा सकता है।',
      mr: 'दायित्व-मर्यादा खंड एका पक्षाकडून किती मागता येईल हे मर्यादित करू शकतो.',
    },
    appearsIn: { en: 'Almost every commercial contract.', hi: 'लगभग हर व्यावसायिक अनुबंध।', mr: 'जवळजवळ प्रत्येक व्यावसायिक करार.' },
    related: ['indemnity', 'damages', 'default'],
    keywords: ['liability', 'liable', 'cap', 'दायित्व'],
  },
  {
    id: 'arbitration',
    term: { en: 'Arbitration', hi: 'मध्यस्थम् / आर्बिट्रेशन', mr: 'लवाद / आर्बिट्रेशन' },
    legalMeaning: {
      en: 'A private dispute-resolution process where an arbitrator decides the dispute. In India, the Arbitration and Conciliation Act, 1996 is the principal statute — read official text for procedure and court support.',
      hi: 'निजी विवाद निपटान जिसमें मध्यस्थ निर्णय देता है। भारत में मुख्य अधिनियम मध्यस्थम् और सुलह अधिनियम, 1996 है।',
      mr: 'खाजगी वाद निपटारा ज्यात लवाद निर्णय देतो. भारतात मुख्य कायदा लवाद व सलोखा अधिनियम, १९९६ आहे.',
    },
    simpleMeaning: {
      en: 'Instead of (or before) a regular court trial, a chosen decision-maker hears the dispute.',
      hi: 'सामान्य अदालती सुनवाई की जगह चुना हुआ निर्णायक विवाद सुनता है।',
      mr: 'नेहमीच्या न्यायालयाऐवजी निवडलेला निर्णायक वाद ऐकतो.',
    },
    example: {
      en: 'A rent agreement may say disputes will be referred to arbitration in Pune.',
      hi: 'किराया समझौता कह सकता है विवाद पुणे में मध्यस्थम् को भेजे जाएँगे।',
      mr: 'भाडे करार म्हणू शकतो वाद पुण्यातील लवादाकडे जातील.',
    },
    appearsIn: { en: 'Commercial contracts, some leases, employment and construction contracts.', hi: 'व्यावसायिक अनुबंध, कुछ पट्टे, रोजगार।', mr: 'व्यावसायिक करार, काही भाडेपट्टे, रोजगार.' },
    related: ['jurisdiction', 'breach'],
    keywords: ['arbitration', 'arbitrator', 'conciliation', 'मध्यस्थ'],
  },
  {
    id: 'jurisdiction',
    term: { en: 'Jurisdiction', hi: 'अधिकारिता / क्षेत्राधिकार', mr: 'अधिकारिता / कार्यक्षेत्र' },
    legalMeaning: {
      en: 'The legal power of a court or authority to hear a matter, and often the place whose courts the parties agree to use.',
      hi: 'किसी न्यायालय या प्राधिकारी की सुनवाई की कानूनी शक्ति, और अक्सर वह स्थान जिसके न्यायालयों से पक्ष सहमत हों।',
      mr: 'न्यायालय किंवा प्राधिकाऱ्याची सुनावणीची कायदेशीर शक्ती, आणि अनेकदा तो ठिकाण ज्या न्यायालयांशी पक्ष सहमत.',
    },
    simpleMeaning: {
      en: 'Which court or city will hear a dispute if one arises.',
      hi: 'विवाद होने पर कौन-सी अदालत या शहर सुनेगा।',
      mr: 'वाद झाल्यास कोणते न्यायालय किंवा शहर ऐकेल.',
    },
    example: {
      en: '“Courts in Mumbai shall have exclusive jurisdiction.”',
      hi: '“मुंबई के न्यायालयों को अनन्य अधिकारिता होगी।”',
      mr: '“मुंबईतील न्यायालयांना अनन्य अधिकारिता असेल.”',
    },
    appearsIn: { en: 'The closing clauses of most contracts.', hi: 'अधिकांश अनुबंधों के अंतिम खंड।', mr: 'बहुतेक करारांचे शेवटचे खंड.' },
    related: ['arbitration', 'termination'],
    keywords: ['jurisdiction', 'exclusive', 'courts', 'forum'],
  },
  {
    id: 'consideration',
    term: { en: 'Consideration', hi: 'प्रतिफल', mr: 'प्रतिफल' },
    legalMeaning: {
      en: 'Something of value exchanged under a contract. The Indian Contract Act, 1872 defines consideration; read the official Act for the full definition and exceptions.',
      hi: 'अनुबंध के तहत मूल्यवान वस्तु का आदान-प्रदान। भारतीय संविदा अधिनियम परिभाषा देता है।',
      mr: 'कराराखाली मूल्यवान गोष्टीची देवाणघेवाण. भारतीय संविदा अधिनियम व्याख्या देतो.',
    },
    simpleMeaning: {
      en: 'What each side gives the other — money, a promise, or something else the contract names.',
      hi: 'प्रत्येक पक्ष दूसरे को क्या देता है — धन, वचन या अनुबंध में नामित वस्तु।',
      mr: 'प्रत्येक बाजू दुसऱ्याला काय देते — पैसे, वचन किंवा करारात नमूद गोष्ट.',
    },
    example: {
      en: 'Monthly rent is consideration for the right to occupy the premises.',
      hi: 'मासिक किराया परिसर पर कब्जे के अधिकार का प्रतिफल है।',
      mr: 'मासिक भाडे जागा ताब्यात ठेवण्याच्या अधिकाराचे प्रतिफल आहे.',
    },
    appearsIn: { en: 'Every contract discussion — rent, sale, employment, services.', hi: 'हर अनुबंध चर्चा।', mr: 'प्रत्येक करार चर्चा.' },
    related: ['breach', 'termination'],
    keywords: ['consideration', 'quid pro quo', 'प्रतिफल'],
  },
  {
    id: 'breach',
    term: { en: 'Breach', hi: 'भंग / उल्लंघन', mr: 'भंग / उल्लंघन' },
    legalMeaning: {
      en: 'A failure to perform a contractual obligation when due, without a lawful excuse recognised by the contract or by law.',
      hi: 'जब देय हो तब संविदा दायित्व का पालन न करना, बिना विधिमान्य कारण के।',
      mr: 'देय असताना संविदा कर्तव्य न पाळणे, कायदेशीर कारणाशिवाय.',
    },
    simpleMeaning: {
      en: 'Someone did not do what the agreement said they would do.',
      hi: 'किसी ने समझौते में लिखा काम नहीं किया।',
      mr: 'कोणी करारात लिहिलेले काम केले नाही.',
    },
    example: {
      en: 'Not paying rent on the due date may be described as a breach if the agreement so provides.',
      hi: 'नियत तिथि पर किराया न देना भंग हो सकता है यदि समझौता ऐसा कहे।',
      mr: 'नियत तारखेला भाडे न भरल्यास भंग होऊ शकतो जर करार तसे म्हणत असेल.',
    },
    appearsIn: { en: 'Default, termination and damages clauses.', hi: 'चूक, समाप्ति और क्षतिपूर्ति खंड।', mr: 'चूक, समाप्ती व नुकसान भरपाई खंड.' },
    related: ['default', 'damages', 'termination'],
    keywords: ['breach', 'broken contract', 'non-performance'],
  },
  {
    id: 'tenure',
    term: { en: 'Tenure', hi: 'अवधि / कार्यकाल', mr: 'कालावधी / कार्यकाळ' },
    legalMeaning: {
      en: 'The period during which a right (such as tenancy or office) continues under the governing instrument.',
      hi: 'वह अवधि जब तक अधिकार (जैसे किरायेदारी) लागू रहता है।',
      mr: 'अधिकार (जसे भाडेकरार) चालू राहण्याचा कालावधी.',
    },
    simpleMeaning: {
      en: 'How long the arrangement lasts.',
      hi: 'व्यवस्था कितने समय तक चलती है।',
      mr: 'व्यवस्था किती काळ चालते.',
    },
    example: {
      en: 'A leave-and-licence may have an eleven-month tenure.',
      hi: 'लीव-एंड-लाइसेंस ग्यारह महीने का हो सकता है।',
      mr: 'लीव्ह-अँड-लायसन्स अकरा महिन्यांचा असू शकतो.',
    },
    appearsIn: { en: 'Rent / leave-and-licence agreements, employment.', hi: 'किराया / लीव-एंड-लाइसेंस, रोजगार।', mr: 'भाडे / लीव्ह-अँड-लायसन्स, रोजगार.' },
    related: ['termination', 'renewal'],
    keywords: ['tenure', 'term', 'duration', 'lock-in'],
  },
  {
    id: 'termination',
    term: { en: 'Termination', hi: 'समाप्ति', mr: 'समाप्ती' },
    legalMeaning: {
      en: 'Ending the contract before or at the end of its term, in the manner the contract or applicable law allows.',
      hi: 'अनुबंध की अवधि पर या उससे पहले समाप्त करना, जैसा अनुबंध या लागू विधि अनुमति दे।',
      mr: 'कराराची मुदत संपताना किंवा आधी संपवणे, करार किंवा लागू कायदा जसे परवानगी देईल.',
    },
    simpleMeaning: {
      en: 'How either side can end the agreement, and what notice they must give.',
      hi: 'कौन पक्ष समझौता कैसे समाप्त कर सकता है और कितनी सूचना देनी होगी।',
      mr: 'कोणती बाजू करार कसा संपवू शकते व किती नोटीस द्यावी लागेल.',
    },
    example: {
      en: '“Either party may terminate by giving 30 days’ written notice.”',
      hi: '“कोई भी पक्ष 30 दिन की लिखित सूचना देकर समाप्त कर सकता है।”',
      mr: '“कोणतीही बाजू ३० दिवसांची लेखी नोटीस देऊन संपवू शकते.”',
    },
    appearsIn: { en: 'Almost all continuing contracts.', hi: 'लगभग सभी सतत अनुबंध।', mr: 'जवळजवळ सर्व चालू करार.' },
    related: ['breach', 'tenure', 'notice'],
    keywords: ['termination', 'terminate', 'notice period', 'समाप्ति'],
  },
  {
    id: 'force-majeure',
    term: { en: 'Force majeure', hi: 'अप्रत्याशित घटना / फोर्स मेजर', mr: 'अप्रत्याशित घटना / फोर्स मेजर' },
    legalMeaning: {
      en: 'A contractual allocation of risk for extraordinary events beyond a party’s reasonable control, as defined in that contract. There is no single all-purpose statutory definition for every private contract.',
      hi: 'असाधारण घटनाओं के जोखिम का अनुबंधीय बँटवारा, जैसा उस अनुबंध में परिभाषित हो।',
      mr: 'असामान्य घटनांच्या जोखमीचे करारीय वाटप, त्या करारात जसे परिभाषित.',
    },
    simpleMeaning: {
      en: 'A list of rare events (often disaster, war, government ban) that may excuse delay or non-performance if the clause says so.',
      hi: 'दुर्लभ घटनाओं की सूची जो खंड कहे तो देरी माफ कर सकती हैं।',
      mr: 'दुर्मीळ घटनांची यादी जी खंड म्हणत असेल तर विलंब माफ करू शकते.',
    },
    example: {
      en: 'A clause may excuse late handover of a flat if a notified disaster stops construction.',
      hi: 'अधिसूचित आपदा से निर्माण रुकने पर फ्लैट सौंपने में देरी माफ हो सकती है।',
      mr: 'अधिसूचित आपत्तीने बांधकाम थांबल्यास फ्लॅट सुपूर्द करण्यातील विलंब माफ होऊ शकतो.',
    },
    appearsIn: { en: 'Construction, supply, leases and service contracts.', hi: 'निर्माण, आपूर्ति, पट्टे, सेवा।', mr: 'बांधकाम, पुरवठा, भाडेपट्टे, सेवा.' },
    related: ['breach', 'liability'],
    keywords: ['force majeure', 'act of god', 'vis major'],
  },
  {
    id: 'confidentiality',
    term: { en: 'Confidentiality', hi: 'गोपनीयता', mr: 'गोपनीयता' },
    legalMeaning: {
      en: 'A duty, usually contractual, not to use or disclose specified information except as permitted. Statutory privacy duties (for example under the DPDP Act, 2023) are separate and must be read from official text.',
      hi: 'निर्दिष्ट जानकारी का अनुमति के बिना उपयोग/प्रकटीकरण न करने का कर्तव्य। वैधानिक गोपनीयता अलग है।',
      mr: 'निर्दिष्ट माहिती परवानगीशिवाय न वापरण्याचे/न उघडण्याचे कर्तव्य. वैधानिक गोपनीयता वेगळी आहे.',
    },
    simpleMeaning: {
      en: 'Do not share the other side’s private information except as the paper allows.',
      hi: 'दूसरे पक्ष की निजी जानकारी कागज़ की अनुमति के बिना न बाँटें।',
      mr: 'दुसऱ्या बाजूची खाजगी माहिती कागद परवानगी देईल तेवढीच शेअर करा.',
    },
    example: {
      en: 'An NDA may last two years after the project ends.',
      hi: 'एनडीए परियोजना समाप्त होने के बाद दो वर्ष चल सकता है।',
      mr: 'एनडीए प्रकल्प संपल्यानंतर दोन वर्षे चालू शकतो.',
    },
    appearsIn: { en: 'NDAs, employment, vendor and health contracts.', hi: 'एनडीए, रोजगार, विक्रेता, स्वास्थ्य।', mr: 'एनडीए, रोजगार, विक्रेता, आरोग्य.' },
    related: ['indemnity', 'termination'],
    keywords: ['confidentiality', 'nda', 'non-disclosure', 'secret'],
  },
  {
    id: 'default',
    term: { en: 'Default', hi: 'चूक / डिफ़ॉल्ट', mr: 'चूक / डिफॉल्ट' },
    legalMeaning: {
      en: 'An event the contract treats as a failure triggering specified consequences (interest, termination, possession).',
      hi: 'अनुबंध जिसे विफलता मानकर निर्दिष्ट परिणाम जोड़ता है।',
      mr: 'करार ज्याला अपयश मानून निर्दिष्ट परिणाम जोडतो.',
    },
    simpleMeaning: {
      en: 'Missing a payment or another listed duty.',
      hi: 'भुगतान या सूचीबद्ध कर्तव्य चूकना।',
      mr: 'पेमेंट किंवा सूचीबद्ध कर्तव्य चुकणे.',
    },
    example: {
      en: '“If rent remains unpaid for 15 days, the licensee shall be in default.”',
      hi: '“यदि किराया 15 दिन न भरे तो लाइसेंसधारी चूक में माना जाएगा।”',
      mr: '“भाडे १५ दिवस न भरल्यास परवानाधारक चूकीत समजला जाईल.”',
    },
    appearsIn: { en: 'Loan, rent and supply contracts.', hi: 'ऋण, किराया, आपूर्ति।', mr: 'कर्ज, भाडे, पुरवठा.' },
    related: ['breach', 'damages', 'termination'],
    keywords: ['default', 'event of default', 'unpaid'],
  },
  {
    id: 'damages',
    term: { en: 'Damages', hi: 'नुकसान / क्षतिपूर्ति राशि', mr: 'नुकसान भरपाई' },
    legalMeaning: {
      en: 'Money a court or agreed process may award for loss from a breach. Liquidated damages are a pre-agreed sum if the clause is valid under contract law — validity is a legal question CivicAI will not decide.',
      hi: 'भंग से हानि के लिए धन। निर्धारित क्षतिपूर्ति पूर्व-सहमत राशि हो सकती है — वैधता सिविकएआई तय नहीं करता।',
      mr: 'भंगामुळे हानीसाठी पैसे. निर्धारित भरपाई पूर्व-सहमत रक्कम असू शकते — वैधता सिविकएआय ठरवत नाही.',
    },
    simpleMeaning: {
      en: 'Compensation money, if a forum awards it or the contract names a figure.',
      hi: 'मुआवज़ा धन, यदि मंच दे या अनुबंध राशि लिखे।',
      mr: 'भरपाईचे पैसे, मंच दिल्यास किंवा करार रक्कम लिहिल्यास.',
    },
    example: {
      en: 'A lock-in clause may ask for remaining months’ licence fee as liquidated damages.',
      hi: 'लॉक-इन शेष महीनों का शुल्क निर्धारित क्षतिपूर्ति के रूप में माँग सकता है।',
      mr: 'लॉक-इन उर्वरित महिन्यांचे शुल्क निर्धारित भरपाई म्हणून मागू शकतो.',
    },
    appearsIn: { en: 'Breach, indemnity and penalty clauses.', hi: 'भंग, क्षतिपूर्ति, शास्ति खंड।', mr: 'भंग, क्षतिपूर्ती, दंड खंड.' },
    related: ['liability', 'breach', 'indemnity'],
    keywords: ['damages', 'compensation', 'liquidated', 'penalty'],
  },
]

export function searchTerms(q: string): LegalTerm[] {
  const s = q.trim().toLowerCase()
  if (!s) return TERMS
  return TERMS.filter((t) => {
    const blob = `${t.term.en} ${t.term.hi} ${t.simpleMeaning.en} ${t.keywords.join(' ')}`.toLowerCase()
    return blob.includes(s)
  })
}

export function getTerm(id: string): LegalTerm | undefined {
  return TERMS.find((t) => t.id === id)
}
