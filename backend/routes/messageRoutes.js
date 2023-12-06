const express = require("express");
const { storeMessages,getMessages} = require("../controller/messageController");
const router = express.Router();


router.route("/store/message/:id/:muid").post(storeMessages);

router.route("/get/messages/:id").get(getMessages);

module.exports = router;
