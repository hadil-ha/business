import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPhone } from 'react-icons/hi'

/**
 * Floating Action Button for quick navigation to contact section
 * Appears after scrolling past the hero section
 * Fixed position at bottom-left (RTL layout)
 */
export function ContactFab() {
  const [isVisible, setIsVisible] = useState(false)
  const [isInContactSection, setIsInContactSection] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling past 50% of viewport height
      const scrollThreshold = window.innerHeight * 0.5
      const shouldShow = window.scrollY > scrollThreshold

      // Check if contact section is in viewport
      const contactSection = document.querySelector('#contact')
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        setIsInContactSection(isInView)
      }

      setIsVisible(shouldShow && !isInContactSection)
    }

    // Check initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInContactSection])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          onClick={scrollToContact}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-brand-gold text-brand-navy shadow-lg hover:shadow-xl flex items-center justify-center group cursor-pointer"
          aria-label="צור קשר"
        >
          {/* Pulse ring animation */}
          <span className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-25" />

          {/* Icon */}
          <HiPhone className="w-6 h-6 relative z-10 transition-transform group-hover:rotate-12" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
