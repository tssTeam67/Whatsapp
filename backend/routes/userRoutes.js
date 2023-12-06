const express=require("express");
const router=express.Router();
const {isAuthenticatedUser}=require('../middleware/auth');
const {registerUser, loginUser,getUserDetails,logout, allUser}=require("../controller/userController")
router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);



module.exports=router;