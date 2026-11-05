import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { isStandalone } from './standalone'
import { GuestOnly, RequireAuth } from './components/auth/RequireAuth'
import { AppLayout } from './components/layout/AppLayout'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { SettingsProvider } from './context/SettingsContext'
import { AnalysisResult } from './pages/AnalysisResult'
import { Analyze } from './pages/Analyze'
import { Checklists } from './pages/Checklists'
import { Compare } from './pages/Compare'
import { Constitution } from './pages/Constitution'
import { ConstitutionArticle } from './pages/ConstitutionArticle'
import { Dashboard } from './pages/Dashboard'
import { DemoHub } from './pages/DemoHub'
import { Dictionary } from './pages/Dictionary'
import { DictionaryTerm } from './pages/DictionaryTerm'
import { DocumentGenerator } from './pages/DocumentGenerator'
import { Evidence } from './pages/Evidence'
import { Help } from './pages/Help'
import { History } from './pages/History'
import { HowItWorks } from './pages/HowItWorks'
import { Landing } from './pages/Landing'
import { LawDetail } from './pages/LawDetail'
import { Laws } from './pages/Laws'
import { LegalAssistant } from './pages/LegalAssistant'
import { MissingDocs } from './pages/MissingDocs'
import { NotFound } from './pages/NotFound'
import { PackageGenerator } from './pages/PackageGenerator'
import { Privacy } from './pages/Privacy'
import { Profile } from './pages/Profile'
import { RentChecker } from './pages/RentChecker'
import { RentResult } from './pages/RentResult'
import { SchemeDetail } from './pages/SchemeDetail'
import { Schemes } from './pages/Schemes'
import { ServiceDesk } from './pages/ServiceDesk'
import { Settings } from './pages/Settings'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { GoogleCallback } from './pages/auth/GoogleCallback'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { TwoFactor } from './pages/auth/TwoFactor'

export default function App() {
  const Router = isStandalone() ? HashRouter : BrowserRouter
  return (
    <SettingsProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>
            <Router>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <GuestOnly>
                      <Login />
                    </GuestOnly>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestOnly>
                      <Register />
                    </GuestOnly>
                  }
                />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/login/2fa" element={<TwoFactor />} />
                <Route path="/login/google/callback" element={<GoogleCallback />} />
                <Route path="/welcome" element={<Landing />} />
                <Route element={<RequireAuth />}>
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analyze" element={<Analyze />} />
                    <Route path="/analysis/:id" element={<AnalysisResult />} />
                    <Route path="/schemes" element={<Schemes />} />
                    <Route path="/schemes/:id" element={<SchemeDetail />} />
                    <Route path="/laws" element={<Laws />} />
                    <Route path="/laws/:id" element={<LawDetail />} />
                    <Route path="/legal" element={<LegalAssistant />} />
                    <Route path="/constitution" element={<Constitution />} />
                    <Route path="/constitution/:id" element={<ConstitutionArticle />} />
                    <Route path="/rent-checker" element={<RentChecker />} />
                    <Route path="/rent-checker/:id" element={<RentResult />} />
                    <Route path="/dictionary" element={<Dictionary />} />
                    <Route path="/dictionary/:id" element={<DictionaryTerm />} />
                    <Route path="/generate" element={<DocumentGenerator />} />
                    <Route path="/missing" element={<MissingDocs />} />
                    <Route path="/package" element={<PackageGenerator />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/demo" element={<DemoHub />} />
                    <Route path="/checklists" element={<Checklists />} />
                    <Route path="/evidence" element={<Evidence />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/service-desk" element={<ServiceDesk />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </SettingsProvider>
  )
}
