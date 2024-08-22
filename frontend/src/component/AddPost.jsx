import { useContext, useEffect, useState } from "react";
import Api from "../axiosConfig";
import { AuthContext } from "../context/auth.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const { state } = useContext(AuthContext);
  const router = useNavigate();
  const [postData, setPostData] = useState({
    
    image: "",
    capition: "",
  });
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);

  function handleChange(event) {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (
        postData.image &&
        postData.capition
      ) {
        const response = await Api.post("/post/new-post", {
            postData,
          userId : state?.user?.userId
        });
        if (response.data.success) {
            setPostData({
            capition: "",
            image: ""
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
        <h1>Add New Post</h1>
        <br />
    
        <input
          type="url"
          onChange={handleChange}
          name="image"
          value={postData.image}
          placeholder="New Post"
        />
        <br />
        <input
          type="text"
          onChange={handleChange}
          name="capition"
          value={postData.capition}
          placeholder="Write a caption..."
        />
      <br/>
        {errors.length > 0 && (
          <div>
            {errors.map((error, i) => (
              <p key={i}>{error}*</p>
            ))}
          </div>
         )}
        <input disabled={disable} type="submit" value="Post" />
        <br />
      </form>
    </div>
  );
};

export default AddPost;