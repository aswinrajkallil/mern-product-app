const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Stores the bcrypt hash, never the plain password.
    // select: false keeps it out of query results unless we ask for it.
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
