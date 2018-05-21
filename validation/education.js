const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};

    data.instituteName = !isEmpty(data.instituteName) ? data.instituteName : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';

    if (Validator.isEmpty(data.instituteName))
        errors.instituteName = "Institute Name is required";

    if (Validator.isEmpty(data.degree))
        errors.degree = "Degree is required";

    if (Validator.isEmpty(data.fieldOfStudy))
        errors.fieldOfStudy = "From Date is required";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}