import type { Law } from '../types'
import { EXTRA_LAWS } from './extraLaws'

export const LAWS: Law[] = [
  {
    id: 'dpdp-2023',
    name: {
      en: 'Digital Personal Data Protection Act, 2023',
      hi: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023',
      mr: 'डिजिटल वैयक्तिक डेटा संरक्षण अधिनियम, २०२३',
    },
    year: 2023,
    shortName: 'DPDP Act',
    summary: {
      en: 'A central law on processing of digital personal data in India. It sets duties for organisations (Data Fiduciaries) and rights for individuals (Data Principals). CivicAI only explains published text; it cannot decide if a company has broken the law.',
      hi: 'भारत में डिजिटल व्यक्तिगत डेटा के प्रसंस्करण पर केंद्रीय कानून। यह संगठनों के कर्तव्य और व्यक्तियों के अधिकार तय करता है। सिविकएआई यह तय नहीं कर सकता कि किसी कंपनी ने कानून तोड़ा है।',
      mr: 'भारतात डिजिटल वैयक्तिक डेटा प्रक्रिया करण्याबाबतचा केंद्रीय कायदा. संस्थांची कर्तव्ये व व्यक्तींचे अधिकार निश्चित करतो. एखाद्या कंपनीने कायदा मोडला का हे सिविकएआय ठरवू शकत नाही.',
    },
    officialSource: {
      title: 'India Code — The Digital Personal Data Protection Act, 2023',
      department: 'Legislative Department / Ministry of Law and Justice',
      url: 'https://www.indiacode.nic.in/handle/123456789/22037',
      sourceType: 'indiacode',
      actOrScheme: 'Digital Personal Data Protection Act, 2023 (Act 22 of 2023)',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: [
      'data',
      'privacy',
      'personal data',
      'misuse',
      'consent',
      'erasure',
      'grievance',
      'company',
      'dpdp',
      'fiduciary',
      'section 6',
      'section 8',
      'section 11',
      'section 12',
      'section 13',
    ],
    sections: [
      {
        id: 's6',
        number: '6',
        title: {
          en: 'Consent',
          hi: 'सहमति',
          mr: 'संमती',
        },
        simplified: {
          en: 'In simple words: an organisation usually needs your free, specific, informed, unconditional and unambiguous consent before using your personal data for a stated purpose. You should be able to withdraw consent as easily as you gave it. CivicAI cannot decide whether a particular consent screen was lawful.',
          hi: 'सरल शब्दों में: कोई संस्था आमतौर पर बताए गए उद्देश्य के लिए आपका स्वतंत्र, विशिष्ट, सूचित और स्पष्ट सहमति लिए बिना आपका व्यक्तिगत डेटा नहीं उपयोग कर सकती। सहमति वापस लेना भी उतना ही आसान होना चाहिए।',
          mr: 'सोप्या भाषेत: संस्था सामान्यतः सांगितलेल्या उद्देशासाठी तुमची स्वतंत्र, विशिष्ट, माहितीपूर्ण व स्पष्ट संमतीशिवाय वैयक्तिक डेटा वापरू शकत नाही. संमती काढणे देण्याइतके सोपे असावे.',
        },
        rights: [
          { en: 'To give or refuse consent for a stated purpose.', hi: 'बताए गए उद्देश्य के लिए सहमति देना या रोकना।', mr: 'सांगितलेल्या उद्देशासाठी संमती देणे किंवा नाकारणे.' },
          { en: 'To withdraw consent.', hi: 'सहमति वापस लेना।', mr: 'संमती काढून घेणे.' },
        ],
        duties: [
          { en: 'Data Fiduciaries must seek consent in the manner the Act requires.', hi: 'डेटा न्यासी को अधिनियम के अनुसार सहमति लेनी चाहिए।', mr: 'डेटा विश्वस्तांनी अधिनियमानुसार संमती घ्यावी.' },
        ],
        exceptions: [
          { en: 'The Act also lists certain legitimate uses in other sections where consent is not the only ground. Read the official text.', hi: 'अधिनियम अन्य धाराओं में कुछ वैध उपयोग भी सूचीबद्ध करता है। मूल पाठ पढ़ें।', mr: 'अधिनियमात इतर कलमांमध्ये काही वैध वापरही आहेत. मूळ मजकूर वाचा.' },
        ],
        implications: [
          { en: 'If a company uses your data for a new purpose, ask what lawful ground they rely on and keep written records of your request.', hi: 'यदि कंपनी नए उद्देश्य से डेटा उपयोग करे तो कानूनी आधार पूछें और लिखित रिकॉर्ड रखें।', mr: 'कंपनी नवीन उद्देशाने डेटा वापरत असेल तर कायदेशीर आधार विचारा व लेखी नोंद ठेवा.' },
        ],
        originalText:
          'Section 6 of the Digital Personal Data Protection Act, 2023 deals with consent, including that consent must be free, specific, informed, unconditional and unambiguous with a clear affirmative action, and that the Data Principal shall have the right to withdraw her consent. Read the full official section on India Code before relying on any paraphrase.',
      },
      {
        id: 's8',
        number: '8',
        title: {
          en: 'General obligations of Data Fiduciary',
          hi: 'डेटा न्यासी के सामान्य दायित्व',
          mr: 'डेटा विश्वस्ताची सामान्य कर्तव्ये',
        },
        simplified: {
          en: 'Organisations that decide how your digital personal data is used must implement reasonable security safeguards, be accurate where required, delete data when the purpose is over (unless law requires retention), and generally be accountable for their processors.',
          hi: 'जो संस्था तय करती है कि आपका डिजिटल व्यक्तिगत डेटा कैसे उपयोग होगा, उसे उचित सुरक्षा, आवश्यक सटीकता, उद्देश्य पूरा होने पर हटाना (जब तक कानून रोक न दे) और जवाबदेही सुनिश्चित करनी चाहिए।',
          mr: 'तुमचा डिजिटल वैयक्तिक डेटा कसा वापरायचा हे ठरवणाऱ्या संस्थेने वाजवी सुरक्षा, आवश्यक अचूकता, उद्देश संपल्यावर हटवणे (कायदा अट घालत नसल्यास) व उत्तरदायित्व पाळावे.',
        },
        rights: [
          { en: 'You can expect published duties of security and purpose limitation to apply to the organisation.', hi: 'आप सुरक्षा और उद्देश्य-सीमा के प्रकाशित कर्तव्य की अपेक्षा कर सकते हैं।', mr: 'तुम्ही सुरक्षा व उद्देश-मर्यादेच्या प्रकाशित कर्तव्याची अपेक्षा करू शकता.' },
        ],
        duties: [
          { en: 'Data Fiduciary: security safeguards, purpose limitation, retention limits, and related statutory duties.', hi: 'डेटा न्यासी: सुरक्षा, उद्देश्य सीमा, संग्रहण सीमा और संबंधित वैधानिक कर्तव्य।', mr: 'डेटा विश्वस्त: सुरक्षा, उद्देश मर्यादा, साठवण मर्यादा व संबंधित वैधानिक कर्तव्ये.' },
        ],
        exceptions: [
          { en: 'Retention may continue where required by law. Special provisions and exemptions appear later in the Act.', hi: 'कानून द्वारा आवश्यक होने पर संग्रहण जारी रह सकता है।', mr: 'कायद्याने आवश्यक असल्यास साठवण सुरू राहू शकते.' },
        ],
        implications: [
          { en: 'If you believe data was misused, write to the organisation describing the purpose you had agreed to and the new use you object to. This is a navigation step, not a finding of breach.', hi: 'यदि दुरुपयोग लगता है तो संस्था को लिखें। यह मार्गदर्शन है, उल्लंघन का निर्णय नहीं।', mr: 'गैरवापर वाटत असेल तर संस्थेला लिहा. हे मार्गदर्शन आहे, उल्लंघनाचा निर्णय नाही.' },
        ],
        originalText:
          'Section 8 of the Digital Personal Data Protection Act, 2023 sets general obligations of the Data Fiduciary, including implementing appropriate technical and organisational measures, ensuring completeness/accuracy in specified cases, taking reasonable security safeguards to prevent personal data breach, and erasing personal data when it is no longer necessary for the specified purpose (unless retention is necessary for compliance with law). Consult the official Act text on India Code.',
      },
      {
        id: 's11',
        number: '11',
        title: {
          en: 'Right to access information about personal data',
          hi: 'व्यक्तिगत डेटा के बारे में जानकारी प्राप्त करने का अधिकार',
          mr: 'वैयक्तिक डेटाबाबत माहिती मिळवण्याचा अधिकार',
        },
        simplified: {
          en: 'You can ask an organisation that already processes your data (on consent or certain other listed grounds) for a summary of what data they have and the processing activities, in the manner prescribed.',
          hi: 'आप उस संस्था से पूछ सकते हैं जो पहले से आपका डेटा संसाधित करती है — उनके पास क्या है और प्रसंस्करण क्या है, निर्धारित तरीके से।',
          mr: 'तुमचा डेटा प्रक्रिया करणाऱ्या संस्थेकडे त्यांच्याकडे काय आहे व प्रक्रिया काय आहे हे विहित पद्धतीने विचारू शकता.',
        },
        rights: [
          { en: 'Right to obtain prescribed information about your personal data from the relevant Data Fiduciary.', hi: 'संबंधित डेटा न्यासी से निर्धारित जानकारी प्राप्त करने का अधिकार।', mr: 'संबंधित डेटा विश्वस्ताकडून विहित माहिती मिळवण्याचा अधिकार.' },
        ],
        duties: [
          { en: 'Make the request in the manner prescribed under the Act / rules when notified.', hi: 'अधिनियम / नियमों में निर्धारित तरीके से अनुरोध करें।', mr: 'अधिनियम / नियमांमध्ये विहित पद्धतीने विनंती करा.' },
        ],
        exceptions: [
          { en: 'Sharing-related exceptions exist for certain law-enforcement and similar written requests. See the official subsection text.', hi: 'कुछ प्रवर्तन अनुरोधों के लिए अपवाद हैं। मूल उपधारा देखें।', mr: 'काही कायदा अंमलबजावणी विनंत्यांसाठी अपवाद आहेत. मूळ उपकलम पहा.' },
        ],
        implications: [
          { en: 'Start with a written access request to the company. Keep copies. CivicAI will not tell you that a crime occurred.', hi: 'कंपनी को लिखित पहुँच अनुरोध भेजें। प्रतियाँ रखें।', mr: 'कंपनीला लेखी प्रवेश विनंती पाठवा. प्रती ठेवा.' },
        ],
        originalText:
          'Section 11 of the Digital Personal Data Protection Act, 2023 provides that the Data Principal shall have the right to obtain from the Data Fiduciary to whom she has previously given consent, including consent referred to in section 7(a), information about personal data upon making a request in such manner as may be prescribed. Read the full section on India Code for clauses and exceptions.',
      },
      {
        id: 's12',
        number: '12',
        title: {
          en: 'Right to correction and erasure of personal data',
          hi: 'व्यक्तिगत डेटा के सुधार और मिटाने का अधिकार',
          mr: 'वैयक्तिक डेटा दुरुस्ती व मिटवण्याचा अधिकार',
        },
        simplified: {
          en: 'You can ask for correction of inaccurate data and, in the prescribed manner, erasure — unless the organisation must keep the data for the specified purpose or to follow another law.',
          hi: 'आप गलत डेटा सुधारने और निर्धारित तरीके से मिटाने का अनुरोध कर सकते हैं — जब तक संस्था को उद्देश्य या अन्य कानून के लिए रखना आवश्यक न हो।',
          mr: 'चुकीचा डेटा दुरुस्त करणे व विहित पद्धतीने मिटवणे मागू शकता — जोपर्यंत संस्थेला उद्देश किंवा इतर कायद्यासाठी ठेवणे आवश्यक नाही.',
        },
        rights: [
          { en: 'Correction of personal data.', hi: 'व्यक्तिगत डेटा का सुधार।', mr: 'वैयक्तिक डेटाची दुरुस्ती.' },
          { en: 'Erasure request, subject to lawful retention.', hi: 'मिटाने का अनुरोध, वैध संग्रहण के अधीन।', mr: 'मिटवण्याची विनंती, कायदेशीर साठवणीच्या अधीन.' },
        ],
        duties: [
          { en: 'Use the prescribed request process when available.', hi: 'उपलब्ध होने पर निर्धारित प्रक्रिया अपनाएँ।', mr: 'उपलब्ध असेल तेव्हा विहित प्रक्रिया वापरा.' },
        ],
        exceptions: [
          { en: 'Erasure is not available if retention is necessary for the specified purpose or compliance with law.', hi: 'यदि उद्देश्य या कानून के अनुपालन के लिए रखना आवश्यक हो तो मिटाना उपलब्ध नहीं।', mr: 'उद्देश किंवा कायद्याच्या पालनासाठी ठेवणे आवश्यक असेल तर मिटवणे उपलब्ध नाही.' },
        ],
        implications: [
          { en: 'Ask the company in writing to correct or erase specific items. They may lawfully refuse if another law requires retention.', hi: 'कंपनी को लिखित में विशिष्ट मदें सुधारने या मिटाने को कहें।', mr: 'कंपनीला लेखी विशिष्ट बाबी दुरुस्त किंवा मिटवण्यास सांगा.' },
        ],
        originalText:
          'Section 12 of the Digital Personal Data Protection Act, 2023 provides the Data Principal the right to correction and erasure of personal data. Upon a prescribed erasure request, the Data Fiduciary shall erase personal data unless retention is necessary for the specified purpose or for compliance with any law for the time being in force. Consult India Code for the complete section.',
      },
      {
        id: 's13',
        number: '13',
        title: {
          en: 'Right of grievance redressal',
          hi: 'शिकायत निवारण का अधिकार',
          mr: 'तक्रार निवारणाचा अधिकार',
        },
        simplified: {
          en: 'You have a right to readily available grievance redressal from the Data Fiduciary or Consent Manager. If that does not resolve the issue, the Act provides for complaint to the Data Protection Board of India as implemented.',
          hi: 'आपको डेटा न्यासी या सहमति प्रबंधक से सुलभ शिकायत निवारण का अधिकार है। न सुलझने पर डेटा संरक्षण बोर्ड में शिकायत का प्रावधान है, जैसा लागू हो।',
          mr: 'डेटा विश्वस्त किंवा संमती व्यवस्थापकाकडून सहज तक्रार निवारणाचा अधिकार आहे. न सुटल्यास डेटा संरक्षण मंडळाकडे तक्रारीची तरतूद आहे.',
        },
        rights: [
          { en: 'Readily available grievance redressal.', hi: 'सुलभ शिकायत निवारण।', mr: 'सहज तक्रार निवारण.' },
          { en: 'Further complaint pathway to the Board as provided in the Act.', hi: 'अधिनियम में दिए अनुसार बोर्ड में आगे शिकायत।', mr: 'अधिनियमात दिलेल्याप्रमाणे मंडळाकडे पुढील तक्रार.' },
        ],
        duties: [
          { en: 'Use the organisation’s published grievance channel first where available.', hi: 'पहले संस्था की प्रकाशित शिकायत प्रणाली का उपयोग करें।', mr: 'आधी संस्थेच्या प्रकाशित तक्रार मार्गाने जा.' },
        ],
        exceptions: [
          { en: 'Timelines and detailed procedure depend on notified rules and Board functioning. Check official updates.', hi: 'समयसीमा और प्रक्रिया अधिसूचित नियमों पर निर्भर है।', mr: 'मुदत व प्रक्रिया अधिसूचित नियमांवर अवलंबून.' },
        ],
        implications: [
          { en: 'Practical path: (1) written complaint to the company, (2) keep acknowledgement, (3) follow official Board / government channels if unresolved. CivicAI cannot file a case for you or predict an outcome.', hi: 'व्यावहारिक मार्ग: कंपनी को शिकायत, पावती रखें, फिर आधिकारिक बोर्ड चैनल। सिविकएआई मामला दर्ज या परिणाम का अनुमान नहीं करता।', mr: 'व्यावहारिक मार्ग: कंपनीला तक्रार, पावती ठेवा, नंतर अधिकृत मंडळ मार्ग. निकालाचा अंदाज सिविकएआय देत नाही.' },
        ],
        originalText:
          'Section 13 of the Digital Personal Data Protection Act, 2023 provides that the Data Principal shall have the right to have readily available means of grievance redressal provided by a Data Fiduciary or Consent Manager. Consult the official Act and subsequent rules on India Code and the Ministry website for the operative complaint process.',
      },
    ],
  },
  {
    id: 'rti-2005',
    name: {
      en: 'Right to Information Act, 2005',
      hi: 'सूचना का अधिकार अधिनियम, 2005',
      mr: 'माहितीचा अधिकार अधिनियम, २००५',
    },
    year: 2005,
    shortName: 'RTI Act',
    summary: {
      en: 'A law that gives citizens a right to information from public authorities, subject to exemptions. CivicAI can explain the published process; it cannot file an RTI or decide whether a denial was lawful.',
      hi: 'यह कानून नागरिकों को लोक प्राधिकारियों से सूचना का अधिकार देता है, छूटों के अधीन। सिविकएआई आरटीआई दाखिल नहीं करता।',
      mr: 'हा कायदा नागरिकांना सार्वजनिक प्राधिकाऱ्यांकडून माहितीचा अधिकार देतो, सूट अधीन. सिविकएआय आरटीआय दाखल करत नाही.',
    },
    officialSource: {
      title: 'India Code — The Right to Information Act, 2005',
      department: 'Legislative Department / Ministry of Law and Justice',
      url: 'https://www.indiacode.nic.in/handle/123456789/2065',
      sourceType: 'indiacode',
      actOrScheme: 'Right to Information Act, 2005',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: ['rti', 'information', 'public authority', 'section 6', 'section 7', 'section 8', 'pio', 'appeal'],
    sections: [
      {
        id: 's3',
        number: '3',
        title: { en: 'Right to information', hi: 'सूचना का अधिकार', mr: 'माहितीचा अधिकार' },
        simplified: {
          en: 'Subject to the Act, all citizens have the right to information. This is a starting right — later sections explain how to ask and what can be refused.',
          hi: 'अधिनियम के अधीन, सभी नागरिकों को सूचना का अधिकार है। बाद की धाराएँ बताती हैं कैसे माँगें और क्या रोका जा सकता है।',
          mr: 'अधिनियमाच्या अधीन सर्व नागरिकांना माहितीचा अधिकार आहे. नंतरची कलमे सांगतात कशी मागावी व काय नाकारता येते.',
        },
        rights: [{ en: 'Citizens’ right to information, subject to the Act.', hi: 'अधिनियम के अधीन नागरिकों का सूचना अधिकार।', mr: 'अधिनियमाच्या अधीन नागरिकांचा माहिती अधिकार.' }],
        duties: [{ en: 'Use the prescribed request process under later sections.', hi: 'बाद की धाराओं की निर्धारित प्रक्रिया अपनाएँ।', mr: 'नंतरच्या कलमांतील विहित प्रक्रिया वापरा.' }],
        exceptions: [{ en: 'Exemptions are mainly in Section 8 and related provisions.', hi: 'मुख्य छूट धारा 8 और संबंधित प्रावधानों में हैं।', mr: 'मुख्य सूट कलम ८ व संबंधित तरतुदींत आहेत.' }],
        implications: [{ en: 'RTI is for recorded information with a public authority, not private company customer-care disputes.', hi: 'आरटीआई लोक प्राधिकारी की दर्ज सूचना के लिए है, निजी कंपनी विवाद के लिए नहीं।', mr: 'आरटीआय सार्वजनिक प्राधिकाऱ्याच्या नोंदवलेल्या माहितीसाठी आहे, खाजगी कंपनी वादासाठी नाही.' }],
        originalText:
          'Section 3 of the Right to Information Act, 2005 states that subject to the provisions of this Act, all citizens shall have the right to information. Read the official Act on India Code.',
      },
      {
        id: 's6',
        number: '6',
        title: { en: 'Request for obtaining information', hi: 'सूचना प्राप्त करने का अनुरोध', mr: 'माहिती मिळवण्याची विनंती' },
        simplified: {
          en: 'You may make a written or electronic request to the Public Information Officer, in English, Hindi or the official language of the area, specifying the particulars of information sought. You are generally not required to give reasons for the request.',
          hi: 'आप लोक सूचना अधिकारी को लिखित या इलेक्ट्रॉनिक अनुरोध भेज सकते हैं। आमतौर पर अनुरोध का कारण बताना आवश्यक नहीं।',
          mr: 'लोक माहिती अधिकाऱ्याला लेखी किंवा इलेक्ट्रॉनिक विनंती करता येते. सामान्यतः कारण सांगणे आवश्यक नाही.',
        },
        rights: [{ en: 'File a request without giving reasons.', hi: 'कारण बताए बिना अनुरोध दर्ज करें।', mr: 'कारण न सांगता विनंती करा.' }],
        duties: [{ en: 'Address the correct public authority and pay the prescribed fee where applicable.', hi: 'सही लोक प्राधिकारी को संबोधित करें और निर्धारित शुल्क दें।', mr: 'योग्य सार्वजनिक प्राधिकाऱ्याला उद्देशून विहित शुल्क भरा.' }],
        exceptions: [{ en: 'Fee and format rules are as prescribed. BPL applicants may have fee concessions as notified.', hi: 'शुल्क नियम निर्धारित अनुसार। बीपीएल के लिए छूट अधिसूचित हो सकती है।', mr: 'शुल्क नियम विहित. बीपीएलसाठी सूट अधिसूचित असू शकते.' }],
        implications: [{ en: 'Use official state / central RTI portals or a written application to the PIO. CivicAI cannot submit the request.', hi: 'आधिकारिक आरटीआई पोर्टल या पीआईओ को आवेदन का उपयोग करें।', mr: 'अधिकृत आरटीआय पोर्टल किंवा पीआयओला अर्ज वापरा.' }],
        originalText:
          'Section 6 of the Right to Information Act, 2005 provides that a person who desires to obtain any information under the Act shall make a request in writing or through electronic means in English or Hindi or in the official language of the area, specifying the particulars of the information sought. The applicant shall not be required to give any reason for requesting the information. Consult India Code for the full section.',
      },
      {
        id: 's7',
        number: '7',
        title: { en: 'Disposal of request', hi: 'अनुरोध का निपटान', mr: 'विनंतीचे निपटारा' },
        simplified: {
          en: 'The Act sets time limits for a public authority to respond, commonly 30 days in ordinary cases, with different clocks for certain situations such as life or liberty. Confirm the exact statutory language before counting days.',
          hi: 'लोक प्राधिकारी के उत्तर की समय-सीमा अधिनियम में है; सामान्य मामलों में अक्सर 30 दिन। दिन गिनने से पहले मूल पाठ देखें।',
          mr: 'उत्तर देण्याची मुदत अधिनियमात आहे; सामान्य प्रकरणांत अनेकदा ३० दिवस. दिवस मोजण्यापूर्वी मूळ मजकूर पहा.',
        },
        rights: [{ en: 'A decision within the statutory period.', hi: 'वैधानिक अवधि में निर्णय।', mr: 'वैधानिक मुदतीत निर्णय.' }],
        duties: [{ en: 'PIO must dispose of the request as provided in the section.', hi: 'पीआईओ को धारा के अनुसार निपटान करना चाहिए।', mr: 'पीआयओने कलमानुसार निपटारा करावा.' }],
        exceptions: [{ en: 'Different timelines apply in specified circumstances. See official text.', hi: 'निर्दिष्ट परिस्थितियों में भिन्न समयसीमा।', mr: 'निर्दिष्ट परिस्थितींत भिन्न मुदत.' }],
        implications: [{ en: 'If there is no response or you disagree, the Act provides an appeal structure. Check the first appellate authority named in the reply / website.', hi: 'उत्तर न मिले तो अपील संरचना देखें।', mr: 'उत्तर नसेल तर अपील रचना पहा.' }],
        originalText:
          'Section 7 of the Right to Information Act, 2005 governs disposal of the request, including the period within which information shall be provided and consequences of delay. The commonly cited ordinary period is thirty days; always verify the official wording and special cases on India Code.',
      },
      {
        id: 's8',
        number: '8',
        title: { en: 'Exemption from disclosure of information', hi: 'सूचना प्रकटीकरण से छूट', mr: 'माहिती प्रकटीकरणातून सूट' },
        simplified: {
          en: 'Some information may be refused — for example certain sovereignty, security, commercial confidence, personal privacy, and other listed categories. A refusal must still follow the Act. CivicAI will not decide if a particular file is exempt.',
          hi: 'कुछ सूचना रोकी जा सकती है — सुरक्षा, व्यावसायिक गोपनीयता, व्यक्तिगत गोपनीयता आदि सूचीबद्ध श्रेणियाँ। सिविकएआई यह तय नहीं करेगा कि कोई फ़ाइल छूट में है।',
          mr: 'काही माहिती नाकारता येते — सुरक्षा, व्यावसायिक गोपनीयता, वैयक्तिक गोपनीयता इत्यादी. एखादी फाईल सूट आहे का हे सिविकएआय ठरवत नाही.',
        },
        rights: [{ en: 'You may still receive information that is not covered by an exemption.', hi: 'जो छूट में नहीं है वह सूचना मिल सकती है।', mr: 'सूट नसलेली माहिती मिळू शकते.' }],
        duties: [{ en: 'Public authorities must apply exemptions as written, not as a blanket refusal.', hi: 'लोक प्राधिकारी को छूट लिखित अनुसार लागू करनी चाहिए।', mr: 'सार्वजनिक प्राधिकाऱ्यांनी सूट लिहिल्यानुसार लागू करावी.' }],
        exceptions: [{ en: 'Section 8 itself is the list of exemptions, with further provisos. Read the full official list.', hi: 'धारा 8 स्वयं छूटों की सूची है। पूरी आधिकारिक सूची पढ़ें।', mr: 'कलम ८ स्वतः सूटांची यादी आहे. पूर्ण अधिकृत यादी वाचा.' }],
        implications: [{ en: 'If information is refused, read the cited clause and consider a first appeal. Do not treat a blog summary as the exemption list.', hi: 'अस्वीकृति पर उद्धृत खंड पढ़ें और प्रथम अपील सोचें।', mr: 'नकार दिल्यास उद्धृत खंड वाचा व प्रथम अपील विचारा.' }],
        originalText:
          'Section 8 of the Right to Information Act, 2005 lists categories of information that are exempt from disclosure, including certain information affecting sovereignty and integrity, commercial confidence, and personal information the disclosure of which has no relationship to any public activity or interest, among other clauses. Always use the official India Code text; do not rely on an incomplete paraphrase.',
      },
    ],
  },
  {
    id: 'cpa-2019',
    name: {
      en: 'Consumer Protection Act, 2019',
      hi: 'उपभोक्ता संरक्षण अधिनियम, 2019',
      mr: 'ग्राहक संरक्षण अधिनियम, २०१९',
    },
    year: 2019,
    shortName: 'CPA 2019',
    summary: {
      en: 'A law on consumer rights, unfair trade practices, and consumer dispute bodies. CivicAI explains published concepts only. It cannot decide if a product, contract or seller is illegal, and it cannot predict a commission order.',
      hi: 'उपभोक्ता अधिकारों और विवाद निकायों का कानून। सिविकएआई यह तय नहीं कर सकता कि कोई अनुबंध अवैध है या आयोग क्या आदेश देगा।',
      mr: 'ग्राहक हक्क व विवाद संस्थांचा कायदा. एखादा करार अवैध आहे किंवा आयोग काय आदेश देईल हे सिविकएआय ठरवत नाही.',
    },
    officialSource: {
      title: 'India Code — The Consumer Protection Act, 2019',
      department: 'Legislative Department / Ministry of Law and Justice',
      url: 'https://www.indiacode.nic.in/handle/123456789/15256',
      sourceType: 'indiacode',
      actOrScheme: 'Consumer Protection Act, 2019',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: ['consumer', 'deficiency', 'unfair', 'product', 'complaint', 'commission', 'refund', 'goods', 'service'],
    sections: [
      {
        id: 's2-7',
        number: '2(7)',
        title: { en: 'Who is a consumer', hi: 'उपभोक्ता कौन है', mr: 'ग्राहक कोण' },
        simplified: {
          en: 'In everyday terms, a consumer is a person who buys goods or hires services for personal use, not for resale or commercial purpose (with limited exceptions written in the Act). Whether you qualify in a dispute is a legal question CivicAI will not decide.',
          hi: 'सामान्य भाषा में उपभोक्ता वह है जो व्यक्तिगत उपयोग के लिए वस्तु खरीदता या सेवा लेता है, पुनर्विक्रय के लिए नहीं। आप किसी विवाद में योग्य हैं या नहीं, यह सिविकएआई तय नहीं करेगा।',
          mr: 'सामान्य भाषेत ग्राहक म्हणजे वैयक्तिक वापरासाठी वस्तू खरेदी किंवा सेवा घेणारी व्यक्ती, पुनर्विक्रीसाठी नाही. तुम्ही पात्र आहात का हे सिविकएआय ठरवत नाही.',
        },
        rights: [{ en: 'Statutory consumer rights apply if you fall within the definition.', hi: 'यदि आप परिभाषा में आते हैं तो वैधानिक अधिकार लागू होते हैं।', mr: 'तुम्ही व्याख्येत येत असाल तर वैधानिक अधिकार लागू होतात.' }],
        duties: [{ en: 'Keep bills, warranties and written complaints.', hi: 'बिल, वारंटी और लिखित शिकायत रखें।', mr: 'बिल, वॉरंटी व लेखी तक्रार ठेवा.' }],
        exceptions: [{ en: 'Commercial purpose / resale generally sits outside the ordinary consumer definition. Read the official definition.', hi: 'व्यावसायिक उद्देश्य / पुनर्विक्रय आमतौर पर बाहर। मूल परिभाषा पढ़ें।', mr: 'व्यावसायिक उद्देश / पुनर्विक्री सामान्यतः बाहेर. मूळ व्याख्या वाचा.' }],
        implications: [{ en: 'Start with the seller’s grievance process and the National Consumer Helpline / e-daakhil official channels.', hi: 'विक्रेता की शिकायत प्रक्रिया और राष्ट्रीय उपभोक्ता हेल्पलाइन / ई-दाखिल देखें।', mr: 'विक्रेत्याची तक्रार प्रक्रिया व राष्ट्रीय ग्राहक हेल्पलाइन / ई-दाखिल पहा.' }],
        originalText:
          'Section 2(7) of the Consumer Protection Act, 2019 defines “consumer”. The definition includes a person who buys any goods or hires/avails any service for a consideration, and excludes a person who obtains goods for resale or for any commercial purpose, subject to explanations in the Act. Read the official definition on India Code.',
      },
      {
        id: 's2-11',
        number: '2(11)',
        title: { en: 'Deficiency', hi: 'कमी / त्रुटि', mr: 'त्रुटी' },
        simplified: {
          en: '“Deficiency” refers to a fault, shortcoming, or inadequacy in the quality or manner of performance of a service that is required by law or undertaken to be performed. CivicAI will not declare that a particular service was deficient.',
          hi: '“कमी” सेवा की गुणवत्ता या प्रदर्शन में कमी है जो कानून या वचन से अपेक्षित थी। सिविकएआई किसी सेवा को त्रुटिपूर्ण घोषित नहीं करेगा।',
          mr: '“त्रुटी” म्हणजे सेवेच्या गुणवत्तेतील किंवा कामगिरीतील कमतरता. एखादी सेवा त्रुटीपूर्ण आहे असे सिविकएआय जाहीर करणार नाही.',
        },
        rights: [{ en: 'A consumer may raise a dispute alleging deficiency before the appropriate commission, following the Act.', hi: 'उपभोक्ता उपयुक्त आयोग के समक्ष कमी का विवाद उठा सकता है।', mr: 'ग्राहक योग्य आयोगासमोर त्रुटीचा वाद मांडू शकतो.' }],
        duties: [{ en: 'Describe facts, dates, and documents. Do not invent legal conclusions.', hi: 'तथ्य, तिथियाँ और दस्तावेज़ लिखें।', mr: 'तथ्य, तारखा व कागदपत्रे लिहा.' }],
        exceptions: [{ en: 'Not every inconvenience is a statutory deficiency. That assessment is for the competent forum.', hi: 'हर असुविधा वैधानिक कमी नहीं। यह सक्षम मंच तय करेगा।', mr: 'प्रत्येक गैरसोय वैधानिक त्रुटी नसते. हे सक्षम मंच ठरवेल.' }],
        implications: [{ en: 'Collect the contract, invoices and written follow-ups before using official consumer portals.', hi: 'आधिकारिक पोर्टल से पहले अनुबंध, बिल और पत्राचार इकट्ठा करें।', mr: 'अधिकृत पोर्टलपूर्वी करार, बिल व पत्रव्यवहार जमा करा.' }],
        originalText:
          'Section 2(11) of the Consumer Protection Act, 2019 defines “deficiency” as any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance which is required to be maintained by or under any law or has been undertaken to be performed by a person in pursuance of a contract or otherwise in relation to any service. See India Code for the complete clause including any explanations.',
      },
      {
        id: 's2-47',
        number: '2(47)',
        title: { en: 'Unfair trade practice', hi: 'अनुचित व्यापार व्यवहार', mr: 'अन्याय्य व्यापार पद्धती' },
        simplified: {
          en: 'The Act defines unfair trade practice to include certain misleading advertisements and false representations. Whether an advertisement is unfair is not something CivicAI will decide.',
          hi: 'अधिनियम अनुचित व्यापार व्यवहार में कुछ भ्रामक विज्ञापन और झूठे कथन शामिल करता है। कोई विज्ञापन अनुचित है या नहीं, यह सिविकएआई तय नहीं करेगा।',
          mr: 'अधिनियम अन्याय्य व्यापार पद्धतीत काही दिशाभूल करणारी जाहिरात व खोटे विधान समाविष्ट करतो. एखादी जाहिरात अन्याय्य आहे का हे सिविकएआय ठरवत नाही.',
        },
        rights: [{ en: 'Consumers may complain about alleged unfair practices through statutory forums.', hi: 'उपभोक्ता वैधानिक मंचों से शिकायत कर सकते हैं।', mr: 'ग्राहक वैधानिक मंचांवर तक्रार करू शकतात.' }],
        duties: [{ en: 'Preserve the advertisement, invoice and communication.', hi: 'विज्ञापन, बिल और संदेश सुरक्षित रखें।', mr: 'जाहिरात, बिल व संदेश जतन करा.' }],
        exceptions: [{ en: 'The statutory definition is detailed. Read the official clause rather than a marketing blog.', hi: 'वैधानिक परिभाषा विस्तृत है। मूल खंड पढ़ें।', mr: 'वैधानिक व्याख्या तपशीलवार आहे. मूळ खंड वाचा.' }],
        implications: [{ en: 'Use official consumer affairs channels. CivicAI will not draft a court pleading or predict compensation.', hi: 'आधिकारिक उपभोक्ता चैनल उपयोग करें। सिविकएआई मुआवज़े का अनुमान नहीं लगाता।', mr: 'अधिकृत ग्राहक मार्ग वापरा. सिविकएआय भरपाईचा अंदाज देत नाही.' }],
        originalText:
          'Section 2(47) of the Consumer Protection Act, 2019 defines “unfair trade practice”. The definition is lengthy and includes a trade practice which, for the purpose of promoting the sale, use or supply of any goods or for the provision of any service, adopts any unfair method or unfair or deceptive practice including specified false representations. Consult the official India Code text in full.',
      },
    ],
  },
]

export function allLaws(): Law[] {
  return [...LAWS, ...EXTRA_LAWS]
}

export function getLaw(id: string): Law | undefined {
  return allLaws().find((l) => l.id === id)
}

export function searchLaws(query: string): { law: Law; sectionIds: string[] }[] {
  const q = query.trim().toLowerCase()
  const pool = allLaws()
  if (!q) return pool.map((law) => ({ law, sectionIds: law.sections.map((s) => s.id) }))

  const results: { law: Law; sectionIds: string[] }[] = []
  for (const law of pool) {
    const lawHit =
      law.name.en.toLowerCase().includes(q) ||
      law.name.hi.includes(q) ||
      law.name.mr.includes(q) ||
      law.shortName.toLowerCase().includes(q) ||
      law.keywords.some((k) => k.includes(q) || q.includes(k))

    const sectionIds = law.sections
      .filter((s) => {
        const blob = `${s.number} ${s.title.en} ${s.title.hi} ${s.simplified.en} ${s.originalText}`.toLowerCase()
        return blob.includes(q) || q.includes(s.number.toLowerCase())
      })
      .map((s) => s.id)

    if (lawHit || sectionIds.length) {
      results.push({
        law,
        sectionIds: sectionIds.length ? sectionIds : law.sections.map((s) => s.id),
      })
    }
  }
  return results
}
