export const checkIsUser = async (req, res, next) => {
    try {
        if (req.userInfo && req.userInfo.role === "user") {
            return next();
        }
        return res.status(403).json({
            success: false,
            message: "You are not allowed to access this website, user access is required"
        });

    } catch (error) {
        next(error);
    }
}