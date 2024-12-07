export const checkIsAdmin = async (req, res, next) => {
    try {
        if (req.userInfo && req.userInfo.role === "admin") {
            next();
        }
        return res.status(403).json({
            success: false,
            message: "You are not allowed to access this website, admin access is required"
        });

    } catch (error) {
        next(error);
    }
}