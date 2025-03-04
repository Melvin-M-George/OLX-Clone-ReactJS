import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // ✅ Import correct auth functions
import { collection, addDoc } from "firebase/firestore"; // ✅ Import Firestore functions

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { auth, db } = useContext(FirebaseContext); // ✅ Use auth & db
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth || !db) {
      setError("Firebase is not initialized.");
      return;
    }

    try {
      // ✅ Create user
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Update display name
      await updateProfile(result.user, { displayName: username });

      // ✅ Store user info in Firestore
      await addDoc(collection(db, "users"), {
        id: result.user.uid,
        username,
        phone: phone, // ✅ Convert phone number to string
        email: email, // ✅ Also store email for reference
        createdAt: new Date(), // ✅ Add timestamp for debugging
      });
      
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          {error && <p className="error-message">{error}</p>}
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
