import {Routes, Route,} from 'react-router-dom';
import Addlab from './components/Addlab';

import Dna from './components/Lab/genetic lab/Dna';
import Pcr from './components/Lab/genetic lab/Pcr';
import Culture from './components/Lab/Micro lab/Culture';
import Hospitalbrucella from './components/Lab/Micro lab/Hospitalbrucella';
import Projectbrucella from './components/Lab/Micro lab/Projectbrucella';
import Login from './components/account/Login';
import Navbar from './components/Navbar';
import Brucelladetails from './components/previous details/Brucelladetails';
import Culturedetails from './components/previous details/Culturedetails';
import Dnadetails from './components/previous details/Dnadetails';
import Pcrdetails from './components/previous details/Pcrdetails';
import Projecdetails from './components/previous details/Projecdetails';
import Signup from './components/account/Signup';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="navbar" element={<Navbar />} />
        <Route path="signup" element={<Signup/>} />
        <Route path="navbar" element={<Navbar />} />
        {/* This is Lab Section  */}
        <Route path="Hospitalbrucella" element={<Hospitalbrucella />} />
        <Route path="Culture" element={<Culture />} />
        <Route path="Projectbrucella" element={<Projectbrucella />} />
        <Route path="Pcr" element={<Pcr />} />
        <Route path="Dna" element={<Dna />} />
        {/* This is Previous Details section  */}
        <Route path="Brucelladetails" element={<Brucelladetails />} />
        <Route path="Culturedetails" element={<Culturedetails />} />
        <Route path="Dnadetails" element={<Dnadetails />} />
        <Route path="Pcrdetails" element={<Pcrdetails />} />
        <Route path="Projecdetails" element={<Projecdetails />} />

        <Route path="addlab" element={<Addlab />} /> 
      </Routes>
    </div>
  );
}

export default App;
