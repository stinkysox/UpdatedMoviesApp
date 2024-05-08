import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './index.css'

const MovieDetailsRoute = () => {
  const {id} = useParams()
  const [apiStatus, setApiStatus] = useState('')
  const [videoDetails, setVideoDetails] = useState({})
  const [castDetails, setCastDetails] = useState([])

  useEffect(() => {
    const getMovieDetail = async () => {
      const apiKey = '735b06bb00eb9d3d1346af2960df5323'
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        const response = await fetch(url)
        const data = await response.json()
        const updatedData = {
          adult: data.adult,
          backdropPath: data.backdrop_path,
          belongsToCollections: data.belongs_to_collection,
          posterPath: data.poster_path,
          budget: data.budget,
          homepage: data.homepage,
          imdbId: data.imdb_id,
          originCountry: data.origin_country,
          originalLanguage: data.original_language,
          originalTitle: data.original_title,
          overview: data.overview,
          voteAverage: data.vote_average,
          voteCount: data.vote_count,
          genres: data.genres,
          releaseDate: data.release_date,
        }

        setApiStatus('Success')
        setVideoDetails(updatedData)
      } catch (error) {
        setApiStatus('Failed')
        console.log(error)
      }
    }

    const getCastDetails = async () => {
      const apiKey = '735b06bb00eb9d3d1346af2960df5323'
      try {
        const api = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        const response = await fetch(api)
        const data = await response.json()
        const {cast} = data
        const updatedData = cast.map(eachItem => ({
          adult: eachItem.adult,
          castId: eachItem.cast_id,
          character: eachItem.character,
          gender: eachItem.gender,
          id: eachItem.id,
          knownForDepartment: eachItem.known_for_department,
          originalName: eachItem.original_name,
          popularity: eachItem.popularity,
          profilePath: eachItem.profile_path,
        }))
        setApiStatus('Success')
        setCastDetails(updatedData)
      } catch (error) {
        console.log(error)
        setApiStatus('Failed')
      }
    }

    getMovieDetail()
    getCastDetails()
  }, [id])

  const {
    originalTitle,
    posterPath,
    voteAverage,
    genres,
    overview,
    releaseDate,
  } = videoDetails

  return (
    <div className="w-movie-details">
      <div className="movie-details-container">
        <p className="movie-title">{originalTitle}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt="Movie Poster"
          className="movie-image-two"
        />
        <div className="text-container">
          <p className="rating-text">{voteAverage}</p>
          <p className="review-text">{overview}</p>
          <p className="release-text">Release Date: {releaseDate}</p>
          <div>
            {genres && genres.length > 0 && (
              <div className="genre-container">
                <p>Genres:</p>
                {genres.map(eachItem => (
                  <p key={eachItem.id}>{eachItem.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="movie-cast-details-container">
        <h1 className="cast-heading">Cast</h1>
        <div className="cast-main-container">
          {castDetails.map(eachItem => (
            <div key={eachItem.id} className="cast-card">
              <img
                className="cast-image"
                src={`https://image.tmdb.org/t/p/original/${eachItem.profilePath}`}
                alt="Cast"
              />
              <p>{eachItem.originalName}</p>
              <p>{eachItem.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsRoute
