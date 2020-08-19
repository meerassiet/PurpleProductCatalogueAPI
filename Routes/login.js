const express = require('express');
const loginRoute = express.Router(); // to config router
const loginDetails = require('../Models/loginSchema');
const cors = require('cors');

loginRoute.use(cors());


// Validate the username and password while logging in
loginRoute.post('/', async(req, res) => {
    const user = await loginDetails.findOne({ email: { '$regex': req.body.email, $options: 'i' } });
    try {
        if (user) {
            console.log(user.password, "and ", req.body.password);
            if (user.password === req.body.password) {
                res.json({
                    'Data': user,
                    'Success': true,
                });
            } else {
                console.log("pwd incorrect");

                res.json({
                    'Success': false,
                    'Error': 'Invalid Password'
                });
            }
        } else {
            res.json({
                'Success': false,
                'Error': 'user does not exist'
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            'Success': false,
            'Error': err
        });
    }

});

module.exports = loginRoute;