import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const sameUser = await User.findOne({ email });

    //validation
    if (!name || !email || !password)
      return res.status(409).json({ error: "Values can't be empty" });

    if (sameUser)
      return res
        .status(409)
        .json({ error: 'User with this email already exists' });

    if (password.length < 6)
      return res
        .status(409)
        .json({ error: 'Password must be at least 6 characters long' });

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: passwordHashed });
    const user = await newUser.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User does not exist.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;

    console.log(user);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
