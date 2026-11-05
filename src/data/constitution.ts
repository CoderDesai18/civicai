import type { ConstitutionArticle, ConstitutionCategory, OfficialSource } from '../types'
import { OFFICIAL_ARTICLES } from './officialArticles'

const src = (sectionRef: string): OfficialSource => ({
  title: 'The Constitution of India [As on 1st May, 2026] — Legislative Department',
  department: 'Ministry of Law and Justice, Legislative Department, Government of India',
  url: 'https://legislative.gov.in/constitution-of-india/',
  sourceType: 'indiacode',
  actOrScheme: 'Constitution of India',
  sectionRef,
  lastVerified: '2026-05-01',
  version: 'official-2026-05-01',
})

export const CONSTITUTION_CATEGORIES: { id: ConstitutionArticle['category']; label: { en: string; hi: string; mr: string } }[] = [
  { id: 'preamble', label: { en: 'Preamble', hi: 'प्रस्तावना', mr: 'प्रस्तावना' } },
  { id: 'fundamental_rights', label: { en: 'Fundamental Rights', hi: 'मौलिक अधिकार', mr: 'मूलभूत अधिकार' } },
  { id: 'dpsp', label: { en: 'Directive Principles', hi: 'नीति निदेशक तत्व', mr: 'मार्गदर्शक तत्त्वे' } },
  { id: 'fundamental_duties', label: { en: 'Fundamental Duties', hi: 'मौलिक कर्तव्य', mr: 'मूलभूत कर्तव्ये' } },
  { id: 'union', label: { en: 'Union Government', hi: 'संघ सरकार', mr: 'केंद्र शासन' } },
  { id: 'state', label: { en: 'State Government', hi: 'राज्य सरकार', mr: 'राज्य शासन' } },
  { id: 'judiciary', label: { en: 'Judiciary', hi: 'न्यायपालिका', mr: 'न्यायव्यवस्था' } },
  { id: 'elections', label: { en: 'Elections', hi: 'चुनाव', mr: 'निवडणुका' } },
  { id: 'emergency', label: { en: 'Emergency Provisions', hi: 'आपातकालीन प्रावधान', mr: 'आणीबाणी तरतुदी' } },
  { id: 'bodies', label: { en: 'Constitutional Bodies', hi: 'संवैधानिक निकाय', mr: 'संवैधानिक संस्था' } },
  { id: 'schedules', label: { en: 'Schedules', hi: 'अनुसूचियाँ', mr: 'अनुसूच्या' } },
  { id: 'amendments', label: { en: 'Amendments', hi: 'संशोधन', mr: 'दुरुस्त्या' } },
]

export const ARTICLES: ConstitutionArticle[] = [
  {
    id: 'preamble',
    article: 'Preamble',
    title: { en: 'Preamble', hi: 'प्रस्तावना', mr: 'प्रस्तावना' },
    category: 'preamble',
    covers: {
      en: 'The opening statement of the Constitution describing India as a Sovereign Socialist Secular Democratic Republic and stating justice, liberty, equality and fraternity as objectives.',
      hi: 'संविधान का आरंभिक कथन जो भारत को संप्रभु समाजवादी धर्मनिरपेक्ष लोकतांत्रिक गणराज्य बताता है।',
      mr: 'संविधानाचे आरंभिक विधान जे भारत सार्वभौम समाजवादी धर्मनिरपेक्ष लोकशाही गणराज्य आहे असे सांगते.',
    },
    simplified: {
      en: 'In simple words, the Preamble is the Constitution’s purpose statement. It is not a list of individual court-enforceable rights by itself. CivicAI does not decide how a court would apply it to a case.',
      hi: 'सरल भाषा में, प्रस्तावना संविधान का उद्देश्य बताती है। यह स्वयं मुकदमेबाजी योग्य अधिकारों की सूची नहीं है।',
      mr: 'सोप्या भाषेत, प्रस्तावना संविधानाचा उद्देश सांगते. ही स्वतः न्यायालयात लागू होणारी हक्कांची यादी नाही.',
    },
    keyPoints: [
      { en: 'Declares the people of India as the source of the Constitution.', hi: 'भारत की जनता को संविधान का स्रोत बताती है।', mr: 'भारताची जनता संविधानाचा स्रोत आहे असे सांगते.' },
      { en: 'Lists justice, liberty, equality and fraternity as aims.', hi: 'न्याय, स्वतंत्रता, समानता और बंधुत्व लक्ष्य हैं।', mr: 'न्याय, स्वातंत्र्य, समता व बंधुता ही उद्दिष्टे आहेत.' },
    ],
    related: ['art-14', 'art-19', 'art-21'],
    keywords: ['preamble', 'sovereign', 'secular', 'republic', 'प्रस्तावना'],
    officialText:
      'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.',
    officialSource: src('Preamble'),
  },
  {
    id: 'art-14',
    article: '14',
    title: { en: 'Equality before law', hi: 'विधि के समक्ष समता', mr: 'कायद्यासमोर समानता' },
    category: 'fundamental_rights',
    covers: {
      en: 'Equality before the law and equal protection of the laws within the territory of India.',
      hi: 'भारत के राज्यक्षेत्र में विधि के समक्ष समता और विधियों का समान संरक्षण।',
      mr: 'भारताच्या राज्यक्षेत्रात कायद्यासमोर समानता व कायद्यांचे समान संरक्षण.',
    },
    simplified: {
      en: 'The State must treat people equally before the law. This does not mean every rule must treat unlike situations identically. CivicAI cannot decide whether a particular rule is valid.',
      hi: 'राज्य को कानून के सामने लोगों के साथ समान व्यवहार करना चाहिए। सिविकएआई यह तय नहीं कर सकता कि कोई नियम वैध है।',
      mr: 'राज्याने कायद्यासमोर लोकांशी समान वागावे. एखादा नियम वैध आहे का हे सिविकएआय ठरवत नाही.',
    },
    keyPoints: [
      { en: 'Part of Fundamental Rights (Part III).', hi: 'मौलिक अधिकार (भाग 3) का हिस्सा।', mr: 'मूलभूत अधिकार (भाग ३) चा भाग.' },
      { en: 'Applies to “any person”, not only citizens.', hi: '“किसी व्यक्ति” पर लागू, केवल नागरिकों तक सीमित नहीं।', mr: '“कोणत्याही व्यक्ती”ला लागू, फक्त नागरिकांपुरते मर्यादित नाही.' },
    ],
    related: ['art-15', 'art-19', 'art-21', 'art-32'],
    keywords: ['article 14', 'equality', 'equal protection', 'समता', 'right to equality'],
    officialText:
      '14. Equality before law.—The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    officialSource: src('Article 14'),
  },
  {
    id: 'art-15',
    article: '15',
    title: { en: 'Prohibition of discrimination', hi: 'विभेद का प्रतिषेध', mr: 'भेदभावास मनाई' },
    category: 'fundamental_rights',
    covers: {
      en: 'The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. Later clauses contain important exceptions and special provisions as enacted.',
      hi: 'राज्य किसी नागरिक के विरुद्ध केवल धर्म, मूलवंश, जाति, लिंग, जन्मस्थान के आधार पर विभेद नहीं करेगा। आगे की उपधाराओं में अपवाद हैं।',
      mr: 'राज्य कोणत्याही नागरिकाविरुद्ध केवळ धर्म, वंश, जात, लिंग, जन्मस्थान या कारणाने भेदभाव करणार नाही. पुढील खंडांत अपवाद आहेत.',
    },
    simplified: {
      en: 'Citizens are protected against certain kinds of State discrimination. The full article also allows special provisions. Read the official text before relying on any paraphrase.',
      hi: 'नागरिकों को कुछ प्रकार के राज्य विभेद से सुरक्षा है। पूरा अनुच्छेद विशेष प्रावधान भी अनुमति देता है।',
      mr: 'नागरिकांना काही प्रकारच्या राज्य भेदभावापासून संरक्षण आहे. पूर्ण अनुच्छेद विशेष तरतुदीही देते.',
    },
    keyPoints: [
      { en: 'Read all clauses; later clauses qualify clause (1).', hi: 'सभी खंड पढ़ें; बाद के खंड खंड (1) को सीमित करते हैं।', mr: 'सर्व खंड वाचा; नंतरचे खंड (१) मर्यादित करतात.' },
    ],
    related: ['art-14', 'art-16', 'art-21'],
    keywords: ['article 15', 'discrimination', 'caste', 'sex', 'religion'],
    officialText:
      '15. Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth.—(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. Further clauses of Article 15, including special provisions, must be read from the official Constitution text.',
    officialSource: src('Article 15'),
  },
  {
    id: 'art-16',
    article: '16',
    title: { en: 'Equality of opportunity in public employment', hi: 'लोक नियोजन में अवसर की समता', mr: 'सार्वजनिक नोकऱ्यात संधीची समानता' },
    category: 'fundamental_rights',
    covers: {
      en: 'Equality of opportunity for citizens in matters of public employment, subject to the rest of the article.',
      hi: 'लोक नियोजन में नागरिकों के लिए अवसर की समता, शेष अनुच्छेद के अधीन।',
      mr: 'सार्वजनिक नोकऱ्यात नागरिकांसाठी संधीची समानता, उर्वरित अनुच्छेदाच्या अधीन.',
    },
    simplified: {
      en: 'For government jobs, citizens generally have a right to equal opportunity. Reservations and other special clauses exist in the same article. CivicAI will not decide a recruitment dispute.',
      hi: 'सरकारी नौकरियों में सामान्यतः समान अवसर का अधिकार है। आरक्षण इसी अनुच्छेद में है। सिविकएआई भर्ती विवाद नहीं तय करता।',
      mr: 'शासकीय नोकऱ्यांत सामान्यतः समान संधीचा अधिकार आहे. आरक्षण याच अनुच्छेदात आहे. भरती वाद सिविकएआय ठरवत नाही.',
    },
    keyPoints: [
      { en: 'Applies to employment or appointment under the State.', hi: 'राज्य के अधीन नियोजन / नियुक्ति पर लागू।', mr: 'राज्याच्या अधिपत्याखालील नोकरी / नेमणुकीस लागू.' },
    ],
    related: ['art-14', 'art-15'],
    keywords: ['article 16', 'public employment', 'reservation', 'opportunity'],
    officialText:
      '16. Equality of opportunity in matters of public employment.—(1) There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. Remaining clauses, including enabling provisions on reservation, must be read from the official text.',
    officialSource: src('Article 16'),
  },
  {
    id: 'art-19',
    article: '19',
    title: { en: 'Protection of certain rights regarding freedom of speech, etc.', hi: 'वाक्-स्वातंत्र्य आदि के अधिकारों का संरक्षण', mr: 'वाक्स्वातंत्र्य इत्यादी अधिकारांचे संरक्षण' },
    category: 'fundamental_rights',
    covers: {
      en: 'Certain freedoms of citizens, including speech and expression, assembly, association, movement, residence and profession, each subject to reasonable restrictions set out in the article.',
      hi: 'नागरिकों की कुछ स्वतंत्रताएँ, जिनमें वाक् और अभिव्यक्ति शामिल है, उचित निर्बंधनों के अधीन।',
      mr: 'नागरिकांची काही स्वातंत्र्ये, ज्यात भाषण व अभिव्यक्ती आहे, वाजवी निर्बंधांच्या अधीन.',
    },
    simplified: {
      en: 'Article 19 lists important citizen freedoms. Each freedom can be limited by the grounds written in the same article. CivicAI cannot say whether a particular restriction is “reasonable”.',
      hi: 'अनुच्छेद 19 महत्वपूर्ण नागरिक स्वतंत्रताएँ सूचीबद्ध करता है। प्रत्येक पर उसी अनुच्छेद में लिखे आधारों से सीमा लग सकती है।',
      mr: 'अनुच्छेद १९ महत्त्वाची नागरिक स्वातंत्र्ये सूचीबद्ध करतो. प्रत्येकवर त्याच अनुच्छेदातील कारणांनी मर्यादा येऊ शकते.',
    },
    keyPoints: [
      { en: 'Available to citizens.', hi: 'नागरिकों को उपलब्ध।', mr: 'नागरिकांना उपलब्ध.' },
      { en: 'Clauses (2) to (6) list restriction grounds.', hi: 'खंड (2) से (6) निर्बंधन आधार बताते हैं।', mr: 'खंड (२) ते (६) निर्बंध कारणे सांगतात.' },
    ],
    related: ['art-14', 'art-21', 'art-32'],
    keywords: ['article 19', 'freedom of speech', 'expression', 'assembly', 'profession'],
    officialText:
      '19. Protection of certain rights regarding freedom of speech, etc.—(1) All citizens shall have the right—(a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions [or co-operative societies]; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India; and (g) to practise any profession, or to carry on any occupation, trade or business. The restriction clauses in Article 19(2)–(6) must be read from the official Constitution.',
    officialSource: src('Article 19'),
  },
  {
    id: 'art-21',
    article: '21',
    title: { en: 'Protection of life and personal liberty', hi: 'प्राण और दैहिक स्वतंत्रता का संरक्षण', mr: 'जीवन व वैयक्तिक स्वातंत्र्याचे संरक्षण' },
    category: 'fundamental_rights',
    covers: {
      en: 'No person shall be deprived of life or personal liberty except according to procedure established by law.',
      hi: 'किसी व्यक्ति को उसके प्राण या दैहिक स्वतंत्रता से विधि द्वारा स्थापित प्रक्रिया के अनुसार ही वंचित किया जाएगा।',
      mr: 'कोणत्याही व्यक्तीला तिच्या प्राणापासून किंवा वैयक्तिक स्वातंत्र्यापासून कायद्याने स्थापित प्रक्रियेनुसारच वंचित करता येईल.',
    },
    simplified: {
      en: 'Life and personal liberty cannot be taken away except by a procedure that a law has established. Courts have interpreted this article widely over time. CivicAI will not apply Article 21 to your personal facts or predict a court result.',
      hi: 'प्राण और दैहिक स्वतंत्रता कानून द्वारा स्थापित प्रक्रिया के बिना नहीं छीनी जा सकती। न्यायालय ने इसकी व्यापक व्याख्या की है। सिविकएआई आपके मामले का निर्णय नहीं करेगा।',
      mr: 'जीवन व वैयक्तिक स्वातंत्र्य कायद्याने ठरवलेल्या प्रक्रियेशिवाय काढता येत नाही. न्यायालयांनी व्यापक अर्थ लावला आहे. सिविकएआय तुमच्या प्रकरणाचा निर्णय देणार नाही.',
    },
    keyPoints: [
      { en: 'Available to every person, not only citizens.', hi: 'प्रत्येक व्यक्ति को, केवल नागरिकों को नहीं।', mr: 'प्रत्येक व्यक्तीला, फक्त नागरिकांना नाही.' },
      { en: 'Often read with Articles 14 and 19 in court cases — that is judicial interpretation, not extra text in Article 21 itself.', hi: 'अदालतों में अक्सर 14 और 19 के साथ पढ़ा जाता है — यह न्यायिक व्याख्या है।', mr: 'न्यायालयात अनेकदा १४ व १९ सोबत वाचले जाते — ही न्यायिक व्याख्या आहे.' },
    ],
    related: ['art-21a', 'art-14', 'art-19', 'art-22', 'art-32'],
    keywords: ['article 21', 'life', 'liberty', 'personal liberty', 'right to life', 'अनुच्छेद 21'],
    officialText:
      '21. Protection of life and personal liberty.—No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    officialSource: src('Article 21'),
  },
  {
    id: 'art-21a',
    article: '21A',
    title: { en: 'Right to education', hi: 'शिक्षा का अधिकार', mr: 'शिक्षणाचा अधिकार' },
    category: 'fundamental_rights',
    covers: {
      en: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
      hi: 'राज्य छह से चौदह वर्ष के सभी बच्चों को निःशुल्क और अनिवार्य शिक्षा ऐसी रीति से देगा जो राज्य विधि द्वारा अवधारित करे।',
      mr: 'राज्य सहा ते चौदा वर्षे वयोगटातील सर्व मुलांना मोफत व सक्तीचे शिक्षण राज्य कायद्याने ठरवेल त्या रीतीने देईल.',
    },
    simplified: {
      en: 'Children aged 6–14 have a constitutional right to free and compulsory education, in the manner a law provides. Details are in statutes such as the Right of Children to Free and Compulsory Education Act, 2009 — verify on India Code.',
      hi: '6–14 वर्ष के बच्चों को निःशुल्क अनिवार्य शिक्षा का संवैधानिक अधिकार है, जैसा कानून तय करे।',
      mr: '६–१४ वर्षे मुलांना मोफत सक्तीच्या शिक्षणाचा घटनात्मक अधिकार आहे, कायदा ठरवेल त्याप्रमाणे.',
    },
    keyPoints: [
      { en: 'Inserted by the Constitution (Eighty-sixth Amendment) Act, 2002.', hi: 'संविधान (छियासीवाँ संशोधन) अधिनियम, 2002 से जोड़ा गया।', mr: 'संविधान (शहाऐंशीवी दुरुस्ती) अधिनियम, २००२ ने समाविष्ट.' },
    ],
    related: ['art-21', 'art-45'],
    keywords: ['article 21a', 'education', 'rte', 'free and compulsory'],
    officialText:
      '21A. Right to education.—The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
    officialSource: src('Article 21A'),
  },
  {
    id: 'art-22',
    article: '22',
    title: { en: 'Protection against arrest and detention in certain cases', hi: 'कुछ दशाओं में गिरफ्तारी और निरोध से संरक्षण', mr: 'काही प्रकरणांत अटक व स्थानबद्धतेपासून संरक्षण' },
    category: 'fundamental_rights',
    covers: {
      en: 'Certain rights of a person who is arrested, and separate rules for preventive detention, as written in the article.',
      hi: 'गिरफ्तार व्यक्ति के कुछ अधिकार और निवारक निरोध के अलग नियम।',
      mr: 'अटक झालेल्या व्यक्तीचे काही अधिकार व प्रतिबंधक स्थानबद्धतेचे वेगळे नियम.',
    },
    simplified: {
      en: 'If someone is arrested, the Constitution writes some protections (such as being told the grounds and being produced before a magistrate). Preventive detention has different clauses. This is not a finding about any arrest.',
      hi: 'गिरफ्तारी पर कुछ संवैधानिक सुरक्षाएँ हैं। निवारक निरोध अलग है। यह किसी गिरफ्तारी का निष्कर्ष नहीं।',
      mr: 'अटकेवर काही घटनात्मक संरक्षणे आहेत. प्रतिबंधक स्थानबद्धता वेगळी आहे. ही कोणत्याही अटकेची निष्कर्ष नाही.',
    },
    keyPoints: [
      { en: 'Read the full official article; several clauses and exceptions apply.', hi: 'पूरा आधिकारिक अनुच्छेद पढ़ें।', mr: 'पूर्ण अधिकृत अनुच्छेद वाचा.' },
    ],
    related: ['art-21', 'art-20'],
    keywords: ['article 22', 'arrest', 'detention', 'magistrate'],
    officialText:
      '22. Protection against arrest and detention in certain cases.—Among other things, clause (1) provides that no person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest, nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice. The remaining clauses, including those on production before a magistrate and preventive detention, must be read from the official Constitution.',
    officialSource: src('Article 22'),
  },
  {
    id: 'art-32',
    article: '32',
    title: { en: 'Remedies for enforcement of rights conferred by this Part', hi: 'इस भाग द्वारा प्रदत्त अधिकारों को प्रवर्तित कराने के उपचार', mr: 'या भागाने दिलेले अधिकार लागू करण्यासाठी उपाय' },
    category: 'fundamental_rights',
    covers: {
      en: 'The right to move the Supreme Court for enforcement of Fundamental Rights, and the Court’s power to issue certain writs.',
      hi: 'मौलिक अधिकारों के प्रवर्तन के लिए उच्चतम न्यायालय जाने का अधिकार और रिट निकालने की शक्ति।',
      mr: 'मूलभूत अधिकार लागू करण्यासाठी सर्वोच्च न्यायालयात जाण्याचा अधिकार व रिट काढण्याची शक्ती.',
    },
    simplified: {
      en: 'If a Fundamental Right is violated, the Constitution itself gives a right to approach the Supreme Court. High Courts have a related power under Article 226. CivicAI cannot file a petition or say you will succeed.',
      hi: 'मौलिक अधिकार टूटने पर उच्चतम न्यायालय जा सकते हैं। उच्च न्यायालयों की शक्ति अनुच्छेद 226 में है। सिविकएआई याचिका नहीं दाखिल करता।',
      mr: 'मूलभूत अधिकार भंग झाल्यास सर्वोच्च न्यायालयात जाता येते. उच्च न्यायालयांची शक्ती अनुच्छेद २२६ मध्ये आहे. सिविकएआय याचिका दाखल करत नाही.',
    },
    keyPoints: [
      { en: 'Often described as a “guaranteed” remedy for Part III rights.', hi: 'भाग 3 अधिकारों का प्रत्याभूत उपचार कहा जाता है।', mr: 'भाग ३ अधिकारांचा हमी उपाय म्हणून सांगितले जाते.' },
    ],
    related: ['art-14', 'art-19', 'art-21', 'art-226'],
    keywords: ['article 32', 'writ', 'supreme court', 'remedy', 'fundamental rights'],
    officialText:
      '32. Remedies for enforcement of rights conferred by this Part.—(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. (2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part. Remaining clauses must be read from the official text.',
    officialSource: src('Article 32'),
  },
  {
    id: 'art-39',
    article: '39',
    title: { en: 'Certain principles of policy to be followed by the State', hi: 'राज्य द्वारा अनुसरणीय कुछ नीति तत्व', mr: 'राज्याने पाळावयाची काही धोरण तत्त्वे' },
    category: 'dpsp',
    covers: {
      en: 'Directive principles directing the State toward adequate means of livelihood, distribution of resources, equal pay and related policy aims.',
      hi: 'आजीविका, संसाधन वितरण, समान कार्य के लिए समान वेतन संबंधी नीति निदेश।',
      mr: 'उदरनिर्वाह, साधनसंपत्तीचे वाटप, समान कामास समान वेतन यांबाबत मार्गदर्शक तत्त्वे.',
    },
    simplified: {
      en: 'Directive Principles guide the State. They are not generally enforceable in the same way as Fundamental Rights (see Article 37). CivicAI will not treat a DPSP as a personal court claim.',
      hi: 'नीति निदेशक तत्व राज्य का मार्गदर्शन करते हैं। अनुच्छेद 37 के अनुसार ये मौलिक अधिकारों की तरह सामान्यतः प्रवर्तनीय नहीं।',
      mr: 'मार्गदर्शक तत्त्वे राज्याला दिशा देतात. अनुच्छेद ३७ नुसार ही मूलभूत अधिकारांसारखी सामान्यतः लागू करता येत नाहीत.',
    },
    keyPoints: [
      { en: 'Part IV — Directive Principles of State Policy.', hi: 'भाग 4 — राज्य की नीति के निदेशक तत्व।', mr: 'भाग ४ — राज्याच्या धोरणाची मार्गदर्शक तत्त्वे.' },
    ],
    related: ['art-37', 'art-21', 'art-21a'],
    keywords: ['article 39', 'directive principles', 'livelihood', 'equal pay'],
    officialText:
      '39. Certain principles of policy to be followed by the State.—The State shall, in particular, direct its policy towards securing—(a) that the citizens, men and women equally, have the right to an adequate means of livelihood; and further clauses including distribution of ownership and control of material resources, operation of the economic system, equal pay for equal work, and related aims. Read the official article in full.',
    officialSource: src('Article 39'),
  },
  {
    id: 'art-51a',
    article: '51A',
    title: { en: 'Fundamental duties', hi: 'मूल कर्तव्य', mr: 'मूलभूत कर्तव्ये' },
    category: 'fundamental_duties',
    covers: {
      en: 'A list of fundamental duties of every citizen of India, inserted by constitutional amendment.',
      hi: 'भारत के प्रत्येक नागरिक के मूल कर्तव्यों की सूची।',
      mr: 'भारताच्या प्रत्येक नागरिकाच्या मूलभूत कर्तव्यांची यादी.',
    },
    simplified: {
      en: 'Alongside rights, the Constitution lists duties — for example to abide by the Constitution and respect the National Flag and National Anthem. Duties are not the same as a criminal charge. CivicAI will not decide that a person has failed a duty.',
      hi: 'अधिकारों के साथ कर्तव्य भी हैं — संविधान का पालन, ध्वज और राष्ट्रगान का सम्मान आदि। सिविकएआई कर्तव्य भंग घोषित नहीं करेगा।',
      mr: 'अधिकारांसोबत कर्तव्येही आहेत — संविधानाचे पालन, ध्वज व राष्ट्रगीताचा आदर. सिविकएआय कर्तव्यभंग जाहीर करणार नाही.',
    },
    keyPoints: [
      { en: 'Part IVA, added by the 42nd Amendment; later expanded.', hi: 'भाग 4क, 42वें संशोधन से; बाद में विस्तार।', mr: 'भाग ४क, ४२व्या दुरुस्तीने; नंतर विस्तार.' },
    ],
    related: ['preamble', 'art-19'],
    keywords: ['article 51a', 'fundamental duties', 'duties', 'national flag'],
    officialText:
      '51A. Fundamental duties.—It shall be the duty of every citizen of India—(a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem; and further clauses (b) to (k) as enacted. Read the official list on the legislative website; CivicAI does not abridge the list here as a substitute for the official text.',
    officialSource: src('Article 51A'),
  },
  {
    id: 'art-74',
    article: '74',
    title: { en: 'Council of Ministers to aid and advise President', hi: 'राष्ट्रपति को सहायता और सलाह देने के लिए मंत्रि-परिषद', mr: 'राष्ट्रपतींना मदत व सल्ला देण्यासाठी मंत्रिमंडळ' },
    category: 'union',
    covers: {
      en: 'A Council of Ministers with the Prime Minister at the head to aid and advise the President, who shall, in the exercise of his functions, act in accordance with such advice, subject to the article.',
      hi: 'प्रधानमंत्री की अध्यक्षता में मंत्रि-परिषद राष्ट्रपति को सहायता और सलाह देती है।',
      mr: 'पंतप्रधानांच्या अध्यक्षतेखालील मंत्रिमंडळ राष्ट्रपतींना मदत व सल्ला देते.',
    },
    simplified: {
      en: 'At the Union level, the President acts on the aid and advice of the Council of Ministers headed by the Prime Minister, as this article provides. CivicAI does not interpret a political controversy.',
      hi: 'संघ में राष्ट्रपति प्रधानमंत्री की मंत्रि-परिषद की सहायता और सलाह पर कार्य करते हैं।',
      mr: 'केंद्रात राष्ट्रपती पंतप्रधानांच्या मंत्रिमंडळाच्या मदत व सल्ल्यानुसार कार्य करतात.',
    },
    keyPoints: [
      { en: 'Part V — The Union.', hi: 'भाग 5 — संघ।', mr: 'भाग ५ — संघ.' },
    ],
    related: ['art-75', 'art-163'],
    keywords: ['article 74', 'president', 'prime minister', 'council of ministers'],
    officialText:
      '74. Council of Ministers to aid and advise President.—(1) There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advice: Provided that the President may require the Council of Ministers to reconsider such advice… as set out in the official clause. Read the full article.',
    officialSource: src('Article 74'),
  },
  {
    id: 'art-163',
    article: '163',
    title: { en: 'Council of Ministers to aid and advise Governor', hi: 'राज्यपाल को सहायता और सलाह देने के लिए मंत्रि-परिषद', mr: 'राज्यपालांना मदत व सल्ला देण्यासाठी मंत्रिमंडळ' },
    category: 'state',
    covers: {
      en: 'A Council of Ministers with the Chief Minister at the head to aid and advise the Governor, except in so far as the Governor is by or under the Constitution required to act in his discretion.',
      hi: 'मुख्यमंत्री की अध्यक्षता में मंत्रि-परिषद राज्यपाल को सलाह देती है, सिवाय वहाँ जहाँ संविधान विवेक की अपेक्षा करे।',
      mr: 'मुख्यमंत्र्यांच्या अध्यक्षतेखालील मंत्रिमंडळ राज्यपालांना सल्ला देते, संविधान विवेक मागत असेल तेव्हा वगळता.',
    },
    simplified: {
      en: 'States have a similar aid-and-advice structure, with some constitutional discretion for the Governor. CivicAI will not decide whether a Governor’s action was valid.',
      hi: 'राज्यों में भी सहायता-सलाह संरचना है, राज्यपाल के कुछ संवैधानिक विवेक के साथ।',
      mr: 'राज्यांतही मदत-सल्ला रचना आहे, राज्यपालांच्या काही घटनात्मक विवेकासह.',
    },
    keyPoints: [{ en: 'Part VI — The States.', hi: 'भाग 6 — राज्य।', mr: 'भाग ६ — राज्ये.' }],
    related: ['art-74', 'art-356'],
    keywords: ['article 163', 'governor', 'chief minister', 'state government'],
    officialText:
      '163. Council of Ministers to aid and advise Governor.—(1) There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor in the exercise of his functions, except in so far as he is by or under this Constitution required to exercise his functions or any of them in his discretion. Remaining clauses must be read from the official text.',
    officialSource: src('Article 163'),
  },
  {
    id: 'art-226',
    article: '226',
    title: { en: 'Power of High Courts to issue certain writs', hi: 'कुछ रिट निकालने की उच्च न्यायालयों की शक्ति', mr: 'काही रिट काढण्याची उच्च न्यायालयांची शक्ती' },
    category: 'judiciary',
    covers: {
      en: 'Every High Court has power to issue directions, orders or writs for the enforcement of Fundamental Rights and for any other purpose, as provided in the article.',
      hi: 'प्रत्येक उच्च न्यायालय मौलिक अधिकारों और अन्य प्रयोजनों के लिए रिट निकाल सकता है।',
      mr: 'प्रत्येक उच्च न्यायालय मूलभूत अधिकार व इतर प्रयोजनांसाठी रिट काढू शकते.',
    },
    simplified: {
      en: 'High Courts can issue writs, including for Fundamental Rights and, unlike Article 32, also “for any other purpose” as the article states. This is not advice to file a case.',
      hi: 'उच्च न्यायालय रिट निकाल सकते हैं, मौलिक अधिकारों और “किसी अन्य प्रयोजन” के लिए भी। यह मुकदमा दायर करने की सलाह नहीं है।',
      mr: 'उच्च न्यायालय रिट काढू शकतात, मूलभूत अधिकार व “इतर कोणत्याही प्रयोजनासाठी”ही. हा खटला भरण्याचा सल्ला नाही.',
    },
    keyPoints: [{ en: 'Part VI — High Courts.', hi: 'भाग 6 — उच्च न्यायालय।', mr: 'भाग ६ — उच्च न्यायालये.' }],
    related: ['art-32', 'art-21'],
    keywords: ['article 226', 'high court', 'writ', 'mandamus', 'habeas corpus'],
    officialText:
      '226. Power of High Courts to issue certain writs.—(1) Notwithstanding anything in article 32, every High Court shall have power, throughout the territories in relation to which it exercises jurisdiction, to issue to any person or authority, including in appropriate cases, any Government, within those territories directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, or any of them, for the enforcement of any of the rights conferred by Part III and for any other purpose. Remaining clauses must be read from the official text.',
    officialSource: src('Article 226'),
  },
  {
    id: 'art-324',
    article: '324',
    title: { en: 'Superintendence, direction and control of elections', hi: 'निर्वाचनों का अधीक्षण, निदेशन और नियंत्रण', mr: 'निवडणुकांचे पर्यवेक्षण, निर्देश व नियंत्रण' },
    category: 'elections',
    covers: {
      en: 'The Election Commission’s superintendence, direction and control of the preparation of electoral rolls and the conduct of elections to Parliament, State legislatures, and offices of President and Vice-President, as provided.',
      hi: 'निर्वाचन आयोग का संसद, विधानमंडलों तथा राष्ट्रपति/उपराष्ट्रपति पद के निर्वाचनों पर अधीक्षण।',
      mr: 'निवडणूक आयोगाचे संसद, विधानमंडळे व राष्ट्रपती/उपराष्ट्रपती पदाच्या निवडणुकांवरील पर्यवेक्षण.',
    },
    simplified: {
      en: 'Elections named in this article are supervised by the Election Commission of India. CivicAI does not decide an election dispute.',
      hi: 'इस अनुच्छेद में नामित चुनाव भारत निर्वाचन आयोग देखता है। सिविकएआई चुनाव विवाद नहीं तय करता।',
      mr: 'या अनुच्छेदातील निवडणुका भारत निवडणूक आयोग पाहतो. निवडणूक वाद सिविकएआय ठरवत नाही.',
    },
    keyPoints: [{ en: 'Part XV — Elections.', hi: 'भाग 15 — निर्वाचन।', mr: 'भाग १५ — निवडणुका.' }],
    related: ['art-326'],
    keywords: ['article 324', 'election commission', 'elections', 'electoral rolls'],
    officialText:
      '324. Superintendence, direction and control of elections to be vested in an Election Commission.—(1) The superintendence, direction and control of the preparation of the electoral rolls for, and the conduct of, all elections to Parliament and to the Legislature of every State and of elections to the offices of President and Vice-President held under this Constitution shall be vested in a Commission (referred to in this Constitution as the Election Commission). Remaining clauses must be read from the official text.',
    officialSource: src('Article 324'),
  },
  {
    id: 'art-356',
    article: '356',
    title: { en: 'Provisions in case of failure of constitutional machinery in States', hi: 'राज्यों में सांविधानिक तंत्र के विफल हो जाने की दशा में उपबंध', mr: 'राज्यांत घटनात्मक यंत्रणा अयशस्वी झाल्यास तरतुदी' },
    category: 'emergency',
    covers: {
      en: 'If the President is satisfied, on receipt of a report from the Governor or otherwise, that a situation has arisen in which the government of a State cannot be carried on in accordance with the Constitution, certain powers may be exercised as written in the article.',
      hi: 'यदि राष्ट्रपति संतुष्ट हों कि राज्य का शासन संविधान के अनुसार नहीं चल सकता, तो अनुच्छेद में लिखी शक्तियाँ प्रयुक्त हो सकती हैं।',
      mr: 'राष्ट्रपतींना समाधान असेल की राज्याचे शासन संविधानाप्रमाणे चालू शकत नाही, तर अनुच्छेदातील शक्ती वापरता येतील.',
    },
    simplified: {
      en: 'This is the constitutional provision commonly associated with “President’s Rule”. It has conditions, parliamentary control and time limits in the official text. CivicAI will not say whether imposing or revoking it is lawful in a current event.',
      hi: 'इसे सामान्य भाषा में राष्ट्रपति शासन से जोड़ा जाता है। शर्तें और समय-सीमा आधिकारिक पाठ में हैं।',
      mr: 'याला सामान्यतः राष्ट्रपती राजवट म्हणतात. अटी व मुदत अधिकृत मजकुरात आहेत.',
    },
    keyPoints: [{ en: 'Part XVIII — Emergency provisions.', hi: 'भाग 18 — आपात उपबंध।', mr: 'भाग १८ — आणीबाणी तरतुदी.' }],
    related: ['art-352', 'art-360', 'art-163'],
    keywords: ['article 356', "president's rule", 'emergency', 'state machinery'],
    officialText:
      '356. Provisions in case of failure of constitutional machinery in States.—(1) If the President, on receipt of a report from the Governor of a State or otherwise, is satisfied that a situation has arisen in which the government of the State cannot be carried on in accordance with the provisions of this Constitution, the President may by Proclamation assume certain functions and powers as set out in the clause. Parliamentary approval, duration and other conditions are in the remaining clauses. Read the official article in full.',
    officialSource: src('Article 356'),
  },
  {
    id: 'art-368',
    article: '368',
    title: { en: 'Power of Parliament to amend the Constitution and procedure therefor', hi: 'संविधान का संशोधन करने की संसद की शक्ति और उसकी प्रक्रिया', mr: 'संविधान दुरुस्त करण्याची संसदेची शक्ती व प्रक्रिया' },
    category: 'amendments',
    covers: {
      en: 'How Parliament may amend the Constitution, including special majority and, in specified cases, ratification by State legislatures.',
      hi: 'संसद संविधान कैसे संशोधित कर सकती है, विशेष बहुमत और कुछ मामलों में राज्यों का अनुसमर्थन सहित।',
      mr: 'संसद संविधान कसे दुरुस्त करू शकते, विशेष बहुमत व काही प्रकरणांत राज्यांचे अनुमोदन.',
    },
    simplified: {
      en: 'The Constitution can be changed, but only through the procedure in Article 368. CivicAI does not opine on whether a particular amendment is valid.',
      hi: 'संविधान बदला जा सकता है, पर अनुच्छेद 368 की प्रक्रिया से। सिविकएआई किसी संशोधन की वैधता नहीं बताता।',
      mr: 'संविधान बदलता येते, पण अनुच्छेद ३६८ च्या प्रक्रियेने. एखादी दुरुस्ती वैध आहे का हे सिविकएआय सांगत नाही.',
    },
    keyPoints: [{ en: 'Part XX — Amendment of the Constitution.', hi: 'भाग 20 — संविधान का संशोधन।', mr: 'भाग २० — संविधानाची दुरुस्ती.' }],
    related: ['preamble', 'art-13'],
    keywords: ['article 368', 'amendment', 'special majority', 'ratification'],
    officialText:
      '368. Power of Parliament to amend the Constitution and procedure therefor.—(1) Notwithstanding anything in this Constitution, Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article. The remainder of the article, including majority and ratification requirements, must be read from the official text.',
    officialSource: src('Article 368'),
  },
]

function fromOfficial(o: (typeof OFFICIAL_ARTICLES)[number]): ConstitutionArticle {
  const label = o.article === 'Preamble' ? 'Preamble' : `Article ${o.article}`
  return {
    id: o.id,
    article: o.article,
    title: { en: o.titleEn, hi: o.titleEn, mr: o.titleEn },
    category: (o.category as ConstitutionCategory) || 'union',
    covers: {
      en: `Published official text of ${label} from the Constitution of India (as on 1 May 2026).`,
      hi: `Published official text of ${label} from the Constitution of India (as on 1 May 2026).`,
      mr: `Published official text of ${label} from the Constitution of India (as on 1 May 2026).`,
    },
    simplified: {
      en: `This record quotes the published official wording of ${label}. CivicAI will not apply it to your personal facts or predict a court result. Verify the official volume.`,
      hi: `This record quotes the published official wording of ${label}. CivicAI will not apply it to your personal facts or predict a court result.`,
      mr: `This record quotes the published official wording of ${label}. CivicAI will not apply it to your personal facts or predict a court result.`,
    },
    keyPoints: [
      {
        en: 'Source: Legislative Department pocket edition, as on 1 May 2026 (up to the 106th Amendment).',
        hi: 'Source: Legislative Department pocket edition, as on 1 May 2026 (up to the 106th Amendment).',
        mr: 'Source: Legislative Department pocket edition, as on 1 May 2026 (up to the 106th Amendment).',
      },
    ],
    related: [],
    keywords: [o.article.toLowerCase(), `article ${o.article}`.toLowerCase(), o.titleEn.toLowerCase()],
    officialText: o.text,
    officialSource: src(label),
  }
}

export const ALL_ARTICLES: ConstitutionArticle[] = (() => {
  const curated = ARTICLES.map((a) => {
    const off = OFFICIAL_ARTICLES.find((o) => o.id === a.id)
    return off
      ? {
          ...a,
          officialText: off.text,
          officialSource: src(a.article === 'Preamble' ? 'Preamble' : `Article ${a.article}`),
        }
      : a
  })
  const extra = OFFICIAL_ARTICLES.filter((o) => !curated.some((c) => c.id === o.id)).map(fromOfficial)
  return [...curated, ...extra]
})()

export function getArticle(id: string): ConstitutionArticle | undefined {
  return ALL_ARTICLES.find((a) => a.id === id)
}

export function searchArticles(q: string): ConstitutionArticle[] {
  const s = q.trim().toLowerCase()
  const pool = ALL_ARTICLES
  if (!s) return pool
  const stripped = s.replace(/^article\s+/, '')
  const exact = pool.filter((a) => a.article.toLowerCase() === stripped || a.id === s)
  if (exact.length && (/^article\s+/.test(s) || /^\d+[a-z]{0,2}$/.test(s))) return exact
  return pool.filter((a) => {
    const blob = `${a.article} article ${a.article} ${a.title.en} ${a.title.hi} ${a.covers.en} ${a.keywords.join(' ')} ${a.officialText}`.toLowerCase()
    return blob.includes(s) || s.includes(a.article.toLowerCase())
  })
}
