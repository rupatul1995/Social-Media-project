import { useContext, useEffect, useState } from "react";
import Api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import toast from "react-hot-toast";
import "../style/Home.css";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts, "allPosts");
  const [loading, setLoading] = useState(false);
  
  const { state ,dispatch } = useContext(AuthContext);
  
  const router=useNavigate();

  async function GetPosts() {
    setLoading(true);
    try {
      const response = await Api.get("/post/all-post"); 
      if (response.data.success) {
        setLoading(false);
        setAllPosts(response.data.posts); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
        const response = await Api.post("/auth/logout");
        if (response.data.success) {
            dispatch ({ type: "LOGOUT" });
            router("/login");
            toast.success(response.data.message);
        } else {
            toast.error("Logout failed.");
        }
    } catch (error) {
        toast.error("Failed to logout.");
    }
}

  useEffect(() => {
    GetPosts();
  }, []);

  return (
    <div className="mainhomepage">

      <div className="navbar">
      <h1 className="logo">Instagram</h1>

     <div className="Home">
     <div className="Home1">
     <i class="fa-solid fa-house"></i>
     </div>
     <div className="Home2">
      <p>Home</p>
     </div>
     </div>
    
    
     <div className="Search">
     <div className="Search1">
     <i class="fa-solid fa-magnifying-glass"></i>
     </div>
     <div className="Search2">
      <p>Search</p>
     </div>
     </div>
      
     <div className="Explore">
     <div className="Explore1">
      <i class="fa-regular fa-compass"></i>
     </div>
     <div className="Explore2">
      <p>Explore</p>
     </div>
     </div>
     
     <div className="Reels">
     <div className="Reels1">
     <i class="fa-solid fa-play"></i>
      
     </div>
     <div className="Reels2">
      <p>Reels</p>
     </div>
     </div>


     <div className="Messages">
     <div className="Messages1">
     <i class="fa-solid fa-message"></i>
      
     </div>
     <div className="Messages2">
      <p>Messages</p>
     </div>
     </div>
     
     <div className="Notifications">
     <div className="Notifications1">
     <i class="fa-regular fa-heart"></i>
      
     </div>
     <div className="Notifications2">
      <p>Notifications</p>
     </div>
     </div>


     
     <div className="Create">
     <div className="Create1">
     <i class="fa-regular fa-square-plus"></i>
      
     </div>
     <div className="Create2">
      <p>Create</p>
     </div>
     </div>

     
     <div className="Profile">
     <div className="Profile1">
     <i class="fa-regular fa-user"></i>
      
     </div>
     <div className="Profile2">
      <p>Profile</p>
     </div>
     </div>


     
     <div className="More">
     <div className="More1">
     <i class="fa-solid fa-bars"></i>
      
     </div>
     <div className="More2">
      <p>More</p>
     </div>
     </div>
      </div>



{/*     
    <button onClick={handleLogout}>Logout</button> */}
      {loading ?  (
        <div className="instagramlogo">
         
        </div>
      ) : (
        <div
          className="postMainDiv"
        >
          {allPosts.map((posts) => (
              <div className="postimage"
              
              onClick={() => router(`/post/${posts._id}`)}
            >
              <p>{state?.user?.username}</p>
              <img className="postimagesize"
               
                src={posts.image}
              />
              <video/>
              <p> {posts.caption}</p>
              <inpute 
              type="text"
              name="comment"
              placeholder="Add a comment...."
              />
            </div>
          ))}
        </div>
      )}
      <div className="SuggestDiv">
        
    <h1>UserName:-{state?.user?.username}</h1>
         <h1>Suggested for you</h1>
      </div>



    </div>
  );
}
    export default Home;