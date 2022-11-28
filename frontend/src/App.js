import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register';
import Homepage from './Components/Homepage';
import Friends from './Components/Friends';
import ManageEvent from './Components/ManageEvent';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/VolleyProject" element={ <Login />}/>
          {/* <Route path="/VolleyProject/login" element={ < Login />}/>
          <Route path="/VolleyProject/register" element={ < Register />}/>
          <Route path="/VolleyProject/homepage" element={ < Homepage />}/>
          <Route path="/VolleyProject/friends" element={ < Friends />}/>
          <Route path="/VolleyProject/eventmanagement" element={ < ManageEvent />}/> */}

          <Route path="/" exact element={ <Login />}/>
          <Route path="/login" element={ < Login />}/>
          <Route path="/register" element={ < Register />}/>
          <Route path="/homepage" element={ < Homepage />}/>
          <Route path="/friends" element={ < Friends />}/>
          <Route path="/eventmanagement" element={ < ManageEvent />}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
