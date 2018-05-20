const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    
    // This returns false, when the length conditions are not satisfied
    if(!Validator.isLength(data.name, { min:2, max:30 }))
        errors.name = "Username must be minimum 2 chars and a maximum of 30 chars.";

    if(!Validator.isLength(data.password, { min:6, max:30 })){
        errors.password = "Password must be minimum 6 chars and a maximum of 30 chars.";
    }

    if(Validator.isEmpty(data.name))
        errors.name = "Username is required";

    if(Validator.isEmpty(data.email))
        errors.email = "Email Id is required";

    if(!Validator.isEmail(data.email))
        errors.email = "Invalid Email Id";

    if(Validator.isEmpty(data.password))
        errors.password = "Password is required";

    if(Validator.isEmpty(data.password2))
        errors.password2 = "Confirm Password is required";
    
    if(!Validator.equals(data.password, data.password2))
        errors.password2 = "Both passwords must match";
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}