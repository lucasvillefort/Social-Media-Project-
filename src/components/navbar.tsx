import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavBar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/createpost">Create Post</Link>
            <Link to="/post">your Post</Link>
          </>
        )}
      </div>

      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="50 " height="50" alt="profileimage" />
            <button onClick={signUserOut}>Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
};
