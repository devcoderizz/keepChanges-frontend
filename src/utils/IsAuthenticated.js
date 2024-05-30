import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";
import { userAtom } from "../atom/userAtom";

const APIBASEURL = import.meta.env.VITE_API_BASEURL;

const useAuth = () => {
    const userData = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const fetchAccess = async () => {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
            console.log("No refresh token found, skipping token refresh");
            return;
        }

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
            console.log(" Data", data);

            if (res.status === 401) {
                console.log("Refresh token expired, logging out");
                localStorage.removeItem("UserData");
                localStorage.removeItem("accessToken");
                Cookies.remove('refreshToken');
                toast.error("Session expired. Please log in again.");
                navigate('/')
                window.location.reload(false);
            } else {
                console.log("Token refreshed successfully");
                localStorage.setItem("accessToken", data.accessToken);
                // console.log("token", )
                toast.success("Session refreshed.");
            }
        } catch (error) {
            console.error("Error refreshing access token:", error);
        }
    };

    const isAccessTokenValid = () => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            return false;
        }

        try {
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp > currentTime;
        } catch (error) {
            console.error("Error decoding access token:", error);
            return false;
        }
    };

    useEffect(() => {
        console.log("useAuth hook initialized");

        if (!userData) {
            console.log("No user data found, skipping token validation");
            return;
        }

        if (!isAccessTokenValid()) {
            fetchAccess();
        }
    }, [userData]);

    return { fetchAccess, isAccessTokenValid };
};

export default useAuth;
