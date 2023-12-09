import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavBar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>

      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="50 " height="50" alt="profileimage" />
          </>
        )}
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
};
