import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // Clear existing data
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // In a real scenario, we would call pdftotext or a python script here.
  // We've already extracted the text to full_menu_text.txt for reliability.
  if (!fs.existsSync('full_menu_text.txt')) {
    console.error('full_menu_text.txt not found. Please run the extraction script first.')
  }

  // Data pre-extracted and structured for quality from the PDF
  const data = [
    {
      name: 'PASTA',
      products: [
        { name: 'PENNE AL POMODORO', description: 'Tomatensauce', price: 13, isVegetarian: true },
        { name: 'SPAGHETTI ALLA BOLOGNESE', description: 'Rindfleischragout', price: 15, isVegetarian: false },
        { name: 'SPAGHETTI ALLA CARBONARA', description: 'Bio-Ei, Speck, Parmesan', price: 15, isVegetarian: false },
        { name: 'SPAGHETTI AGLIO E OLIO', description: 'Knoblauch, Olivenöl, Peperoncino', price: 13, isVegetarian: true },
        { name: 'PENNE ALL’ARRABBIATA', description: 'Tomatensauce, Knoblauch, Peperoncino', price: 14, isVegetarian: true },
        { name: 'PENNE ALL’AMATRICIANA', description: 'Tomatensauce, Pancetta, Pecorino', price: 17, isVegetarian: false },
        { name: 'RIGATONI FRANCESCO', description: 'Rosa Tomatencreme, Parmesan, Chili', price: 15, isVegetarian: true },
        { name: 'LINGUINE ALLA PUTTANESCA', description: 'Tomaten, Sardellen, Oliven, Kapern', price: 17, isVegetarian: false },
        { name: 'GNOCCHI AL BURRO E SALVIA', description: 'Butter, Salbei, Grana', price: 17, isVegetarian: true },
        { name: 'RAVIOLI AI PORCINI', description: 'Steinpilzfülle, braune Butter, Rucola, Parmesanchip', price: 22, isVegetarian: true },
        { name: 'TAGLIATELLE AL SALMONE E SPINACI', description: 'Lachs, Blattspinat, Pernodcreme', price: 24, isVegetarian: false },
        { name: 'SPAGHETTI AI FRUTTI DI MARE', description: 'Meeresfrüchte, Tomatensauce, Weißwein', price: 24, isVegetarian: false },
        { name: 'TAGLIATELLE AL TARTUFO FRESCO', description: 'frischer Trüffel', price: 27, isVegetarian: true },
        { name: 'CANNELLONI AGLI SPINACI', description: 'Blattspinat, Ricotta, Schafkäse, Tomatensauce, Parmesan gratiniert', price: 17, isVegetarian: true },
        { name: 'LASAGNE DELLA CASA', description: 'Rindfleischragout, Tomatensauce, Béchamel, Parmesan gratiniert', price: 16, isVegetarian: false },
      ]
    },
    {
      name: 'ZUPPE',
      products: [
        { name: 'ZUPPA DI POMODORO', description: 'Tomatencremesuppe', price: 7, isVegetarian: true },
        { name: 'MINESTRONE', description: 'Gemüsesuppe, Pasta', price: 7, isVegetarian: true },
        { name: 'ZUPPA DI PARMIGIANO', description: 'Parmesansuppe', price: 8, isVegetarian: true },
      ]
    },
    {
      name: 'ANTIPASTI',
      products: [
        { name: 'OLIVE CONDITE', description: 'Oliven gemischt', price: 5, isVegetarian: true },
        { name: 'PANE DELLA CASA', description: 'Pizzabrot Natur / Rosmarin / Knoblauch', price: 5, isVegetarian: true },
        { name: 'BRUSCHETTA', description: 'Weißbrot, Tomatenwürfel, Knoblauch, Basilikum', price: 7, isVegetarian: true },
        { name: 'CAPRESE', description: 'Büffelmozzarella, Tomaten, Basilikum', price: 15, isVegetarian: true },
        { name: 'VITELLO TONNATO', description: 'Kalbfleisch, Thunfischsauce, Kapern', price: 18, isVegetarian: false },
        { name: 'CARPACCIO DI MANZO', description: 'Rinderfilet, Rucola, Grana, Olivenöl', price: 18, isVegetarian: false },
        { name: 'BEEF TARTARE AL TARTUFO', description: 'Tartare vom Rind, getrüffelt, Toast, Butter', price: 18, isVegetarian: false },
        { name: 'PROSCIUTTO CON GRANA PADANO', description: 'Parmaschinken, Grana, Oliven', price: 16, isVegetarian: false },
        { name: 'PARMIGIANA DI MELANZANE', description: 'Melanzani, Mozzarella, Tomaten, Parmesan', price: 14, priceNote: '14 / 18', isVegetarian: true },
        { name: 'ANTIPASTI MISTI', description: 'Vitello Tonnato, Carpaccio di Manzo, Caprese, Beef Tartare, Prosciutto, Grana, Oliven, Kapern', price: 18, priceNote: '18 / 35 / 65', isVegetarian: false },
      ]
    },
    {
      name: 'INSALATE',
      products: [
        { name: 'INSALATA VERDE', description: 'Blattsalat', price: 5, isVegetarian: true },
        { name: 'INSALATA DI RUCOLA', description: 'Rucola, Cherrytomaten, Grana', price: 8, isVegetarian: true },
        { name: 'INSALATA DELLA CASA', description: 'Blattsalat, Tomaten, Gurken, Karotten', price: 6, priceNote: '6 / 9', isVegetarian: true },
        { name: 'INSALATA DI SPINACI CON PECORINO E CIPOLLOTTI', description: 'Babyspinat, Schafkäse, Jungzwiebel', price: 14, isVegetarian: true },
        { name: 'INSALATA DI POLLO', description: 'Maishuhnbrust, Blattsalat, Rosmarin', price: 18, isVegetarian: false },
        { name: 'INSALATA DI GAMBERETTI', description: 'Blattsalat, Garnelen & Shrimps gegrillt', price: 19, isVegetarian: false },
      ]
    },
    {
      name: 'RISOTTI',
      products: [
        { name: 'RISOTTO CON FILETTO DI MANZO', description: 'Risotto, Rinderfilet', price: 33, isVegetarian: false },
        { name: 'RISOTTO FRUTTI DI MARE', description: 'Risotto, Meeresfrüchte', price: 22, isVegetarian: false },
        { name: 'RISOTTO ALLO ZAFFERANO CON GAMBERETTI', description: 'Risotto, Safran, Shrimps', price: 24, isVegetarian: false },
      ]
    },
    {
      name: 'SECONDI DI CARNE',
      products: [
        { name: 'PICATTA ALLA MILANESE', description: 'Hühnerfilet im Parmesan-Ei-Mantel, Spaghetti Pomodoro', price: 28, isVegetarian: false },
        { name: 'PETTO DI POLLO AL LIMONE', description: 'Maishuhnbrust, Zitrone, Zucchini', price: 19, isVegetarian: false },
        { name: 'OSSOBUCO ALLA MILANESE', description: 'Kalbshaxe geschmort, Safranrisotto', price: 29, isVegetarian: false },
        { name: 'TAGLIATA DI MANZO', description: 'Beiried geschnitten, Rucola, Cherrytomaten, Grana', price: 28, isVegetarian: false },
        { name: 'FILETTO DI MANZO', description: 'Filetsteak, Pfeffersauce', price: 30, priceNote: '200g: 30 / 300g: 39', isVegetarian: false },
      ]
    },
    {
      name: 'SECONDI DI PESCE',
      products: [
        { name: 'CALAMARI ALLA GRIGLIA', description: 'Tintenfisch gegrillt, Knoblauch, Zitrone, Blattsalat', price: 23, isVegetarian: false },
        { name: 'CALAMARI FRITTI', description: 'Tintenfisch gebacken, Aioli, Zitrone, Blattsalat', price: 24, isVegetarian: false },
        { name: 'BRANZINO ALLA MEDITERRANEA', description: 'Wolfsbarschfilet, Tomaten, Oliven, Kapern, Rosmarinkartoffel', price: 29, isVegetarian: false },
        { name: 'FILETTO DI SALMONE', description: 'Lachsfilet, Kartoffel-Limettenpüree, Brokkoli', price: 27, isVegetarian: false },
        { name: 'PIATTO DI PESCE', description: 'Fisch, Lachs, Garnelen, Calamari, Blattspinat, Petersilienkartoffel', price: 79, priceNote: 'per 2', isVegetarian: false },
      ]
    },
    {
      name: 'CONTORNI',
      products: [
        { name: 'SAISONGEMÜSE GEGRILLT', description: null, price: 7, isVegetarian: true },
        { name: 'BLATTSPINAT', description: null, price: 7, isVegetarian: true },
        { name: 'SAFRANRISOTTO', description: null, price: 9, isVegetarian: false },
        { name: 'BRATKARTOFFEL', description: null, price: 6, isVegetarian: true },
        { name: 'ROSMARINKARTOFFEL', description: null, price: 6, isVegetarian: true },
        { name: 'KARTOFFELPÜREE', description: null, price: 7, isVegetarian: true },
      ]
    },
    {
      name: 'PIZZE',
      products: [
        { name: 'MARGHERITA', description: 'Tomaten, Mozzarella', price: 12, isVegetarian: true },
        { name: 'LA BASE', description: 'Tomaten, Mozzarella, Rucola', price: 14, isVegetarian: true },
        { name: 'FUNGHI', description: 'Tomaten, Käse, Champignons', price: 14, isVegetarian: true },
        { name: 'NAPOLETANA', description: 'Tomaten, Käse, Kapern, Sardellen, Oliven', price: 14, isVegetarian: true },
        { name: 'CARDINALE', description: 'Tomaten, Käse, Schinken', price: 15, isVegetarian: false },
        { name: 'SALAME', description: 'Tomaten, Käse, Salami', price: 14, isVegetarian: false },
        { name: 'FIORENTINA', description: 'Tomaten, Käse, Spinat, Schinken, Knoblauch', price: 15, isVegetarian: false },
        { name: 'TONNO', description: 'Tomaten, Käse, Thunfisch, Zwiebeln, Oliven', price: 15, isVegetarian: false },
        { name: 'QUATTRO STAGIONI', description: 'Tomaten, Käse, Schinken, Artischocken, Champignons', price: 15, isVegetarian: false },
        { name: 'CAPRICCIOSA', description: 'Tomaten, Käse, Schinken, Champignons, Artischocken, Sardellen, Oliven', price: 16, isVegetarian: false },
        { name: 'DIAVOLA', description: 'Tomaten, Käse, Schinken, Chili, Pfefferoni', price: 15, isVegetarian: false },
        { name: 'CONTADINA', description: 'Tomaten, Käse, Schinken, Mais, Speck, Pfefferoni', price: 16, isVegetarian: false },
        { name: 'ANTONIO', description: 'Tomaten, Käse, Schinken, Salami, Speck, Bio-Ei, Mais', price: 17, isVegetarian: false },
        { name: 'FUEGO', description: 'Tomaten, Mozzarella, Salami piccante, Jungzwiebel', price: 17, isVegetarian: false },
        { name: 'FRUTTI DI MARE', description: 'Tomaten, Meeresfrüchte, Knoblauch, Oliven', price: 19, isVegetarian: false },
        { name: 'FRANCESCO', description: 'Tomaten, Mozzarella, frisches Basilikum, Prosciutto', price: 18, isVegetarian: false },
        { name: 'QUATTRO FORMAGGI', description: 'Tomaten, Mozzarella, Dolcelatte, Pizzakäse, Schafkäse', price: 18, isVegetarian: true },
        { name: 'TARTUFO', description: 'Büffelmozzarella, Prosciutto, Trüffelpesto, frischer schwarzer Trüffel', price: 24, isVegetarian: true },
        { name: 'VERDE CON VERDURA', description: 'Spinatteig, Mozzarella, Tomaten, Brokkoli, Zucchini, Mais, Knoblauch, Basilikum', price: 16, isVegetarian: true },
        { name: 'CALZONE', description: 'Tomaten, Käse, Knoblauch, Schinken, Champignons, Artischocken', price: 16, isVegetarian: false },
      ]
    },
    {
      name: 'DOLCI DELLA CASA',
      products: [
        { name: 'TIRAMISÙ', description: null, price: 9, isVegetarian: true },
        { name: 'PANNA COTTA', description: null, price: 8, isVegetarian: true },
        { name: 'MOUSSE DI CIOCCOLATA BIANCO, NERO E NOUGAT', description: null, price: 10, isVegetarian: true },
        { name: 'PROFITEROLES', description: 'Brandteigkrapfen, dunkle & weiße Schokolade', price: 10, isVegetarian: true },
        { name: 'VARIAZIONE DI DOLCI', description: 'Dessertvariation', price: 18, priceNote: '18 / 28 / 48', isVegetarian: true },
        { name: 'GELATO', description: 'Pro Kugel', price: 3, isVegetarian: true },
      ]
    },
    {
      name: 'BIBITE ANALCOLICHE',
      products: [
        { name: 'ACQUA PANNA STILLES WASSER', description: null, price: 4, priceNote: '0,25l: 4 / 0,75l: 7', isVegetarian: false },
        { name: 'SAN PELLEGRINO MINERALWASSER', description: null, price: 4, priceNote: '0,25l: 4 / 0,75l: 7', isVegetarian: false },
        { name: 'SAN PELLEGRINO LIMONATA CITRON', description: null, price: 5, isVegetarian: false },
        { name: 'SAN PELLEGRINO LIMONATA ORANGE', description: null, price: 5, isVegetarian: false },
        { name: 'COCA COLA / ZERO', description: null, price: 5, isVegetarian: false },
        { name: 'ALMDUDLER', description: null, price: 5, isVegetarian: false },
        { name: 'EISTEE PFIRSICH / ZITRONE', description: null, price: 5, isVegetarian: false },
        { name: 'NEKTAR MARILLE / JOHANNISBEERE', description: null, price: 5, isVegetarian: false },
        { name: 'BIO APFELSAFT NATURTRÜB / GESPRITZT', description: null, price: 4, priceNote: '0,25l: 4 / 0,5l: 6', isVegetarian: false },
        { name: 'ORANGENSAFT GESPRITZT', description: null, price: 4, priceNote: '0,25l: 4 / 0,5l: 6', isVegetarian: false },
        { name: 'SODAWASSER', description: null, price: 3, priceNote: '0,25l: 3 / 0,5l: 5', isVegetarian: false },
        { name: 'SODA ZITRONE / HIMBEERE', description: null, price: 4, priceNote: '0,25l: 4 / 0,5l: 6', isVegetarian: false },
        { name: 'BITTER LEMON THOMAS HENRY', description: null, price: 5, isVegetarian: false },
        { name: 'TONIC WATER THOMAS HENRY', description: null, price: 5, isVegetarian: false },
        { name: 'SANBITTER', description: null, price: 5, isVegetarian: false },
        { name: 'LIMONATE DELLA CASA', description: 'Zitrone & Minze / Ingwer & Limette / Himbeer, Salbei & Zitrone', price: 7, priceNote: '0,5l', isVegetarian: false },
      ]
    },
    {
      name: 'APERITIVI / SPRITZ',
      products: [
        { name: 'PROSECCO', description: null, price: 6, isVegetarian: false },
        { name: 'APEROL SPRITZ VINO', description: null, price: 8, isVegetarian: false },
        { name: 'APEROL SPRITZ PROSECCO', description: null, price: 9, isVegetarian: false },
        { name: 'ROSÉ SPRITZ', description: null, price: 7, isVegetarian: false },
        { name: 'SELECT SPRITZ', description: null, price: 7, isVegetarian: false },
        { name: 'WEISSER SPRITZER', description: null, price: 5, isVegetarian: false },
        { name: 'CAMPARI SODA', description: null, price: 7, isVegetarian: false },
        { name: 'CAMPARI ORANGE', description: null, price: 8, isVegetarian: false },
        { name: 'CAMPARI MILANO', description: 'Prosecco, Cranberry', price: 12, isVegetarian: false },
        { name: 'BELLINI', description: 'Prosecco, White Peach', price: 8, isVegetarian: false },
        { name: 'NEGRONI', description: 'Gin, Campari, Vermouth', price: 12, isVegetarian: false },
      ]
    },
    {
      name: 'BIRRE',
      products: [
        { name: 'STAROBRNO VOM FASS', description: null, price: 5, priceNote: '0,3l: 5 / 0,5l: 6', isVegetarian: false },
        { name: 'BIRRA MORETTI VOM FASS', description: null, price: 5, priceNote: '0,3l: 5 / 0,5l: 6', isVegetarian: false },
        { name: 'SCHLADMINGER BIO ZWICKL', description: null, price: 6, priceNote: '0,5l', isVegetarian: false },
        { name: 'GÖSSER NATURRADLER 2%', description: null, price: 6, priceNote: '0,5l', isVegetarian: false },
        { name: 'GÖSSER NATURGOLD ALKOHOLFREI', description: null, price: 5, priceNote: '0,3l', isVegetarian: false },
      ]
    },
    {
      name: 'CAFFÈ E TÈ',
      products: [
        { name: 'ESPRESSO / MACCHIATO', description: null, price: 3.5, isVegetarian: false },
        { name: 'ESPRESSO DOPPIO / MACCHIATO', description: null, price: 5, isVegetarian: false },
        { name: 'CAPPUCCINO', description: null, price: 5, isVegetarian: false },
        { name: 'CAFÉ LATTE', description: null, price: 5.5, isVegetarian: false },
        { name: 'AFFOGATO', description: 'Espresso, Kugel Eis', price: 7.5, isVegetarian: false },
        { name: 'HEISSE SCHOKOLADE', description: null, price: 5.5, isVegetarian: false },
        { name: 'BIO-TEE diverse Sorten', description: null, price: 5, isVegetarian: false },
      ]
    },
    {
      name: 'VINI BIANCHI',
      products: [
        { name: 'PINOT GRIGIO', description: 'fruchtig, elegant', price: 5.5, isVegetarian: false },
        { name: 'BREZZA', description: 'leicht, blumig', price: 5.5, isVegetarian: false },
        { name: 'GELBER MUSKATELLER', description: 'aromatisch, frisch', price: 6, isVegetarian: false },
        { name: 'GEMISCHTER SATZ', description: 'klassisch, Wiener Tradition', price: 6, isVegetarian: false },
        { name: 'LAMBRUSCO', description: 'lieblich, spritzig', price: 4, isVegetarian: false },
      ]
    },
    {
      name: 'VINI ROSSI',
      products: [
        { name: 'CHIANTI RISERVA', description: 'harmonisch, weich', price: 7.5, isVegetarian: false },
        { name: 'PRIMITIVO', description: 'kräftig, beerig', price: 6, isVegetarian: false },
        { name: 'EL GORU ORGANIC', description: 'kräftig, fruchtig', price: 6, isVegetarian: false },
        { name: 'BARBERA', description: 'erdig, holzig', price: 7, isVegetarian: false },
      ]
    },
    {
      name: 'VINI ROSÉ',
      products: [
        { name: 'FRÄULEIN ROSÉ', description: 'floral, aromatisch', price: 5.5, isVegetarian: false },
      ]
    }
  ]

  for (const catData of data) {
    const category = await prisma.category.create({
      data: {
        name: catData.name,
      },
    })

    for (const prodData of catData.products) {
      const slug = prodData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
      await prisma.product.create({
        data: {
          ...prodData,
          image: `/images/${slug}.png`,
          categoryId: category.id,
        },
      })
    }
  }

  console.log('Seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
