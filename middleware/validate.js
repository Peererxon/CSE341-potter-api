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

const validateMovie = (req, res, next) => {
    const validationRule = {
        movieName: 'required|string',
        director: 'required|string',
        runtime: 'required|string',  
        seriesNumber: 'required|numeric',
        duration: 'required|string',
        rating: 'required|string',
        releaseDate: 'required|date'
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

const validateSpell = (req, res, next) => {
    const validationRule = {
        spellName: 'required|string',
        spellType: 'required|string',
        use: 'required|string',
        difficulty: 'required|string',
        effects: 'required|string'
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
    validateCharacter,
    validateMovie,
    validateSpell
};