import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import { Section, SectionTitle, staggerContainer, staggerItem } from './Section'
import { Card, CardContent } from './ui/Card'

/**
 * Testimonials data
 */
const testimonials = [
  {
    text: 'הדיל עשתה לנו סדר מלא בביטוחים של כל המשפחה, הוזילה עלויות בצורה משמעותית ודאגה שהפנסיה וקרנות ההשתלמות שלנו יתנהלו במסלולים מניבים ומתאימים לגילנו. היום אני רגוע ושקט הרבה יותר – בזכות המקצועיות והדיוק של הדיל.',
  },
  {
    text: 'תודה להדיל על הליווי והיחס האישי. בזכותה הבנתי שהפנסיה שלי היא לא רק מספרים – אלא העתיד הפיננסי שלי.',
  },
  {
    text: 'פניתי להדיל כדי לעשות סדר בקרנות הפנסיה של עובדי המפעל, והתרשמתי מהזריזות, המקצועיות והיסודיות. היא דאגה לכל עובד עד הפרט האחרון – ביטוחים, פנסיה ואפילו פתיחת קופות חיסכון. כמעסיק, אני רגוע הרבה יותר היום.',
  },
  {
    text: 'פניתי להדיל כי הרגשתי שאני משלמת יותר מדי על ביטוחים ולא באמת מבינה את הפנסיה שלי. היא עשתה השוואה בין החברות, הסבירה הכול בסבלנות, ביטלה ביטוחים כפולים, וגילתה שגבו ממני דמי ניהול כפולים בפנסיה. בזכותה קיבלתי החזר של 2,200₪. הרגשתי שאני בידיים הכי טובות ושבאמת אכפת לה ממני.',
  },
]

/**
 * Testimonials section
 * Off-white background with navy text and gold stars
 */
export function Testimonials() {
  return (
    <Section id="testimonials" background="default">
      <SectionTitle>לקוחות מספרים על השירות שקיבלו</SectionTitle>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} variants={staggerItem}>
            <Card className="h-full">
              <CardContent className="pt-6">
                {/* Stars - gold accent */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className="w-5 h-5 text-brand-gold fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-brand-black/80 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
