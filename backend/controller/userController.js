const User = require("../models/userModel");
const { sendToken } = require("../utils/jwtToken");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorHandler");

module.exports.registerUser = async (req, res, next) => {
  const { email, companyName, password, uuid } = req.body;

  if (!companyName || !email || !password | !uuid) {
    return res.status(401).json({ message: "Please Enter all the Details" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    companyName,
    email,
    password,
    uuid,
  });

  sendToken(user, 200, res);
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Please Enter all the Details" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  sendToken(user, 200, res);
};

exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

module.exports.allUser = async (req, res) => {
  try {
    const resultPerPage = 10;
    const page = req.query.page || 1;
    const searchTerm = req.query.name || "";

    const initialQuery = User.find({
      name: { $regex: searchTerm, $options: "i" },
    });

    const userCount = await User.countDocuments({
      title: { $regex: searchTerm, $options: "i" },
    });

    const apiFeature = new ApiFeatures(initialQuery, req.query).filter();

    apiFeature.pagination(resultPerPage, page);

    const users = await apiFeature.query;

    const filteredCampaignCount = users.length;

    res.status(200).json({
      success: true,
      users,
      userCount,
      resultPerPage,
      filteredCampaignCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching campaigns",
    });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
