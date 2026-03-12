const Customer = require('../models/Customer');
const Driver = require('../models/Driver');
const Notification = require('../models/Notification');
const { generateToken } = require('../middleware/auth');
const {
  validatePhoneNumber,
  validateEmail,
  validatePassword,
} = require('../middleware/validation');

// Customer signup
exports.customerSignup = async (req, res) => {
  try {
    const { name, businessName, phoneNumber, email, password } = req.body;

    // Validate inputs
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingCustomer = await Customer.findOne({
      $or: [{ phoneNumber }, { email }],
    });
    if (existingCustomer) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create customer
    const customer = new Customer({
      name,
      businessName,
      phoneNumber,
      email,
      passwordHash: password,
    });

    await customer.save();

    // Create login notification
    await Notification.create({
      userId: customer._id,
      userType: 'customer',
      title: 'Account Created',
      message: 'Welcome to TranspoConnect! Your account has been created successfully.',
      type: 'login',
    });

    const token = generateToken(customer._id, 'customer');

    res.status(201).json({
      success: true,
      message: 'Customer account created successfully',
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
};

// Customer login
exports.customerLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Validate inputs
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }

    // Find customer
    const customer = await Customer.findOne({ phoneNumber });
    if (!customer) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await customer.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Update login timestamp
    customer.lastLoginAt = new Date();
    customer.lastLoginDevice = req.headers['user-agent'];
    await customer.save();

    // Create login notification
    await Notification.create({
      userId: customer._id,
      userType: 'customer',
      title: 'Login Successful',
      message: 'You have logged in successfully',
      type: 'login',
    });

    const token = generateToken(customer._id, 'customer');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        businessName: customer.businessName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// Driver signup
exports.driverSignup = async (req, res) => {
  try {
    const { name, phoneNumber, email, password, vehicleType, vehicleNumber, city } = req.body;

    // Validate inputs
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Check if driver exists
    const existingDriver = await Driver.findOne({
      $or: [{ phoneNumber }, { email }],
    });
    if (existingDriver) {
      return res.status(400).json({ success: false, message: 'Driver already exists' });
    }

    // Create driver
    const driver = new Driver({
      name,
      phoneNumber,
      email,
      passwordHash: password,
      vehicleType,
      vehicleNumber,
      city,
    });

    await driver.save();

    // Create notification
    await Notification.create({
      userId: driver._id,
      userType: 'driver',
      title: 'Account Created',
      message: 'Welcome to TranspoConnect! Please upload your documents for verification.',
      type: 'login',
    });

    const token = generateToken(driver._id, 'driver');

    res.status(201).json({
      success: true,
      message: 'Driver account created successfully',
      token,
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        phoneNumber: driver.phoneNumber,
        vehicleType: driver.vehicleType,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
};

// Driver login
exports.driverLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Validate inputs
    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }

    // Find driver
    const driver = await Driver.findOne({ phoneNumber });
    if (!driver) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await driver.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Update login timestamp
    driver.lastLoginAt = new Date();
    driver.lastLoginDevice = req.headers['user-agent'];
    await driver.save();

    // Create notification
    await Notification.create({
      userId: driver._id,
      userType: 'driver',
      title: 'Login Successful',
      message: 'You have logged in successfully',
      type: 'login',
    });

    const token = generateToken(driver._id, 'driver');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        phoneNumber: driver.phoneNumber,
        vehicleType: driver.vehicleType,
        dutyStatus: driver.dutyStatus,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};
