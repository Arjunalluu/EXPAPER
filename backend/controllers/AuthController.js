import { SuperAdmin, Admin } from '../models/samodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// SuperAdmin registration
export const SAregister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await SuperAdmin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new SuperAdmin({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// SuperAdmin login
export const SAlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SuperAdmin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Token payload with role "SuperAdmin"
    const token = jwt.sign(
      { userId: user._id, role: "SuperAdmin" },
      'your-secret-key',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Admin registration
export const Aregister = async (req, res) => {
  try {
    const { firstname, lastname, phoneNo, email, password, collage, University, department, gender, Address } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      firstname,
      lastname,
      phoneNo,
      email,
      password: hashedPassword,
      collage,
      University,
      department,
      gender,
      Address
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Admin login
export const Alogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Notice the role is now "Admin" (with uppercase A) for consistency.
    const token = jwt.sign(
      { userId: user._id, role: "Admin" },
      'your-secret-key',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};