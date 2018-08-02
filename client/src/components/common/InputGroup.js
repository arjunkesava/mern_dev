import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

const InputTextGroup = ({
  name,
  placeholder,
  icon,
  type,
  error,
  value,
  label,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon} />
            </span>
        </div>
        <input
            className={classnames("form-control form-control-lg", {
                "is-invalid": error
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

InputTextGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string
}

InputTextGroup.defaultProps = {
    type: "text"
}

export default InputTextGroup