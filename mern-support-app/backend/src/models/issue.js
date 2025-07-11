const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issueType: {
        type: String,
        required: true,
        enum: ['Payment', 'Payout']
    },
    paymentIssue: {
        type: String,
        enum: ['Decline', 'Failed', 'Blocked']
    },
    code: {
        type: String,
        required: function() {
            return this.issueType === 'Payment' && this.paymentIssue !== undefined;
        }
    },
    declineCode: {
        type: String,
        required: function() {
            return this.issueType === 'Payment' && this.paymentIssue === 'Decline';
        }
    }
});

module.exports = mongoose.model('Issue', issueSchema);