const jwt = require('jsonwebtoken');

const secret = 'mysecret';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        };

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({ email, _id, fullName }) {
        const payload = { email, _id, fullName };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};