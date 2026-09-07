import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthScreen } from './components/AuthScreen'
import { TopBar } from './components/TopBar'
import { AppNav, type ViewId } from './components/AppNav'
import { Footer } from './components/Footer'
import { HomeView } from './views/HomeView'
import { MapView } from './views/MapView'
import { AlertsView } from './views/AlertsView'
import { ProfileView } from './views/ProfileView'
import { useFloodRisk } from './hooks/useFloodRisk'
import './styles/app.css'

const statusCopy: Record<'safe' | 'watch' | 'danger', string> = {
  safe: 'No hazards detected nearby',
  watch: 'Stay alert — elevated risk nearby',
  danger: 'Danger nearby — take action',
}

function MainApp() {
  const [activeView, setActiveView] = useState<ViewId>('home')
  const {
    status,
    overallRiskLevel,
    hazards,
    topHazard,
    simulateNearbyDanger,
    resetToActualLocation,
  } = useFloodRisk()

  const activeAlertCount = hazards.filter((h) => h.severity !== 'safe').length

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <TopBar
          riskLevel={overallRiskLevel}
          locating={status === 'locating'}
          statusText={statusCopy[overallRiskLevel]}
          onProfileClick={() => setActiveView('profile')}
        />

        <div className="app-body">
          <AppNav active={activeView} onSelect={setActiveView} alertCount={activeAlertCount} />

          <main className="app-content">
            {activeView === 'home' && (
              <HomeView
                topHazard={topHazard}
                hazards={hazards}
                overallRiskLevel={overallRiskLevel}
                status={status}
                simulateNearbyDanger={simulateNearbyDanger}
                resetToActualLocation={resetToActualLocation}
                onNavigate={setActiveView}
              />
            )}
            {activeView === 'map' && (
              <MapView hazards={hazards} overallRiskLevel={overallRiskLevel} />
            )}
            {activeView === 'alerts' && <AlertsView hazards={hazards} />}
            {activeView === 'profile' && <ProfileView />}
          </main>
        </div>

        <Footer />
      </div>
    </div>
  )
}

function Gate() {
  const { user, isReady } = useAuth()
  if (!isReady) return null
  return user ? <MainApp /> : <AuthScreen />
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Gate />
      </AuthProvider>
    </ThemeProvider>
  )
}
