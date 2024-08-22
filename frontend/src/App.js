import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import AddPost from './component/AddPost';

function App() {
  return (
    <div className="App">
      <Routes>
        
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/add-post" element={<AddPost/>}/>
      {/* <Route path="/logout" element={<Logout/>}/> */}

      </Routes>
     
    </div>
  );
}

export default App;
