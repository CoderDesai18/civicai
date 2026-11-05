import type { Law } from '../types'

export const EXTRA_LAWS: Law[] = [
  {
    id: 'it-2000',
    name: {
      en: 'Information Technology Act, 2000',
      hi: 'सूचना प्रौद्योगिकी अधिनियम, 2000',
      mr: 'माहिती तंत्रज्ञान अधिनियम, २०००',
    },
    year: 2000,
    shortName: 'IT Act',
    summary: {
      en: 'A central law on electronic records, digital signatures and certain computer-related offences. CivicAI only explains published headings. It cannot decide whether an offence occurred.',
      hi: 'इलेक्ट्रॉनिक अभिलेख, डिजिटल हस्ताक्षर और कुछ कंप्यूटर अपराधों का केंद्रीय कानून। सिविकएआई अपराध तय नहीं करता।',
      mr: 'इलेक्ट्रॉनिक अभिलेख, डिजिटल स्वाक्षरी व काही संगणक अपराधांचा केंद्रीय कायदा. सिविकएआय अपराध ठरवत नाही.',
    },
    officialSource: {
      title: 'India Code — Information Technology Act, 2000',
      department: 'Legislative Department',
      url: 'https://www.indiacode.nic.in',
      sourceType: 'indiacode',
      actOrScheme: 'Information Technology Act, 2000',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: ['it act', 'information technology', 'cyber', 'computer', 'section 43', 'section 66'],
    sections: [
      {
        id: 'it-43',
        number: '43',
        title: { en: 'Penalty and compensation for damage to computer, computer system, etc.', hi: 'कंप्यूटर क्षति के लिए शास्ति और प्रतिकर', mr: 'संगणक हानीसाठी शास्ती व भरपाई' },
        simplified: {
          en: 'Section 43 lists civil consequences for certain unauthorised acts involving computers, as written in the Act. CivicAI will not decide that a person has committed those acts.',
          hi: 'धारा 43 कुछ अनधिकृत कंप्यूटर कृत्यों के सिविल परिणाम लिखती है। सिविकएआई यह नहीं कहता कि किसी ने वे कृत्य किए।',
          mr: 'कलम ४३ काही अनधिकृत संगणक कृत्यांचे दिवाणी परिणाम लिहिते. एखाद्याने ती केली असे सिविकएआय म्हणत नाही.',
        },
        rights: [{ en: 'A person affected may look to the remedies the Act provides.', hi: 'प्रभावित व्यक्ति अधिनियम के उपचार देख सकता है।', mr: 'बाधित व्यक्ती अधिनियमातील उपाय पाहू शकते.' }],
        duties: [{ en: 'Do not treat a blog list of “hacking offences” as the section.', hi: 'ब्लॉग की सूची को धारा न मानें।', mr: 'ब्लॉग यादी कलम मानू नका.' }],
        exceptions: [{ en: 'Read every clause and later amendments on India Code.', hi: 'हर खंड और संशोधन इंडिया कोड पर पढ़ें।', mr: 'प्रत्येक खंड व दुरुस्ती इंडिया कोडवर वाचा.' }],
        implications: [{ en: 'If you have a cyber incident, use official CERT-In / police / professional channels. CivicAI cannot file a complaint.', hi: 'साइबर घटना पर आधिकारिक चैनल उपयोग करें।', mr: 'सायबर घटनेवर अधिकृत मार्ग वापरा.' }],
        originalText:
          'Section 43 of the Information Technology Act, 2000 is titled “Penalty and compensation for damage to computer, computer system, etc.” The section enumerates specified unauthorised acts and civil consequences. Read the full official section and amendments on India Code. CivicAI does not reproduce an unofficial abridgement as a substitute for that text.',
      },
    ],
  },
  {
    id: 'bns-2023',
    name: {
      en: 'Bharatiya Nyaya Sanhita, 2023',
      hi: 'भारतीय न्याय संहिता, 2023',
      mr: 'भारतीय न्याय संहिता, २०२३',
    },
    year: 2023,
    shortName: 'BNS',
    summary: {
      en: 'The principal criminal-law code that replaced the Indian Penal Code for the period notified by the Central Government. CivicAI does not invent BNS section numbers or say that a person has committed an offence.',
      hi: 'अधिसूचित अवधि से भारतीय दंड संहिता का स्थान लेने वाली मुख्य आपराधिक संहिता। सिविकएआई धारा संख्या नहीं गढ़ता और अपराध घोषित नहीं करता।',
      mr: 'अधिसूचित कालावधीपासून भारतीय दंड संहितेची जागा घेणारी मुख्य फौजदारी संहिता. सिविकएआय कलम क्रमांक शोधत नाही व अपराध जाहीर करत नाही.',
    },
    officialSource: {
      title: 'India Code — Bharatiya Nyaya Sanhita, 2023',
      department: 'Legislative Department',
      url: 'https://www.indiacode.nic.in',
      sourceType: 'indiacode',
      actOrScheme: 'Bharatiya Nyaya Sanhita, 2023',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: ['bns', 'bharatiya nyaya sanhita', 'ipc', 'criminal', 'offence'],
    sections: [
      {
        id: 'bns-note',
        number: '—',
        title: { en: 'How to read BNS on CivicAI', hi: 'सिविकएआई पर बीएनएस कैसे पढ़ें', mr: 'सिविकएआयवर बीएनएस कसे वाचावे' },
        simplified: {
          en: 'This prototype lists the Act and its official source. It does not invent section-wise offence definitions. For any section number, open India Code. CivicAI will not decide guilt or predict a sentence.',
          hi: 'यह प्रोटोटाइप अधिनियम और आधिकारिक स्रोत दिखाता है। धारावार अपराध परिभाषा नहीं गढ़ता। धारा संख्या इंडिया कोड पर खोलें।',
          mr: 'हा नमुना अधिनियम व अधिकृत स्रोत दाखवतो. कलमनुसार अपराध व्याख्या शोधत नाही. कलम क्रमांक इंडिया कोडवर उघडा.',
        },
        rights: [],
        duties: [{ en: 'Verify every section on India Code before relying on it.', hi: 'भरोसा करने से पहले हर धारा इंडिया कोड पर जाँचें।', mr: 'विसंबण्यापूर्वी प्रत्येक कलम इंडिया कोडवर तपासा.' }],
        exceptions: [],
        implications: [{ en: 'Reliable official information for a numbered BNS offence was not loaded in this curated set beyond the Act identity.', hi: 'इस संग्रहित सेट में क्रमांकित बीएनएस अपराध की विस्तृत आधिकारिक परिभाषा लोड नहीं है।', mr: 'या संग्रहित संचांत क्रमांकित बीएनएस अपराधाची सविस्तर अधिकृत व्याख्या नाही.' }],
        originalText:
          'The Bharatiya Nyaya Sanhita, 2023 is the official short title of Act No. 45 of 2023. Consult India Code for the authentic section text. CivicAI refuses to invent section numbers, illustrations or punishments.',
      },
    ],
  },
  {
    id: 'bnss-2023',
    name: {
      en: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
      hi: 'भारतीय नागरिक सुरक्षा संहिता, 2023',
      mr: 'भारतीय नागरिक सुरक्षा संहिता, २०२३',
    },
    year: 2023,
    shortName: 'BNSS',
    summary: {
      en: 'The principal criminal-procedure code notified to replace the Code of Criminal Procedure, 1973. Procedure questions must be read from the official Act. CivicAI cannot represent you in a police station or court.',
      hi: 'दंड प्रक्रिया संहिता, 1973 का स्थान लेने वाली मुख्य प्रक्रिया संहिता। सिविकएआई थाने या अदालत में प्रतिनिधित्व नहीं करता।',
      mr: 'दंड प्रक्रिया संहिता, १९७३ ची जागा घेणारी मुख्य प्रक्रिया संहिता. सिविकएआय ठाणे किंवा न्यायालयात प्रतिनिधित्व करत नाही.',
    },
    officialSource: {
      title: 'India Code — Bharatiya Nagarik Suraksha Sanhita, 2023',
      department: 'Legislative Department',
      url: 'https://www.indiacode.nic.in',
      sourceType: 'indiacode',
      actOrScheme: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: ['bnss', 'crpc', 'procedure', 'fir', 'arrest'],
    sections: [
      {
        id: 'bnss-note',
        number: '—',
        title: { en: 'Official procedure source', hi: 'आधिकारिक प्रक्रिया स्रोत', mr: 'अधिकृत प्रक्रिया स्रोत' },
        simplified: {
          en: 'For FIR, arrest or bail procedure, open the official BNSS text. This prototype does not invent procedure steps or timelines.',
          hi: 'एफआईआर, गिरफ्तारी या जमानत प्रक्रिया आधिकारिक बीएनएसएस पाठ पर खोलें। यह प्रोटोटाइप चरण नहीं गढ़ता।',
          mr: 'एफआयआर, अटक किंवा जामीन प्रक्रिया अधिकृत बीएनएसएस मजकुरावर उघडा. हा नमुना पायऱ्या शोधत नाही.',
        },
        rights: [],
        duties: [],
        exceptions: [],
        implications: [{ en: 'Reliable official information was not found in this curated set for a numbered BNSS section beyond the Act identity.', hi: 'इस सेट में क्रमांकित बीएनएसएस धारा की विस्तृत जानकारी नहीं है।', mr: 'या संचात क्रमांकित बीएनएसएस कलमाची सविस्तर माहिती नाही.' }],
        originalText:
          'The Bharatiya Nagarik Suraksha Sanhita, 2023 is the official criminal-procedure code as enacted. Consult India Code. CivicAI does not invent arrest or bail timelines.',
      },
    ],
  },
  {
    id: 'bsa-2023',
    name: {
      en: 'Bharatiya Sakshya Adhiniyam, 2023',
      hi: 'भारतीय साक्ष्य अधिनियम, 2023',
      mr: 'भारतीय साक्ष्य अधिनियम, २०२३',
    },
    year: 2023,
    shortName: 'BSA',
    summary: {
      en: 'The principal evidence law notified to replace the Indian Evidence Act, 1872. CivicAI does not decide what a court will admit as evidence.',
      hi: 'भारतीय साक्ष्य अधिनियम, 1872 का स्थान लेने वाला मुख्य साक्ष्य कानून। सिविकएआई यह नहीं तय करता कि न्यायालय क्या स्वीकारेगा।',
      mr: 'भारतीय साक्ष्य अधिनियम, १८७२ ची जागा घेणारा मुख्य पुरावा कायदा. न्यायालय काय स्वीकारेल हे सिविकएआय ठरवत नाही.',
    },
    officialSource: {
      title: 'India Code — Bharatiya Sakshya Adhiniyam, 2023',
      department: 'Legislative Department',
      url: 'https://www.indiacode.nic.in',
      sourceType: 'indiacode',
      actOrScheme: 'Bharatiya Sakshya Adhiniyam, 2023',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: ['bsa', 'evidence', 'sakshya', 'witness'],
    sections: [
      {
        id: 'bsa-note',
        number: '—',
        title: { en: 'Official evidence source', hi: 'आधिकारिक साक्ष्य स्रोत', mr: 'अधिकृत पुरावा स्रोत' },
        simplified: {
          en: 'Questions about what counts as evidence must be read in the official BSA. This prototype does not invent admissibility rules.',
          hi: 'साक्ष्य क्या माना जाएगा यह आधिकारिक बीएसए में पढ़ें। यह प्रोटोटाइप ग्राह्यता नियम नहीं गढ़ता।',
          mr: 'पुरावा काय गणला जाईल ते अधिकृत बीएसएमध्ये वाचा. हा नमुना ग्राह्यता नियम शोधत नाही.',
        },
        rights: [],
        duties: [],
        exceptions: [],
        implications: [{ en: 'Reliable official information was not found in this curated set for a numbered BSA section beyond the Act identity.', hi: 'इस सेट में क्रमांकित बीएसए धारा नहीं है।', mr: 'या संचात क्रमांकित बीएसए कलम नाही.' }],
        originalText:
          'The Bharatiya Sakshya Adhiniyam, 2023 is the official evidence statute as enacted. Consult India Code for authentic section text.',
      },
    ],
  },
  {
    id: 'mva-1988',
    name: {
      en: 'Motor Vehicles Act, 1988',
      hi: 'मोटर यान अधिनियम, 1988',
      mr: 'मोटर वाहन अधिनियम, १९८८',
    },
    year: 1988,
    shortName: 'MV Act',
    summary: {
      en: 'The principal central law on motor vehicles, licensing and related penalties, as amended. CivicAI does not calculate a challan or decide fault in an accident.',
      hi: 'मोटर यान, लाइसेंस और संबंधित शास्तियों का मुख्य केंद्रीय कानून। सिविकएआई चालान या दुर्घटना दोष तय नहीं करता।',
      mr: 'मोटार वाहने, परवाना व संबंधित शास्तींचा मुख्य केंद्रीय कायदा. सिविकएआय चालान किंवा अपघात दोष ठरवत नाही.',
    },
    officialSource: {
      title: 'India Code — Motor Vehicles Act, 1988',
      department: 'Legislative Department / MoRTH',
      url: 'https://www.indiacode.nic.in',
      sourceType: 'indiacode',
      actOrScheme: 'Motor Vehicles Act, 1988',
      lastVerified: '2026-08-01',
      version: 'prototype-1.0',
    },
    keywords: ['motor vehicles', 'driving licence', 'challan', 'accident'],
    sections: [
      {
        id: 'mva-note',
        number: '—',
        title: { en: 'Official motor-vehicle source', hi: 'आधिकारिक मोटर-यान स्रोत', mr: 'अधिकृत मोटार-वाहन स्रोत' },
        simplified: {
          en: 'Licence, registration and penalty questions must be verified on India Code and the official MoRTH / state transport portal. This prototype does not invent fine amounts.',
          hi: 'लाइसेंस, पंजीकरण और जुर्माना इंडिया कोड तथा परिवहन पोर्टल पर जाँचें। यह प्रोटोटाइप जुर्माना राशि नहीं गढ़ता।',
          mr: 'परवाना, नोंदणी व दंड इंडिया कोड व परिवहन पोर्टलवर तपासा. हा नमुना दंडाची रक्कम शोधत नाही.',
        },
        rights: [],
        duties: [],
        exceptions: [],
        implications: [{ en: 'Reliable official information was not found in this curated set for a numbered MV Act penalty beyond the Act identity.', hi: 'इस सेट में क्रमांकित शास्ति विवरण नहीं है।', mr: 'या संचात क्रमांकित शास्ती तपशील नाही.' }],
        originalText:
          'The Motor Vehicles Act, 1988 is the official short title of the central motor-vehicle statute, as amended from time to time. Consult India Code and the Ministry of Road Transport and Highways for authentic text and notifications.',
      },
    ],
  },
]
