import { HiPhone, HiMail } from 'react-icons/hi'

/**
 * Footer component with contact info and copyright
 * Black background with gray/off-white text
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="footer"
      className="bg-brand-black text-brand-gray py-12"
    >
      <div className="container-padded">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">


          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="tel:+972546004863"
              className="flex items-center gap-2 text-brand-gray hover:text-brand-white transition-colors"
            >
              <HiPhone className="w-5 h-5" />
              <span className="ltr">054-600-4863</span>
            </a>

            <a
              href="mailto:hadil@hadil-finance.com"
              className="flex items-center gap-2 text-brand-gray hover:text-brand-white transition-colors"
            >
              <HiMail className="w-5 h-5" />
              <span className="ltr">hadil@hadil-finance.com</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-brand-gray/20 mt-8 pt-8 text-center text-sm text-brand-gray/70">
          <p>© {currentYear} הדיל חלבי חסון. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}
