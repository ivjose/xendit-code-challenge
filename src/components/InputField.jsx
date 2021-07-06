/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'

const InputField = ({ name, label, placeholder, value, type, error, updateField, ...res }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        {...res}
        default={value}
        onChange={updateField}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    {error && (
      <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
        {error}
      </p>
    )}
  </div>
)

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
}

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
}

export default InputField
