/* eslint-disable jsx-a11y/anchor-is-valid */
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'

const Pagination = ({ pagination, changePage, prevPage, nextPage }) => (
  <nav className="flex items-center justify-between px-4 border-t border-gray-200 ">
    <div className="flex flex-1 w-0 -mt-px">
      <a
        role="button"
        href="#"
        onClick={prevPage}
        className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
      >
        <ArrowNarrowLeftIcon className="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
        Previous
      </a>
    </div>
    <div className="hidden md:-mt-px md:flex">
      {pagination.map((item) => {
        if (!item.ellipsis) {
          return (
            <a
              key={item.id}
              href="#"
              onClick={() => changePage(item.id)}
              className={`inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300 ${
                item.current && 'text-indigo-600 border-indigo-500'
              }`}
            >
              {item.id}
            </a>
          )
        }

        return (
          <span
            key={item.id}
            href="#"
            className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
          >
            &hellip;
          </span>
        )
      })}
    </div>
    <div className="flex justify-end flex-1 w-0 -mt-px">
      <a
        href="#"
        role="button"
        onClick={nextPage}
        className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
      >
        Next
        <ArrowNarrowRightIcon className="w-5 h-5 ml-3 text-gray-400" aria-hidden="true" />
      </a>
    </div>
  </nav>
)

Pagination.propTypes = {
  pagination: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      current: PropTypes.bool,
      ellipsis: PropTypes.bool,
    })
  ),
  changePage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  pagination: [],
}

export default Pagination
