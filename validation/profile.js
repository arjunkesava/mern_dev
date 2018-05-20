const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    
    if (!Validator.isLength(data.handle, { min: 2, max: 40 }))
        errors.handle = "Handle must be a atlease 2 - 40 chars";

    if (Validator.isEmpty(data.handle))
        errors.handle = "Handle is required";

    if (Validator.isEmpty(data.status))
        errors.status = "Status is required";

    if (Validator.isEmpty(data.skills))
        errors.skills = "Specify atleast One Skill";

    if(!isEmpty(data.website) && !Validator.isURL(data.website))
        errors.website = "Please specify a valid Website URL";
        
    if(!isEmpty(data.youtube) && !Validator.isURL(data.youtube))
        errors.youtube = "Please specify a valid Youtube URL";
    
    if(!isEmpty(data.facebook) && !Validator.isURL(data.facebook))
        errors.facebook = "Please specify a valid Facebook URL";

    if(!isEmpty(data.instagram) && !Validator.isURL(data.instagram))
        errors.instagram = "Please specify a valid Instagram URL";

    if(!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin))
        errors.linkedin = "Please specify a valid LinkedIn URL";

    if(!isEmpty(data.twitter) && !Validator.isURL(data.twitter))
        errors.twitter = "Please specify a valid Twitter URL";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}