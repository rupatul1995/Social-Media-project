import {  useContext, useEffect, useState } from "react";
import Api from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {AuthContext} from "../context/auth.context";


const AddPost = () => {
  const { state } = useContext(AuthContext);
  console.log(state, "state");
  const router = useNavigate();
  const [postData, setPosttData] = useState({
    image: "",
    caption:"",
  });
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);
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
        const response = await Api.post("/post/new-post", {
          postData,
          userId : state?.user?.userId
        });
        if (response.data.success) {
          setPosttData({
            image: "",
            caption:""
          });
          router("/all-post");
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

  useEffect(() => {
    const errorsArray = [];
    
    if (!postData.image) {
      errorsArray.push("Image is required.");
    }

    
    if (!postData.caption) {
      errorsArray.push("caption is required.");
    }
    setErrors(errorsArray);
    if (errorsArray.length == 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [postData]);

 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add New Product</h1>
        <label>Image url : : </label>
        <br />
        <input
          type="url"
          onChange={handleChange}
          name="image"
          value={postData.image}
        />
        <br />
      
        <label>caption </label>
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="caption"
          value={postData.caption}
        />
        <br />
        {errors.length > 0 && (
          <div>
            {errors.map((error, i) => (
              <p key={i}>{error}*</p>
            ))}
          </div>
         )}
        <input disabled={disable} type="submit" value="Add" />
        <br />
      </form>
    </div>
  );
};
export default AddPost;