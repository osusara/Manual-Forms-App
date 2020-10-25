const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Form = require("../../models/Form");

// @route   POST api/form
// @desc    Create form
// @access  Private
router.post('/', [auth, [
  check('title', 'Username is required').not().isEmpty(),
  check('description', 'Username is required').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, description, fields } = req.body;

  try {
    const form = new Form({
      title,
      description,
      fields,
      user: req.user.id
    });

    const data = await form.save();
    res.json(data);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Server error');
  }
});

// @route   GET api/form/:id
// @desc    get form by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    
    if (!form)
    return res.status(404).json({ msg: "Form not found" });

    if(form.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Access denied" });

    res.json(form);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send("Server error");
  }
});

// @route   GET api/form
// @desc    get forms by user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const forms = await Form.find({ user: req.user.id }).sort({ date: -1 });

    if (!forms)
      return res.status(404).json({ msg: "Forms not found" });

    res.json(forms);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/form/:id
// @desc    delete a form
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form)
      return res.status(404).json({ msg: "Form not found" });

    if (form.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });
    

    await form.remove();
    res.json(req.params.id);

  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: "Form not found" });

    res.status(500).send("Server error");
  }
});

// @route   PUT api/form/:id
// @desc    update a form
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
      const form = await Form.findById(req.params.id);

      if (!form) 
        return res.status(404).json({ msg: "Form not found" });
      
      if (form.user.toString() !== req.user.id)
        return res.status(401).json({ msg: "User not authorized" });

      form.title = req.body.title;
      form.description = req.body.description;
      form.fields = req.body.fields;

      await form.save();
      res.json(form);

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
  }
});

module.exports = router;
