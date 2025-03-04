import React, { useState, useEffect, useContext } from "react";
import Heart from "../../assets/Heart";
import "./Posts.css";
import { FirebaseContext } from "../../store/Context";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const {setPostDeatils} = useContext(PostContext)
  const navigate = useNavigate();
  useEffect(() => {
    const db = getFirestore(firebase);
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const allPosts = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      console.log(allPosts);
      setProducts(allPosts);
    });

    return () => unsubscribe();
  }, [firebase]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div className="card"
              key={product.id}
              onClick={()=>{
                setPostDeatils(product)
                navigate('/view')
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt.toDate().toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
