import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Doctor } from '../types'

const services = [
  { title: 'Find Doctors', icon: '👨‍⚕️', color: '#dbeafe', desc: 'Book confirmed appointments' },
  { title: 'Video Consult', icon: '📱', color: '#ddd6fe', desc: 'Consult within 60 seconds' },
  { title: 'Lab Tests', icon: '🧪', color: '#fce7f3', desc: 'Trusted & verified labs' },
  { title: 'Surgeries', icon: '🏥', color: '#d1fae5', desc: 'Safe surgery centers' },
]

const topHospitals = [
  { name: 'Apollo Hospitals', location: 'Chennai', rating: '4.7', beds: '1200+', speciality: 'Cardiology, Oncology' },
  { name: 'Fortis Healthcare', location: 'Bangalore', rating: '4.6', beds: '1100+', speciality: 'Multi-speciality' },
  { name: 'AIIMS', location: 'Delhi', rating: '4.8', beds: '1500+', speciality: 'All specialities' },
  { name: 'Narayana Health', location: 'Hyderabad', rating: '4.6', beds: '950+', speciality: 'Cardiac Surgery' },
]

export function HomePage() {
  const { doctors, refreshDoctors } = useApp()
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('All cities')
  const [selectedHospital, setSelectedHospital] = useState<typeof topHospitals[0] | null>(null)

  const indianCities = [
    'All cities',
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
    'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Amritsar', 'Chandigarh'
  ]

  const doctorSuggestions = [
    'Dr. Rajesh Kumar', 'Dr. Priya Sharma', 'Dr. Amit Patel', 'Dr. Anjali Singh',
    'Dr. Vikram Reddy', 'Dr. Meera Nair', 'Dr. Arjun Desai', 'Dr. Kavita Joshi',
    'Dr. Rohan Malhotra', 'Dr. Sneha Iyer', 'Dr. Karan Mehta', 'Dr. Divya Rao'
  ]

  const doctorsToShow: Doctor[] = doctors.map((d) => ({
    ...d,
    location: d.location ?? 'Any',
    hospital: d.hospital ?? 'Not specified',
    experienceYears: d.experienceYears,
  }))

  const filteredDoctors = useMemo(() => {
    return doctorsToShow.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase())
      const matchesCity =
        city === 'All cities' || doc.location?.toLowerCase() === city.toLowerCase()
      return matchesSearch && matchesCity
    })
  }, [city, doctorsToShow, search])

  return (
    <div className="home-container">
      {/* Hero Section with Search */}
      <section className="hero-section">
        <h1 className="hero-title">Consult top doctors online for any health concern</h1>
        <p className="hero-subtitle">Private online consultations with verified doctors in all specialists</p>
        
        <div className="search-container">
          <div className="location-search">
            <span className="location-icon">📍</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="location-select">
              {indianCities.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="doctor-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search doctors, clinics, hospitals, etc."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              list="doctor-suggestions"
              className="search-input"
            />
            <datalist id="doctor-suggestions">
              {doctorSuggestions.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Service Cards */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.title} className="service-card" style={{ backgroundColor: service.color }}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <div className="section-header">
          <div>
            <h2>Browse Doctors</h2>
            <p className="section-subtitle">Find the best specialists in your area</p>
          </div>
          <button className="refresh-btn" onClick={() => refreshDoctors()}>🔄 Refresh</button>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="empty-state">
            <p>🏥 No doctors available yet. Try refreshing or add some in Admin.</p>
            <div className="empty-actions">
              <button onClick={() => refreshDoctors()} className="btn btn-primary">Refresh doctors</button>
              <Link className="btn btn-outline" to="/admin">Go to Admin</Link>
            </div>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map((doc) => (
              <div className="doctor-card-enhanced" key={doc.id}>
                <div className="doctor-card-header">
                  <div className="doctor-avatar-large">👨‍⚕️</div>
                  <span className="available-badge">✓ Available</span>
                </div>
                <div className="doctor-card-body">
                  <h3 className="doctor-name">{doc.name}</h3>
                  <p className="doctor-specialty">{doc.specialty}</p>
                  <div className="doctor-meta">
                    <span className="meta-item">📍 {doc.location}</span>
                    <span className="meta-item">⭐ {doc.experienceYears || 0}y exp</span>
                  </div>
                  <p className="doctor-hospital">Works at: {doc.hospital}</p>
                  <div className="doctor-card-actions">
                    <Link className="btn btn-primary btn-small" to={`/booking/${doc.id}`}>
                      Book Now
                    </Link>
                    <Link className="btn btn-outline btn-small" to={`/booking/${doc.id}`}>
                      View Slots
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top Hospitals Section */}
      <section className="hospitals-section">
        <div className="section-header">
          <div>
            <h2>Top Hospitals Near You</h2>
            <p className="section-subtitle">Trusted multi-speciality centers with expert care</p>
          </div>
        </div>
        <div className="hospitals-grid">
          {topHospitals.map((hosp) => (
            <div key={hosp.name} className="hospital-card-enhanced">
              <div className="hospital-card-header">
                <div className="hospital-icon">🏥</div>
                <span className="rating-badge">⭐ {hosp.rating}</span>
              </div>
              <h3 className="hospital-name">{hosp.name}</h3>
              <div className="hospital-info-list">
                <p className="hospital-location">📍 {hosp.location}</p>
                <p className="hospital-beds">🛏️ {hosp.beds} beds</p>
                <p className="hospital-spec">🩺 {hosp.speciality}</p>
              </div>
              <button 
                className="btn btn-outline-primary btn-full"
                onClick={() => setSelectedHospital(hosp)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <div className="modal-overlay" onClick={() => setSelectedHospital(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedHospital(null)}
            >
              ✕
            </button>
            <div className="modal-header">
              <div className="modal-icon">🏥</div>
              <h2>{selectedHospital.name}</h2>
            </div>
            <div className="hospital-details">
              <div className="detail-row">
                <span className="detail-label">📍 Location:</span>
                <span>{selectedHospital.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">⭐ Rating:</span>
                <span className="rating-badge-inline">{selectedHospital.rating} / 5.0</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">🛏️ Beds:</span>
                <span>{selectedHospital.beds}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">🩺 Specialities:</span>
                <span>{selectedHospital.speciality}</span>
              </div>
            </div>
            <div className="hospital-amenities">
              <h3>🌟 Amenities</h3>
              <ul>
                <li>✅ 24x7 Emergency Services</li>
                <li>✅ Advanced Diagnostics</li>
                <li>✅ In-house Pharmacy</li>
                <li>✅ Day-care Facilities</li>
                <li>✅ Experienced Medical Staff</li>
                <li>✅ Modern ICU & OT Facilities</li>
              </ul>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary btn-full">📞 Call Hospital</button>
              <button className="btn btn-outline btn-full" onClick={() => setSelectedHospital(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

