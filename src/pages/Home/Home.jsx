import { useState } from 'react'
import axios from 'axios'
import { useDebouncedCallback } from 'use-debounce'

import SearchInput from 'components/SearchInput'
import UniversitiesCardList from 'components/UniversitiesCardList'
import DisplayText from 'components/DisplayText'

import { STATUS } from 'utlis/constants'

const Home = () => {
  const [searchText, setSearchText] = useState('')

  const [loading, setLoading] = useState(STATUS.IDLE)
  const [pageData, setPageData] = useState([])

  const apiSearch = async (value) => {
    setLoading(STATUS.LOADING)
    try {
      const results = await axios.get(`http://universities.hipolabs.com/search`, {
        params: {
          name: value,
        },
      })
      const { data } = results
      setLoading(STATUS.RESOLVED)
      setPageData([...data])
    } catch (error) {
      // console.log(error, 'error')
      setLoading(STATUS.REJECTED)
    }
  }

  const handleSearchText = useDebouncedCallback((event) => {
    setSearchText(event.target.value)
    if (event.target.value) {
      apiSearch(event.target.value)
    } else {
      setPageData([])
    }
  }, 1000)

  return (
    <div className="max-w-2xl mx-auto overflow-hidden bg-gray-100 shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-lg font-medium leading-6 text-gray-900">Enter your University name</h1>
      </div>
      <SearchInput text={searchText} handleChange={handleSearchText} />

      {loading === STATUS.IDLE && <DisplayText text="Search Your University" />}

      {loading === STATUS.LOADING && <DisplayText text="...Loading" />}
      {loading === STATUS.RESOLVED && <UniversitiesCardList data={pageData} />}
    </div>
  )
}
export default Home
