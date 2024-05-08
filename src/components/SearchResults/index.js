import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {useParams} from 'react-router-dom'
import MoviesList from '../MoviesList'
import './index.css'

const SearchResults = () => {
  const {query} = useParams()

  const [apiStatus, setApiStatus] = useState('Initial')
  const [searchResultsArray, setSearchResultsArray] = useState([])

  useEffect(() => {
    const getSearchResult = async () => {
      const apiKey = '735b06bb00eb9d3d1346af2960df5323'

      try {
        const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1`
        const response = await fetch(api)
        const data = await response.json()
        const {results} = data
        const updatedData = results.map(eachItem => ({
          adult: eachItem.adult,
          backdropPath: eachItem.backdrop_path,
          genreIds: eachItem.genre_ids,
          id: eachItem.id,
          originalLanguage: eachItem.original_language,
          originalTitle: eachItem.original_title,
          overview: eachItem.overview,
          popularity: eachItem.popularity,
          posterPath: eachItem.poster_path,
          releaseDate: eachItem.release_date,
          title: eachItem.title,
          video: eachItem.video,
          voteAverage: eachItem.vote_average,
          voteCount: eachItem.vote_count,
        }))
        setApiStatus('Success')
        setSearchResultsArray(updatedData)
      } catch (error) {
        setApiStatus('Failed')
        console.error('Error fetching data:', error)
      }
    }
    getSearchResult()
  }, [query])

  const renderSuccessView = () => (
    <div className="search-container">
      {searchResultsArray.map(eachItem => (
        <MoviesList details={eachItem} key={eachItem.id} />
      ))}
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  const renderBasedOnApiStatus = () => {
    switch (apiStatus) {
      case 'Success':
        return renderSuccessView()
      case 'Initial':
        return renderLoadingView()
      case 'Failed':
        return <p>Error fetching search results</p>
      default:
        return null
    }
  }

  return <div>{renderBasedOnApiStatus()}</div>
}

export default SearchResults
