const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text)?data.text: '';

    if(!Validator.isLength(data.text, {min: 2, max: 30 })){
        errors.text = "Min and Max lengths are 2 and 30";
    }

    if(Validator.isEmpty(data.text)){
        errors.text = "Text field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}