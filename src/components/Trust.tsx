import { motion } from 'framer-motion'
import { HiAcademicCap, HiBriefcase, HiShieldCheck, HiUserGroup } from 'react-icons/hi'
import { staggerContainer, staggerItem } from './Section'

/**
 * Trust/credentials strip
 * Black background with off-white text and gold icon accents
 */
const credentials = [
  {
    icon: HiAcademicCap,
    title: 'תואר ראשון',
    description: 'בסטטיסטיקה',
  },
  {
    icon: HiShieldCheck,
    title: 'יועצת השקעות',
    description: 'מוסמכת',
  },
  {
    icon: HiShieldCheck,
    title: 'סוכנת פנסיונית',
    description: 'וביטוח',
  },
  {
    icon: HiBriefcase,
    title: 'כ-20 שנות ניסיון',
    description: 'במערכת הבנקאית',
  },
  {
    icon: HiUserGroup,
    title: 'תפקידים בכירים',
    description: 'בבנק הפועלים',
  },
]

export function Trust() {
  return (
    <section id="trust" className="bg-brand-black py-12">
      <div className="container-padded">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8"
        >
          {credentials.map((cred, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={`flex flex-col items-center text-center ${
                index === credentials.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-brand-navy flex items-center justify-center mb-3">
                <cred.icon className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-brand-white font-semibold text-lg">{cred.title}</h3>
              <p className="text-brand-gray text-sm">{cred.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
