import type { AnalysisResult, DemoDocument } from '../types'

export const DEMO_DOCS: DemoDocument[] = [
  {
    id: 'demo-scholarship',
    title: {
      en: 'Sample scholarship form',
      hi: 'नमूना छात्रवृत्ति फॉर्म',
      mr: 'नमुना शिष्यवृत्ती फॉर्म',
    },
    description: {
      en: 'Maharashtra student scholarship application with a missing income certificate and one low-confidence field.',
      hi: 'महाराष्ट्र छात्रवृत्ति आवेदन — आय प्रमाणपत्र अनुपस्थित और एक कम-विश्वास फ़ील्ड।',
      mr: 'महाराष्ट्र शिष्यवृत्ती अर्ज — उत्पन्न प्रमाणपत्र गहाळ व एक कमी-विश्वास क्षेत्र.',
    },
    fileName: 'MH_Student_Scholarship_Application.pdf',
    kind: 'pdf',
    analysisId: 'demo-scholarship-mh',
  },
  {
    id: 'demo-income',
    title: {
      en: 'Sample income certificate checklist',
      hi: 'नमूना आय प्रमाणपत्र जाँच-सूची',
      mr: 'नमुना उत्पन्न प्रमाणपत्र यादी',
    },
    description: {
      en: 'Tehsildar / Aaple Sarkar income certificate requirement notice.',
      hi: 'तहसीलदार / आपले सरकार आय प्रमाणपत्र आवश्यकता सूचना।',
      mr: 'तहसीलदार / आपले सरकार उत्पन्न प्रमाणपत्र गरज सूचना.',
    },
    fileName: 'Income_Certificate_Checklist_Pune.pdf',
    kind: 'pdf',
    analysisId: 'demo-income-mh',
  },
  {
    id: 'demo-domicile',
    title: {
      en: 'Sample domicile application notice',
      hi: 'नमूना अधिवास आवेदन सूचना',
      mr: 'नमुना अधिवास अर्ज सूचना',
    },
    description: {
      en: 'Slightly glare-affected scan of a domicile notice — quality check is shown first.',
      hi: 'अधिवास सूचना का चमक वाला स्कैन — पहले गुणवत्ता जाँच।',
      mr: 'अधिवास सूचनेचा चमक असलेला स्कॅन — आधी गुणवत्ता तपासणी.',
    },
    fileName: 'Domicile_Application_Notice_scan.jpg',
    kind: 'notice',
    analysisId: 'demo-domicile-mh',
    qualityPreview: true,
  },
]

const extractedScholarship = `GOVERNMENT OF MAHARASHTRA
Higher and Technical Education Department
Sample form for demonstration — not an official blank

MAHARASHTRA STUDENT SCHOLARSHIP APPLICATION
Academic Year 2026-27

Application No.: SCH-2026-MH-18422
Applicant: Priya S. (name partially printed)
Date of birth: 14/08/2005
Gender: Female
Category (as filled): Open / EWS — confirm
Domicile: Maharashtra (Yes)
District: Pune
Institute: Government College of Arts, Pune
Course: B.A. Second Year
Annual family income (declared): Rs. 1,80,000
Income limit printed on form: Rs. 2,50,000 for the referenced GOI post-matric pathway;
EBC / RCSM pathway on the same notice refers applicants to MahaDBT for the notified ceiling.

Last date to upload documents on the scholarship portal: 30 September 2026
Application method: Online through MahaDBT
Helpdesk: Student Welfare Cell, institute, 10:00–17:00 on working days

Documents required (tick):
[x] Aadhaar card
[x] Previous year marksheet
[ ] Income certificate issued by competent authority
[x] Domicile certificate
[ ] Bank passbook (student name, Aadhaar seeded) — copy unclear
[x] College bonafide / admission receipt

Fee: No application fee stated on this sample page.
Authority: Institute verification + concerned department on MahaDBT.

Note: This page is a CivicAI demonstration extract. It is not a government form.`

export const ANALYSES: Record<string, AnalysisResult> = {
  'demo-scholarship-mh': {
    id: 'demo-scholarship-mh',
    documentName: 'MH_Student_Scholarship_Application.pdf',
    documentType: {
      en: 'Student scholarship application (Maharashtra)',
      hi: 'विद्यार्थी छात्रवृत्ति आवेदन (महाराष्ट्र)',
      mr: 'विद्यार्थी शिष्यवृत्ती अर्ज (महाराष्ट्र)',
    },
    purpose: {
      en: 'Collect student details and supporting documents so the institute can verify a MahaDBT / scholarship application.',
      hi: 'महाडीबीटी / छात्रवृत्ति आवेदन सत्यापन के लिए विद्यार्थी विवरण और दस्तावेज़ एकत्र करना।',
      mr: 'महाडीबीटी / शिष्यवृत्ती अर्ज पडताळणीसाठी विद्यार्थी तपशील व कागदपत्रे गोळा करणे.',
    },
    issuingAuthority: 'Sample institute notice referring Higher & Technical Education / MahaDBT (prototype extract)',
    language: 'English (with Marathi headings on original)',
    status: 'Preliminary analysis complete — user confirmation required',
    explanation: [
      {
        en: 'This looks like a student scholarship application checklist for a Maharashtra college student. It is asking you to finish an online application and attach proofs. It is not a sanction letter and it is not proof that money will be paid.',
        hi: 'यह महाराष्ट्र के महाविद्यालय विद्यार्थी के लिए छात्रवृत्ति आवेदन जाँच-सूची लगता है। यह ऑनलाइन आवेदन पूरा करने और प्रमाण जोड़ने को कहता है। यह स्वीकृति पत्र नहीं है और भुगतान की गारंटी नहीं है।',
        mr: 'हे महाराष्ट्रातील महाविद्यालयीन विद्यार्थ्यासाठी शिष्यवृत्ती अर्ज यादी वाटते. ऑनलाइन अर्ज पूर्ण करून पुरावे जोडण्यास सांगते. हे मंजुरी पत्र नाही आणि पैशांची हमी नाही.',
      },
      {
        en: 'The form records a declared family income of ₹1,80,000 and prints an income limit of ₹2,50,000 for a Government of India post-matric pathway. A second pathway (EBC / Shahu Maharaj fee scholarship) is only pointed to MahaDBT — CivicAI does not treat that as a guaranteed match.',
        hi: 'फॉर्म में घोषित पारिवारिक आय ₹1,80,000 है और भारत सरकार पोस्ट-मैट्रिक मार्ग के लिए ₹2,50,000 की सीमा छपी है। दूसरा मार्ग केवल महाडीबीटी की ओर संकेत करता है।',
        mr: 'फॉर्मवर घोषित कौटुंबिक उत्पन्न ₹1,80,000 आहे आणि भारत सरकार पोस्ट-मॅट्रिक मार्गासाठी ₹2,50,000 मर्यादा छापली आहे. दुसरा मार्ग फक्त महाडीबीटीकडे निर्देश करतो.',
      },
      {
        en: 'One required item is unchecked: the income certificate. Bank passbook text is hard to read, so that field is marked low confidence. Confirm every personal detail before you submit anything on an official portal.',
        hi: 'एक आवश्यक वस्तु अनटिक है: आय प्रमाणपत्र। बैंक पासबुक अस्पष्ट है, इसलिए कम विश्वास। आधिकारिक पोर्टल पर कुछ भी जमा करने से पहले हर व्यक्तिगत विवरण की पुष्टि करें।',
        mr: 'एक आवश्यक बाब अनटिक आहे: उत्पन्न प्रमाणपत्र. बँक पासबुक अस्पष्ट आहे, म्हणून कमी विश्वास. अधिकृत पोर्टलवर काहीही सादर करण्यापूर्वी प्रत्येक वैयक्तिक तपशील निश्चित करा.',
      },
    ],
    fields: [
      {
        id: 'f-name',
        label: { en: 'Applicant name', hi: 'आवेदक का नाम', mr: 'अर्जदाराचे नाव' },
        value: 'Priya S*****',
        confidence: 'medium',
        page: 1,
        evidenceText: 'Applicant: Priya S. (name partially printed)',
        confirmed: false,
        sensitive: true,
      },
      {
        id: 'f-appno',
        label: { en: 'Application number', hi: 'आवेदन संख्या', mr: 'अर्ज क्रमांक' },
        value: 'SCH-2026-MH-18422',
        confidence: 'high',
        page: 1,
        evidenceText: 'Application No.: SCH-2026-MH-18422',
        confirmed: false,
      },
      {
        id: 'f-deadline',
        label: { en: 'Deadline printed on document', hi: 'दस्तावेज़ पर छपी अंतिम तिथि', mr: 'कागदपत्रावरील अंतिम मुदत' },
        value: '30 September 2026',
        confidence: 'high',
        page: 1,
        evidenceText: 'Last date to upload documents on the scholarship portal: 30 September 2026',
        confirmed: false,
      },
      {
        id: 'f-income-declared',
        label: { en: 'Declared annual family income', hi: 'घोषित वार्षिक पारिवारिक आय', mr: 'घोषित वार्षिक कौटुंबिक उत्पन्न' },
        value: '₹1,80,000',
        confidence: 'high',
        page: 1,
        evidenceText: 'Annual family income (declared): Rs. 1,80,000',
        confirmed: false,
        sensitive: true,
      },
      {
        id: 'f-income-limit',
        label: { en: 'Income limit printed for GOI post-matric pathway', hi: 'गोआई पोस्ट-मैट्रिक मार्ग की छपी आय सीमा', mr: 'गोआई पोस्ट-मॅट्रिक मार्गाची छापलेली उत्पन्न मर्यादा' },
        value: '₹2,50,000',
        confidence: 'high',
        page: 1,
        evidenceText: 'Income limit printed on form: Rs. 2,50,000 for the referenced GOI post-matric pathway',
        confirmed: false,
      },
      {
        id: 'f-authority',
        label: { en: 'Application method / authority', hi: 'आवेदन विधि / प्राधिकरण', mr: 'अर्ज पद्धत / प्राधिकरण' },
        value: 'Online through MahaDBT; institute verification',
        confidence: 'high',
        page: 1,
        evidenceText: 'Application method: Online through MahaDBT',
        confirmed: false,
      },
      {
        id: 'f-fee',
        label: { en: 'Fee stated on this page', hi: 'इस पृष्ठ पर उल्लिखित शुल्क', mr: 'या पृष्ठावर नमूद शुल्क' },
        value: 'No application fee stated',
        confidence: 'medium',
        page: 1,
        evidenceText: 'Fee: No application fee stated on this sample page.',
        confirmed: false,
      },
      {
        id: 'f-bank',
        label: { en: 'Bank details', hi: 'बैंक विवरण', mr: 'बँक तपशील' },
        value: 'Passbook copy unclear — account number not extracted',
        confidence: 'low',
        page: 1,
        evidenceText: '[ ] Bank passbook (student name, Aadhaar seeded) — copy unclear',
        confirmed: false,
        sensitive: true,
      },
      {
        id: 'f-district',
        label: { en: 'District', hi: 'ज़िला', mr: 'जिल्हा' },
        value: 'Pune',
        confidence: 'high',
        page: 1,
        evidenceText: 'District: Pune',
        confirmed: false,
      },
    ],
    requirements: [
      {
        id: 'req-aadhaar',
        title: { en: 'Aadhaar card', hi: 'आधार कार्ड', mr: 'आधार कार्ड' },
        detail: { en: 'Ticked as attached on the sample form.', hi: 'नमूना फॉर्म पर संलग्न चिह्नित।', mr: 'नमुना फॉर्मवर जोडले म्हणून खूण.' },
        status: 'completed',
        notes: '',
      },
      {
        id: 'req-marksheet',
        title: { en: 'Previous year academic marksheet', hi: 'पिछले वर्ष की अंकतालिका', mr: 'मागील वर्षाची गुणपत्रिका' },
        detail: { en: 'Ticked as attached.', hi: 'संलग्न चिह्नित।', mr: 'जोडले म्हणून खूण.' },
        status: 'completed',
        notes: '',
      },
      {
        id: 'req-domicile',
        title: { en: 'Domicile certificate', hi: 'अधिवास प्रमाणपत्र', mr: 'अधिवास प्रमाणपत्र' },
        detail: { en: 'Ticked as attached. Still confirm the certificate is current and in the student name.', hi: 'संलग्न चिह्नित। फिर भी प्रमाणपत्र वर्तमान और विद्यार्थी के नाम पर है, पुष्टि करें।', mr: 'जोडले म्हणून खूण. प्रमाणपत्र चालू व विद्यार्थ्याच्या नावावर आहे का ते निश्चित करा.' },
        status: 'needs_confirmation',
        notes: '',
      },
      {
        id: 'req-income',
        title: { en: 'Income certificate from competent authority', hi: 'सक्षम प्राधिकारी का आय प्रमाणपत्र', mr: 'सक्षम प्राधिकाऱ्याचे उत्पन्न प्रमाणपत्र' },
        detail: { en: 'Unchecked on the form. This is the blocking missing document for most scholarship uploads.', hi: 'फॉर्म पर अनटिक। अधिकांश छात्रवृत्ति अपलोड के लिए यह अवरोधक कमी है।', mr: 'फॉर्मवर अनटिक. बहुतेक शिष्यवृत्ती अपलोडसाठी ही अडथळा ठरणारी कमतरता आहे.' },
        status: 'missing',
        notes: '',
      },
      {
        id: 'req-bank',
        title: { en: 'Student bank passbook (Aadhaar seeded)', hi: 'विद्यार्थी बैंक पासबुक (आधार सीडेड)', mr: 'विद्यार्थी बँक पासबुक (आधार सीडेड)' },
        detail: { en: 'Listed but the scan is unclear. Confirm account is in the student name.', hi: 'सूचीबद्ध पर स्कैन अस्पष्ट। खाता विद्यार्थी के नाम पर है, पुष्टि करें।', mr: 'सूचीबद्ध पण स्कॅन अस्पष्ट. खाते विद्यार्थ्याच्या नावावर आहे का ते निश्चित करा.' },
        status: 'needs_confirmation',
        notes: '',
      },
      {
        id: 'req-bonafide',
        title: { en: 'College bonafide / admission receipt', hi: 'कॉलेज बोनाफाइड / प्रवेश रसीद', mr: 'महाविद्यालय बोनाफाइड / प्रवेश पावती' },
        detail: { en: 'Ticked as attached.', hi: 'संलग्न चिह्नित।', mr: 'जोडले म्हणून खूण.' },
        status: 'completed',
        notes: '',
      },
      {
        id: 'req-caste',
        title: { en: 'Caste certificate', hi: 'जाति प्रमाणपत्र', mr: 'जात प्रमाणपत्र' },
        detail: { en: 'Not requested on this open/EWS sample page.', hi: 'इस ओपन/ईडब्ल्यूएस नमूना पृष्ठ पर नहीं माँगा गया।', mr: 'या खुला/ईडब्ल्यूएस नमुना पृष्ठावर मागितले नाही.' },
        status: 'not_applicable',
        notes: '',
      },
    ],
    actions: [
      {
        id: 'act-income',
        what: {
          en: 'Apply for an income certificate from the competent revenue authority.',
          hi: 'सक्षम राजस्व प्राधिकारी से आय प्रमाणपत्र के लिए आवेदन करें।',
          mr: 'सक्षम महसूल प्राधिकाऱ्याकडे उत्पन्न प्रमाणपत्रासाठी अर्ज करा.',
        },
        where: {
          en: 'Aaple Sarkar portal or the local Tehsildar / CSC as directed on the state portal.',
          hi: 'आपले सरकार पोर्टल या स्थानीय तहसीलदार / सीएससी।',
          mr: 'आपले सरकार पोर्टल किंवा स्थानिक तहसीलदार / सीएससी.',
        },
        documents: [
          { en: 'Identity and address proof', hi: 'पहचान और पता प्रमाण', mr: 'ओळख व पत्ता पुरावा' },
          { en: 'Income evidence as notified', hi: 'अधिसूचित आय प्रमाण', mr: 'अधिसूचित उत्पन्न पुरावा' },
        ],
        deadline: 'Before 30 September 2026 (date printed on the uploaded sample)',
        officialLink: 'https://aaplesarkar.mahaonline.gov.in',
        officialLinkLabel: 'Aaple Sarkar',
        nextStep: {
          en: 'After the certificate is issued, upload it on MahaDBT and ask the institute cell to verify.',
          hi: 'प्रमाणपत्र जारी होने के बाद महाडीबीटी पर अपलोड करें और संस्थान से सत्यापन करवाएँ।',
          mr: 'प्रमाणपत्र मिळाल्यावर महाडीबीटीवर अपलोड करा आणि संस्थेकडून पडताळणी करून घ्या.',
        },
        mode: 'both',
      },
      {
        id: 'act-mahadbt',
        what: {
          en: 'Complete / review the online scholarship application.',
          hi: 'ऑनलाइन छात्रवृत्ति आवेदन पूरा / समीक्षा करें।',
          mr: 'ऑनलाइन शिष्यवृत्ती अर्ज पूर्ण / तपासा.',
        },
        where: {
          en: 'Official MahaDBT portal (Maharashtra Direct Benefit Transfer).',
          hi: 'आधिकारिक महाडीबीटी पोर्टल।',
          mr: 'अधिकृत महाडीबीटी पोर्टल.',
        },
        documents: [
          { en: 'All ticked documents plus income certificate', hi: 'सभी चिह्नित दस्तावेज़ और आय प्रमाणपत्र', mr: 'सर्व खूण केलेली कागदपत्रे व उत्पन्न प्रमाणपत्र' },
        ],
        deadline: '30 September 2026 (printed on sample; confirm live portal dates)',
        officialLink: 'https://mahadbt.maharashtra.gov.in',
        officialLinkLabel: 'MahaDBT',
        nextStep: {
          en: 'Track application status only on the official portal after institute verification.',
          hi: 'संस्थान सत्यापन के बाद स्थिति केवल आधिकारिक पोर्टल पर देखें।',
          mr: 'संस्था पडताळणीनंतर स्थिती फक्त अधिकृत पोर्टलवर पहा.',
        },
        mode: 'online',
      },
      {
        id: 'act-bank',
        what: {
          en: 'Replace the unclear bank passbook page and confirm Aadhaar seeding.',
          hi: 'अस्पष्ट पासबुक पृष्ठ बदलें और आधार सीडिंग की पुष्टि करें।',
          mr: 'अस्पष्ट पासबुक पृष्ठ बदला आणि आधार सीडिंग निश्चित करा.',
        },
        where: {
          en: 'Your bank branch / official bank app, then re-upload on MahaDBT.',
          hi: 'अपनी बैंक शाखा / आधिकारिक ऐप, फिर महाडीबीटी पर पुनः अपलोड।',
          mr: 'तुमची बँक शाखा / अधिकृत अॅप, नंतर महाडीबीटीवर पुन्हा अपलोड.',
        },
        documents: [{ en: 'Passbook first page in student name', hi: 'विद्यार्थी नाम की पासबुक प्रथम पृष्ठ', mr: 'विद्यार्थ्याच्या नावाचे पासबुक पहिले पान' }],
        nextStep: {
          en: 'Do not type account numbers into unofficial websites.',
          hi: 'अनौपचारिक वेबसाइटों पर खाता संख्या न लिखें।',
          mr: 'अनोधिकृत संकेतस्थळांवर खाते क्रमांक लिहू नका.',
        },
        mode: 'both',
      },
    ],
    schemeIds: ['goi-sc-pms', 'rcsm-ebc', 'income-cert', 'domicile-cert', 'nsp', 'myscheme'],
    evidenceTrail: [
      {
        id: 'e1',
        type: 'document',
        title: { en: 'Uploaded: Scholarship application PDF', hi: 'अपलोड: छात्रवृत्ति आवेदन पीडीएफ', mr: 'अपलोड: शिष्यवृत्ती अर्ज पीडीएफ' },
        detail: { en: 'MH_Student_Scholarship_Application.pdf (prototype sample)', hi: 'नमूना पीडीएफ (प्रोटोटाइप)', mr: 'नमुना पीडीएफ (प्रोटोटाइप)' },
      },
      {
        id: 'e2',
        type: 'field',
        title: { en: 'Extracted: income limit ₹2,50,000', hi: 'निकाला: आय सीमा ₹2,50,000', mr: 'काढले: उत्पन्न मर्यादा ₹2,50,000' },
        detail: { en: 'Printed on page 1 for the referenced GOI post-matric pathway.', hi: 'पृष्ठ 1 पर गोआई पोस्ट-मैट्रिक मार्ग के लिए छपा।', mr: 'पृष्ठ १ वर गोआई पोस्ट-मॅट्रिक मार्गासाठी छापले.' },
      },
      {
        id: 'e3',
        type: 'field',
        title: { en: 'Declared income ₹1,80,000', hi: 'घोषित आय ₹1,80,000', mr: 'घोषित उत्पन्न ₹1,80,000' },
        detail: { en: 'User still needs to confirm this figure. It is not a verified tax assessment.', hi: 'उपयोगकर्ता को अभी इस आँकड़े की पुष्टि करनी है।', mr: 'वापरकर्त्याने हा आकडा अजून निश्चित करायचा आहे.' },
      },
      {
        id: 'e4',
        type: 'rule',
        title: { en: 'Rule result: income condition appears satisfied for the printed ₹2.5 lakh pathway', hi: 'नियम: छपी ₹2.5 लाख सीमा के लिए आय शर्त पूरी दिखती है', mr: 'नियम: छापलेल्या ₹2.5 लाख मर्यादेसाठी उत्पन्न अट पूर्ण दिसते' },
        detail: { en: 'Preliminary only. Category and other conditions are not fully evidenced on this page.', hi: 'केवल प्रारंभिक। श्रेणी और अन्य शर्तें इस पृष्ठ पर पूरी नहीं।', mr: 'फक्त प्राथमिक. प्रवर्ग व इतर अटी या पृष्ठावर पूर्ण नाहीत.' },
      },
      {
        id: 'e5',
        type: 'requirement',
        title: { en: 'Missing item: income certificate', hi: 'अनुपस्थित: आय प्रमाणपत्र', mr: 'गहाळ: उत्पन्न प्रमाणपत्र' },
        detail: { en: 'Unchecked box on the uploaded checklist.', hi: 'अपलोड जाँच-सूची पर अनटिक बॉक्स।', mr: 'अपलोड यादीवर अनटिक चौकट.' },
      },
      {
        id: 'e6',
        type: 'source',
        title: { en: 'Official source to verify: MahaDBT and Aaple Sarkar', hi: 'सत्यापन स्रोत: महाडीबीटी और आपले सरकार', mr: 'पडताळणी स्रोत: महाडीबीटी व आपले सरकार' },
        detail: { en: 'https://mahadbt.maharashtra.gov.in and https://aaplesarkar.mahaonline.gov.in', hi: 'आधिकारिक पोर्टल लिंक', mr: 'अधिकृत पोर्टल दुवे' },
      },
      {
        id: 'e7',
        type: 'action',
        title: { en: 'Recommended action: obtain income certificate, then upload on MahaDBT', hi: 'सुझाव: आय प्रमाणपत्र प्राप्त करें, फिर महाडीबीटी पर अपलोड करें', mr: 'शिफारस: उत्पन्न प्रमाणपत्र मिळवा, नंतर महाडीबीटीवर अपलोड करा' },
        detail: { en: 'Not an official instruction. Confirm dates and scheme codes on the live portal.', hi: 'आधिकारिक निर्देश नहीं। लाइव पोर्टल पर तिथियाँ जाँचें।', mr: 'अधिकृत निर्देश नाही. लाइव्ह पोर्टलवर तारखा तपासा.' },
      },
    ],
    qualityIssues: [
      {
        type: 'low_ocr',
        severity: 'warning',
        message: {
          en: 'Bank passbook area has low OCR confidence. Do not treat the missing account number as a fact.',
          hi: 'बैंक पासबुक क्षेत्र में ओसीआर विश्वास कम है। अनुपस्थित खाता संख्या को तथ्य न मानें।',
          mr: 'बँक पासबुक क्षेत्रात ओसीआर विश्वास कमी आहे. गहाळ खाते क्रमांक तथ्य मानू नका.',
        },
      },
    ],
    extractedText: extractedScholarship,
    createdAt: '2026-08-19T09:00:00+05:30',
    prototype: true,
  },
  'demo-income-mh': {
    id: 'demo-income-mh',
    documentName: 'Income_Certificate_Checklist_Pune.pdf',
    documentType: {
      en: 'Income certificate document checklist / citizen notice',
      hi: 'आय प्रमाणपत्र दस्तावेज़ सूची / नागरिक सूचना',
      mr: 'उत्पन्न प्रमाणपत्र कागदपत्र यादी / नागरिक सूचना',
    },
    purpose: {
      en: 'Tell a citizen which proofs are typically collected for an income certificate application in a Maharashtra revenue office / Aaple Sarkar flow.',
      hi: 'महाराष्ट्र राजस्व / आपले सरकार प्रवाह में आय प्रमाणपत्र के लिए सामान्य प्रमाण बताना।',
      mr: 'महाराष्ट्र महसूल / आपले सरकार प्रवाहात उत्पन्न प्रमाणपत्रासाठी सामान्य पुरावे सांगणे.',
    },
    issuingAuthority: 'Sample Pune revenue helpdesk notice (prototype — not a signed government order)',
    language: 'English / Marathi',
    status: 'Preliminary analysis complete — user confirmation required',
    explanation: [
      {
        en: 'This page is a checklist for applying for an income certificate. It is not the certificate itself. It lists proofs the helpdesk wants you to carry or upload.',
        hi: 'यह पृष्ठ आय प्रमाणपत्र के आवेदन की जाँच-सूची है, स्वयं प्रमाणपत्र नहीं।',
        mr: 'हे पृष्ठ उत्पन्न प्रमाणपत्राच्या अर्जाची यादी आहे, प्रमाणपत्र स्वतः नाही.',
      },
      {
        en: 'The notice says applications can be started on Aaple Sarkar and that the competent authority is the Tehsildar. A service charge line is faint and marked low confidence.',
        hi: 'सूचना कहती है आवेदन आपले सरकार पर शुरू हो सकते हैं और सक्षम प्राधिकारी तहसीलदार हैं। सेवा शुल्क पंक्ति धुंधली है।',
        mr: 'सूचना सांगते अर्ज आपले सरकारवर सुरू होऊ शकतात आणि सक्षम प्राधिकारी तहसीलदार आहेत. सेवा शुल्क ओळ अस्पष्ट आहे.',
      },
    ],
    fields: [
      {
        id: 'inc-auth',
        label: { en: 'Competent authority mentioned', hi: 'उल्लिखित सक्षम प्राधिकारी', mr: 'नमूद सक्षम प्राधिकारी' },
        value: 'Tehsildar',
        confidence: 'high',
        page: 1,
        evidenceText: 'Competent authority: Tehsildar / authorised revenue officer',
        confirmed: false,
      },
      {
        id: 'inc-method',
        label: { en: 'Application method', hi: 'आवेदन विधि', mr: 'अर्ज पद्धत' },
        value: 'Aaple Sarkar online or CSC / office facilitation',
        confidence: 'high',
        page: 1,
        evidenceText: 'Apply through Aaple Sarkar or authorised Citizen Service Centre',
        confirmed: false,
      },
      {
        id: 'inc-fee',
        label: { en: 'Service charge mentioned', hi: 'उल्लिखित सेवा शुल्क', mr: 'नमूद सेवा शुल्क' },
        value: 'Amount unclear on scan',
        confidence: 'low',
        page: 1,
        evidenceText: 'Service charge: ₹[illegible] as applicable — confirm on portal',
        confirmed: false,
      },
      {
        id: 'inc-validity',
        label: { en: 'Validity note', hi: 'वैधता नोट', mr: 'वैधता टीप' },
        value: 'Use a certificate issued for the current academic / financial year as required by the receiving office',
        confidence: 'medium',
        page: 1,
        evidenceText: 'Receiving offices often insist on a certificate for the current year — confirm with the scholarship cell.',
        confirmed: false,
      },
    ],
    requirements: [
      {
        id: 'inc-id',
        title: { en: 'Photo identity proof', hi: 'फोटो पहचान प्रमाण', mr: 'फोटो ओळख पुरावा' },
        detail: { en: 'Listed as mandatory on the notice.', hi: 'सूचना पर अनिवार्य।', mr: 'सूचनेवर अनिवार्य.' },
        status: 'needs_confirmation',
        notes: '',
      },
      {
        id: 'inc-address',
        title: { en: 'Address proof', hi: 'पता प्रमाण', mr: 'पत्ता पुरावा' },
        detail: { en: 'Ration card / other proof as accepted locally.', hi: 'राशन कार्ड / स्थानीय रूप से स्वीकृत अन्य प्रमाण।', mr: 'रेशन कार्ड / स्थानिक स्वीकृत इतर पुरावा.' },
        status: 'needs_confirmation',
        notes: '',
      },
      {
        id: 'inc-income-proof',
        title: { en: 'Income evidence (salary slip / affidavit / other notified proof)', hi: 'आय प्रमाण (वेतन पर्ची / शपथपत्र / अन्य)', mr: 'उत्पन्न पुरावा (पगार चिठ्ठी / प्रतिज्ञापत्र / इतर)' },
        detail: { en: 'Not attached in this demo session.', hi: 'इस डेमो सत्र में संलग्न नहीं।', mr: 'या डेमो सत्रात जोडले नाही.' },
        status: 'missing',
        notes: '',
      },
      {
        id: 'inc-photo',
        title: { en: 'Passport-size photograph', hi: 'पासपोर्ट आकार की फोटो', mr: 'पासपोर्ट आकाराचा फोटो' },
        detail: { en: 'If the current online form still asks for it.', hi: 'यदि वर्तमान ऑनलाइन फॉर्म माँगे।', mr: 'सध्याचा ऑनलाइन फॉर्म मागत असेल तर.' },
        status: 'needs_confirmation',
        notes: '',
      },
    ],
    actions: [
      {
        id: 'inc-apply',
        what: { en: 'Start the income certificate application on the official state portal.', hi: 'आधिकारिक राज्य पोर्टल पर आय प्रमाणपत्र आवेदन शुरू करें।', mr: 'अधिकृत राज्य पोर्टलवर उत्पन्न प्रमाणपत्र अर्ज सुरू करा.' },
        where: { en: 'Aaple Sarkar — Maharashtra', hi: 'आपले सरकार — महाराष्ट्र', mr: 'आपले सरकार — महाराष्ट्र' },
        documents: [
          { en: 'ID, address and income proofs', hi: 'पहचान, पता और आय प्रमाण', mr: 'ओळख, पत्ता व उत्पन्न पुरावे' },
        ],
        officialLink: 'https://aaplesarkar.mahaonline.gov.in',
        officialLinkLabel: 'Aaple Sarkar',
        nextStep: { en: 'Collect the signed / digitally issued certificate and store a copy in DigiLocker if offered.', hi: 'हस्ताक्षरित / डिजिटल प्रमाणपत्र लें और यदि मिले तो डिजीलाकर में रखें।', mr: 'स्वाक्षांकित / डिजिटल प्रमाणपत्र घ्या आणि मिळाल्यास डिजीलॉकरमध्ये ठेवा.' },
        mode: 'both',
      },
      {
        id: 'inc-digi',
        what: { en: 'Check whether an issued certificate can be pulled into DigiLocker.', hi: 'जारी प्रमाणपत्र डिजीलाकर में आ सकता है या नहीं जाँचें।', mr: 'जारी प्रमाणपत्र डिजीलॉकरमध्ये येऊ शकते का ते तपासा.' },
        where: { en: 'DigiLocker official website / app', hi: 'डिजीलाकर आधिकारिक वेबसाइट / ऐप', mr: 'डिजीलॉकर अधिकृत संकेतस्थळ / अॅप' },
        documents: [{ en: 'Aadhaar-linked mobile', hi: 'आधार-लिंक मोबाइल', mr: 'आधार-लिंक मोबाइल' }],
        officialLink: 'https://www.digilocker.gov.in',
        officialLinkLabel: 'DigiLocker',
        nextStep: { en: 'Share only through official request flows. Do not post the certificate publicly.', hi: 'केवल आधिकारिक अनुरोध से साझा करें।', mr: 'फक्त अधिकृत विनंतीने शेअर करा.' },
        mode: 'online',
      },
    ],
    schemeIds: ['income-cert', 'domicile-cert', 'digilocker', 'rcsm-ebc', 'myscheme'],
    evidenceTrail: [
      {
        id: 'ie1',
        type: 'document',
        title: { en: 'Uploaded: income certificate checklist', hi: 'अपलोड: आय प्रमाणपत्र सूची', mr: 'अपलोड: उत्पन्न प्रमाणपत्र यादी' },
        detail: { en: 'Income_Certificate_Checklist_Pune.pdf', hi: 'नमूना पीडीएफ', mr: 'नमुना पीडीएफ' },
      },
      {
        id: 'ie2',
        type: 'field',
        title: { en: 'Extracted authority: Tehsildar', hi: 'निकाला प्राधिकारी: तहसीलदार', mr: 'काढलेला प्राधिकारी: तहसीलदार' },
        detail: { en: 'Page 1 of the notice.', hi: 'सूचना का पृष्ठ 1।', mr: 'सूचनेचे पृष्ठ १.' },
      },
      {
        id: 'ie3',
        type: 'requirement',
        title: { en: 'Missing: income evidence attachment in this session', hi: 'अनुपस्थित: इस सत्र में आय प्रमाण', mr: 'गहाळ: या सत्रात उत्पन्न पुरावा' },
        detail: { en: 'Checklist item not marked complete.', hi: 'सूची मद पूर्ण नहीं।', mr: 'यादीतील बाब पूर्ण नाही.' },
      },
      {
        id: 'ie4',
        type: 'source',
        title: { en: 'Official source: Aaple Sarkar', hi: 'आधिकारिक स्रोत: आपले सरकार', mr: 'अधिकृत स्रोत: आपले सरकार' },
        detail: { en: 'https://aaplesarkar.mahaonline.gov.in', hi: 'राज्य पोर्टल', mr: 'राज्य पोर्टल' },
      },
      {
        id: 'ie5',
        type: 'action',
        title: { en: 'Apply on the official portal, then use the certificate for scholarship upload', hi: 'आधिकारिक पोर्टल पर आवेदन करें, फिर छात्रवृत्ति अपलोड में उपयोग करें', mr: 'अधिकृत पोर्टलवर अर्ज करा, नंतर शिष्यवृत्ती अपलोडसाठी वापरा' },
        detail: { en: 'Preliminary navigation only.', hi: 'केवल प्रारंभिक मार्गदर्शन।', mr: 'फक्त प्राथमिक मार्गदर्शन.' },
      },
    ],
    qualityIssues: [
      {
        type: 'low_ocr',
        severity: 'warning',
        message: {
          en: 'The service-charge figure is illegible. Confirm any fee only on the official portal.',
          hi: 'सेवा शुल्क आँकड़ा अपठनीय है। शुल्क केवल आधिकारिक पोर्टल पर जाँचें।',
          mr: 'सेवा शुल्काचा आकडा वाचता येत नाही. शुल्क फक्त अधिकृत पोर्टलवर तपासा.',
        },
      },
    ],
    extractedText: `PUNE DISTRICT — CITIZEN FACILITATION NOTE (SAMPLE)
Income Certificate — documents to keep ready
Competent authority: Tehsildar / authorised revenue officer
Apply through Aaple Sarkar or authorised Citizen Service Centre
Service charge: ₹[illegible] as applicable — confirm on portal
Bring: photo ID, address proof, income evidence, photograph if asked.
Receiving offices often insist on a certificate for the current year — confirm with the scholarship cell.
This is a CivicAI demonstration notice, not a signed government order.`,
    createdAt: '2026-08-19T09:10:00+05:30',
    prototype: true,
  },
  'demo-domicile-mh': {
    id: 'demo-domicile-mh',
    documentName: 'Domicile_Application_Notice_scan.jpg',
    documentType: {
      en: 'Domicile application public notice (scanned)',
      hi: 'अधिवास आवेदन सार्वजनिक सूचना (स्कैन)',
      mr: 'अधिवास अर्ज सार्वजनिक सूचना (स्कॅन)',
    },
    purpose: {
      en: 'Inform applicants how to apply for a Maharashtra domicile certificate and which proofs are usually asked.',
      hi: 'महाराष्ट्र अधिवास प्रमाणपत्र के लिए आवेदन और सामान्य प्रमाण बताना।',
      mr: 'महाराष्ट्र अधिवास प्रमाणपत्रासाठी अर्ज व सामान्य पुरावे सांगणे.',
    },
    issuingAuthority: 'Sample municipal / revenue helpdesk notice (prototype scan)',
    language: 'Marathi / English',
    status: 'Analysed with quality warnings',
    explanation: [
      {
        en: 'This is a scanned notice about applying for a domicile certificate. Glare covers one corner, so one date is uncertain. CivicAI will not invent that date.',
        hi: 'यह अधिवास प्रमाणपत्र आवेदन की स्कैन सूचना है। एक कोने पर चमक है, इसलिए एक तिथि अनिश्चित है।',
        mr: 'ही अधिवास प्रमाणपत्र अर्जाची स्कॅन सूचना आहे. एका कोपऱ्यावर चमक आहे, म्हणून एक तारीख अनिश्चित आहे.',
      },
      {
        en: 'The readable part says applicants may use Aaple Sarkar and should carry birth or school evidence plus parent identity if applying for a student.',
        hi: 'पठनीय भाग कहता है आवेदक आपले सरकार उपयोग कर सकते हैं और जन्म या स्कूल प्रमाण तथा विद्यार्थी के लिए अभिभावक पहचान रखें।',
        mr: 'वाचनीय भाग सांगतो अर्जदार आपले सरकार वापरू शकतात आणि जन्म किंवा शाळा पुरावा व विद्यार्थ्यासाठी पालक ओळख ठेवावी.',
      },
    ],
    fields: [
      {
        id: 'dom-type',
        label: { en: 'Notice type', hi: 'सूचना प्रकार', mr: 'सूचना प्रकार' },
        value: 'Domicile certificate application facilitation notice',
        confidence: 'high',
        page: 1,
        evidenceText: 'Subject: Maharashtra domicile certificate — documents and application route',
        confirmed: false,
      },
      {
        id: 'dom-date',
        label: { en: 'Camp / last date on poster', hi: 'शिविर / पोस्टर पर अंतिम तिथि', mr: 'शिबिर / पोस्टरवरील अंतिम तारीख' },
        value: 'Not extracted — glare on date line',
        confidence: 'low',
        page: 1,
        evidenceText: 'Last date / camp date: [glare]',
        confirmed: false,
      },
      {
        id: 'dom-portal',
        label: { en: 'Portal named', hi: 'नामित पोर्टल', mr: 'नामित पोर्टल' },
        value: 'Aaple Sarkar',
        confidence: 'high',
        page: 1,
        evidenceText: 'Online: Aaple Sarkar (mahaonline)',
        confirmed: false,
      },
    ],
    requirements: [
      {
        id: 'dom-birth',
        title: { en: 'Birth proof or school leaving certificate', hi: 'जन्म प्रमाण या स्कूल लीविंग प्रमाणपत्र', mr: 'जन्म पुरावा किंवा शाळा सोडल्याचे प्रमाणपत्र' },
        detail: { en: 'Named on the notice. Confirm which combination your taluka currently accepts.', hi: 'सूचना पर नामित। आपका तालुका क्या स्वीकार करता है, पुष्टि करें।', mr: 'सूचनेवर नमूद. तुमचा तालुका काय स्वीकारतो ते निश्चित करा.' },
        status: 'missing',
        notes: '',
      },
      {
        id: 'dom-id',
        title: { en: 'Applicant / parent identity proof', hi: 'आवेदक / अभिभावक पहचान', mr: 'अर्जदार / पालक ओळख' },
        detail: { en: 'Needed when the applicant is a student dependant.', hi: 'जब आवेदक आश्रित विद्यार्थी हो।', mr: 'अर्जदार अवलंबित विद्यार्थी असेल तेव्हा.' },
        status: 'needs_confirmation',
        notes: '',
      },
      {
        id: 'dom-res',
        title: { en: 'Residence evidence', hi: 'निवास प्रमाण', mr: 'निवास पुरावा' },
        detail: { en: 'As notified by the local authority.', hi: 'स्थानीय प्राधिकारी द्वारा अधिसूचित अनुसार।', mr: 'स्थानिक प्राधिकाऱ्याने अधिसूचित केल्यानुसार.' },
        status: 'needs_confirmation',
        notes: '',
      },
    ],
    actions: [
      {
        id: 'dom-apply',
        what: { en: 'Apply for domicile through the official Maharashtra citizen portal.', hi: 'आधिकारिक महाराष्ट्र नागरिक पोर्टल से अधिवास आवेदन करें।', mr: 'अधिकृत महाराष्ट्र नागरिक पोर्टलवरून अधिवासासाठी अर्ज करा.' },
        where: { en: 'Aaple Sarkar', hi: 'आपले सरकार', mr: 'आपले सरकार' },
        documents: [
          { en: 'Birth / school and residence proofs as accepted locally', hi: 'जन्म / स्कूल और निवास प्रमाण', mr: 'जन्म / शाळा व निवास पुरावे' },
        ],
        officialLink: 'https://aaplesarkar.mahaonline.gov.in',
        officialLinkLabel: 'Aaple Sarkar',
        nextStep: { en: 'Do not rely on the glare-hidden date. Check the live portal or office notice board.', hi: 'चमक में छिपी तिथि पर निर्भर न करें। लाइव पोर्टल देखें।', mr: 'चमकेत लपलेल्या तारखेवर अवलंबून राहू नका. लाइव्ह पोर्टल पहा.' },
        mode: 'both',
      },
    ],
    schemeIds: ['domicile-cert', 'income-cert', 'digilocker', 'rcsm-ebc'],
    evidenceTrail: [
      {
        id: 'de1',
        type: 'document',
        title: { en: 'Uploaded: glare-affected domicile notice', hi: 'अपलोड: चमक वाली अधिवास सूचना', mr: 'अपलोड: चमक असलेली अधिवास सूचना' },
        detail: { en: 'Domicile_Application_Notice_scan.jpg', hi: 'स्कैन छवि', mr: 'स्कॅन प्रतिमा' },
      },
      {
        id: 'de2',
        type: 'field',
        title: { en: 'Low-confidence date field', hi: 'कम-विश्वास तिथि फ़ील्ड', mr: 'कमी-विश्वास तारीख क्षेत्र' },
        detail: { en: 'Glare on the date line — value not invented.', hi: 'तिथि पंक्ति पर चमक — मान नहीं गढ़ा गया।', mr: 'तारीख ओळीवर चमक — मूल्य शोधले नाही.' },
      },
      {
        id: 'de3',
        type: 'requirement',
        title: { en: 'Missing: birth / school proof in this session', hi: 'अनुपस्थित: जन्म / स्कूल प्रमाण', mr: 'गहाळ: जन्म / शाळा पुरावा' },
        detail: { en: 'User has not attached the proof yet.', hi: 'उपयोगकर्ता ने अभी प्रमाण नहीं जोड़ा।', mr: 'वापरकर्त्याने अद्याप पुरावा जोडला नाही.' },
      },
      {
        id: 'de4',
        type: 'source',
        title: { en: 'Official source: Aaple Sarkar', hi: 'आधिकारिक स्रोत: आपले सरकार', mr: 'अधिकृत स्रोत: आपले सरकार' },
        detail: { en: 'https://aaplesarkar.mahaonline.gov.in', hi: 'राज्य पोर्टल', mr: 'राज्य पोर्टल' },
      },
      {
        id: 'de5',
        type: 'action',
        title: { en: 'Apply on the official portal after collecting readable proofs', hi: 'पठनीय प्रमाण इकट्ठा कर आधिकारिक पोर्टल पर आवेदन करें', mr: 'वाचनीय पुरावे गोळा करून अधिकृत पोर्टलवर अर्ज करा' },
        detail: { en: 'Retake the scan if you need the camp date from this poster.', hi: 'यदि शिविर तिथि चाहिए तो स्कैन दोहराएँ।', mr: 'शिबिराची तारीख हवी असल्यास स्कॅन पुन्हा करा.' },
      },
    ],
    qualityIssues: [
      {
        type: 'glare',
        severity: 'warning',
        message: {
          en: 'Glare covers the date line. CivicAI did not guess the missing date.',
          hi: 'तिथि पंक्ति पर चमक है। सिविकएआई ने तिथि का अनुमान नहीं लगाया।',
          mr: 'तारीख ओळीवर चमक आहे. सिविकएआयने तारीख अंदाजाने भरली नाही.',
        },
      },
      {
        type: 'crop',
        severity: 'warning',
        message: {
          en: 'The right margin appears cropped. A footer or stamp may be missing.',
          hi: 'दायाँ किनारा कटा लगता है। फुटर या मुहर गायब हो सकती है।',
          mr: 'उजवी कडा कापल्यासारखी दिसते. तळटीप किंवा शिक्का गहाळ असू शकतो.',
        },
      },
    ],
    extractedText: `नमुना / SAMPLE
Subject: Maharashtra domicile certificate — documents and application route
Online: Aaple Sarkar (mahaonline)
Carry: birth proof or school leaving certificate; parent ID if student; residence proof.
Last date / camp date: [glare]
Office: Revenue / Citizen Facilitation Centre
CivicAI demonstration scan — not an official poster.`,
    createdAt: '2026-08-19T09:20:00+05:30',
    prototype: true,
  },
}

export function genericAnalysis(fileName: string): AnalysisResult {
  return {
    id: `session-${Date.now()}`,
    documentName: fileName,
    documentType: {
      en: 'Unclassified uploaded file (prototype OCR)',
      hi: 'अवर्गीकृत अपलोड फ़ाइल (प्रोटोटाइप ओसीआर)',
      mr: 'अवर्गीकृत अपलोड फाईल (प्रोटोटाइप ओसीआर)',
    },
    purpose: {
      en: 'The prototype could not match this file to a curated document type. Nothing below is an official extract.',
      hi: 'प्रोटोटाइप इस फ़ाइल को संग्रहित प्रकार से नहीं मिला सका। नीचे कुछ भी आधिकारिक उद्धरण नहीं है।',
      mr: 'प्रोटोटाइप या फाईलला संग्रहित प्रकाराशी जुळवू शकले नाही. खालील काहीही अधिकृत उतारा नाही.',
    },
    issuingAuthority: 'Not identified',
    language: 'Not identified',
    status: 'Needs confirmation — low document match',
    explanation: [
      {
        en: 'CivicAI opened the file in demo mode. Because this is a prototype without a live OCR service, it cannot safely invent fields from your real document.',
        hi: 'सिविकएआई ने डेमो मोड में फ़ाइल खोली। लाइव ओसीआर नहीं होने के कारण वास्तविक दस्तावेज़ से फ़ील्ड नहीं गढ़े जा सकते।',
        mr: 'सिविकएआयने डेमो मोडमध्ये फाईल उघडली. लाइव्ह ओसीआर नसल्याने खऱ्या कागदपत्रातून क्षेत्रे शोधली जाऊ शकत नाहीत.',
      },
      {
        en: 'Use a Try demo document button to see the full judged workflow, or treat this page as a privacy-safe empty analysis.',
        hi: 'पूरा आंका गया प्रवाह देखने के लिए डेमो दस्तावेज़ बटन उपयोग करें।',
        mr: 'पूर्ण प्रवाह पाहण्यासाठी डेमो कागदपत्र बटण वापरा.',
      },
    ],
    fields: [],
    requirements: [],
    actions: [
      {
        id: 'gen-official',
        what: { en: 'If this is a government form, open the official department portal named on the paper.', hi: 'यदि यह सरकारी फॉर्म है तो कागज़ पर नामित आधिकारिक पोर्टल खोलें।', mr: 'हे शासकीय फॉर्म असेल तर कागदावर नमूद अधिकृत पोर्टल उघडा.' },
        where: { en: 'The URL printed on the document — do not trust unofficial clones.', hi: 'दस्तावेज़ पर छपा यूआरएल — अनौपचारिक क्लोन पर भरोसा न करें।', mr: 'कागदपत्रावर छापलेली लिंक — अनोधिकृत क्लोनवर विश्वास ठेवू नका.' },
        documents: [],
        nextStep: { en: 'Try a CivicAI demo document to see extraction, evidence and scheme matching.', hi: 'निकाल, साक्ष्य और योजना मिलान देखने के लिए डेमो आज़माएँ।', mr: 'काढणी, पुरावा व योजना जुळणी पाहण्यासाठी डेमो वापरा.' },
        mode: 'online',
      },
    ],
    schemeIds: ['myscheme', 'nsp', 'digilocker'],
    evidenceTrail: [
      {
        id: 'g1',
        type: 'document',
        title: { en: 'Uploaded file received in a temporary session', hi: 'अस्थायी सत्र में फ़ाइल प्राप्त', mr: 'तात्पुरत्या सत्रात फाईल प्राप्त' },
        detail: { en: fileName, hi: fileName, mr: fileName },
      },
      {
        id: 'g2',
        type: 'source',
        title: { en: 'No reliable official extract was produced', hi: 'कोई विश्वसनीय आधिकारिक उद्धरण नहीं बना', mr: 'विश्वसनीय अधिकृत उतारा तयार झाला नाही' },
        detail: { en: 'Reliable official information was not found for this question.', hi: 'विश्वसनीय आधिकारिक जानकारी नहीं मिली।', mr: 'विश्वसनीय अधिकृत माहिती सापडली नाही.' },
      },
    ],
    qualityIssues: [
      {
        type: 'unsupported_language',
        severity: 'warning',
        message: {
          en: 'Prototype OCR is not connected. Use a demo document for the full SIH walkthrough.',
          hi: 'प्रोटोटाइप ओसीआर जुड़ा नहीं है। पूरे वॉकथ्रू के लिए डेमो उपयोग करें।',
          mr: 'प्रोटोटाइप ओसीआर जोडलेले नाही. पूर्ण वॉकथ्रूसाठी डेमो वापरा.',
        },
      },
    ],
    extractedText: 'Prototype mode: live text extraction is not enabled for arbitrary uploads.',
    createdAt: new Date().toISOString(),
    prototype: true,
  }
}
