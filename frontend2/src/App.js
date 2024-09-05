
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import CreatePost from './component/CreatePost';
import Home from './component/Home';
import UserProfile from './component/UserProfile';
import GetSuggested from './component/GetSuggested';
import SearchResults from './component/SearchResults';

function App() {
  return (
    

    <div className="App">
      <Routes>
        
        
        <Route  path="/home" element={<Home/>} /> 
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
         <Route path="/create-post" element={<CreatePost/>}/> 
         <Route path="/profile" element={<UserProfile/>} /> 
         <Route path="/all-users" element={GetSuggested} />
        <Route path="/search-results" element={<SearchResults />} />
        
    
        </Routes>
    </div>
  );
}

export default App;
