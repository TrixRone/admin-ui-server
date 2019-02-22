const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    timestamp:{type: Number,
      required: true},

    blockchain_currency: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    transaction_hash: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    confirmations: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }

  }, { collection: 'transaction' }
);
module.exports = mongoose.model("Transaction", schema);
