import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { INITIAL_CASES } from '../data/serviceDesk'
import type {
  AnalysisResult,
  GeneratedDraft,
  HistoryItem,
  Requirement,
  RentReview,
  Role,
  SavedChecklist,
  ServiceDeskCase,
  UserProfile,
} from '../types'

interface AppState {
  consent: boolean
  setConsent: (v: boolean) => void
  analysis: AnalysisResult | null
  setAnalysis: (a: AnalysisResult | null) => void
  updateField: (id: string, value: string, confirmed: boolean) => void
  updateRequirement: (id: string, patch: Partial<Requirement>) => void
  checklists: SavedChecklist[]
  saveChecklist: () => void
  deleteDocument: () => void
  deleteSession: () => void
  sessionNotice: string | null
  setSessionNotice: (s: string | null) => void
  role: Role
  setRole: (r: Role) => void
  cases: ServiceDeskCase[]
  updateCase: (id: string, patch: Partial<ServiceDeskCase>) => void
  processingSecure: boolean
  setProcessingSecure: (v: boolean) => void
  confirmReadableFields: () => void
  demoMode: boolean
  setDemoMode: (v: boolean) => void
  profile: UserProfile
  setProfile: (p: UserProfile) => void
  history: HistoryItem[]
  addHistory: (item: HistoryItem) => void
  removeHistory: (id: string) => void
  clearHistory: () => void
  rentReview: RentReview | null
  setRentReview: (r: RentReview | null) => void
  drafts: GeneratedDraft[]
  addDraft: (d: GeneratedDraft) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [checklists, setChecklists] = useState<SavedChecklist[]>([])
  const [sessionNotice, setSessionNotice] = useState<string | null>(null)
  const [role, setRole] = useState<Role>('citizen')
  const [cases, setCases] = useState<ServiceDeskCase[]>(INITIAL_CASES)
  const [processingSecure, setProcessingSecure] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Vishwajit Desai',
    state: 'MH',
    language: 'en',
    occupation: '',
    ageGroup: '',
  })
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [rentReview, setRentReview] = useState<RentReview | null>(null)
  const [drafts, setDrafts] = useState<GeneratedDraft[]>([])

  const addHistory = (item: HistoryItem) => setHistory((prev) => [item, ...prev.filter((h) => h.id !== item.id)])
  const removeHistory = (id: string) => setHistory((prev) => prev.filter((h) => h.id !== id))
  const clearHistory = () => setHistory([])
  const addDraft = (d: GeneratedDraft) => setDrafts((prev) => [d, ...prev])

  const updateField: AppState['updateField'] = (id, value, confirmed) => {
    setAnalysis((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        fields: prev.fields.map((f) => (f.id === id ? { ...f, value, confirmed } : f)),
      }
    })
  }

  const updateRequirement: AppState['updateRequirement'] = (id, patch) => {
    setAnalysis((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        requirements: prev.requirements.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      }
    })
  }

  const saveChecklist = () => {
    if (!analysis) return
    const item: SavedChecklist = {
      id: `cl-${analysis.id}`,
      title: analysis.documentName,
      analysisId: analysis.id,
      updatedAt: new Date().toISOString(),
      items: analysis.requirements,
    }
    setChecklists((prev) => [item, ...prev.filter((c) => c.id !== item.id)])
  }

  const confirmReadableFields = () => {
    setAnalysis((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        fields: prev.fields.map((f) => (f.confidence === 'low' ? f : { ...f, confirmed: true })),
      }
    })
  }

  const deleteDocument = () => {
    setAnalysis(null)
    setConsent(false)
    setDemoMode(false)
    setSessionNotice('deleted')
  }

  const deleteSession = () => {
    setAnalysis(null)
    setConsent(false)
    setDemoMode(false)
    setChecklists([])
    setCases(INITIAL_CASES)
    setRole('citizen')
    setHistory([])
    setRentReview(null)
    setDrafts([])
    setSessionNotice('deleted')
  }

  const updateCase: AppState['updateCase'] = (id, patch) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch, lastUpdated: '2026-08-19' } : c)))
  }

  const value = useMemo(
    () => ({
      consent,
      setConsent,
      analysis,
      setAnalysis,
      updateField,
      updateRequirement,
      checklists,
      saveChecklist,
      deleteDocument,
      deleteSession,
      sessionNotice,
      setSessionNotice,
      role,
      setRole,
      cases,
      updateCase,
      processingSecure,
      setProcessingSecure,
      confirmReadableFields,
      demoMode,
      setDemoMode,
      profile,
      setProfile,
      history,
      addHistory,
      removeHistory,
      clearHistory,
      rentReview,
      setRentReview,
      drafts,
      addDraft,
    }),
    [consent, analysis, checklists, sessionNotice, role, cases, processingSecure, demoMode, profile, history, rentReview, drafts],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp outside provider')
  return ctx
}
