const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const schema = new Schema({
    username:{type: String,
    required: true},
    password: {
      type: String,
      required: true
    },
    quote: {
      type: Boolean, default: true
    }
}
);
schema.set('toJSON', {
    virtuals: true
});

schema.methods.hashPassword = function  (candidatePassword) {
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
  })};
schema.methods.comparePassword = function  (candidatePassword, hashedPassword , cb) {
  bcrypt.compare(candidatePassword, hashedPassword, function
    (err, isMatch) {
    if (err) {
      return cb(err);
    }
    if (!isMatch) {
      return cb(false);
    }

    return cb(null, isMatch);
  });
};

module.exports = mongoose.model("Superuser", schema);
