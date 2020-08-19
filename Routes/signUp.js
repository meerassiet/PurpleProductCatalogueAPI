const express = require('express');
const router = express.Router();
const loginDB = require('../Models/loginSchema');
const cors = require('cors');
const bodyParser = require("body-parser");

router.use(cors());
router.use(bodyParser.json());


router.post('/', async(req, res) => {
    try {
        const user = await loginDB.findOne({ email: req.body.newData.email });
        if (user) {
            res.json({
                'Success': false,
                'Error': 'Existing User'
            });
        } else {
            var signUpData = new loginDB({
                firstname: req.body.newData.firstname,
                lastname: req.body.newData.lastname,
                team: req.body.newData.team,
                email: req.body.newData.email,
                password: req.body.newData.password
            });
            signUpData.save(function(err) {
                if (err) {
                    res.json({
                        'Success': false,
                        'Error': 'Unable to register'
                    });
                } else {
                    res.json({
                        'Success': true,
                        'Error': 'Registration successful'
                    });
                }
            });
        }
    } catch (err) {
        res.json({
            'Success': false,
            'Error': err
        });
    }
});

module.exports = router;