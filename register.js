const arr = [];
const saltRounds = 10;
const secretKey = "akarshgupta";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const details = req.body;
  const user = arr.find((item) => details.email === item.email);

  if (user) {
    return res.status(200).send({ msg: "User already exists. Try to login." });
  }

  try {
    const hashPassword = await bcrypt.hash(details.password, saltRounds);
    const obj = {
         email: details.email,
      password: hashPassword,

    };

    arr.push(obj);
    console.log(arr);
    res.send(arr);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const details = req.body;
  console.log(details);
  const user = arr.find((item) => details.email === item.email);
  console.log(user);

  if (!user) {
    return res.send({ msg: "User is not registered. Try to register first." });
  }

  try {
    const validate = await bcrypt.compare(details.password, user.password);
    console.log(validate);

    if (validate) {
      const token = jwt.sign({ email: user.email }, secretKey);
      console.log(token);
      return res.send({ token: token, msg: "User logged in successfully." });
    } else {
      return res.send({ msg: "User password does not match." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { register, login };
