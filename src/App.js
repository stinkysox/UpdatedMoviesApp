import './App.css'
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import PopularRoute from './components/PopularRoute'
import TopRatedRoute from './components/TopRatedRoute'
import UpcomingRoute from './components/UpcomingRoute'
import MovieDetailsRoute from './components/MovieDetailsRoute'
import SearchResults from './components/SearchResults'

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={PopularRoute} />
      <Route exact path="/top-rated" component={TopRatedRoute} />
      <Route exact path="/upcoming" component={UpcomingRoute} />
      <Route exact path="/movies/:id" component={MovieDetailsRoute} />
      <Route exact path="/search/:query" component={SearchResults} />
    </Switch>
  </div>
)

export default App
