const Issue = require('../models/issue');

// Function to create a new issue
exports.createIssue = async (req, res) => {
    try {
        const { issueType, paymentIssue, code, declineCode } = req.body;
        const newIssue = new Issue({
            issueType,
            paymentIssue,
            code,
            declineCode
        });
        await newIssue.save();
        res.status(201).json({ message: 'Issue created successfully', issue: newIssue });
    } catch (error) {
        res.status(500).json({ message: 'Error creating issue', error: error.message });
    }
};

// Function to retrieve all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving issues", error: error.message });
  }
};