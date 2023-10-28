// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/signup';
import Userdata from './components/userdata';
import Useredit from './components/useredit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/userData' element={<Userdata />} />
        <Route path='/userData/edit' element={<Useredit />} />
      </Routes>
   
    </div>
  );
}

export default App;
