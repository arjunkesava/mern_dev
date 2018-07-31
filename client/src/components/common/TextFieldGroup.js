import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
    name,
    placeholder,
    info,
    type,
    error,
    value,
    label,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && (<small className="form-text text-muted">{info}</small>)}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    disabled: PropTypes.string,
    label: PropTypes.string,
}

TextFieldGroup.defaultProps = {
    type: "text"
}

export default TextFieldGroup