const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    login:{type: String,
      required: true},
    password: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    activated: {
      type: Boolean,
      required: true
    },
  authorities: [{}],
    bsxAddress: {
      type: String,
      required: true
    },
    authentication_key: {
      type: String,
      required: true
    },
    authentication_type: {
      type: String,
      required: true
    },
  kyc_state: {
    type: String,
    required: true
  }

  }, { collection: 'user' }
);



/*schema.methods.hashPassword =function  (candidatePassword) {
  bcrypt.genSalt(11, function (err, salt) {
    if (err){
      return console.log(err);
    }
    bcrypt.hash(candidatePassword ,salt, function
      (err, hashedPassword) {
      if (err) {
        return console.log(err);
      }

      console.log(hashedPassword);

    });
  });
}*/

module.exports = mongoose.model("User", schema);
