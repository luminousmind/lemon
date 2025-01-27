const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({error: "User not authenticated"});
    }
    
    next();
}

module.exports = isAuthenticated;