const express = require('express')
const router = express.Router()
const pages = require('../controllers/authController.js')
// const {isAuthenticatedUser, isLoggedIn} = require("../middlewares/authMiddlewaresUser.js")

router.route('/otp').post(pages.userOTPController)
router.route('/login').post(pages.loginController)
router.route('/save-layout').post(pages.saveLayoutController)
router.route('/cards').get(pages.cardController)
router.route('/lists/:cardId').get(pages.listController)

module.exports = router