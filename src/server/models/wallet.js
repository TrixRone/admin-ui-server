const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    _id:{type: String,
      required: true},
    nem_address: {
      type: String,
      required: true
     },
    ethereum_address: {
      type: String,
      required: true
    },
    btc_address: {
      type: String,
      required: true
    },
    created_by: {
      type: String,
      required: true
    },
    created_date: {
      type: String,
      required: true
    },
    last_modified_by: {
      type: String,
      required: true
    }

  }, { collection: 'wallet' }
);
module.exports = mongoose.model("Wallet", schema);
