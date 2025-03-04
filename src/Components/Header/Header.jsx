import React, { useContext } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../store/Context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    signOut(auth);
    toast.success("Logout Successfully")
    navigate("/login");
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user ? (
              `Welcome ${user.displayName}`
            ) : (
              <span
                style={{ cursor: "pointer", padding: "10px" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            )}
          </span>
          <hr />
        </div>
        {user && (
          <>
            <span onClick={logOut} style={{ cursor: "pointer" }}>
              Logout
            </span>
            <div className="sellMenu">
              <SellButton></SellButton>
              <div
                className="sellMenuContent"
                onClick={() => navigate("/sell")}
                style={{ cursor: "pointer" }}
              >
                <SellButtonPlus />
                <span>SELL</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
