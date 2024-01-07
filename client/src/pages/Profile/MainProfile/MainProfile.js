import React, { useState, useEffect } from 'react';
import './mainprofile.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import LockResetIcon from '@mui/icons-material/LockReset';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from "./Post/Post"
import { useNavigate } from 'react-router-dom';
import EditProfile from '../EditProfile/EditProfile';
import axios from "axios";
import useLoggedInUser from '../../../hooks/useLoggedInUser';


const MainProfile = ({ user }) => {
  const navigate = useNavigate();
  // const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser] = useLoggedInUser();

  const username = user?.email?.split('@')[0];
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`https://pacific-peak-30751.herokuapp.com/userpost?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [user?.email])

  const handleUploadCoverImage = e => {
    setIsLoading(true);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set('image', image)

    axios.post("https://api.imgbb.com/1/upload?key=c1e87660595242c0175f82bb850d3e15", formData)
      .then(res => {
        const url = res.data.data.display_url;
        // setImageURL(url);
        // console.log(res.data.data.display_url);
        const userCoverImage = {
          email: user?.email,
          coverImage: url,
        }
        setIsLoading(false)

        if (url) {
          fetch(`https://pacific-peak-30751.herokuapp.com/userUpdates/${user?.email}`, {
            method: "PATCH",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(userCoverImage),
          })
            .then(res => res.json())
            .then(data => {
              console.log('done', data);
            })
        }

      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
        setIsLoading(false);
      })
  }

  const handleUploadProfileImage = e => {
    setIsLoading(true);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set('image', image)

    axios.post("https://api.imgbb.com/1/upload?key=c1e87660595242c0175f82bb850d3e15", formData)
      .then(res => {
        const url = res.data.data.display_url;
        // setImageURL(url);
        // console.log(res.data.data.display_url);
        const userProfileImage = {
          email: user?.email,
          profileImage: url,
        }
        setIsLoading(false)
        if (url) {
          fetch(`https://pacific-peak-30751.herokuapp.com/userUpdates/${user?.email}`, {
            method: "PATCH",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(userProfileImage),
          })
            .then(res => res.json())
            .then(data => {
              console.log('done', data);
            })
        }

      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
        setIsLoading(false);
      })
  }

  return (
    <div>
      <ArrowBackIcon className='arrow-icon' onClick={() => navigate('/')} />
      <h4 className='heading-4'>{username}</h4>
      <div className='mainprofile' >
        {/* <h1 className='heading-1' style={{ color: "white" }}>Building of profile page Tweets </h1> */}
        <div className='profile-bio'>
          {
            <div >
              <div className='coverImageContainer'>
                <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />
                <div className='hoverCoverImage'>
                  <div className="imageIcon_tweetButton">
                    <label htmlFor='image' className="imageIcon">
                      {
                        isLoading ?
                          <LockResetIcon className='photoIcon photoIconDisabled ' />
                          :
                          <CenterFocusWeakIcon className='photoIcon' />
                      }
                    </label>
                    <input
                      type="file"
                      id='image'
                      className="imageInput"
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>
              <div className='avatar-img'>
                <div className='avatarContainer'>
                  <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className="avatar" alt='' />
                  <div className='hoverAvatarImage'>
                    <div className="imageIcon_tweetButton">
                      <label htmlFor='profileImage' className="imageIcon">
                        {
                          isLoading ?
                            <LockResetIcon className='photoIcon photoIconDisabled ' />
                            :
                            <CenterFocusWeakIcon className='photoIcon' />
                        }
                      </label>
                      <input
                        type="file"
                        id='profileImage'
                        className="imageInput"
                        onChange={handleUploadProfileImage}
                      />
                    </div>
                  </div>
                </div>
                <div className='userInfo'>
                  <div>
                    <h3 className='heading-3'>
                      {loggedInUser[0]?.name ? loggedInUser[0].name : user && user.displayName}
                    </h3>
                    <p className='usernameSection'>@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser} />
                </div>
                <div className='infoContainer'>
                  {loggedInUser[0]?.bio ? <p>{loggedInUser[0].bio}</p> : ''}
                  <div className='locationAndLink'>
                    {loggedInUser[0]?.location ? <p className='subInfo'><MyLocationIcon /> {loggedInUser[0].location}</p> : ''}
                    {loggedInUser[0]?.website ? <p className='subInfo link'><AddLinkIcon /> {loggedInUser[0].website}</p> : ''}
                  </div>
                </div>
                <h4 className='tweetsText'>Tweets</h4>
                <hr />
              </div>
              {
                posts.map(p => <Post p={p} />)
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainProfile;