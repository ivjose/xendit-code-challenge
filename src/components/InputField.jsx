/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'

const InputField = ({ name, label, placeholder, value, type, error, updateField, ...res }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          {...res}
          value={value}
          onChange={updateField}
          id={name}
          name={name}
          type={toggle ? 'text' : type}
          placeholder={placeholder}
          className="block w-full px-4 py-3 text-gray-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />

        {type === 'password' && (
          <div
            role="button"
            tabIndex={0}
            aria-hidden="true"
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer "
            data-testid="toggle-password"
            onClick={() => setToggle((prevState) => !prevState)}
          >
            {toggle ? (
              <EyeIcon
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                data-testid="eye-open"
              />
            ) : (
              <EyeOffIcon
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                data-testid="eye-close"
              />
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  updateField: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
}

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  error: '',
}

export default InputField
