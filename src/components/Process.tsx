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
 * Calculate position on circle for each step
 * Steps are positioned at 72° intervals (360° / 5 steps)
 * Starting from top (-90°) and going clockwise
 */
function getStepPosition(index: number, radius: number) {
  // Start from top (-90°) and go clockwise
  const startAngle = -90
  const angleStep = 360 / steps.length
  const angle = startAngle + index * angleStep
  const radians = (angle * Math.PI) / 180

  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius,
    angle,
  }
}

/**
 * Desktop/Tablet circular step component
 */
function CircleStep({
  step,
  index,
  radius,
}: {
  step: (typeof steps)[0]
  index: number
  radius: number
}) {
  const { x, y } = getStepPosition(index, radius)

  // Badge is w-10 = 40px, so half = 20px
  // We position the badge center exactly on the ring point
  const badgeHalfSize = 20

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="absolute flex flex-col items-center text-center"
      style={{
        // Position so the badge center is exactly on the ring
        left: `calc(50% + ${x}px - ${badgeHalfSize}px)`,
        top: `calc(50% + ${y}px - ${badgeHalfSize}px)`,
        width: '160px',
        marginLeft: '-60px', // Offset to center the content area (160px - 40px badge) / 2 = 60px
      }}
    >
      {/* Number badge - sits on the ring */}
      <div className="w-10 h-10 mb-2 rounded-full bg-brand-gold flex items-center justify-center shadow-lg flex-shrink-0">
        <span className="text-lg font-bold text-brand-navy">{step.number}</span>
      </div>
      {/* Title */}
      <h3 className="text-base md:text-lg font-semibold text-brand-white mb-1">
        {step.title}
      </h3>
      {/* Description */}
      <p className="text-xs md:text-sm text-brand-gray leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

/**
 * Mobile step card component
 */
function MobileStepCard({
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
 * Process section with circular 360° layout
 * Desktop/Tablet: Steps positioned around a circle
 * Mobile: Stacked cards for better readability
 */
export function Process() {
  // Circle radius matching the ring position (inset-4 = 16px on desktop, inset-8 = 32px on tablet)
  // Container is 500px, so ring radius = (500 - inset*2) / 2
  const desktopRadius = 234 // (500 - 32) / 2 for md+ screens (inset-4 = 16px)
  const tabletRadius = 218 // (500 - 64) / 2 for sm-md screens (inset-8 = 32px)

  return (
    <Section id="process" background="dark">
      <SectionTitle
        light
        subtitle="שיטת העבודה שלי הינה מבוססת ניסיון רב שנים ומותאמת לצרכים הייחודיים של כל לקוח בראיית 360° לצרכים ההוליסטיים לטווח הקצר והארוך."
      >
        איך זה עובד?
      </SectionTitle>

      {/* Desktop/Tablet: Circular layout */}
      <div className="hidden sm:block">
        <div className="relative max-w-3xl mx-auto">
          {/* Circle container with aspect ratio */}
          <div
            className="relative mx-auto"
            style={{
              width: 'min(100%, 500px)',
              aspectRatio: '1 / 1',
            }}
          >
            {/* Outer decorative ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute inset-8 md:inset-4 rounded-full border-2 border-brand-gold/30"
            />

            {/* Center 360° text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center max-w-[140px] md:max-w-[160px]">
                <span className="text-4xl md:text-5xl font-bold text-brand-gold">
                  360°
                </span>
                <p className="text-xs md:text-sm text-brand-gray mt-2 leading-relaxed">
                  הלקוח במרכז,
                  <br />
                  ראייה הוליסטית
                </p>
              </div>
            </motion.div>

            {/* Steps positioned around the circle */}
            {/* Using responsive radius via CSS */}
            <div className="hidden md:block">
              {steps.map((step, index) => (
                <CircleStep
                  key={step.number}
                  step={step}
                  index={index}
                  radius={desktopRadius}
                />
              ))}
            </div>
            <div className="md:hidden">
              {steps.map((step, index) => (
                <CircleStep
                  key={step.number}
                  step={step}
                  index={index}
                  radius={tabletRadius}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked cards */}
      <div className="sm:hidden">
        <div className="max-w-md mx-auto space-y-4">
          {/* 360° header for mobile */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <span className="text-3xl font-bold text-brand-gold">360°</span>
            <p className="text-sm text-brand-gray mt-1 leading-relaxed">
              הלקוח במרכז, ראייה הוליסטית
            </p>
          </motion.div>

          {/* Step cards */}
          {steps.map((step, index) => (
            <MobileStepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
