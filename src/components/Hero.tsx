import { motion } from 'framer-motion'
import { Button } from './ui/Button'

/**
 * Hero section - main landing area
 * Navy background with off-white text and gold accents
 */
export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 bg-brand-navy"
    >
      <div className="container-padded">
        <div className="flex flex-col md:flex-row md:gap-12 items-center max-w-6xl mx-auto">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="md:w-2/3 text-center md:text-right"
          >
            {/* Logo - aligned left (end in RTL) near photo */}
            <div className="mb-4 flex justify-center md:justify-end">
              <img
                src="/main_white.png"
                alt="Hadil - פנסיה, ביטוח ופיננסים"
                className="h-32 md:h-40 lg:h-48 w-auto"
              />
            </div>

            {/* Slogan */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-white mb-6">
              העתיד הפיננסי שלך הוא המחויבות האישית שלי
            </h1>

            {/* Photo - mobile only, under slogan */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="md:hidden my-8"
            >
              <img
                src="/hadeel_2.JPG"
                alt="הדיל חלבי חסון"
                className="w-full max-w-xs mx-auto rounded-2xl object-cover shadow-lg"
              />
            </motion.div>

            {/* Vision - as secondary callout */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-brand-white/80 leading-relaxed"
            >
              החזון שלי: השפעה על עתיד פיננסי בטוח ושקט של הלקוחות ע"י מחויבות אמיתית, שקיפות
              ויושרה מקצועית תוך הבנה עמוקה לצרכי הלקוחות בראיה אובייקטיבית
              ומקיפה למיצוי הפוטנציאל המקסימלי לטובת הלקוח לטווח הארוך בסטנדרטים
              לא מתפשרים.
            </motion.p>
          </motion.div>

          {/* Photo - desktop only, on the left side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="hidden md:block md:w-1/3"
          >
            <img
              src="/hadeel_2.JPG"
              alt="הדיל חלבי חסון"
              className="w-full max-w-xs mx-auto rounded-2xl object-cover shadow-lg"
            />
          </motion.div>
        </div>

        {/* CTA Button - centered at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 text-center md:text-right"
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-brand-gold text-brand-black hover:bg-brand-white"
          >
            ליצירת קשר
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 inset-x-0 hidden md:flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-brand-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-3 bg-brand-white/40 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
