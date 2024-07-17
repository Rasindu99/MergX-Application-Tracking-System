const { sendMail } = require('../helpers/sendMail');
const Email = require('../models/Emails');
const Users = require('../models/user');

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

//get users all emails only
const getuseremail = async (req, res) => {
    try {
      const users = await Users.find({}, 'email');
      const emails = users.map(user => user.email);
      res.json(emails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

//get user email only admins
const getadminemails = async (req, res) => {
  try {
    const adminUsers = await Users.find({ role: 'admin' }, 'email');
    const adminEmails = adminUsers.map(user => user.email);
    res.json(adminEmails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//get recruiters email only
const getrecruiteremails = async (req,res) =>{
    try {
        const recruiterUsers = await Users.find({role: 'recruiter'}, 'email');
        const recruiterEmails = recruiterUsers.map(user => user.email);
        res.json(recruiterEmails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

//get Hiring manageres emails
const gethiringmanageremails = async (req, res) =>{
    try {
        const hiringmanagerUsers = await Users.find({role: 'hiring manager'}, 'email');
        const hiringmanagerEmails = hiringmanagerUsers.map(user => user.email);
        res.json(hiringmanagerEmails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

//get interviewrs emails
const getinterviewersemails = async (req,res) =>{
    try {
        const interviewerUsers = await Users.find({role: 'interviewer'}, 'email');
        const interviewerEmails = interviewerUsers.map(user => user.email);
        res.json(interviewerEmails);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error'});
    }
}

//get Candidate emails
const getcandidatesemails = async (req,res) =>{
    try {
        const candidateUsers = await Users.find({role: 'candidate'}, 'email');
        const candidateEmails = candidateUsers.map(user => user.email);
        res.json(candidateEmails);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Server error'});
    }
}


module.exports = {
  createEmail,
  getuseremail,
  getadminemails,
  getrecruiteremails,
  gethiringmanageremails,
  getinterviewersemails,
  getcandidatesemails
};