# MERN Support Application

## Overview
The MERN Point of Sale Support Application is designed to assist users in reporting and resolving issues related to payments and payouts. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and provides a user-friendly interface for submitting issues and collecting relevant information.

## Features
- User can report issues related to payments or payouts.
- If a payment issue is selected, users can specify the type of payment issue (Decline, Failed, Blocked).
- Users can provide detailed information about the payment failure, including the error code and decline code.
- Integration with Stripe documentation for error and decline codes to assist support agents.

## Project Structure
```
mern-pos-support-app
├── backend
│   ├── models
│   │   └── issue.js
│   ├── routes
│   │   └── issueRoutes.js
│   ├── controllers
│   │   └── issueController.js
│   ├── app.js
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── IssueForm.jsx
│   │   │   ├── PaymentIssueForm.jsx
│   │   │   └── PaymentDetailsForm.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public
│   │   └── index.html
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node app.js
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage
1. Open the application in your web browser.
2. On the first page, select the type of issue (Payment or Payout).
3. If Payment is selected, proceed to specify the issue type (Decline, Failed, Blocked).
4. Enter the relevant error code and decline code as prompted.
5. Submit the form to report the issue.

## Resources
- [Stripe Decline Codes](https://docs.stripe.com/declines/codes#stripe-decline-codes)
- [Stripe Error Codes](https://docs.stripe.com/error-codes)

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.