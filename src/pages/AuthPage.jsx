import { useRecoilValue } from "recoil";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import { authScreenAtom } from "../atom/authAtom.js";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
 
  return (
    <>
     {authScreenState === "login" ? <Login/> : <Register/> }
    </>
  )
}
 
export default AuthPage;
