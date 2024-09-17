import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $admin: Boolean!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, admin: $admin) {
      token
      user {
        _id
        firstName
        lastName
        email
        admin
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        admin
      }
    }
  }
`;

export const ADD_SHIP = gql`
  mutation addShip(
    $shipName: String!,
    $model: String!,
    $HRN: String!,
    $HIN: String!,
    $contactNumber: String!,
    $annualInspectionDate: String!,
    $fiveYearInspectionCert: String!,
    $fiveYearInspectionDate: String!,
    $sponsonSerialNumber: String!,
    $SRBSerialNumber: String!,
    $fuelTankSerialNumber: String!,
    $ZAPR356C2BVMXHookSerialNumber: String!,
    $engineMakeModel: String!,
    $engineSerialNumber: String!,
    $gear: String!,
    $gearSerialNumber: String!,
    $jet: String!,
    $jetSerialNumber: String!,
    $volvoQ0087: String!,
    $POCName: String!,
    $POCEmail: String!,
    $POCPhoneNumber: String!,
    $notes: String!
  ) {
    addShip(
      shipName: $shipName,
      model: $model,
      HRN: $HRN,
      HIN: $HIN,
      contactNumber: $contactNumber,
      annaulInspectionDate: $annualInspectionDate,
      fiveYearInspectionCert: $fiveYearInspectionCert,
      fiveYearInspectionDate: $fiveYearInspectionDate,
      sponsonSerialNumber: $sponsonSerialNumber,
      SRBSerialNumber: $SRBSerialNumber,
      fuelTankSerialNumber: $fuelTankSerialNumber,
      ZAPR356C2BVMXHookSerialNumber: $ZAPR356C2BVMXHookSerialNumber,
      engineMakeModel: $engineMakeModel,
      engineSerialNumber: $engineSerialNumber,
      gear: $gear,
      gearSerialNumber: $gearSerialNumber,
      jet: $jet,
      jetSerialNumber: $jetSerialNumber,
      volvoQ0087: $volvoQ0087,
      POCName: $POCName,
      POCEmail: $POCEmail,
      POCPhoneNumber: $POCPhoneNumber,
      notes: $notes
    ) {
      _id
      shipName
      model
      HRN
      HIN
      contactNumber
      annualInspectionDate
      fiveYearInspectionCert
      fiveYearInspectionDate
      sponsonSerialNumber
      SRBSerialNumber
      fuelTankSerialNumber
      ZAPR356C2BVMXHookSerialNumber
      engineMakeModel
      engineSerialNumber
      gear
      gearSerialNumber
      jet
      jetSerialNumber
      volvoQ0087
      POCName
      POCEmail
      POCPhoneNumber
      notes
    }
  }
`;
export const ADD_PDF = gql`
  mutation addPdf($fileName: String!, $path: String!, $ship: String!) {
    addPdf(fileName: $fileName, path: $path, ship: $ship) {
        _id
        fileName
        path
        ship
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      firstName
      lastName
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $firstName: String, $lastName: String, $email: String, $password: String, $admin: Boolean) {
    updateUser(userId: $userId, firstName: $firstName, lastName: $lastName, email: $email, password: $password, admin: $admin) {
      _id
      firstName
      lastName
      email
      password
      admin
    }
  }
`;
export const UPDATE_SHIP = gql`
  mutation updateShip(
    $shipId: ID!
    $shipName: String
    $model: String
    $HRN: String
    $HIN: String
    $contactNumber: String
    $annualInspectionDate: String
    $fiveYearInspectionCert: String
    $fiveYearInspectionDate: String
    $sponsonSerialNumber: String
    $SRBSerialNumber: String
    $fuelTankSerialNumber: String
    $ZAPR356C2BVMXHookSerialNumber: String
    $engineMakeModel: String
    $engineSerialNumber: String
    $gear: String
    $gearSerialNumber: String
    $jet: String
    $jetserialNumber: String
    $volvoQ0087: String
    $POCName: String
    $POCEmail: String
    $POCPhoneNumber: String
    $notes: String
  ) {
    updateShip(
      shipId: $shipId
      shipName: $shipName
      model: $model
      HRN: $HRN
      HIN: $HIN
      contactNumber: $contactNumber
      annaulInspectionDate: $annaulInspectionDate
      fiveYearInspectionCert: $fiveYearInspectionCert
      fiveYearInspectionDate: $fiveYearInspectionDate
      sponsonSerialNumber: $sponsonSerialNumber
      SRBSerialNumber: $SRBSerialNumber
      fuelTankSerialNumber: $fuelTankSerialNumber
      ZAPR356C2BVMXHookSerialNumber: $ZAPR356C2BVMXHookSerialNumber
      engineMakeModel: $engineMakeModel
      engineSerialNumber: $engineSerialNumber
      gear: $gear
      gearSerialNumber: $gearSerialNumber
      jet: $jet
      jetSerialNumber: $jetSerialNumber
      volvoQ0087: $volvoQ0087
      POCName: $POCName
      POCEmail: $POCEmail
      POCPhoneNumber: $POCPhoneNumber
      notes: $notes
    ) {
      _id
      shipName
      model
      HRN
      HIN
      contactNumber
      annaulInspectionDate
      fiveYearInspectionCert
      fiveYearInspectionDate
      sponsonSerialNumber
      SRBSerialNumber
      fuelTankSerialNumber
      ZAPR356C2BVMXHookSerialNumber
      engineMakeModel
      engineSerialNumber
      gear
      gearSerialNumber
      jet
      jetSerialNumber
      volvoQ0087
      POCName
      POCEmail
      POCPhoneNumber
    }
  }
`;
export const REMOVE_SHIP = gql`
  mutation removeShip($shipId: ID!) {
    removeShip(shipId: $shipId) {
        _id
        shipName
        model
      }
  }
`;

export const REMOVE_PDF = gql`
  mutation removePdf($pdfId: ID!) {
    removePdf(pdfId: $pdfId) {
      _id
      fileName
      path
      ship
    }
  }
`;