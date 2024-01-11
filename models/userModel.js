const {mongoose , Schema } =  require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      // This only works on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
}, {timestamps : true});

userSchema.pre('save', async function (next){ 
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    this.passwordConfirm = undefined

    next()
})

userSchema.methods.checkCorrectPassword = async function (passwordFromBody , passwordFromDB) {
  return await bcrypt.compare(passwordFromBody, passwordFromDB)
}

const User = mongoose.model("User", userSchema)
module.exports = User
