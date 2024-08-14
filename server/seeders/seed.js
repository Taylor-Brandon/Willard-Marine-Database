const db = require('../config/connection');
const { User, Ship, Pdf } = require('../models');
const userData = require('./userData.json');
const solasData = require('./solasData.json');
const pdfFileData = require('./pdfFileData.json');




db.once("open", async () => {
  try {
   await User.deleteMany({});
  await Ship.deleteMany({});
  await Pdf.deleteMany({});
   await User.create(userData);
   await Ship.create(solasData);
   await Pdf.create(pdfFileData);
 
    console.log("All Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1); 
  }
});