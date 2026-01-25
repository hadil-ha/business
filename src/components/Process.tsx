import { motion } from 'framer-motion'
import { Section, SectionTitle } from './Section'

/**
 * Process steps configuration
 */
const steps = [
  {
    number: 1,
    title: 'מיפוי',
    description: 'היכרות ואבחון אנאליטי ומעמיק ללקוח ולצרכים שלו בראיית 360°.',
  },
  {
    number: 2,
    title: 'הצגה ושיקוף',
    description:
      'ניתוח הנתונים והצגת תמונת מצב משקפת, רחבה וברורה לטווח הארוך',
  },
  {
    number: 3,
    title: 'התאמה אישית',
    description: 'מתן פתרונות מותאמים אישית',
  },
  {
    number: 4,
    title: 'ביצוע',
    description: 'מביאים הלכה למעשה תוך סגירת כל הקצוות',
  },
  {
    number: 5,
    title: 'מעקב ובקרה',
    description:
      'ליווי שוטף, מעקב ועדכון בהתאם לשינויים בחיים ובסביבה העסקית',
  },
]

/**
 * Step card component
 */
function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex items-start gap-4 p-4 bg-brand-navy/50 rounded-xl border border-brand-gray/10"
    >
      {/* Number badge */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center">
        <span className="text-lg font-bold text-brand-navy">{step.number}</span>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-brand-white mb-1">
          {step.title}
        </h3>
        <p className="text-sm text-brand-gray leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

/**
 * Process section with stacked card layout
 * Unified layout for all screen sizes
 */
export function Process() {
  return (
    <Section id="process" background="dark">
      <SectionTitle
        light
        subtitle="שיטת העבודה שלי הינה מבוססת ניסיון רב שנים ומותאמת לצרכים הייחודיים של כל לקוח בראיית 360° לצרכים ההוליסטיים לטווח הקצר והארוך."
      >
        איך זה עובד?
      </SectionTitle>

      {/* Stacked cards layout for all screen sizes */}
      <div className="max-w-xl mx-auto space-y-4">
        {/* 360° header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-3xl sm:text-4xl font-bold text-brand-gold">360°</span>
          <p className="text-sm sm:text-base text-brand-gray mt-1 leading-relaxed">
            הלקוח במרכז, ראייה הוליסטית
          </p>
        </motion.div>

        {/* Step cards */}
        {steps.map((step, index) => (
          <StepCard key={step.number} step={step} index={index} />
        ))}
      </div>
    </Section>
  )
}
