type ClassPrimitive = string | number | boolean | undefined | null
type ClassValue = ClassPrimitive | ClassPrimitive[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim()
}

export function formatDate(date: Date | string, lang: 'en' | 'fr' = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'
  return d.toLocaleDateString(locale, options)
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('fr-FR').replace(',', ' ') + ' FCFA'
}

export function getRegistrationFee(
  type: 'EARLY_BIRD' | 'REGULAR' | 'CORE_TEAM',
  lang: 'en' | 'fr' = 'en'
): { label: string; amount: number; formatted: string; description: string } {
  const fees = {
    EARLY_BIRD: {
      amount: 30000,
      en: {
        label: 'Early Bird',
        description: 'Register before end of June 2026',
      },
      fr: {
        label: 'Inscription Anticipée',
        description: "Inscrivez-vous avant fin juin 2026",
      },
    },
    REGULAR: {
      amount: 35000,
      en: {
        label: 'Regular',
        description: 'Standard registration fee',
      },
      fr: {
        label: 'Standard',
        description: "Frais d'inscription standard",
      },
    },
    CORE_TEAM: {
      amount: 50000,
      en: {
        label: 'Core Team Leader',
        description: 'For core team and leadership',
      },
      fr: {
        label: 'Équipe de Direction',
        description: "Pour l'équipe centrale et les leaders",
      },
    },
  }

  const fee = fees[type]
  const localized = fee[lang]

  return {
    label: localized.label,
    amount: fee.amount,
    formatted: formatCurrency(fee.amount),
    description: localized.description,
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-[#40916C] text-white'
    case 'PENDING':
      return 'bg-[#C9A84C] text-white'
    case 'CANCELLED':
      return 'bg-[#C9848A] text-white'
    default:
      return 'bg-gray-400 text-white'
  }
}

export function getSessionTypeColor(type: string): string {
  switch (type) {
    case 'PLENARY':
      return 'bg-[#2D6A4F] text-white'
    case 'BREAKOUT':
      return 'bg-[#40916C] text-white'
    case 'WORSHIP':
      return 'bg-[#C9848A] text-white'
    case 'DEVOTION':
      return 'bg-[#C9A84C] text-[#1B3A5C]'
    case 'MEAL':
      return 'bg-[#F4C2C2] text-[#1B3A5C]'
    case 'FREE':
      return 'bg-[#74C69D] text-white'
    case 'CEREMONY':
      return 'bg-[#1B3A5C] text-white'
    default:
      return 'bg-gray-300 text-gray-700'
  }
}
