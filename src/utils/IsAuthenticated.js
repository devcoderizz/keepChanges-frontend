import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { userAtom } from "../atom/userAtom";

const APIBASEURL = import.meta.env.VITE_API_BASEURL;

const useAuth = () => {
    const userData = useRecoilValue(userAtom);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useAuth hook initialized");

        if (!userData) {
            console.log("No user data found, skipping token refresh");
            return;
        }

        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
            console.log("No refresh token found, skipping token refresh");
            return;
        }

        const fetchAccess = async () => {
            console.log("Attempting to refresh token");

            try {
                const res = await fetch(`${APIBASEURL}/auth/refresh-token`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${refreshToken}`,
                    },
                });

                const data = await res.json();
                console.log("Fetch response", res);
                console.log("Access Token Data", data);

                if (res.status === 401) {
                    console.log("Refresh token expired, logging out");
                    localStorage.removeItem("UserData");
                    localStorage.removeItem("accessToken");
                    Cookies.remove('refreshToken');
                    toast.error("Session expired. Please log in again.");
                    // navigate("/auth");
                    window.location.reload(false);
                    


                } else {
                    console.log("Token refreshed successfully");
                    localStorage.setItem("accessToken", data.refreshToken);
                    toast.success("Session refreshed.");
                }
            } catch (error) {
                console.error("Error refreshing access token:", error);
            }
        };

        // Initial call to fetchAccess
        fetchAccess();

        // Set up interval to call fetchAccess periodically
        const intervalId = setInterval(fetchAccess, 60000); // 1 minute

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [userData]);
};

function IsAuthenticated() {
    useAuth();
    return null;
}

export { IsAuthenticated };
