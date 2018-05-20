const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.fromDate = !isEmpty(data.fromDate) ? data.fromDate : '';

    if (Validator.isEmpty(data.title))
        errors.title = "Job title is required";

    if (Validator.isEmpty(data.company))
        errors.company = "Company Name is required";

    if (Validator.isEmpty(data.fromDate))
        errors.fromDate = "From Date is required";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}