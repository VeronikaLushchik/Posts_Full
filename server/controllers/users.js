const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

refresh = async (req, res) => {
  const {refreshToken} = req.cookies
  
  if (!refreshToken) return res.sendStatus(401)

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const token = jwt.sign(user, process.env.SECRET)
    res.json({ token })
  })
}

singin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });
 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET, { expiresIn: "30s" });
    const refreshToken = jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "1h" });
    
    res.cookie('refreshToken', refreshToken, {httpOnly: true})
    res.status(200).json({ result: user, token, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

singup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "30s" } );
    const refreshToken = jwt.sign({ email: result.email, id: result._id }, process.env.REFRESH_SECRET, { expiresIn: "1h" });

    res.cookie('refreshToken', refreshToken, {httpOnly: true})
    res.status(201).json({ result, token});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { singin, singup, refresh }