import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/Images/olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import "./Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { auth, db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await Promise.all([
        updateProfile(user, { displayName: username }),
        setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          username,
          email,
          phone,
          createdAt: new Date().toISOString()
        })
      ]);

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signupParentDiv">
      <img width="200px" height="200px" src={Logo}></img>
      <form onSubmit={handleSubmit} noValidate>
        {[{ label: "Username", state: username, setState: setUsername },
          { label: "Email", state: email, setState: setEmail, type: "email" },
          { label: "Phone", state: phone, setState: setPhone, type: "tel" },
          { label: "Password", state: password, setState: setPassword, type: "password" }]
          .map(({ label, state, setState, type = "text" }) => (
            <div key={label}>
              <label htmlFor={label.toLowerCase()}>{label}</label>
              <br />
              <input
                className="input"
                type={type}
                id={label.toLowerCase()}
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={isSubmitting}
              />
              {errors[label.toLowerCase()] && (
                <p className="error" style={{ color: "red" }}>{errors[label.toLowerCase()]}</p>
              )}
              <br />
            </div>
        ))}

        <button type="submit" disabled={isSubmitting} className={isSubmitting ? "disabled" : ""}>
          {isSubmitting ? "Creating Account..." : "Signup"}
        </button>
      </form>
      <a href='/login'>Already have an account? Login</a>
    </div>
  );
}
