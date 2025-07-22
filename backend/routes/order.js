const express = require('express');
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrder } = require('../controller/orderController');
const { isAuthenticateUser, authorizeRoles } = require('../middlewares/authenticate'); // ensure this exports a function!
const router = express.Router();

router.route('/order/new').post(isAuthenticateUser, newOrder); // error likely here
router.route('/order/:id').get(isAuthenticateUser, getSingleOrder);
router.route('/myorder').get(isAuthenticateUser, myOrder); 

//Admin Routes
router.route('/admin/orders').get(isAuthenticateUser,authorizeRoles('admin'),getAllOrders)
router.route('/admin/updateorder/:id').put(isAuthenticateUser,authorizeRoles('admin'),updateOrder)
router.route('/admin/deleteorder/:id').delete(isAuthenticateUser,authorizeRoles('admin'),deleteOrder)



module.exports = router;
