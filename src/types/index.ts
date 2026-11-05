export type Lang = 'en' | 'hi' | 'mr'
export type Confidence = 'high' | 'medium' | 'low'
export type SourceType = 'myscheme' | 'digilocker' | 'indiacode' | 'department' | 'state'
export type RequirementStatus = 'completed' | 'missing' | 'needs_confirmation' | 'not_applicable'
export type ActionMode = 'online' | 'offline' | 'both'
export type CaseStatus = 'new' | 'needs_documents' | 'ready_to_apply' | 'completed'
export type Role = 'citizen' | 'helper' | 'administrator'
export type QualityType = 'blur' | 'crop' | 'glare' | 'missing_page' | 'unsupported_language' | 'low_ocr'

export interface OfficialSource {
  title: string
  department: string
  url: string
  sourceType: SourceType
  actOrScheme: string
  sectionRef?: string
  lastVerified: string
  version: string
}

export interface Localized {
  en: string
  hi: string
  mr: string
}

export interface ExtractedField {
  id: string
  label: Localized
  value: string
  confidence: Confidence
  page: number
  evidenceText: string
  confirmed: boolean
  sensitive?: boolean
}

export interface Requirement {
  id: string
  title: Localized
  detail: Localized
  status: RequirementStatus
  notes: string
  supportingDoc?: string
}

export interface ActionItem {
  id: string
  what: Localized
  where: Localized
  documents: Localized[]
  deadline?: string
  officialLink?: string
  officialLinkLabel?: string
  nextStep: Localized
  mode: ActionMode
}

export interface EligibilityRule {
  id: string
  field: string
  operator: 'eq' | 'lte' | 'gte' | 'in' | 'truthy'
  value: string | number | string[] | boolean
  label: Localized
}

export interface Scheme {
  id: string
  name: Localized
  shortDescription: Localized
  department: string
  state: string
  category: 'scholarship' | 'certificate' | 'welfare' | 'farmer' | 'health'
  eligibility: EligibilityRule[]
  requiredDocuments: Localized[]
  officialSource: OfficialSource
  benefits: Localized
}

export interface LawSection {
  id: string
  number: string
  title: Localized
  simplified: Localized
  rights: Localized[]
  duties: Localized[]
  exceptions: Localized[]
  implications: Localized[]
  originalText: string
}

export interface Law {
  id: string
  name: Localized
  year: number
  shortName: string
  summary: Localized
  officialSource: OfficialSource
  sections: LawSection[]
  keywords: string[]
}

export interface EvidenceNode {
  id: string
  type: 'document' | 'field' | 'requirement' | 'rule' | 'source' | 'action'
  title: Localized
  detail: Localized
}

export interface QualityIssue {
  type: QualityType
  severity: 'warning' | 'error'
  message: Localized
}

export interface AnalysisResult {
  id: string
  documentName: string
  documentType: Localized
  purpose: Localized
  issuingAuthority: string
  language: string
  status: string
  explanation: Localized[]
  fields: ExtractedField[]
  requirements: Requirement[]
  actions: ActionItem[]
  schemeIds: string[]
  evidenceTrail: EvidenceNode[]
  qualityIssues: QualityIssue[]
  extractedText: string
  createdAt: string
  prototype: boolean
}

export interface DemoDocument {
  id: string
  title: Localized
  description: Localized
  fileName: string
  kind: 'pdf' | 'image' | 'notice'
  analysisId: string
  qualityPreview?: boolean
}

export interface ServiceDeskCase {
  id: string
  citizenName: string
  documentType: string
  status: CaseStatus
  checklistProgress: number
  staffNotes: string
  lastUpdated: string
  assignedTo: string
  analysisId?: string
}

export interface EligibilityAnswers {
  state: string
  district: string
  ageGroup: string
  categoryUser: string
  income: number | null
  gender: string
  disability: string
  socialCategory: string
  education: string
  employment: string
  domicileMh: string
}

export interface RuleEval {
  rule: EligibilityRule
  result: 'satisfied' | 'not_satisfied' | 'needs_confirmation'
}

export interface SchemeMatch {
  scheme: Scheme
  evaluations: RuleEval[]
  score: number
  why: Localized
}

export interface SavedChecklist {
  id: string
  title: string
  analysisId: string
  updatedAt: string
  items: Requirement[]
}

export type ClauseFlag = 'normal' | 'important' | 'review'
export type ConstitutionCategory =
  | 'preamble'
  | 'fundamental_rights'
  | 'dpsp'
  | 'fundamental_duties'
  | 'union'
  | 'state'
  | 'judiciary'
  | 'elections'
  | 'emergency'
  | 'bodies'
  | 'schedules'
  | 'amendments'

export interface ConstitutionArticle {
  id: string
  article: string
  title: Localized
  category: ConstitutionCategory
  covers: Localized
  simplified: Localized
  keyPoints: Localized[]
  related: string[]
  keywords: string[]
  officialText: string
  officialSource: OfficialSource
}

export interface LegalTerm {
  id: string
  term: Localized
  legalMeaning: Localized
  simpleMeaning: Localized
  example: Localized
  appearsIn: Localized
  related: string[]
  keywords: string[]
}

export interface LegalClause {
  id: string
  title: Localized
  originalText: string
  explanation: Localized
  whyItMatters: Localized
  questions: Localized[]
  flag: ClauseFlag
  relatedTopic?: Localized
  relatedSource?: OfficialSource
}

export interface RentReview {
  id: string
  documentName: string
  documentType: Localized
  extractedText: string
  basics: ExtractedField[]
  clauses: LegalClause[]
  clear: Localized[]
  attention: Localized[]
  missing: Localized[]
  suggestedQuestions: Localized[]
  createdAt: string
  prototype: boolean
}

export interface UserProfile {
  name: string
  state: string
  language: Lang
  occupation: string
  ageGroup: string
}

export interface HistoryItem {
  id: string
  name: string
  kind: 'government' | 'legal' | 'rent' | 'generated'
  typeLabel: string
  date: string
  status: string
  href: string
}

export interface DocTemplate {
  id: string
  name: Localized
  description: Localized
  fields: { id: string; label: Localized; placeholder: string }[]
}

export interface GeneratedDraft {
  id: string
  templateId: string
  title: string
  body: string
  createdAt: string
}

export interface GroundedAnswer {
  id: string
  question: string
  keywords: string[]
  answer: Localized
  source?: OfficialSource
  confidence: Confidence
  relatedHref?: string
}
