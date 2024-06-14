import { useState, useRef } from "react";
import { Modal } from "antd";
import handleError from "../utils/ErrorHandler";
import useAuth from "../utils/IsAuthenticated";

const AddDocuments = ({ fundraiserDetails }) => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
  
    const [isModalOpenDocuments, setIsModalOpenDocuments] = useState(false);
    const [images1, setImages] = useState([]);
    const [uploadImagesSelected, setuploadImagesSelected] = useState([])
    const [response, setResponse] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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

    // const handleImageChange = (e) => {
    //     const selectedFiles = e.target.files;
    // const selectedFilesArray = Array.from(selectedFiles);

    // const imagesArray = selectedFilesArray.map((file) => {
    //   return file.name;
    // });

    // setuploadImagesSelected((previousImages) => previousImages.concat(imagesArray));

    //     const files = Array.from(e.target.files);
    //     const validFiles = files.filter(file => file.type.startsWith('image/'));

    //     const readers = validFiles.map(file => {
    //         return new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => resolve({ src: reader.result, name: file.name });
    //             reader.onerror = reject;
    //             reader.readAsDataURL(file);
    //         });
    //     });

    //     Promise.all(readers).then(images => setSelectedImages(images));
    // };

    

    // const uploadDocuments = async (e) => {
    //     e.preventDefault()
    //     // Append selected images to the documents array
    //     setDocuments(prevDocuments => [...prevDocuments, ...selectedImages]);
    //     // Clear selected images and close modal
    //     setSelectedImages([]);
    //     setIsModalOpenDocuments(false);



    //     if (!isAccessTokenValid()) {
    //         await fetchAccess();
    //     }
    //     const accessToken = localStorage?.getItem("accessToken");
    //     try {
    //         const res = await fetch(`${APIBASEURL}/fundraisers/fundraiser_${fundraiserDetails.id}/add-documents`, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //               },
    //               body:documents ,
    //         });
    //         if (res.status !== 200) {
    //             handleError(res.status);
    //             return;
    //         }
    //         const data = await res.json();
    //         setResponse(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


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
        { images1.length>9 ?" " :<div onClick={()=>{imgUploadRef.current.click()}} className="w-full h-[150px] bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-400 cursor-pointer">
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
      {images1.length>10 ? <h1 className="text-red-500 font-bold">*Images Selected More than 6</h1> :

        <button
          onClick={handleDocuments}
          className="text-xl px-4 py-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md capitalize"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      }
      </form>
            </Modal>
        </div>
    );
};

export default AddDocuments;
