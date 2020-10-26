const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route   GET api/user
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send("Server error");
  }
});

// @route   POST api/user/reg
// @desc    Register user
// @access  Public
router.post('/reg', [
  check('firstname', 'Username is required').not().isEmpty(),
  check('lastname', 'Username is required').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

  // Check for validation errors
  const errors = validationResult(req);
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { firstname, lastname, email, password } = req.body;

  try {
    // See if user is exist
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({ errors: [{
        msg: 'Email or Username is already used by another user'
      }] });
    }

    user = new User({
      firstname,
      lastname,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return JWT
    const payload = {
      user: { id: user.id, email: user.email },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Server error');
  }
});

// @route   POST api/user
// @desc    Authenticate user (login)
// @access  Public
router.post('/', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {

  // Check for validation errors
  const errors = validationResult(req);
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    // See if user is exist
    let user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({ errors: [{
        msg: 'Invalid credentials'
      }] });
    }

    // compare the password in db and entered one
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
      return res.status(400).json({ errors: [{
        msg: 'Invalid credentials'
      }] });
    }

    // Return JWT
    const payload = {
      user: { id: user.id, email: user.email }
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Server error')
  }
});

// @route   PUT api/user
// @desc    update user
// @access  Private
router.put('/', auth, async (req, res) => {
  const { firstname, lastname, email } = req.body;

  const userFields = {};
  userFields.user = req.user.id;
  if (firstname) userFields.firstname = firstname;
  if (lastname) userFields.lastname = lastname;
  if (email) userFields.email = email;

  try {
    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ errors: [{
        msg: "User not found"
      }] });
    }

    await user.save();

    return res.json(user);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/user/password
// @desc    change password
// @access  Private
router.put('/password', auth, async (req, res) => {
  const { currentPw, newPw, verifyPw } = req.body;

  if (newPw !== verifyPw) {
    return res.status(400).json({ errors: [{
      msg: "New password cannot verify"
    }] });
  }

  try {
    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ errors: [{
        msg: "User not found"
      }] });
    }
    
    // compare the password in db and entered one
    const isMatch = await bcrypt.compare(currentPw, user.password);
    
    if(!isMatch) {
      return res.status(400).json({ errors: [{
        msg: 'Invalid credentials'
      }] });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPw, salt);

    await user.save();
    return res.json(user);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/user
// @desc    delete user
// @access  Public
router.delete('/', auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ errors: [{
        msg: "User not found"
      }] });
    }

    await user.remove();
    return res.json({ msg: "User deleted!" });

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send("Server error");
  }
});

module.exports = router;
