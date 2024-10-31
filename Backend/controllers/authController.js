const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req,res)=>{
    const {username,password,role} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({username,password:hashedPassword,role})
        await user.save()
        res.status(201).json({message:'User created successfully'})
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
}

//Login existing user 
exports.login = async(req,res)=>{
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message:'Invalid Credentials'})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:'Invalid Credentials'})
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
        res.json({token})
        }
    catch (error) {
        res.status(500).json({message:error.message})
    }
}