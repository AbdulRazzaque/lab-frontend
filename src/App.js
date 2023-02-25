import {Routes, Route,} from 'react-router-dom';
import Addlab from './components/Addlab';
import Entry from './components/Entry';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Previousdetails from './components/Previousdetails';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="signup" element={<Signup/>} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="entry" element={<Entry />} />
        <Route path="previous" element={<Previousdetails />} />
        <Route path="addlab" element={<Addlab />} />
      </Routes>
    </div>
  );
}

export default App;
