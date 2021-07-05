import { ExternalLinkIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'

import Pagination from 'components/Pagination'
import DisplayText from 'components/DisplayText'
import usePagination from 'hooks/usePagination'

const UniversitiesCardList = ({ data }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination({
    itemsPerPage: 10,
    data: [...data],
    startFrom: 1,
  })

  if (data.length === 0) return <DisplayText text="No Result Found" />
  return (
    <div className="py-10 mx-auto ">
      <ul className="px-3 mb-4 space-y-2">
        {slicedData.map((university, index) => {
          const newIndex = `${university.name.replace(/\s/g, '')}-${index}`

          return (
            <li
              key={newIndex}
              className="relative flex items-center px-6 py-5 bg-gray-200 border border-gray-300 rounded-lg shadow-sm "
            >
              <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                  <h4 className="text-sm font-medium text-gray-900">{university.name}</h4>
                  <p className="text-sm text-gray-500 truncate">{university.country}</p>
                </div>
              </div>
              <div className="space-x-2">
                {university.web_pages.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    className="cursor-pinter inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    rel="noreferrer"
                  >
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
      <Pagination
        pagination={pagination}
        changePage={changePage}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  )
}

UniversitiesCardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string,
      name: PropTypes.string,
      web_pages: PropTypes.arrayOf(PropTypes.string),
    })
  ),
}

UniversitiesCardList.defaultProps = {
  data: [],
}

export default UniversitiesCardList
