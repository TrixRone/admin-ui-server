const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    timestamp:{type: Number,
      required: true},
  bucket: {
      type: String,
      required: true
    },
  directory: {
      type: String,
      required: true
    },
  key: {
      type: String,
      required: true
    },
  user_id: {
      type: String,
      required: true
    },
  extension_file: {
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
    },
  last_modified_date: {
      type: String,
      required: true
    }

  }, { collection: 's3_detail' }
);
module.exports = mongoose.model("s3_detail", schema);
