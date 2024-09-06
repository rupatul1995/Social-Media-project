// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/auth.context";

// const Navbar = () => {
//   const router = useNavigate();
//   const { state } = useContext(AuthContext);
  
//   return (
//     <div className="navbar">
//     <h1 className="logo">Instagram</h1>

// <div className="Home">
// <div className="Home1">
//   <i className="fa-solid fa-house"></i>
// </div>
// <div className="Home2">
//   <p onClick={() => router("/")}>Home</p>
// </div>
// </div>

// <div className="Search">
// <div className="Search1">
//   <i className="fa-solid fa-magnifying-glass"></i>
// </div>
// <div className="Search2">
//   <input
//     type="text"
//     placeholder="Search username..."
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//   />
//   <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
//   <p>Search</p>
// </div>
// </div>
// <div className="Explore">
// <div className="Explore1">
//   <i className="fa-regular fa-compass"></i>
// </div>
// <div className="Explore2">
//   <p>Explore</p>
// </div>
// </div>

// <div className="Reels">
// <div className="Reels1">
//   <i className="fa-solid fa-play"></i>
// </div>
// <div className="Reels2">
//   <p>Reels</p>
// </div>
// </div>

// <div className="Messages">
// <div className="Messages1">
//   <i className="fa-solid fa-message"></i>
// </div>
// <div className="Messages2">
//   <p>Messages</p>
// </div>
// </div>

// <div className="Notifications">
// <div className="Notifications1">
//   <i className="fa-regular fa-heart"></i>
// </div>
// <div className="Notifications2">
//   <p>Notifications</p>
// </div>
// </div>

// <div className="Create">
// <div className="Create1">
//   <i className="fa-regular fa-square-plus"></i>
// </div>
// <div className="Create2">
//   <p onClick={() => router("/create-post")}>Create</p>
// </div>
// </div>

// <div className="Profile" onClick={() => router("/profile")}>
// <div className="Profile1">
//   <i className="fa-regular fa-user"></i>
// </div>
// <div className="Profile2">
//   <p>Profile</p>
// </div>
// </div>

// <div className="More">
// <div className="More1">
//   <i className="fa-solid fa-bars"></i>
// </div>
// <div className="More2">
//   <p>More</p>
// </div>
// </div>

// <div className="logout">
// <div className="logout1">
//   <i className="fa-regular fa-user"></i>
// </div>
// <div className="logout2" onClick={handleLogout}>
//   <p>Logout</p>
// </div>
// </div>

//     </div>
//   );
// };

// export default Navbar;

