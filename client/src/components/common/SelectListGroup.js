import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

const SelectListGroup = ({
  name,
  info,
  error,
  value,
  label,
  onChange,
  options
}) => {
    const optionsList = options.map(option => (
        <option key={option.label} value={option.label}>
            {option.label}
        </option>
    ))
    return (
        <div className="form-group">
            <select
            className={classnames("form-control form-control-lg", {
                "is-invalid": error
            })}
            name={name}
            value={value}
            onChange={onChange}
            >
            {optionsList}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string
};

export default SelectListGroup;
