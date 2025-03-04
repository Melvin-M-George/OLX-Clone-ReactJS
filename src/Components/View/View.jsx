import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

function View() {
  const [userDetails,setUserDetails] = useState();
  const {postDetails} = useContext(PostContext);
  useEffect(() => {
    async function fetchUserDetails() {
      if (!postDetails?.userId) return;
  
      const userDocRef = doc(db, 'users', postDetails.userId);
      
      
      try {
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  
    fetchUserDetails();
  }, [postDetails]);  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt.toDate().toLocaleString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails?.username}</p>
              <p>{userDetails?.phone}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default View;