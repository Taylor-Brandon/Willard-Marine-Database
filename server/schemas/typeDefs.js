const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  password: String
  admin: Boolean
}
type Ship {
    _id: ID
    shipName: String
    model: String
    HRN: String
    HIN: String
    contactNumber: String
    annualInspectionDate: String
    fiveYearInspectionCert: String
    fiveYearInspectionDate: String
    sponsonSerialNumber: String
    SRBSerialNumber: String
    fuelTankSerialNumber: String
    ZAPR356C2BVMXHookSerialNumber: String
    engineMakeModel: String
    engineSerialNumber: String
    gear: String
    gearSerialNumber: String
    jet: String
    jetSerialNumber: String
    volvoQ0087: String
    POCName: String
    POCEmail: String
    POCPhoneNumber: String
    notes: String
    pdfs: [Pdf]
}
type Pdf {
    _id: ID
    fileName: String
    path: String
    ship: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(userId: ID!): User
    ships: [Ship]
    ship(shipId: ID!): Ship
    pdfs(shipName: String): [Pdf]
    pdf(pdfId: ID!): Pdf
}
type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, admin: Boolean!): Auth
    login(email: String!, password: String!): Auth
    addShip(
      shipName: String!
      model: String!
      HRN: String!
      HIN: String!
      contactNumber: String!
      annualInspectionDate: String!
      fiveYearInspectionCert: String!
      fiveYearInspectionDate: String!
      sponsonSerialNumber: String!
      SRBSerialNumber: String!
      fuelTankSerialNumber: String!
      ZAPR356C2BVMXHookSerialNumber: String!
      engineMakeModel: String!
      engineSerialNumber: String!
      gear: String!
      gearSerialNumber: String!
      jet: String!
      jetSerialNumber: String!
      volvoQ0087: String!
      POCName: String!
      POCEmail: String!
      POCPhoneNumber: String!
      notes: String!
    ): Ship
    addPdf(fileName: String!, path: String!, ship: String!): Pdf
    removeUser(userId: ID!): User
    updateUser(
      userId: ID
      firstName: String
      lastName: String
      email: String
      password: String
      admin: Boolean
    ): User
    updateShip(
      shipId: ID
      shipName: String
      model: String
      HRN: String
      HIN: String
      contactNumber: String
      annualInspectionDate: String
      fiveYearInspectionCert: String
      fiveYearInspectionDate: String
      sponsonSerialNumber: String
      SRBSerialNumber: String
      fuelTankSerialNumber: String
      ZAPR356C2BVMXHookSerialNumber: String
      engineMakeModel: String
      engineSerialNumber: String
      gear: String
      gearSerialNumber: String
      jet: String
      jetSerialNumber: String
      volvoQ0087: String
      POCName: String
      POCEmail: String
      POCPhoneNumber: String
      notes: String
    ): Ship
    updatePdf(
      pdfId: ID
      fileName: String
      path: String
      ship: String
    ): Pdf
    removeShip(shipId: ID!): Ship
    removePdf(pdfId: ID!): Pdf
}  
`;

module.exports = typeDefs;
