// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'tfaxsepg2kwp63pwqdepdgc2m8hcbwwmpqnk2thxhp4gdy9ufrd8k3gx8st2';

module.exports = {
  generateToken: function (user) {
    return jwt.sign({
      userId: user.id
    },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      });
  }
}