import PropTypes from 'prop-types'

const DisplayText = ({ text }) => (
  <div className="px-4 py-5 text-center text-gray-400 sm:p-6">
    <h3 className="text-xl font-medium leading-6 ">{text}</h3>
  </div>
)
DisplayText.propTypes = {
  text: PropTypes.string.isRequired,
}
export default DisplayText
