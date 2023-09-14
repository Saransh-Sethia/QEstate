
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Explore from './components/Explore/Explore';
import ListingDetailPage from './components/ListingDetailPage/ListingDetailPage';
function App() {
  return (
    <Routes>
      {/* LandingPage */}
<Route path='/' element={<LandingPage />}></Route>
{/* ExplorePage */}
<Route path='/listings' element={<Explore />}></Route>
{/* ListingDetailsPage */}
<Route path='/detail/:property_id' element={<ListingDetailPage />}/>
    </Routes>
  );
}

export default App;
