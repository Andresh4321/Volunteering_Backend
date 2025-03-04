const express=require('express')

const reouter= express.Router();

const userController=require('.../controller/userController');
const { router } = require('..');

router.get('/view_users',userController.getUser)
router.post('/create_users',userController.createUser)

module.exports=router;

