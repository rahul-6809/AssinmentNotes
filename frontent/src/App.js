
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage';
import SignupPages from './Pages/SignupPages';
import DashboardPage from './Pages/DashboardPage';
import CreatePage from './Pages/CreatePage';

import UpdatePages from './Pages/UpdatePages';
import ViewPage from './Pages/ViewPage';


function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/signup" element={<SignupPages />} />
     <Route path="/dashboard" element={<DashboardPage />} />
       <Route path="/create" element={<CreatePage />} />
      {/* // <Route path="/update" element={<UpdatePages />} /> */}
       <Route path="/view/:id" element={<ViewPage/>} />
      
    </Routes>
  </Router>
  );
}

export default App;
