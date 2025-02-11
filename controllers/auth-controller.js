const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // Step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // Step 2 validate
    // Step 3 Check already
    const checkEmail = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return createError(400, "Email is already exits!!!");
    }
    // Step 4 Encrypt bcrypt
    // const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, 10);
    // console.log(hashedPassword);
    // Step 5 Insert to DB
    const profile = await prisma.profile.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      },
    });
    // Step 6 Response
    res.json({ message: "Register Success" });
  } catch (error) {
    console.log("Step 2 Catch");
    next(error);
  }
};

exports.login = async (req, res, next) => {
  //code
  try {
    // Step 1 req.body
    const { email, password } = req.body;
    // Step 2 Check email and password
    const profile = await prisma.profile.findFirst({
      where: {
        email: email,
      },
    });
    if (!profile) {
      return createError(400, "Email, Password is invalid!!");
    }
    const isMatch = bcrypt.compareSync(password, profile.password);

    if (!isMatch) {
      return createError(400, "Email, Password is invalid!!");
    }

    // Step 3 Generate token
    const payload = {
      id: profile.id,
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      role: profile.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d", // เวลา สามารถ login ได้ 20 วินาที  ถ้า 1d ก์คือ 1วัน
    });

    // console.log(token);
    // Step 4 Response
    res.json({
      message: "Login Success",
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const { email} = req.user
    console.log(email)

    const profile =  await prisma.profile.findFirst({
      where: {email,},
      select: {
        id: true,
        email: true,
        role: true,
      }
    })
    console.log(profile)

    res.json({ result: profile});
  } catch (error) {
    next(error);
  }
};