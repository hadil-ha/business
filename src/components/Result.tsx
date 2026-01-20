import { Section, SectionTitle } from './Section'

/**
 * Result/Message section with personal message from Hadil
 * Navy background with off-white text
 */
export function Result() {
  return (
    <Section id="result" background="accent">
      <SectionTitle light>המסר שלי אליכם</SectionTitle>

      <div className="max-w-3xl mx-auto text-center">
        {/* Main Message */}
        <div className="text-lg md:text-xl text-brand-white/90 leading-relaxed space-y-6">
          <p>
            בעזרת הדרך שנעבור יחד אנו נביא למצב שהכסף שלך יעבוד בשבילך, הכסף
            שלך ישרת אותך ויהווה גורם משמעותי עבורך.
          </p>

          <p>
            ביחד, עם הליווי הנכון, הידע המקצועי והניסיון המוכח שלי, תוכל/י לקבל
            החלטות טובות, מושכלות ומתוך בחירה ושליטה מלאה בתהליך שיביאו לעתיד
            כלכלי יציב ובטוח.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-12 flex flex-col items-center">
          <div className="bg-brand-white/90 rounded-lg px-6 py-3 mb-4">
            <img
              src="/hadeel_signature.png"
              alt="חתימה"
              className="h-12 md:h-16 w-auto"
            />
          </div>
          <p className="text-brand-white font-semibold text-lg">
            הדיל חלבי חסון
          </p>
          <p className="text-brand-white/70">
            יועצת השקעות מוסמכת, סוכנת פנסיונית וביטוח
          </p>
        </div>
      </div>
    </Section>
  )
}
