const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secret = process.env.JWT_SECRET || 'fallbackSecret'; 
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    try {
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    } catch (error) {
      console.error('Error signing JWT token:', error);
      throw error;
    }
  },
};