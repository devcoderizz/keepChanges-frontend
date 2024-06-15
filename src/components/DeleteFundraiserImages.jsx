import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import handleError from "../utils/ErrorHandler";
import useAuth from "../utils/IsAuthenticated";
import toast from "react-hot-toast";

const DeleteFundraiserImages = ({ fundraiserDetails }) => {
  const [photos, setPhotos] = useState(fundraiserDetails.photos);
  const [loading, setLoading] = useState(null); // To manage loading state for each photo

  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const { fetchAccess, isAccessTokenValid } = useAuth();

  const deleteImages = async (imageId) => {
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    const accessToken = localStorage.getItem("accessToken");

    setLoading(imageId); // Set loading state to the current imageId
    try {
      const res = await fetch(
        `${APIBASEURL}/fundraisers/fundraiser_${fundraiserDetails.id}/photo_${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Image Deleted");
        setPhotos(photos.filter((photo) => photo.id !== imageId)); // Update state to remove deleted image
      } else {
        handleError(res.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  return (
    <>
      {photos.length === 6 && (
        <h1 className="text-center mb-3 text-red-500 font-bold">
          Delete Images to upload new
        </h1>
      )}

      <div className="grid grid-cols-3 gap-5 bg-[#fde7e7] p-2 rounded-md">
        {photos.map((image) => (
          <div key={image.id} className="relative">
            {loading === image.id && (
              <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
                <div className="loader">Loading...</div>
              </div>
            )}
            <img
              className={`w-[75vw] md:w-[150px] md:h-[150px] object-cover ${
                loading === image.id ? "opacity-50" : ""
              }`}
              src={`${VITE_BASE_IMAGE_URL}${image.photoUrl}`}
              alt=""
            />
            <RxCross2
              onClick={() => deleteImages(image.id)}
              className="absolute -right-1 -top-1 text-2xl font-bold p-1 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-full"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DeleteFundraiserImages;
