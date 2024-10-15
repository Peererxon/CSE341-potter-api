const validator = require('../helpers/validate');

const validateCharacter = (req, res, next) => {
    const validationRule = {
        fullName: 'required|string',
        house: 'required|string',
        birthdate: 'required|date',  
        bloodStatus: 'required|string',
        patronus: 'required|string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    validateCharacter
};