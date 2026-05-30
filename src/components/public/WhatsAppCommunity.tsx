'use client'

import { useLanguage } from '@/components/LanguageContext'
import { ScrollReveal } from '@/components/public/ScrollReveal'

// Update this to your actual WhatsApp group invite link once you have one
const WHATSAPP_GROUP_LINK = 'https://wa.me/237670546041?text=' + encodeURIComponent(
  'Bonjour ! Je voudrais rejoindre le groupe WhatsApp de la Conférence Femmes NavCam 2026.'
)

export function WhatsAppCommunity() {
  const { lang } = useLanguage()

  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 border border-[#25D366]/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <h3
                className="text-xl font-bold text-[#1B3A5C] mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Join the Conference Community' : 'Rejoignez la Communauté de la Conférence'}
              </h3>
              <p className="text-gray-500 text-sm">
                {lang === 'en'
                  ? 'Connect with other attendees, receive updates and prepare together before August 10.'
                  : 'Connectez-vous avec d\'autres participantes, recevez des mises à jour et préparez-vous ensemble avant le 10 août.'}
              </p>
            </div>

            {/* CTA */}
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1EB85A] text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {lang === 'en' ? 'Join WhatsApp Group' : 'Rejoindre le Groupe'}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
