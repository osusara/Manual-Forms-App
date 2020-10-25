const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fields: [
    {
      id: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      value: {
        type: [Object]
      }
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Form = mongoose.model("form", FormSchema);
