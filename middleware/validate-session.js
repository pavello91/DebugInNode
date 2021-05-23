const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
var User = require('../db').import('../models/user');

module.exports = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next(); // allowing options as a method for request
    } else {
        var sessionToken = req.headers.authorization;

        if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided." });
        else {
            var decoded = jwt_decode(sessionToken);
            jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded = jwt_decode(sessionToken)) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                            req.user = user;
                            console.log(`user: ${user}`)
                            next()
                        },
                        function() {
                            res.status(401).send({ error: "not authorizeds" });
                        })

                } else {
                    res.status(400).send({ error: "not authorizedvv" })
                }
            });
        }
    }
}