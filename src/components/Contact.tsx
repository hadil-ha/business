import { HiPhone, HiMail } from 'react-icons/hi'
import { Section, SectionTitle } from './Section'
import { LeadForm } from './LeadForm'

/**
 * Contact section with details and lead form
 * Off-white background with black text
 */
export function Contact() {
  return (
    <Section id="contact" background="default">
      <SectionTitle subtitle="השאירו פרטים ונחזור אליכם בהקדם">
        יצירת קשר
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-brand-navy mb-4">
              פרטי התקשרות
            </h3>

            <div className="space-y-4">
              {/* Name */}
              <p className="text-lg text-brand-black">
                הדיל חלבי חסון
              </p>

              {/* Phone - clickable with LTR display */}
              <a
                href="tel:+972546004863"
                className="flex items-center gap-3 text-brand-black/80 hover:text-brand-navy transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-navy/10 flex items-center justify-center group-hover:bg-brand-navy/20 transition-colors">
                  <HiPhone className="w-5 h-5 text-brand-navy" />
                </div>
                <span className="ltr text-lg" dir="ltr">
                  054-600-4863
                </span>
              </a>

              {/* Email - clickable with LTR display */}
              <a
                href="mailto:hadil@hadil-finance.com"
                className="flex items-center gap-3 text-brand-black/80 hover:text-brand-navy transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-navy/10 flex items-center justify-center group-hover:bg-brand-navy/20 transition-colors">
                  <HiMail className="w-5 h-5 text-brand-navy" />
                </div>
                <span className="ltr text-lg" dir="ltr">
                hadil@hadil-finance.com
                </span>
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-6 bg-brand-navy/5 rounded-xl">
            <p className="text-brand-black/70">
              פגישת ייעוץ ראשונית ללא עלות וללא התחייבות.
              <br />
              אשמח ללוות אותך בדרך לעתיד פיננסי יציב ובטוח.
            </p>
          </div>
        </div>

        {/* Lead Form */}
        <div className="bg-white p-6 md:p-8 rounded-xl border border-brand-gray/30 shadow-sm">
          <LeadForm />
        </div>
      </div>
    </Section>
  )
}
