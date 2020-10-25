const fs = require("fs");
const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Form = require("../../models/Form");
const User = require("../../models/User");
const PDFFile = require("../../models/File");

// @route   POST api/file
// @desc    uploard form
// @access  Private
router.post("/", auth, async (req, res) => {
  if (!req.files)
    return res.status(400).json({ msg: "No file was uploaded" });

  const files = req.files.filesList;

  try {
    const form = await Form.findById(req.body.form);

    if (!form)
      return res.status(404).json({ msg: "Form not found" });

    if (Array.isArray(files)) {
      for (let file of files) {
        const docObject = new PDFFile({
          user: req.user.id,
          form: req.body.form,
          name: file.name.slice(0, -4),
        });

        const res = await docObject.save();

        file.mv(
          `${__dirname}/../../client/public/uploads/${res._id}.pdf`,
          (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
          }
        );
      }
    } else {
      const docObject = new PDFFile({
        user: req.user.id,
        form: req.body.form,
        name: files.name,
      });

      const res = await docObject.save();

      files.mv(
        `${__dirname}/../../client/public/uploads/${res._id}.pdf`,
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
        }
      );
    }

    res.json({ msg: "Files uploaded" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Server error');
  }
});

// @route   GET api/file/user
// @desc    get files by user
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    const files = await PDFFile.find({ user: req.user.id }).sort({ date: -1 });
    res.json(files);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Server error');
  }
});

// @route   GET api/file/form/:id
// @desc    get files by form
// @access  Private
router.get("/form/:id", auth, async (req, res) => {
  try {
    const files = await PDFFile.find({ form: req.params.id }).sort({ date: -1 });
    res.json(files);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Server error');
  }
});

// @route   GET api/file/:id
// @desc    get file by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const file = await PDFFile.findById(req.params.id);

    if (!file)
      return res.status(404).json({ msg: "File not found" });

    res.json(file);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/file/:id
// @desc    delete a file
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await PDFFile.findById(req.params.id);

    if (!file)
      return res.status(404).json({ msg: "File not found" });

    if (file.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    fs.unlink(`${__dirname}/../../client/public/uploads/${file._id}.pdf`, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
    
    await file.remove();
    res.json(req.params.id);

  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ msg: "File not found" });

    res.status(500).send("Server error");
  }
});

module.exports = router;
