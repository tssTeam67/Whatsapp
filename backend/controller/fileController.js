const File = require('../models/fileModel');

module.exports.uploadFile = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const id=req.params.id;

    const file = new File({
      filename: originalname,
      contentType: mimetype,
      size: buffer.length,
      muid:id,
      data: buffer,
    });

    await file.save();

    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
