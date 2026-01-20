import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Trust } from './components/Trust'
import { About } from './components/About'
import { WhyUs } from './components/WhyUs'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Testimonials } from './components/Testimonials'
import { Result } from './components/Result'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ContactFab } from './components/ContactFab'

/**
 * Main Application Component
 *
 * Single-page landing page for financial consulting services
 * All sections are rendered in order with anchor navigation
 *
 * Sections:
 * 1. Hero (#hero) - Main landing with slogan and CTA
 * 2. Trust (#trust) - Credentials and experience highlights
 * 3. About (#about) - Personal bio and photo
 * 4. WhyUs (#why) - Differentiators and values
 * 5. Services (#services) - Service offerings
 * 6. Process (#process) - How it works steps
 * 7. Testimonials (#testimonials) - Client testimonials
 * 8. Result (#result) - Personal message and outcome
 * 9. Contact (#contact) - Contact form and details
 * 10. Footer (#footer) - Footer with contact info
 */
function App() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Trust />
        <About />
        <WhyUs />
        <Services />
        <Process />
        <Testimonials />
        <Result />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <ContactFab />
    </div>
  )
}

export default App
