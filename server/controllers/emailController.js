const { sendMail } = require('../helpers/sendMail');
const Email = require('../models/Emails');

const createEmail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const file = req.file;

    let htmlContent = body;
    let fileUrl = null;

    if (file) {
      fileUrl = file.location; // S3 URL of the uploaded file
      htmlContent += `
        <br><br>
        Attachment: <a href="${fileUrl}">${file.originalname}</a>
      `;
    }

    // Send email
    await sendMail(to, subject, body, htmlContent);

    // Create database entry
    const email = await Email.create({
      to,
      subject,
      body,
      file: fileUrl
    });

    return res.status(200).json({ message: 'Email sent and saved successfully', email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createEmail
};