const db = require('../config/connection');
const { User, Ship, Pdf } = require('../models');
const userData = require('./userData.json');
const shipData = require('./shipData.json');
const pdfFileData = require('./pdfFileData.json');

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Ship.deleteMany({});
    await Pdf.deleteMany({});

    const users = await User.create(userData);
    const ships = await Ship.create(shipData);
    for (let i = 0; i < pdfFileData.length; i++) {
      const { _id, ship } = await Pdf.create(pdfFileData[i]);
      await Ship.findOneAndUpdate(
        { shipName: ship },
        {$addToSet: {pdfs: _id}},
        {new: true}
      );
      }
    console.log("All Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1); 
  }
});

