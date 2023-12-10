import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate("/post");
  };

  return (
    <div>
      <p>Sign In </p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
