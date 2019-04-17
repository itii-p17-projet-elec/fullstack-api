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
  },
  parseAuth: function (auth) {
    return (auth != null) ? auth.replace('Bearer ', '') : null;
  },
  getUserId: function (auth) {
    var userId = null;
    var token = module.exports.parseAuth(auth);
    if (token) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken) {
          userId = jwtToken.userId;
        }
      } catch (err) {
        console.log(err);
      }
    }
    return userId;
  }
}