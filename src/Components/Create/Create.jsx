import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { db } from "../../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Create = () => {

  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgydsjo7g/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    setIsSubmitting(true);
    try {
      const imageUrl = await uploadImageToCloudinary();
      console.log("Image URL:", imageUrl);
      if (!imageUrl) {
        toast.error("Image upload failed. Please try again");
        setIsSubmitting(false);
        return;
      }

      const productRef = doc(db, "products", `${Date.now()}`);
      await setDoc(productRef, {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid,
        createdAt: serverTimestamp(),
      })
      toast.success("Product added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error addding product:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }



  };



  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder='Enter product name'
              required
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
              required
            />

            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
            <br />

            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" onChange={handleImageChange} />

            {image && (
              <img
                alt="Preview"
                width="200"
                height="200"
                src={URL.createObjectURL(image)}
              />
            )}

            <button type="submit" className="uploadBtn" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload and Submit"}
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
