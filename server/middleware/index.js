const jwt = require('jsonwebtoken');



const jwtValidate = async (req, ctx, next) => {
    console.log('Im hererererer ');
    const accessToken = req.cookies['x-access'];
    const refreshToken = req.cookies['x-refresh'];
    if (accessToken) {
        try {
            const verified = await jwt.verify(accessToken, process.env.accesToken);
        } catch (error) {

        }

    }
    next();
};


module.exports = { jwtValidate };