const jwt = require('jsonwebtoken');



const jwtValidate = async (req, ctx, next) => {

    const accessToken = req.cookies['x-access'];
    const refreshToken = req.cookies['x-refresh'];

    if (accessToken) {
        console.log('Access token');
        try {
            const verified = await jwt.verify(accessToken, process.env.accesToken);
            console.log('Eveything is ok ');
        } catch (error) {
            console.log("error");
        }

    }
    next();
};


module.exports = { jwtValidate };