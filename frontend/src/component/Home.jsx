import { useEffect, useState } from "react";
import Api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts, "allPosts");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    GetPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
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
          {allPosts.map((posts) => (
              <div
              style={{
                width: "23%",
                height: "350px",
                border: "2px solid black",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              onClick={() => router(`/post/${posts._id}`)}
            >
              <img
                style={{ width: "80%", height: "70%" }}
                src={posts.image}
              />
              <p>Title : {posts.caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
    export default Home;