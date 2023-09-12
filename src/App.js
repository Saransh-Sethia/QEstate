
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
function App() {
  return (
    <Routes>
<Route path='/' element={<LandingPage />}></Route>
{/* ExplorePage */}
{/* ListingDetailsPage */}
    </Routes>
  );
}

export default App;
