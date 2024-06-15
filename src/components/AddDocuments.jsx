import { useState, useRef } from "react";
import { Modal } from "antd";
import handleError from "../utils/ErrorHandler";
import useAuth from "../utils/IsAuthenticated";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const AddDocuments = ({ fundraiserDetails }) => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
  
    const [isModalOpenDocuments, setIsModalOpenDocuments] = useState(false);
    const [images1, setImages] = useState([]);
    const [uploadImagesSelected, setuploadImagesSelected] = useState([])
    const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

    const [error, setError] = useState(null);
    const [photos, setPhotos] = useState(fundraiserDetails?.documents);
    const [loading, setLoading] = useState(null);
    const imgUploadRef = useRef(null);
    console.log("selected images", uploadImagesSelected);

    const handleDocuments = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        if (!isAccessTokenValid()) {
          await fetchAccess();
        }
    
        const accessToken = localStorage?.getItem("accessToken");
    
        try {
          const formData = new FormData();
    
          // formData.append("images", images1);
    
          images1?.forEach((image) => {
            formData.append("documents", image);
          });
          console.log("form data", formData.get("documents"));
    
          const res = await fetch(`${APIBASEURL}/fundraisers/fundraiser_${fundraiserDetails.id}/add-documents`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                // "Content-Type": "multipart/form-data"
                // content-type: ‘multipart/form-data’,
              },
              body: formData,
            }
          );
    
          if (res.status === 200) {
            toast.success("Image Uploaded");
            window.location.reload(false)
           }
          if (res.status !== 200) {
            handleError(res.status);
          }
    
          const data = await res.json();
          console.log("Upload successful:", data);
        } catch (error) {
          console.error("Error uploading images:", error);
        }
        finally {
          setLoading(false);
        }
      };

    const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

    const showModalDocuments = () => {
        setIsModalOpenDocuments(true);
    };
    const handleCancelUpdate = () => {
        setIsModalOpenDocuments(false);
      };

      const deleteImages = async (imageId) => {
        if (!isAccessTokenValid()) {
          await fetchAccess();
        }
        const accessToken = localStorage.getItem("accessToken");
    
        setLoading(imageId); // Set loading state to the current imageId
        try {
          const res = await fetch(
            `${APIBASEURL}/fundraisers/fundraiser_${fundraiserDetails.id}/document_${imageId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (res.status === 200) {
            toast.success("Document Deleted");
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
        <div className="w-full flex flex-col justify-center px-10">
            <h1 className="text-md my-4 ml-12 font-semibold">
                Add Fundraiser Documents
            </h1>
            <button
                onClick={showModalDocuments}
                className="text-md text-green-500 py-3 px-6 text-nowrap border border-green-500 mx-10 rounded-xl font-semibold hover:bg-green-500 hover:text-white"
            >
                Documents
            </button>
            <Modal
                title="Add Fundraiser Documents"
                open={isModalOpenDocuments}
                onCancel={handleCancelUpdate}
                footer={null}
            >
                <form action="" className="flex flex-col items-center gap-5  py-5">
        <input
          type="file"
          ref={imgUploadRef}
          multiple
          onChange={handleFileChange}
          hidden
          accept="image/*"
        />
        { images1.length + photos.length >=10 ?" " :<div onClick={()=>{imgUploadRef.current.click()}} className="w-full h-[150px] bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-400 cursor-pointer">
          Upload Documents
        </div>}
        <div className="flex flex-wrap gap-4 mt-5">
        {images1.map((image, index) => (
          <div key={index} className="relative">
            <img
              className="md:w-[100px] md:h-[100px] object-cover"
              src={URL.createObjectURL(image)}
              alt={`Selected image ${index + 1}`}
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1.5 rounded-full"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {images1.length + photos.length >10 ? <h1 className="text-red-500 font-bold">*Select only 10 Documents</h1> :

        <button
          onClick={handleDocuments}
          className="text-xl px-4 py-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md capitalize"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      }
      </form>
      <>
      {photos.length === 10 && (
        <h1 className="text-center mb-3 text-red-500 font-bold">
          Delete upload to upload new
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
              src={`${VITE_BASE_IMAGE_URL}${image.documentUrl}`}
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
            </Modal>
        </div>
    );
};

export default AddDocuments;
