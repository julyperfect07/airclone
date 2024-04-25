import { app } from "@/firebase";
import { AiFillGoogleCircle } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { signInSuccess } from "../../redux/user/userSlice";

interface Props {
  onClose: () => void;
}

const OAuth = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      className=" w-full text-center bg-white text-black border border-black hover:text-white hover:bg-black"
    >
      <AiFillGoogleCircle className=" w-6 h-6 mr-2" /> Continue with
      google
    </Button>
  );
};

export default OAuth;
