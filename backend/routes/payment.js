const express = require('express');
const router = express.Router();
const { isAuthenticateUser } = require('../middlewares/authenticate');
const { processPayment, sendStripeApi } = require('../controller/paymentController');


router.route('/payment/process').post(isAuthenticateUser,processPayment)
router.route('/stripeApi').get(isAuthenticateUser,sendStripeApi)

module.exports = router