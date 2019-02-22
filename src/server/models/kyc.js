const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    timestamp:{type: Number,
      required: true},

  _id: {
      type: String,
      required: true
    },
  ip_address: {
      type: String,
      required: true
    },
  billing_address_first_name: {
      type: String,
      required: true
    },
  billing_address_last_name: {
      type: String,
      required: true
    },
  birth_data: {
      type: String,
      required: true
    },
  billing_address: {
      type: String,
      required: true
    },
  billing_address_country_code: {
      type: String,
      required: true
    },
  billing_address_zip_code: {
      type: String,
      required: true
    },
  billing_address_city: {
      type: String,
      required: true
    },
  billing_address_state: {
      type: String,
      required: true
    },
  phone: {
      type: String,
      required: true
    },
  email: {
      type: String,
      required: true
    },
  scan_data: {
    type: String,
    required: true
  },
  document_type: {
    type: String,
    required: true
  },
  document_country_code: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  s3_detail_id: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  last_modified_by: {
    type: String,
    required: true
  }

  }, { collection: 'kyc' }
);
module.exports = mongoose.model("Kyc", schema);
