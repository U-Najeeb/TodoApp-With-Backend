const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const {promisify} = require("util");

const signingFunc = (payload) => {
  return jwt.sign({ id: payload }, process.env.SECRET);
};

const signup = catchAsync(async (req, res, next) => {
  const body = req.body;
  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
    passwordConfirm: body.passwordConfirm,
  });

  const token = signingFunc(newUser._id);
  res.cookie("jwt", token, {
    expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure : true,
    httpOnly : false
  })
  res.status(200).json({
    message : "Signed in successfully",
    token
  })
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter email and password", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  
  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signingFunc(user._id);

  res.cookie("jwt", token, {
    expires : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure : true,
    httpOnly : false,
    sameSite : "None"
  })
  res.status(200).json({
    message : "Logged in successfully",
    token
  })
});

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please log in first", 400));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("This user no longer exists", 401));
  } 
  req.user = currentUser
  
  next()
});

const logout = catchAsync (async(req, res, next)=>{
  
})
module.exports = { signup, login, protect , logout};
