import { useContext, useEffect, useState } from "react";
import Api from "../axiosConfig";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const [allposts, setAllPosts] = useState([]);
  console.log(allposts, "allposts");
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);

  async function Getprofile() {
    setLoading(true);
    try {
      const response = await Api.post("/post/get-profile", {
        userId:state?.user?.userId,
      });
      if (response.data.success) {
        setLoading(false);
        setAllPosts(response.data.post); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (state) {
      Getprofile();
    }
  }, [state]);

  return (
    <div>
    <h1>UserName:-{state?.user?.username}</h1>
      {loading ? (
        <div>
          <h1>Loading...</h1>
         
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {allposts.map((posts) => (
            <div
              style={{
                width: "23%",
                height: "350px",
                border: "2px solid black",
                marginBottom: "20px",
              }}
            >
              
              <h1>UserName:-{state?.user?.username}</h1>

               <img  style={{ width: "80%", height: "70%" }}
               
               src={posts.image} alt={posts.caption}
             />

            <p> {posts.caption}</p>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;