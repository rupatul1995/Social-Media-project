import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import Api from '../axiosConfig';
import '../style/userprofile.css';

function UserProfile() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await Api.post('/auth/user-posts', {
          userId: state?.user?.userId,
        });
        if (response.data.success) {
          setUserPosts(response.data.posts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching user posts', error);
      } finally {
        setLoading(false);
      }
    };

    if (state) {
      fetchUserPosts();
    }
  }, [state]);

  return (
    <div className="userprofile">
      <div className="userprofiletop">
        <img className="user-profile-photo" src={state?.user?.profilePicture} alt="Profile" />
        <span className="user-profile-name"> {state?.user?.username}</span>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="userposts">
          {userPosts.map((post) => (
            <div key={post._id} className="post">
              <img src={post.image} alt={post.caption} className="post-image" />
          
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;










// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/auth.context";
// import Api from "../axiosConfig";
// import"../style/userprofile.css";


// function UserProfile() {
//   const [userprofile, setUserProfile] = useState([]);
//   console.log(userprofile, "userprofile");
//   const [loading, setLoading] = useState(false);
//   const { state } = useContext(AuthContext);

//   async function GetUserProfile() {
//     // alert("Hi from get Products.");
//     setLoading(true);
//     try {
//       const response = await Api.post("/post/profile", {
//         userId:state?.user?.userId,
//       }); // change
//       if (response.data.success) {
//         //   console.log(response.data);
//         setLoading(false);
//         setUserProfile(response.data.posts); // change
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     // api call to backend
//     if (state) {
//       GetUserProfile();
//     }
//   }, [state]);

//   return (
//     <div>
//        <div className="userprofiletop">
//                 <img className="user-profile-photo"   />   
//                 {/* src={post.author.profilePhoto} */}
//                {/* alt={post.author.username} */}
//                 <span className="user-profile-name"> {state?.user?.username}</span>
//               </div>
//       {loading ? (
//         <div>
//           <h1>Loading...</h1>
         
//         </div>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "space-around",
//           }}
//         >
//           {userprofile.map((post) => (
//             <div
//               style={{
//                 width: "23%",
//                 height: "350px",
//                 border: "2px solid black",
//                 marginBottom: "20px",
//               }}
//             >
//               <img
//                 style={{ width: "80%", height: "70%" }}
//                 src={post.author.image}
//               />
//               <p>name :{post.author.name}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// export default UserProfile;

