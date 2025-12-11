import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function Layout({ children }: { children: React.ReactNode }) {
  const { loading, error, clearError } = useApp()

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">MediX</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      {loading && <div className="banner info">Loading...</div>}
      {error && (
        <div className="banner error">
          <span>{error}</span>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}

      <main className="content">{children}</main>
    </div>
  )
}


