import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        
       {/* <Route  path="/" element={<Home/>} /> */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
         {/* <Route path="/add-post" element={<AddPost/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>  */}
        
    
        </Routes>
    </div>
  );
}

export default App;
