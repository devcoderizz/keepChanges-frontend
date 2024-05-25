import { userAtom } from "../atom/userAtom";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
const APIBASEURL= import.meta.env.VITE_API_BASEURL



function IsAuthenticated() {
const userData = useRecoilValue(userAtom);
const refreshToken = Cookies.get('refreshToken');
const navigate = useNavigate()

console.log("refress token",refreshToken);

if(userData){

    const accessToken = localStorage.getItem("accessToken");
    console.log("AccessToken hai ye",accessToken);

    const fetchAccess = async () => {
        
      
        try {
          const res = await fetch(`${APIBASEURL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
            },
            
          });
      
          const data = await res.json();
          console.log(data);

          if(res.status === 401){
            // navigate('/auth')
            console.log("resfresh token expired");
            localStorage.removeItem("UserData");
            localStorage.removeItem("accessToken");
            Cookies.remove('refreshToken');
            navigate("/auth");
            window.location.reload(false);
        }else{

            localStorage.setItem("accessToken", data.refreshToken)
        }
         
        } catch (error) {
          console.log("ye aapka error hai");
        }
      };
      fetchAccess()




}
console.log("user data", userData);
}
export {IsAuthenticated}

