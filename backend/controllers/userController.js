const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Only send safe fields back to the client (never the password hash)
const toSafeUser = (user) => ({ _id: user._id, email: user.email });

// POST /api/users/register
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: "Email is already registered" });

    // 10 = salt rounds: how many times bcrypt scrambles the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json(toSafeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/users/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // "+password" asks Mongoose to include the hidden password field
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    // Same message for both cases so attackers can't tell which emails exist
    const isMatch = user && (await bcrypt.compare(password, user.password));
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json(toSafeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
