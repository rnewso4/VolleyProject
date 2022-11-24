import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register';
import Homepage from './Components/Homepage';
import Friends from './Components/Friends';

function App() {

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" exact element={ <Login />}/>
          <Route path="/login" element={ < Login />}/>
          <Route path="/register" element={ < Register />}/>
          <Route path="/homepage" element={ < Homepage />}/>
          <Route path="/friends" element={ < Friends />}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
