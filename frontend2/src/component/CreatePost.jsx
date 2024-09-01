import {  useContext, useState } from "react";
import Api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {AuthContext} from "../context/auth.context";


const CreatePost = () => {
  const { state } = useContext(AuthContext);
  console.log(state, "state");
  const router = useNavigate();
  const [postData, setPosttData] = useState({
    image: "",
    caption:"",
  });
  function handleChange(event) {
    setPosttData({ ...postData, [event.target.name]: event.target.value });
   
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        postData.image  &&
        postData.caption
      ) {
        const response = await Api.post("/post/New-Posts", {
          postData,
          userId : state?.user?.userId
        });
        if (response.data.success) {
          setPosttData({
            image: "",
            caption:"",
          });
          router("/");
          toast.success(response.data.message);
        }
      } else {
        throw Error("All fields are mandatory.");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error.response.data.error);
    }
  }

 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        
        <br />
        <input
          type="url"
          onChange={handleChange}
          name="image"
          value={postData.image}
          placeholder="Image"
        />
      
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="caption"
          value={postData.caption}
          placeholder="caption"
        />
        <br />
       
        <input  type="submit" value="Add Post" />
        <br />
      </form>
    </div>
  );
};



export default CreatePost;