import { motion } from 'framer-motion'
import { Section, SectionTitle, staggerContainer, staggerItem } from './Section'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/Card'

/**
 * Service cards configuration
 */
const services = [
  {
    title: 'ייעוץ השקעות',
    description:
      'בניית אסטרטגיית השקעה מותאמת אישית, בהתאם למטרות, לטווח הזמן ולרמת הסיכון של הלקוח– תוך ראייה רחבה וארוכת טווח.',
  },
  {
    title: 'ייעוץ פנסיוני',
    description:
      'בדיקה וניתוח מקיף של החיסכון הפנסיוני, התאמת מסלולים, דמי ניהול וכיסויים – כדי להבטיח עתיד כלכלי יציב ובטוח.',
  },
  {
    title: 'בחינת תיק ביטוחי',
    description:
      'התאמת הכיסויים הביטוחיים לצרכים האמיתיים – ללא כפל ביטוחים, ללא הוצאות מיותרות ועם מקסימום הגנה.',
  },
  {
    title: 'ביטוח נסיעות לחו"ל',
    description: 'כיסוי ביטוח נסיעות לחו"ל המותאם לצרכים של הנסיעה.',
  },
  {
    title: 'תכנון פיננסי הוליסטי',
    description:
      'חיבור בין השקעות, פנסיה וביטוח לכדי תמונה אחת ברורה, שמאפשרת קבלת החלטות חכמות ושקט נפשי.',
  },
  {
    title: 'שירותים נוספים',
    description:
      'משיכת פיצויים ומשיכת כספי תגמולים והלוואות על חשבון הקרנות, בדיקת זכאות להחזרי מס, ייעוץ פיננסי הכולל ייעוץ כלכלת המשפחה וייעוץ משכנתאות.',
  },
]

/**
 * Services section
 * Off-white background with navy/black text
 */
export function Services() {
  return (
    <Section id="services" background="default">
      <SectionTitle subtitle="כל השירותים שאתם צריכים תחת קורת גג אחת">
        תחומי ההתמחות
      </SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div key={index} variants={staggerItem}>
            <Card className="h-full hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
                    <img src="/blue_h.png" alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
