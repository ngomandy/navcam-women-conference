'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import { ScrollReveal } from '@/components/public/ScrollReveal'

const PRAYERS = [
  {
    icon: '🌿',
    color: '#2D6A4F',
    light: '#E8F5EE',
    en: 'Rooted in Christ',
    fr: 'Enracinées en Christ',
    scripture: 'John 15:5',
    scriptureRef: 'Jean 15:5',
    points: {
      en: [
        'Pray that every woman attending would develop a deeper hunger for God\'s Word and prayer.',
        'Pray that participants would come with open hearts, ready to encounter Christ personally.',
        'Ask God to remove distractions and anything that hinders intimacy with Him.',
        'Pray that women would learn what it truly means to abide in Christ daily.',
        'Pray for a fresh outpouring of the Holy Spirit throughout the conference.',
      ],
      fr: [
        'Priez pour que chaque femme développe une faim plus profonde pour la Parole de Dieu et la prière.',
        'Priez pour que les participantes viennent avec un cœur ouvert, prêtes à rencontrer Christ personnellement.',
        'Demandez à Dieu d\'éliminer les distractions et tout ce qui entrave l\'intimité avec Lui.',
        'Priez pour que les femmes apprennent ce que signifie vraiment demeurer en Christ chaque jour.',
        'Priez pour un déversement frais du Saint-Esprit tout au long de la conférence.',
      ],
    },
  },
  {
    icon: '❤️',
    color: '#C9848A',
    light: '#FDF0F1',
    en: 'Healing and Wholeness',
    fr: 'Guérison et Plénitude',
    scripture: 'Psalm 147:3',
    scriptureRef: 'Psaume 147:3',
    points: {
      en: [
        'Pray that God would bring healing to wounded hearts and broken relationships.',
        'Pray for freedom from fear, shame, guilt, bitterness, and discouragement.',
        'Ask God to restore hope where there has been disappointment or loss.',
        'Pray that women would experience the Father\'s love in a life-changing way.',
        'Pray for spiritual, emotional, and relational renewal.',
      ],
      fr: [
        'Priez pour que Dieu apporte la guérison aux cœurs blessés et aux relations brisées.',
        'Priez pour la liberté de la peur, de la honte, de la culpabilité, de l\'amertume et du découragement.',
        'Demandez à Dieu de restaurer l\'espoir là où il y a eu déception ou perte.',
        'Priez pour que les femmes vivent l\'amour du Père d\'une manière qui change leur vie.',
        'Priez pour un renouveau spirituel, émotionnel et relationnel.',
      ],
    },
  },
  {
    icon: '🌱',
    color: '#40916C',
    light: '#EAF5F0',
    en: 'Fruitful Lives',
    fr: 'Vies Fructueuses',
    scripture: 'John 15:8',
    scriptureRef: 'Jean 15:8',
    points: {
      en: [
        'Pray that every participant would bear fruit that glorifies God.',
        'Pray for growth in Christlike character — love, joy, peace, patience, and self-control.',
        'Ask God to reveal areas where He desires greater fruitfulness.',
        'Pray that women would leave equipped to influence their families, churches, workplaces, and communities.',
        'Pray that the impact of the conference would continue long after it ends.',
      ],
      fr: [
        'Priez pour que chaque participante porte du fruit qui glorifie Dieu.',
        'Priez pour la croissance dans le caractère christique — amour, joie, paix, patience et maîtrise de soi.',
        'Demandez à Dieu de révéler les domaines où Il désire une plus grande fécondité.',
        'Priez pour que les femmes repartent équipées pour influencer leurs familles, églises, lieux de travail et communautés.',
        'Priez pour que l\'impact de la conférence se poursuive longtemps après sa fin.',
      ],
    },
  },
  {
    icon: '🤝',
    color: '#C9A84C',
    light: '#FDF8EC',
    en: 'Sisterhood and Unity',
    fr: 'Sororité et Unité',
    scripture: 'Ephesians 4:3',
    scriptureRef: 'Éphésiens 4:3',
    points: {
      en: [
        'Pray for genuine relationships to be formed among participants.',
        'Pray that women from different generations, cultures, and backgrounds would be united in Christ.',
        'Ask God to create an atmosphere of love, encouragement, and mutual support.',
        'Pray that lasting mentoring and discipleship relationships would emerge.',
        'Pray against division, comparison, and isolation.',
      ],
      fr: [
        'Priez pour que de vraies relations se forment entre les participantes.',
        'Priez pour que les femmes de différentes générations, cultures et origines soient unies en Christ.',
        'Demandez à Dieu de créer une atmosphère d\'amour, d\'encouragement et de soutien mutuel.',
        'Priez pour que des relations durables de mentorat et de discipulat émergent.',
        'Priez contre la division, la comparaison et l\'isolement.',
      ],
    },
  },
  {
    icon: '🎯',
    color: '#1B3A5C',
    light: '#EEF2F7',
    en: 'Purpose and Calling',
    fr: 'But et Vocation',
    scripture: 'Ephesians 2:10',
    scriptureRef: 'Éphésiens 2:10',
    points: {
      en: [
        'Pray that women would discover or gain clarity about God\'s purpose for their lives.',
        'Ask God to awaken gifts, talents, and callings that have been dormant.',
        'Pray for courage to obey God\'s leading.',
        'Pray that women would embrace their identity as daughters of God.',
        'Pray that participants would return home with renewed vision and direction.',
      ],
      fr: [
        'Priez pour que les femmes découvrent ou clarifient le but de Dieu pour leur vie.',
        'Demandez à Dieu de réveiller les dons, talents et vocations qui ont été endormis.',
        'Priez pour le courage d\'obéir à la conduite de Dieu.',
        'Priez pour que les femmes embrassent leur identité de filles de Dieu.',
        'Priez pour que les participantes rentrent chez elles avec une vision et une direction renouvelées.',
      ],
    },
  },
  {
    icon: '🎤',
    color: '#40916C',
    light: '#EAF5F0',
    en: 'Speakers, Facilitators & Leaders',
    fr: 'Oratrices, Facilitatrices & Leaders',
    scripture: 'Colossians 4:3–4',
    scriptureRef: 'Colossiens 4:3–4',
    points: {
      en: [
        'Pray for spiritual protection, wisdom, and strength for every speaker and facilitator.',
        'Pray that every message shared would be firmly grounded in God\'s Word.',
        'Ask God to anoint each session and discussion.',
        'Pray that leaders would be sensitive to the guidance of the Holy Spirit.',
        'Pray that God would speak through every person serving during the conference.',
      ],
      fr: [
        'Priez pour la protection spirituelle, la sagesse et la force de chaque orateur et facilitateur.',
        'Priez pour que chaque message partagé soit solidement ancré dans la Parole de Dieu.',
        'Demandez à Dieu d\'oindre chaque session et discussion.',
        'Priez pour que les leaders soient sensibles à la direction du Saint-Esprit.',
        'Priez pour que Dieu parle à travers chaque personne servant lors de la conférence.',
      ],
    },
  },
  {
    icon: '🛡️',
    color: '#1B3A5C',
    light: '#EEF2F7',
    en: 'Protection and Provision',
    fr: 'Protection et Provision',
    scripture: 'Psalm 121:7–8',
    scriptureRef: 'Psaume 121:7–8',
    points: {
      en: [
        'Pray for God\'s protection over all participants, their families, and their travel.',
        'Pray for good health and safety throughout the conference.',
        'Ask God to provide all financial, logistical, and material needs.',
        'Pray for favorable weather and smooth operations.',
        'Pray against any spiritual opposition to God\'s work.',
      ],
      fr: [
        'Priez pour la protection de Dieu sur toutes les participantes, leurs familles et leurs voyages.',
        'Priez pour une bonne santé et la sécurité tout au long de la conférence.',
        'Demandez à Dieu de pourvoir à tous les besoins financiers, logistiques et matériels.',
        'Priez pour un temps favorable et des opérations sans accroc.',
        'Priez contre toute opposition spirituelle à l\'œuvre de Dieu.',
      ],
    },
  },
  {
    icon: '🌍',
    color: '#2D6A4F',
    light: '#E8F5EE',
    en: 'Kingdom Impact',
    fr: 'Impact pour le Royaume',
    scripture: 'Matthew 5:16',
    scriptureRef: 'Matthieu 5:16',
    points: {
      en: [
        'Pray that the conference would contribute to spiritual awakening among women across Cameroon and beyond.',
        'Pray that women would become faithful disciple-makers in their communities.',
        'Ask God to raise women who will influence future generations for Christ.',
        'Pray that churches, ministries, families, and communities would be strengthened through the lives of participants.',
        'Pray that Christ alone would be glorified through everything that takes place.',
      ],
      fr: [
        'Priez pour que la conférence contribue au réveil spirituel des femmes à travers le Cameroun et au-delà.',
        'Priez pour que les femmes deviennent des faiseurs de disciples fidèles dans leurs communautés.',
        'Demandez à Dieu de susciter des femmes qui influenceront les générations futures pour Christ.',
        'Priez pour que les églises, ministères, familles et communautés soient renforcés par la vie des participantes.',
        'Priez pour que Christ seul soit glorifié à travers tout ce qui se passe.',
      ],
    },
  },
]

// ── DAILY PRAYER JOURNEY ──────────────────────────────────────────────────
// Guide 1: Praying through the Lord's Prayer (Matthew 6) · July 20–26
const LORDS_PRAYER_DAYS = [
  {
    weekday: { en: 'Mon', fr: 'Lun' },
    date: { en: 'July 20', fr: '20 Juil' },
    scripture: 'Matthew 6:9',
    scriptureRef: 'Matthieu 6:9',
    title: { en: 'Hallowed Be Your Name', fr: 'Que Ton Nom Soit Sanctifié' },
    points: {
      en: [
        'Give thanks to God because He is our Father.',
        'Thank God that we are His chosen people — through Christ our Savior He has adopted us as His children; thank Him too for Christ\'s sacrifice.',
        'That God would help us hallow His holy name each day through our lives, our words, our marriages, and our children.',
        'That throughout the conference, our Father\'s name would be honored in every part of the event — the upkeep of the facilities, our conduct, and every message shared.',
      ],
      fr: [
        'Rendre grâce à Dieu de ce qu\'il est notre Père.',
        'Nous sommes le choix de Dieu ; il a fait de nous ses enfants par Christ notre Sauveur — rendre grâce aussi pour le sacrifice de Christ.',
        'Que Dieu nous donne chaque jour de sanctifier son nom au travers de notre vie, nos paroles, notre couple, nos enfants.',
        'Durant toute la conférence, que nous sanctifiions le nom de notre Père au travers de toutes les articulations de la conférence (entretien des locaux, comportement, messages…).',
      ],
    },
  },
  {
    weekday: { en: 'Tue', fr: 'Mar' },
    date: { en: 'July 21', fr: '21 Juil' },
    scripture: 'Matthew 6:10',
    scriptureRef: 'Matthieu 6:10',
    title: { en: 'Your Kingdom Come, Your Will Be Done', fr: 'Que Ton Règne Vienne, Que Ta Volonté Soit Faite' },
    points: {
      en: [
        'Pray that God\'s Kingdom would reign in our lives, our families, and throughout the conference.',
        'Pray that God\'s will may be done in our lives, families, marriages, and children, and in every moment of the conference.',
        'Pray that the Holy Spirit would reign supreme in our lives, families, marriages, and children, and throughout every part of the conference.',
      ],
      fr: [
        'Inviter le règne de Dieu dans chacune de nos vies, nos familles, et la conférence.',
        'Que la volonté de Dieu se fasse dans ma vie, ma famille, mon couple, mes enfants, pendant toute la conférence.',
        'Que le Saint-Esprit règne en maître dans ma vie, ma famille, mon couple, mes enfants, pendant toutes les articulations de la conférence.',
      ],
    },
  },
  {
    weekday: { en: 'Wed', fr: 'Mer' },
    date: { en: 'July 22', fr: '22 Juil' },
    scripture: 'Matthew 6:11',
    scriptureRef: 'Matthieu 6:11',
    title: { en: 'Give Us This Day Our Daily Bread', fr: 'Donne-Nous Notre Pain Quotidien' },
    points: {
      en: [
        'That God would provide food and clean drinking water throughout the conference.',
        'That God would provide every resource needed — sound system, microphones, tables, chairs, and all logistics.',
        'That the Lord would provide the finances so every woman who desires to attend could cover registration and travel to and from the conference.',
        'That our "daily bread" would be spiritual nourishment too — that every teaching, meditation, message, and worship session would feed us, so that each of us leaves with a stronger, deeper faith.',
      ],
      fr: [
        'Que Dieu pourvoie en nourriture et en eau à boire dans ma vie, ma famille, mon couple, mes enfants, pendant toute la conférence.',
        'Que Dieu pourvoie en matériel (sonorisation, micro, tables, chaises…).',
        'Que le Seigneur pourvoie en finances pour que les femmes trouvent les moyens de participer et de voyager (aller et retour).',
        'Le pain représente aussi l\'instruction reçue de Dieu : que tout enseignement, méditation, louange et adoration nous nourrisse, afin qu\'à la fin chacune ait une foi plus solide.',
      ],
    },
  },
  {
    weekday: { en: 'Thu', fr: 'Jeu' },
    date: { en: 'July 23', fr: '23 Juil' },
    scripture: 'Matthew 6:12, 14',
    scriptureRef: 'Matthieu 6:12, 14',
    title: { en: 'Forgive Us Our Debts', fr: 'Pardonne-Nous Nos Offenses' },
    points: {
      en: [
        'That God would prepare the women\'s hearts to forgive and show mercy — beginning with forgiving themselves, then their husbands, children, families, and one another throughout the conference.',
        'That we would give thanks to God for the forgiveness we have received through Him.',
      ],
      fr: [
        'Que Dieu dispose les femmes à pardonner et à faire miséricorde, en commençant par se pardonner à elles-mêmes, puis leurs époux, enfants, famille, et les unes envers les autres durant toute la conférence.',
        'Rendre grâce à Dieu pour le pardon que nous recevons de lui.',
      ],
    },
  },
  {
    weekday: { en: 'Fri', fr: 'Ven' },
    date: { en: 'July 24', fr: '24 Juil' },
    scripture: 'Matthew 6:13a; James 4:1–5',
    scriptureRef: 'Matthieu 6:13a ; Jacques 4:1–5',
    title: { en: 'Lead Us Not Into Temptation', fr: 'Ne Nous Laisse Pas Entrer en Tentation' },
    points: {
      en: [
        'That God would help us avoid situations, company, and events that could lead us into sin.',
        'That during this conference the Lord would enable us to bear the fruit of the Spirit.',
        'That God would deliver us from every trap of the enemy and send His angels to watch over us — during our travels, throughout the conference, and on our return home (Psalm 90–91).',
      ],
      fr: [
        'Que Dieu nous aide à ne pas nous retrouver face à des situations, compagnies, événements qui pourraient nous amener à pécher contre lui.',
        'Que le Seigneur nous accorde durant cette conférence de produire le fruit de l\'Esprit.',
        'Que Dieu nous donne d\'échapper à tout piège de l\'ennemi ; qu\'il déploie ses anges pour nous secourir pendant les déplacements, pendant et après la conférence (Ps 90).',
      ],
    },
  },
  {
    weekday: { en: 'Sat', fr: 'Sam' },
    date: { en: 'July 25', fr: '25 Juil' },
    scripture: 'Matthew 6:13b',
    scriptureRef: 'Matthieu 6:13b',
    title: { en: 'Yours Is the Kingdom, the Power & the Glory', fr: 'À Toi le Règne, la Puissance & la Gloire' },
    points: {
      en: [
        'That God\'s reign, power, and glory would be manifested among the women throughout the conference, and that we would experience His presence.',
        'That we would give glory to God, for to Him belong all glory, power, and strength forever and ever.',
      ],
      fr: [
        'Que le règne, la puissance et la gloire de Dieu se déploient au milieu des femmes pendant la conférence, et que nous le vivions.',
        'Rendre gloire à Dieu, car à lui la gloire, la puissance et la force pour des siècles des siècles.',
      ],
    },
  },
  {
    weekday: { en: 'Sun', fr: 'Dim' },
    date: { en: 'July 26', fr: '26 Juil' },
    scripture: '',
    scriptureRef: '',
    title: { en: 'Thanksgiving', fr: 'Action de Grâce' },
    points: {
      en: ['Offer thanks to God for answering the prayers prayed throughout the week.'],
      fr: ['Action de grâce pour l\'exaucement des prières priées tout au long de la semaine.'],
    },
  },
]

// Guide 2: Prayer Programme · July 27 – August 10 (seven themes to pray through)
const PROGRAMME_DAYS = [
  {
    weekday: { en: 'Mon', fr: 'Lun' },
    date: { en: 'July 27', fr: '27 Juil' },
    scripture: 'Ephesians 4:24; 2 Cor. 3:18',
    scriptureRef: 'Éph. 4:24 ; 2 Cor. 3:18',
    title: {
      en: 'The Passion to Know, Love & Become Like Jesus Christ',
      fr: 'La Passion de Connaître, d\'Aimer & de Devenir comme Jésus-Christ',
    },
    points: {
      en: ['That during the conference women would learn to know and love Christ, and grow into His image and likeness.'],
      fr: ['Que pendant la conférence les femmes apprennent à connaître et aimer Christ, et qu\'elles grandissent à l\'image et à la ressemblance de Christ.'],
    },
  },
  {
    weekday: { en: 'Tue', fr: 'Mar' },
    date: { en: 'July 28', fr: '28 Juil' },
    scripture: '2 Timothy 3:16–17',
    scriptureRef: '2 Timothée 3:16–17',
    title: {
      en: 'The Truth & Sufficiency of Scripture for All of Life',
      fr: 'La Véracité & la Suffisance des Écritures pour Toute la Vie',
    },
    points: {
      en: ['That women would be taught, corrected, and trained by the Word — devoted to Scripture throughout our lives.'],
      fr: ['Que nous soyons enseignées, convaincues, corrigées et instruites pour être des femmes attachées à la Parole toute notre vie.'],
    },
  },
  {
    weekday: { en: 'Wed', fr: 'Mer' },
    date: { en: 'July 29', fr: '29 Juil' },
    scripture: 'Romans 1:16',
    scriptureRef: 'Romains 1:16',
    title: { en: 'The Transforming Power of the Gospel', fr: 'La Puissance de Transformation de l\'Évangile' },
    points: {
      en: ['That God\'s Word would fully transform our character and mind, so we leave changed — for a stronger ministry, marriage, and family life.'],
      fr: ['Que la parole de Dieu nous transforme, afin qu\'au sortir de la conférence nous soyons totalement changées dans notre caractère et notre pensée, pour une meilleure vie dans le ministère, le couple et la famille.'],
    },
  },
  {
    weekday: { en: 'Thu', fr: 'Jeu' },
    date: { en: 'July 30', fr: '30 Juil' },
    scripture: 'Romans 8:9–11, 14, 16',
    scriptureRef: 'Romains 8:9–11, 14, 16',
    title: { en: 'The Leading & Empowering of the Holy Spirit', fr: 'La Direction & la Puissance du Saint-Esprit' },
    points: {
      en: [
        'That we would no longer live according to the flesh, that the Spirit of God would dwell in us, and that God would restore life to our mortal bodies.',
        'That leaving the conference women would always be led by the Spirit, and everything that was dead — ministry, projects, the very cells of the body — would receive new life.',
      ],
      fr: [
        'Que nous ne vivions plus selon la chair, que l\'Esprit de Dieu demeure en nous, et que Dieu redonne vie à nos corps mortels.',
        'Qu\'au sortir de cette conférence les femmes soient toujours conduites par l\'Esprit, et que tout ce qui était mort (ministère, projet, cellules du corps…) reprenne vie.',
      ],
    },
  },
  {
    weekday: { en: 'Fri', fr: 'Ven' },
    date: { en: 'July 31', fr: '31 Juil' },
    scripture: 'Hebrews 6:12',
    scriptureRef: 'Hébreux 6:12',
    title: {
      en: 'Expectant Faith & Persevering Prayer Rooted in God\'s Promises',
      fr: 'La Foi Agissante & la Prière Persévérante Ancrées dans les Promesses de Dieu',
    },
    points: {
      en: [
        'That God would grant us a persevering spirit and teach us to be rooted in His promises.',
        'That our faith would be firm, and that we would no longer neglect prayer and the Word of God.',
      ],
      fr: [
        'Que Dieu nous donne de persévérer et que nous apprenions à nous enraciner dans ses promesses.',
        'Qu\'au sortir de la conférence notre foi soit ferme, et que nous ne nous relâchions plus dans la prière et la parole de Dieu.',
      ],
    },
  },
  {
    weekday: { en: 'Sat', fr: 'Sam' },
    date: { en: 'August 1', fr: '1 Août' },
    scripture: 'Matthew 10:29–30',
    scriptureRef: 'Matthieu 10:29–30',
    title: { en: 'The Dignity & Value of Every Person', fr: 'La Dignité & la Valeur de Chaque Personne' },
    points: {
      en: [
        'That God would help us know our own worth and the worth of our neighbor, understanding that we have value in His eyes.',
        'That we would leave more assured, knowing the value and dignity of every person to whom we will preach the gospel.',
      ],
      fr: [
        'Que Dieu nous donne de connaître notre valeur et celle du prochain, et de comprendre que nous avons de la valeur à ses yeux.',
        'Qu\'au sortir de la conférence nous soyons plus sûres de nous, connaissant la valeur et la dignité de chaque personne à qui nous irons prêcher l\'Évangile.',
      ],
    },
  },
  {
    weekday: { en: 'Sun', fr: 'Dim' },
    date: { en: 'August 2', fr: '2 Août' },
    scripture: 'Acts 2:42–44',
    scriptureRef: 'Actes 2:42–44',
    title: { en: 'Love & Grace Expressed Among Us in Community', fr: 'L\'Amour & la Grâce Exprimés parmi Nous dans la Communauté' },
    points: {
      en: [
        'That God would help us show love to one another — patient, kind, not envious, not proud, not dishonest, not easily angered, always seeking the other\'s good.',
        'That from now on we would know how to communicate love to our neighbor as the gospel is proclaimed.',
      ],
      fr: [
        'Que Dieu nous donne de manifester de l\'amour entre nous — patience, bonté, sans envie, sans orgueil, sans malhonnêteté, sans irritation, cherchant l\'intérêt de l\'autre.',
        'Que désormais nous sachions communiquer l\'amour à notre prochain pendant que l\'Évangile est annoncé.',
      ],
    },
  },
]

const GUIDE_DOWNLOADS = [
  { label: { en: 'Lord\'s Prayer Guide (EN)', fr: 'Guide Notre Père (EN)' }, href: '/prayer/lords-prayer-guide-en.pdf' },
  { label: { en: 'Prayer Guide (FR)', fr: 'Guide de Prière (FR)' }, href: '/prayer/guide-priere-fr.docx' },
  { label: { en: 'Prayer Programme (EN)', fr: 'Programme de Prière (EN)' }, href: '/prayer/prayer-programme-en.pdf' },
  { label: { en: 'Prayer Programme (FR)', fr: 'Programme de Prière (FR)' }, href: '/prayer/programme-priere-fr.pdf' },
]

// Shared renderer for a single day in the daily prayer journey.
function DayRow({
  day,
  lang,
  accent,
  light,
}: {
  day: typeof LORDS_PRAYER_DAYS[number]
  lang: 'en' | 'fr'
  accent: string
  light: string
}) {
  return (
    <div className="flex gap-4 sm:gap-5 p-5 sm:p-6">
      {/* Date pill */}
      <div
        className="flex-shrink-0 w-16 sm:w-20 rounded-2xl flex flex-col items-center justify-center py-3 text-center"
        style={{ backgroundColor: light }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
          {lang === 'en' ? day.weekday.en : day.weekday.fr}
        </span>
        <span className="text-sm font-bold leading-tight mt-0.5" style={{ color: accent }}>
          {lang === 'en' ? day.date.en : day.date.fr}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-base sm:text-lg font-bold text-[#1B3A5C] leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
          {lang === 'en' ? day.title.en : day.title.fr}
        </h4>
        {(lang === 'en' ? day.scripture : day.scriptureRef) && (
          <div
            className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg text-xs font-semibold"
            style={{ backgroundColor: light, color: accent }}
          >
            <span>📖</span>
            {lang === 'en' ? day.scripture : day.scriptureRef}
          </div>
        )}
        <ul className="mt-3 space-y-2">
          {(lang === 'en' ? day.points.en : day.points.fr).map((point, j) => (
            <li key={j} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent, opacity: 0.6 }} />
              <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function PrayerWallPage() {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col bg-[#FDF6EC]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B3A5C] via-[#2D6A4F] to-[#40916C]">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pw-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="#74C69D" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pw-dots)" />
          </svg>
        </div>

        {/* Glow orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#74C69D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C9848A]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto py-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[#C9A84C] text-sm font-medium backdrop-blur-sm">
              <span>🙏</span>
              <span>{lang === 'en' ? 'Preparing Our Hearts' : 'Préparons Nos Cœurs'}</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Prayer Wall' : 'Mur de Prière'}
            </h1>
            <p className="text-[#74C69D] text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
              {lang === 'en'
                ? 'Preparing our hearts for the conference through united, focused prayer.'
                : 'Préparons nos cœurs pour la conférence par une prière unie et ciblée.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z" fill="#FDF6EC" />
          </svg>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#FDF6EC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gray-600 text-lg leading-relaxed">
              {lang === 'en'
                ? 'Prayer is the foundation of everything we do. As we gather in August, we invite you to join us in praying through these eight themes — lifting one another up and asking God to move powerfully at the conference.'
                : 'La prière est le fondement de tout ce que nous faisons. Alors que nous nous rassemblons en août, nous vous invitons à vous joindre à nous pour prier ces huit thèmes — nous soutenir mutuellement et demander à Dieu d\'agir puissamment lors de la conférence.'}
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px flex-1 max-w-24 bg-[#C9A84C]/40" />
              <span className="text-[#C9A84C] text-xl">✦</span>
              <div className="h-px flex-1 max-w-24 bg-[#C9A84C]/40" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PRAYER CARDS ──────────────────────────────────────────────────── */}
      <section className="pb-20 bg-[#FDF6EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRAYERS.map((prayer, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="prayer-card bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">

                  {/* Colored top bar */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: prayer.color }} />

                  <div className="p-7 flex flex-col h-full">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: prayer.light }}
                      >
                        {prayer.icon}
                      </div>
                      <div>
                        <h2
                          className="text-xl font-bold leading-tight"
                          style={{ color: prayer.color, fontFamily: "'Playfair Display', serif" }}
                        >
                          {lang === 'en' ? prayer.en : prayer.fr}
                        </h2>
                      </div>
                    </div>

                    {/* Prayer Points */}
                    <ul className="space-y-3 flex-1">
                      {(lang === 'en' ? prayer.points.en : prayer.points.fr).map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: prayer.color, opacity: 0.6 }}
                          />
                          <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Scripture badge */}
                    <div className="mt-6 pt-5 border-t border-gray-50">
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: prayer.light, color: prayer.color }}
                      >
                        <span>📖</span>
                        {lang === 'en'
                          ? `Scripture: ${prayer.scripture}`
                          : `Écriture : ${prayer.scriptureRef}`}
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAILY PRAYER JOURNEY ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#74C69D]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center mb-12">
          <ScrollReveal>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'Pray Day by Day' : 'Prier Jour Après Jour'}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'A Daily Prayer Journey to the Conference' : 'Un Parcours de Prière Quotidien vers la Conférence'}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
              {lang === 'en'
                ? 'From July 20 through August 10, we pray together day by day — first through the Lord\'s Prayer, then through the passions that shape us — preparing our hearts for all God will do.'
                : 'Du 20 juillet au 10 août, prions ensemble jour après jour — d\'abord à travers le Notre Père, puis à travers les passions qui nous façonnent — pour préparer nos cœurs à tout ce que Dieu fera.'}
            </p>

            {/* Downloads */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-full sm:w-auto mb-1 sm:mb-0 sm:mr-1">
                {lang === 'en' ? 'Printable guides:' : 'Guides à imprimer :'}
              </span>
              {GUIDE_DOWNLOADS.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FDF6EC] hover:bg-[#74C69D]/15 border border-[#74C69D]/30 text-[#2D6A4F] text-xs font-semibold rounded-full transition-all"
                >
                  <span>⬇️</span>
                  {lang === 'en' ? d.label.en : d.label.fr}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Guide 1 — Lord's Prayer */}
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🙏</span>
                <div>
                  <h3 className="text-xl font-bold text-[#2D6A4F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {lang === 'en' ? 'Week 1 · Praying the Lord\'s Prayer' : 'Semaine 1 · Prier avec le Notre Père'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {lang === 'en' ? 'July 20 – 26 · Matthew 6:9–13' : '20 – 26 juillet · Matthieu 6:9–13'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {LORDS_PRAYER_DAYS.map((day, i) => (
                  <DayRow key={i} day={day} lang={lang} accent="#2D6A4F" light="#E8F5EE" />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Guide 2 — Prayer Programme */}
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🌿</span>
                <div>
                  <h3 className="text-xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {lang === 'en' ? 'Prayer Programme · Seven Passions' : 'Programme de Prière · Sept Passions'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {lang === 'en' ? 'July 27 – August 10 · Pray through these themes' : '27 juillet – 10 août · Prier à travers ces thèmes'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {PROGRAMME_DAYS.map((day, i) => (
                  <DayRow key={i} day={day} lang={lang} accent="#1B3A5C" light="#EEF2F7" />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CALL TO PRAYER ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#74C69D]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'Pray With Us' : 'Priez Avec Nous'}
            </p>
            <h2
              className="text-3xl font-bold text-[#1B3A5C] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en'
                ? 'Every Prayer Makes a Difference'
                : 'Chaque Prière Fait une Différence'}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              {lang === 'en'
                ? 'Share this page with your church, small group, or family. The more we pray together, the more God moves.'
                : 'Partagez cette page avec votre église, votre groupe de maison ou votre famille. Plus nous prions ensemble, plus Dieu agit.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/237670546041"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1EB85A] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {lang === 'en' ? 'Share on WhatsApp' : 'Partager sur WhatsApp'}
              </a>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] hover:bg-[#B8963A] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                🌿 {lang === 'en' ? 'Register for the Conference' : "S'inscrire à la Conférence"}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pw-vine" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M60 10 Q80 30 60 60 Q40 30 60 10Z" fill="#74C69D" opacity="0.6" />
                <path d="M10 60 Q30 40 60 60 Q30 80 10 60Z" fill="#74C69D" opacity="0.4" />
                <path d="M110 60 Q90 40 60 60 Q90 80 110 60Z" fill="#74C69D" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pw-vine)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-[#74C69D] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'August 10–14, 2026 · Yaoundé, Cameroon' : '10–14 Août 2026 · Yaoundé, Cameroun'}
            </p>
            <h2
              className="text-3xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en'
                ? 'Rooted in Christ, Bearing Lasting Fruit'
                : 'Enracinées en Christ, Portant du Fruit qui Demeure'}
            </h2>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              🌿 {lang === 'en' ? 'Register Now' : "S'inscrire Maintenant"}
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
