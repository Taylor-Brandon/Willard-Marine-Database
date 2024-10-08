const { AuthenticationError } = require('apollo-server-express');
const { User, Ship, Pdf } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    ships: async () => {
      return await Ship.find({}).populate('pdfs');
    },
    ship: async(parent, {shipId}) => {
      return User.findOne({ shipId }).populate('pdfs');
    },
    pdfs: async (parent, { shipName }) => {
      const params = shipName ? { shipName } : {};
      return Pdf.find(params);
    },
    pdf: async(parent, {pdfId}) => {
      try {
        return await Pdf.findById(pdfId).populate('user');
      } catch (error) {
        console.error('Error fetching pdf:', error);
        throw error;
      }
    }
  },
  Mutation: {
    addUser: async (parent, {firstName, lastName, email, password, admin}) => {
      const user = await User.create({ firstName, lastName, email, password, admin});
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }
    
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError('Incorrect password!');
      }
    
      const token = signToken(user);
      return { token, user };
    },
    
    addShip: async (parent, {shipName, model, HRN, HIN, contactNumber, annualInspectionDate, fiveYearInspectionCert, fiveYearInspectionDate, sponsonSerialNumber, SRBSerialNumber, fuelTankSerialNumber, ZAPR356C2BVMXHookSerialNumber, engineMakeModel, engineSerialNumber, gear, gearSerialNumber, jet, jetSerialNumber, volvoQ0087, POCName, POCEmail, POCPhoneNumber}) => {
      try {
        return await Ship.create({shipName, model, HRN, HIN, contactNumber, annualInspectionDate, fiveYearInspectionCert, fiveYearInspectionDate, sponsonSerialNumber, SRBSerialNumber, fuelTankSerialNumber, ZAPR356C2BVMXHookSerialNumber, engineMakeModel, engineSerialNumber, gear, gearSerialNumber, jet, jetSerialNumber, volvoQ0087, POCName, POCEmail, POCPhoneNumber});
      } catch (error) {
        console.error('Error adding ship:', error);
        throw error;
      }
    },
    addPdf: async (parent, {fileName, path, ship}) => {
      try {
        return await Pdf.create({fileName, path, ship});
      } catch (error) {
        console.error('Error adding pdf:', error);
        throw error;
      }
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    updateUser: async (_, { userId, firstName, lastName, email, password, admin }) => {
      try {
        const user = await User.findById(userId);

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = password; 
        if (admin !== undefined) user.admin = admin;

        await user.save();

        return user;
      } catch (error) {
        throw new Error('Failed to update user information');
      }
    },
    updateShip: async (_, {shipId, shipName, model, HRN, HIN, contactNumber, annualInspectionDate, fiveYearInspectionCert, fiveYearInspectionDate, sponsonSerialNumber, SRBSerialNumber, fuelTankSerialNumber, ZAPR356C2BVMXHookSerialNumber, engineMakeModel, engineSerialNumber, gear, gearSerialNumber, jet, jetSerialnumber, volvoQ0087, POCName, POCEmail, POCPhoneNumber }) => {
      try {
        const ship = await Ship.findById(shipId);

        if (shipName) ship.shipName = shipName;
        if (model) ship.model = model;
        if (HRN) ship.HRN = HRN;
        if (HIN) ship.HIN = HIN;
        if (contactNumber) ship.contactNumber = contactNumber;
        if (annualInspectionDate) ship.annualInspectionDate = annualInspectionDate;
        if (fiveYearInspectionCert) ship.fiveYearInspectionCert = fiveYearInspectionCert;
        if (fiveYearInspectionDate) ship.fiveYearInspectionDate = fiveYearInspectionDate;
        if (sponsonSerialNumber) ship.sponsonSerialNumber = sponsonSerialNumber;
        if (SRBSerialNumber) ship.SRBSerialNumber = SRBSerialNumber;
        if (fuelTankSerialNumber) ship.fuelTankSerialNumber = fuelTankSerialNumber;
        if (ZAPR356C2BVMXHookSerialNumber) ship.ZAPR356C2BVMXHookSerialNumber = ZAPR356C2BVMXHookSerialNumber;
        if (engineMakeModel) ship.engineMakeModel = engineMakeModel;
        if (engineSerialNumber) ship.engineSerialNumber = engineSerialNumber; 
        if (gear) ship.gear = gear;
        if (gearSerialNumber) ship.gearSerialNumber = gearSerialNumber;
        if (jet) ship.jet = jet;
        if (jetSerialNumber) ship.jetSerialNumber = jetSerialnumber;
        if (volvoQ0087) ship.volvoQ0087 = volvoQ0087;
        if (POCName) ship.POCName = POCName;
        if (POCEmail) ship.POCEmail = POCEmail;
        if (POCPhoneNumber) ship.POCPhoneNumber = POCPhoneNumber;

        await ship.save();

        return ship;
      } catch (error) {
        throw new Error ('Failed to update ship information');
      }
    },
    updatePdf: async (_, {pdfId, fileName, path, ship}) => {
      try{
        const pdf = await Pdf.findById(pdfId);

        if (fileName) pdf.fileName = fileName;
        if (path) pdf.path = path;
        if (ship) pdf.ship = ship;

        await pdf.save();
        return pdf;
      } catch (error) {
        throw new Error ('Failed to update pdf information');
      }
    },
    removeShip: async (parent, { shipId }) => {
      return Ship.findByIdAndDelete({ _id: shipId });
    },
    removePdf: async (parent, { pdfId }) => {
      return Pdf.findByIdAndDelete({ _id: pdfId });
    }
  } 
}; 

module.exports = resolvers;
