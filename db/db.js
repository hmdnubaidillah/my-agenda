const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_URL);

const Todo = mongoose.model("todo", {
  kegiatan: {
    type: String,
    required: true,
  },
});

module.exports = Todo;
