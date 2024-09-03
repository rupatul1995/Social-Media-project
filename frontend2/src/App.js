
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import CreatePost from './component/CreatePost';
import Home from './component/Home';
import UserProfile from './component/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route  path="/" element={<Home/>} /> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
         <Route path="/create-post" element={<CreatePost/>}/> 
         <Route path="/profile" element={<UserProfile/>} />
        
    
        </Routes>
    </div>
  );
}

export default App;
