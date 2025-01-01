import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

// register user
export const registerUser = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check the username or email already present in our db
        const isUserExists = await User.findOne({$or: [{username}, {email}]});

        if (isUserExists) return res.status(403).json({
            success: false,
            message: "User already exists, please try to login"
        });

        // before register hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // register now
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            role: role || 'user'
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "User registration failed",
            error
        });
    }
}

// login user
export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) return res.status(403).json({
            success: false,
            message: "All fields are required"
        });

        // check if the user is already logged in
        const user = await User.findOne({username});

        if (!user) return res.status(403).json({
            success: false,
            message: "Access denied, please register first",
        });

        // check the password now
        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (!isAuthenticated) return res.status(403).json({
            success: false,
            message: "Access denied, Invalid credentials",
        });

        // generate the token and send it to the server
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {expiresIn: '30min'});

        res.status(200).json({
            success: true,
            message: "Access granted, user logged in successfully",
            accessToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "User login failed",
            error
        });
    }
}

// change password
export const changePassword = async (req, res) => {
    try {
        // get the current user who wants to change the password
        const {userId} = req.userInfo;
        // get old and new password for the user
        const {oldPassword, newPassword} = req.body;

        // old password and new password should not be samed
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password should be not samed like old password"
            });
        }

        // check the user is authenticated
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({
            success: false,
            message: "User not found",
        });

        // compare the old and new password
        const checkPassword = await bcrypt.compare(oldPassword, user.password);

        if (!checkPassword) return res.status(400).json({
            success: false,
            message: "Old password is incorrect",
        });

        // hash the new password
        const newHashPassword = await bcrypt.hash(newPassword, 10);

        // update the new password
        user.password = newHashPassword;

        await user.save();

        res.status(200).json({
            success: false,
            message: "User password updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Change password failed",
            error
        });
    }
}