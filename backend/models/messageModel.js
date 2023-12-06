const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: {
    type: String,
  },
  receiverNumber:{
    type:String
  },
  muid:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now()
  }
});

module.exports=mongoose.model("Message",messageSchema);