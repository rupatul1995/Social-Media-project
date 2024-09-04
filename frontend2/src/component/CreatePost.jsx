import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Api from '../axiosConfig';
import { AuthContext } from '../context/auth.context';

const CreatePost = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ image: '', caption: '' });
  const [errors, setErrors] = useState([]);
  const [disable, setDisable] = useState(true);

  const handleChange = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (postData.caption && postData.image) {
        const response = await Api.post('/post/create-post', {
          postData,
          userId: state?.user?.userId,
        });
        if (response.data.success) {
          setPostData({ caption: '', image: '' });
          navigate('/home');
          toast.success(response.data.message);
        } else {
          toast.error(response.data.error);
        }
      } else {
        throw Error('All fields are mandatory.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong.');
    }
  };

  useEffect(() => {
    const errorsArray = [];
    if (!postData.caption) errorsArray.push('Caption is required.');
    if (!postData.image) errorsArray.push('Image URL is required.');
    setErrors(errorsArray);
    setDisable(errorsArray.length > 0);
  }, [postData]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <input
          type="text"
          onChange={handleChange}
          name="caption"
          value={postData.caption}
          placeholder="Caption"
        />
        <input
          type="url"
          onChange={handleChange}
          name="image"
          value={postData.image}
          placeholder="Image URL"
        />
        {errors.length > 0 && (
          <div>
            {errors.map((error, i) => (
              <p key={i}>{error}*</p>
            ))}
          </div>
        )}
        <input type="submit" value="Add" disabled={disable} />
      </form>
    </div>
  );
};

export default CreatePost;
