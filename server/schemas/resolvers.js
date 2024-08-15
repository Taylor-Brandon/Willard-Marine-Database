const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  password: String
  admin: Boolean
  pdfs: [Pdf]
  ships: [Ship]
}
type Ship {
    _id: ID
    Ship: String
    Model: String
    HRN: String
    HIN: String
    contactNumber: String
    sponsonSerialNumber: String
    SRBSerialNumber: String
    fuelTankSerialNumber: String
    ZAPR356C2BVMXHookSerialNumber: String
    engineMakeModel: String
    engineSerialNumber: String
    POCName: String
    POCEmail: String
    POCPhoneNumber: String
    Notes: String
    user: User
}
type Pdf {
    _id: ID
    fileName: String
    path: String
    user: User
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(userId: ID!): User
    ships: [Ship]!
    ship(shipId: ID!): Ship
    pdfs: [Pdf]!
    pdf(pdfId: ID!): Pdf
}
type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, admin: Boolean!): Auth
    login(email: String!, password: String!): Auth
    addShip(
      Ship: String!
      Model: String!
      HRN: String!
      HIN: String!
      contactNumber: String!
      sponsonSerialNumber: String!
      SRBSerialNumber: String!
      fuelTankSerialNumber: String!
      ZAPR356C2BVMXHookSerialNumber: String!
      engineMakeModel: String!
      engineSerialNumber: String!
      POCName: String!
      POCEmail: String!
      POCPhoneNumber: String!
      Notes: String!
    ): Ship
    addPdf(fileName: String!, path: String!): Pdf
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
      Ship: String
      Model: String
      HRN: String
      HIN: String
      contactNumber: String
      sponsonSerialNumber: String
      SRBSerialNumber: String
      fuelTankSerialNumber: String
      ZAPR356C2BVMXHookSerialNumber: String
      engineMakeModel: String
      engineSerialNumber: String
      POCName: String
      POCEmail: String
      POCPhoneNumber: String
      Notes: String
    ): Ship
    removeShip(shipId: ID!): Ship
    removePdf(pdfId: ID!): Pdf
}  
`;

module.exports = typeDefs;
