import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
dotenv.config()

const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'
const adapter = new PrismaLibSql({ url: databaseUrl })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting seed...')

  // Clean up existing data
  await prisma.budgetItem.deleteMany()
  await prisma.speaker.deleteMany()
  await prisma.session.deleteMany()
  await prisma.committeeMember.deleteMany()
  await prisma.attendee.deleteMany()
  await prisma.adminUser.deleteMany()

  // 1. Create admin user
  const hashedPassword = await bcrypt.hash('Admin2026!', 12)
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@navcam2026.org',
      password: hashedPassword,
      name: 'Conference Admin',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // 2. Seed committee members
  const committeeMembers = [
    {
      name: 'Mary Taniform',
      roleEn: 'General Coordination',
      roleFr: 'Coordination Générale',
    },
    {
      name: 'Christelle Ntchuissi',
      roleEn: 'Logistics & Venue',
      roleFr: 'Logistique & Lieu',
    },
    {
      name: 'Rachel Ekom',
      roleEn: 'Catering',
      roleFr: 'Restauration',
    },
    {
      name: 'Martine Bekolle',
      roleEn: 'Catering',
      roleFr: 'Restauration',
    },
    {
      name: 'Christelle Ribouem',
      roleEn: 'Finance & Fundraising',
      roleFr: 'Finance & Collecte de Fonds',
    },
    {
      name: 'Rose Yuniwo',
      roleEn: 'Finance & Fundraising',
      roleFr: 'Finance & Collecte de Fonds',
    },
    {
      name: 'Emerance Assoumou',
      roleEn: 'Prayer',
      roleFr: 'Prière',
    },
    {
      name: 'Agnès Kede',
      roleEn: 'Prayer',
      roleFr: 'Prière',
    },
    {
      name: 'Claris Tambeline',
      roleEn: 'Decoration & Ambience',
      roleFr: 'Décoration & Ambiance',
    },
    {
      name: 'Doris Chopou',
      roleEn: 'Decoration & Ambience',
      roleFr: 'Décoration & Ambiance',
    },
    {
      name: 'Christabel Ofon',
      roleEn: 'Translation & Interpretation',
      roleFr: 'Traduction & Interprétation',
    },
    {
      name: 'Ynelle Chounna',
      roleEn: 'Translation & Interpretation',
      roleFr: 'Traduction & Interprétation',
    },
    {
      name: 'Sirri Ndangang',
      roleEn: "Children's Program",
      roleFr: 'Programme Enfants',
    },
    {
      name: 'Tatiana Essimbi',
      roleEn: "Children's Program",
      roleFr: 'Programme Enfants',
    },
    {
      name: 'Ernestine Bangkolo',
      roleEn: 'Program',
      roleFr: 'Programme',
    },
    {
      name: 'Solange Souga',
      roleEn: 'Praise & Worship',
      roleFr: 'Louange & Adoration',
    },
    {
      name: 'Sorelle Boadé',
      roleEn: 'Praise & Worship',
      roleFr: 'Louange & Adoration',
    },
  ]

  for (const member of committeeMembers) {
    await prisma.committeeMember.create({ data: member })
  }
  console.log(`✅ ${committeeMembers.length} committee members created`)

  // 3. Seed conference sessions
  const sessions = [
    // DAY 1 — Monday, August 10
    {
      dayNumber: 1,
      date: '2026-08-10',
      startTime: '14:00',
      endTime: '18:00',
      titleEn: 'Arrival & Registration',
      titleFr: 'Arrivée & Inscription',
      type: 'FREE',
      order: 1,
    },
    {
      dayNumber: 1,
      date: '2026-08-10',
      startTime: '18:00',
      endTime: '19:00',
      titleEn: 'Dinner',
      titleFr: 'Dîner',
      type: 'MEAL',
      order: 2,
    },
    {
      dayNumber: 1,
      date: '2026-08-10',
      startTime: '19:30',
      endTime: '21:30',
      titleEn: 'Opening Ceremony & Worship Night — "Planted in Christ"',
      titleFr: 'Cérémonie d\'Ouverture & Nuit de Louange — "Plantées en Christ"',
      type: 'CEREMONY',
      order: 3,
    },

    // DAY 2 — Tuesday, August 11
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '06:30',
      endTime: '07:15',
      titleEn: 'Morning Devotion / Prayer Walk',
      titleFr: 'Dévotion Matinale / Marche de Prière',
      type: 'DEVOTION',
      order: 4,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '07:30',
      endTime: '08:30',
      titleEn: 'Breakfast',
      titleFr: 'Petit-Déjeuner',
      type: 'MEAL',
      order: 5,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '09:00',
      endTime: '10:30',
      titleEn: 'Plenary Session 1 — "Deep Roots, Stable Life"',
      titleFr: 'Session Plénière 1 — "Des Racines Profondes, une Vie Stable"',
      type: 'PLENARY',
      order: 6,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '10:30',
      endTime: '11:00',
      titleEn: 'Tea Break',
      titleFr: 'Pause Thé',
      type: 'FREE',
      order: 7,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '11:00',
      endTime: '12:30',
      titleEn: 'Breakout Sessions Round 1 (Identity in Christ / Women & Discipleship / Prayer & Intimacy / Emotional Healing)',
      titleFr: 'Ateliers Tour 1 (Identité en Christ / Femmes & Disciples / Prière & Intimité / Guérison Émotionnelle)',
      type: 'BREAKOUT',
      order: 8,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '12:30',
      endTime: '14:00',
      titleEn: 'Lunch & Fellowship',
      titleFr: 'Déjeuner & Communion Fraternelle',
      type: 'MEAL',
      order: 9,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '14:00',
      endTime: '15:30',
      titleEn: 'Plenary Session 2 — "The Life of the Vine"',
      titleFr: 'Session Plénière 2 — "La Vie de la Vigne"',
      type: 'PLENARY',
      order: 10,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '15:30',
      endTime: '17:00',
      titleEn: 'Free Fellowship / Mentoring Circles',
      titleFr: 'Temps Libre / Cercles de Mentorat',
      type: 'FREE',
      order: 11,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '18:00',
      endTime: '19:00',
      titleEn: 'Dinner',
      titleFr: 'Dîner',
      type: 'MEAL',
      order: 12,
    },
    {
      dayNumber: 2,
      date: '2026-08-11',
      startTime: '19:30',
      endTime: '21:30',
      titleEn: 'Evening Ministry Night — "He Who Abides Bears Fruit"',
      titleFr: 'Nuit de Ministère — "Celui qui Demeure Porte du Fruit"',
      type: 'WORSHIP',
      order: 13,
    },

    // DAY 3 — Wednesday, August 12
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '06:30',
      endTime: '07:15',
      titleEn: 'Morning Devotion',
      titleFr: 'Dévotion Matinale',
      type: 'DEVOTION',
      order: 14,
    },
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '07:30',
      endTime: '08:30',
      titleEn: 'Breakfast',
      titleFr: 'Petit-Déjeuner',
      type: 'MEAL',
      order: 15,
    },
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '09:00',
      endTime: '10:30',
      titleEn: 'Plenary Session 3 — "Lasting Fruit"',
      titleFr: 'Session Plénière 3 — "Fruits Durables"',
      type: 'PLENARY',
      order: 16,
    },
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '10:30',
      endTime: '11:00',
      titleEn: 'Break',
      titleFr: 'Pause',
      type: 'FREE',
      order: 17,
    },
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '11:00',
      endTime: '12:30',
      titleEn: 'Breakout Sessions Round 2 (Marriage & Family / Leadership & Influence / Purpose & Calling / Faithful Stewardship)',
      titleFr: 'Ateliers Tour 2 (Mariage & Famille / Leadership & Influence / Vocation & Appel / Intendance Fidèle)',
      type: 'BREAKOUT',
      order: 18,
    },
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '12:30',
      endTime: '13:30',
      titleEn: 'Lunch',
      titleFr: 'Déjeuner',
      type: 'MEAL',
      order: 19,
    },
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '14:00',
      endTime: '18:00',
      titleEn: 'Excursion & Sisterhood Afternoon — "Fellowship in Freedom"',
      titleFr: 'Excursion & Après-midi Sororité — "Communion dans la Liberté"',
      type: 'FREE',
      order: 20,
    },
    {
      dayNumber: 3,
      date: '2026-08-12',
      startTime: '20:00',
      endTime: '22:30',
      titleEn: 'Worship Night & Celebration Party — "Joyful Fruitfulness"',
      titleFr: 'Nuit de Louange & Fête de Célébration — "Fécondité Joyeuse"',
      type: 'WORSHIP',
      order: 21,
    },

    // DAY 4 — Thursday, August 13
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '06:30',
      endTime: '07:15',
      titleEn: 'Morning Devotion',
      titleFr: 'Dévotion Matinale',
      type: 'DEVOTION',
      order: 22,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '07:30',
      endTime: '08:30',
      titleEn: 'Breakfast',
      titleFr: 'Petit-Déjeuner',
      type: 'MEAL',
      order: 23,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '09:00',
      endTime: '10:30',
      titleEn: 'Final Plenary Session — "Sent to Bear Fruit That Remains"',
      titleFr: 'Session Plénière Finale — "Envoyées pour Porter des Fruits qui Demeurent"',
      type: 'PLENARY',
      order: 24,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '10:30',
      endTime: '11:00',
      titleEn: 'Break',
      titleFr: 'Pause',
      type: 'FREE',
      order: 25,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '11:00',
      endTime: '12:30',
      titleEn: 'Reflection & Prayer Groups',
      titleFr: 'Réflexion & Groupes de Prière',
      type: 'DEVOTION',
      order: 26,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '12:30',
      endTime: '13:30',
      titleEn: 'Lunch',
      titleFr: 'Déjeuner',
      type: 'MEAL',
      order: 27,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '13:30',
      endTime: '18:30',
      titleEn: 'Free Time / Networking / Prayer Appointments',
      titleFr: 'Temps Libre / Réseau / Rendez-vous de Prière',
      type: 'FREE',
      order: 28,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '18:30',
      endTime: '19:30',
      titleEn: 'Dinner',
      titleFr: 'Dîner',
      type: 'MEAL',
      order: 29,
    },
    {
      dayNumber: 4,
      date: '2026-08-13',
      startTime: '19:30',
      endTime: '21:00',
      titleEn: 'Closing Thanksgiving & Communion Night',
      titleFr: 'Nuit de Thanksgiving & Communion',
      type: 'WORSHIP',
      order: 30,
    },

    // DAY 5 — Friday, August 14
    {
      dayNumber: 5,
      date: '2026-08-14',
      startTime: '07:00',
      endTime: '08:00',
      titleEn: 'Breakfast',
      titleFr: 'Petit-Déjeuner',
      type: 'MEAL',
      order: 31,
    },
    {
      dayNumber: 5,
      date: '2026-08-14',
      startTime: '08:30',
      endTime: '09:30',
      titleEn: 'Evaluation & Feedback Session',
      titleFr: 'Session d\'Évaluation & Retour',
      type: 'FREE',
      order: 32,
    },
    {
      dayNumber: 5,
      date: '2026-08-14',
      startTime: '09:30',
      endTime: '11:30',
      titleEn: 'Commissioning Service',
      titleFr: 'Service de Commissionnement',
      type: 'CEREMONY',
      order: 33,
    },
    {
      dayNumber: 5,
      date: '2026-08-14',
      startTime: '11:30',
      endTime: '12:00',
      titleEn: 'Closing Remarks / Farewell',
      titleFr: 'Remarques de Clôture / Au Revoir',
      type: 'CEREMONY',
      order: 34,
    },
  ]

  for (const session of sessions) {
    await prisma.session.create({ data: session })
  }
  console.log(`✅ ${sessions.length} conference sessions created`)

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
