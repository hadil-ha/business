import { motion } from 'framer-motion'
import {
  HiCheckCircle,
  HiUserCircle,
  HiBriefcase,
  HiHeart,
} from 'react-icons/hi'
import { Section, SectionTitle, staggerContainer, staggerItem } from './Section'

/**
 * Values list with icons
 */
const values = [
  { name: 'אמינות', description: 'טובת הלקוח במרכז', icon: HiCheckCircle },
  { name: 'מקצועיות', description: 'סטנדרטים לא מתפשרים', icon: HiCheckCircle },
  { name: 'שקיפות', description: 'בחינה והשוואה אמיתית בין חלופות', icon: HiCheckCircle },
  { name: 'אובייקטיביות', description: 'השוואה בין חברות ביטוח ובתי השקעות', icon: HiCheckCircle },
  { name: 'סודיות', description: 'ערך עליון', icon: HiCheckCircle },
  { name: 'יעילות', description: 'מיקוד ומהירות תגובה', icon: HiCheckCircle },
  { name: 'עקביות', description: 'עקביות לאורך הדרך', icon: HiCheckCircle },
]

/**
 * Client types
 */
const clientTypes = [
  { name: 'שכירים', icon: HiUserCircle },
  { name: 'עצמאיים', icon: HiBriefcase },
  { name: 'מעסיקים', icon: HiBriefcase },
  { name: 'משפחות', icon: HiHeart },
  { name: 'צעירים/צעירות בשלב תכנון פיננסי עתידי', icon: HiUserCircle },
]

/**
 * Why Us section
 * Navy background with off-white text
 */
export function WhyUs() {
  return (
    <Section id="why" background="accent">
      <SectionTitle light>למה לבחור בי</SectionTitle>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Main Text */}
        <div className="text-center text-lg text-brand-white/90 leading-relaxed">
          <p>
            בעולם פיננסי מורכב, רווי אינטרסים ומידע מבלבל – חשוב שילך איתך יד
            ביד גורם אחד שמסתכל רק עליך ועל מכלול הצרכים שלך לטווח הקצר והארוך
            כאחד.
          </p>
          <p className="mt-4">
            עם הניסיון הרחב שלי ושל בעלי המקצוע שעובדים יחד איתי ועם הערכים
            שמובילים אותנו בעשייה היומיומית: אמינות, מקצועיות, שקיפות,
            אובייקטיביות, סודיות, יעילות ועקביות אנו מביאים לכם את כל השירותים
            שאתם צריכים תחת&nbsp;קורת&nbsp;גג&nbsp;אחת.
          </p>
        </div>

        {/* Values Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-3"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="flex items-start gap-3 p-4 bg-brand-white/10 rounded-xl lg:rounded-full lg:items-center lg:py-2 lg:px-4"
            >
              <value.icon className="w-5 h-5 text-brand-gold shrink-0 mt-0.5 lg:mt-0" />
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                <span className="text-brand-white font-medium">
                  {value.name}
                </span>
                <span className="text-brand-white/70 text-sm lg:text-base">
                  <span className="hidden lg:inline">– </span>
                  {value.description}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Types */}
        <div>
          <h3 className="text-xl font-semibold text-center text-brand-white mb-6">
            למי מתאים השירות שלי?
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {clientTypes.map((client, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-center gap-2 px-4 py-2 border border-brand-white/30 rounded-lg bg-brand-white/5"
              >
                <client.icon className="w-5 h-5 text-brand-gold" />
                <span className="text-brand-white/90">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
