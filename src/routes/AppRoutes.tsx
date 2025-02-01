import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'
import Protected from '../Protected/Protected';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/protected' element={<Protected />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;

// agregar q se requiere el access_token
