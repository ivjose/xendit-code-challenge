import { SearchIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'

const SearchInput = ({ handleChange, text }) => (
  <div className="flex justify-between flex-1 px-4 py-2 bg-gray-100 border-t border-b">
    <div className="flex flex-1">
      <div className="flex w-full lg:ml-0">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            defaultValue={text}
            onChange={handleChange}
            className="block w-full h-full py-2 pl-8 pr-3 text-xl text-gray-900 placeholder-gray-500 bg-gray-100 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
            placeholder="Search"
            type="search"
            name="search"
          />
        </div>
      </div>
    </div>
    {/* <div className="flex items-center ml-4 lg:ml-6">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      >
        Create
      </button>
    </div> */}
  </div>
)

SearchInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default SearchInput
