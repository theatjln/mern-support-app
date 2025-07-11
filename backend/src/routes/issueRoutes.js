const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Route to create a new issue
router.post('/issues', issueController.createIssue);

// Route to get all issues
router.get('/issues', issueController.getAllIssues);

module.exports = router;