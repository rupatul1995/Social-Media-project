
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import AddPost from './component/AddPost';
import Profile from './component/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        
      <Route  path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/add-post" element={<AddPost/>}/>
      <Route path="/profile/:id" element={<Profile/>}/>
      
  
      </Routes>

    </div>
  );
}

export default App;
