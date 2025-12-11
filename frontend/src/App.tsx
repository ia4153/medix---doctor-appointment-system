import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AdminPage } from './pages/Admin'
import { BookingPage } from './pages/Booking'
import { HomePage } from './pages/Home'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
