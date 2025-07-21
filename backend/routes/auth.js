const express = require('express');
const multer = require('multer')
const path=require('path')
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword,getUserProfile, changePassword, updateProfile, getAllUsers, getUser, getUser_and_Update, get_user_and_delete } = require('../controller/authController');
const router=express.Router();
const {isAuthenticateUser,authorizeRoles} = require('../middlewares/authenticate')

const upload = multer({storage: multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,path.join(__dirname,'..','upload/users'))
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})})


router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/myprofile').get(isAuthenticateUser,getUserProfile)
router.route('/myprofile/password/change').put(isAuthenticateUser,changePassword)
router.route('/myprofile/updateProfile').put(isAuthenticateUser,upload.single('avatar'),updateProfile)


//Admin Routes
router.route('/admin/getusers').get(isAuthenticateUser,authorizeRoles('admin'),getAllUsers)
router.route('/admin/getuser/:id').get(isAuthenticateUser,authorizeRoles('admin'),getUser)
                                  .put(isAuthenticateUser,authorizeRoles('admin'),getUser_and_Update)
                                  .delete(isAuthenticateUser,authorizeRoles('admin'),get_user_and_delete)




module.exports= router;