const db = require('../config/connection');
const { User, Ship, Pdf } = require('../models');
const userData = require('./userData.json');
const shipData = require('./shipData.json');
const pdfFileData = require('./pdfFileData.json');

db.once("open", async () => {
  try {
    const existingUsers = await User.find({});
    if (existingUsers.length === 0) {
      await User.create(userData);
      console.log('Users seeded');
    } else {
      console.log('Users already exist, skipping user seeding');
    }

    const existingShips = await Ship.find({});
    if (existingShips.length === 0) {
      await Ship.create(shipData);
      console.log('Ships Seeded');
    } else {
      console.log('Ships already exist, skipping ship seeding');
    }

    const existingPdfs = await Pdf.find({});
    if (existingPdfs.length === 0) {
      await Pdf.create(pdfFileData);
      console.log('pdfs Seeded');
    } else {
      console.log('Pdfs already exist, skipping pdf seeding');
    }

    console.log("All Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1); 
  }
});