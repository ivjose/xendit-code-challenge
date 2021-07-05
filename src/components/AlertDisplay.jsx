import PropTypes from 'prop-types'

const AlertDisplay = ({ status, message }) => {
  const textColor = {
    error: 'text-red-800',
    success: 'text-green-700',
    default: 'text-gray-800',
  }

  const bgColor = {
    error: 'bg-red-50',
    success: 'bg-green-50',
    default: 'bg-gray-50',
  }
  return (
    <div className={`p-4  mb-4 ${bgColor[status]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {status === 'success' && (
            <svg
              className="w-5 h-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {status === 'error' && (
            <svg
              className="w-5 h-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor[status]}`} role="alert">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

AlertDisplay.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
}

AlertDisplay.defaultProps = {
  status: 'default',
  message: 'default message',
}
export default AlertDisplay
