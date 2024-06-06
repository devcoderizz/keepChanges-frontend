import { useState, useEffect } from "react";
import { Modal } from "antd";
import handleError from "../utils/ErrorHandler";
import useAuth from "../utils/IsAuthenticated";

const AddDocuments = ({ fundraiserDetails }) => {
    const APIBASEURL = import.meta.env.VITE_API_BASEURL;
    const { fetchAccess, isAccessTokenValid } = useAuth();
  
    const [isModalOpenDocuments, setIsModalOpenDocuments] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadImagesSelected, setuploadImagesSelected] = useState([])
    const [response, setResponse] = useState([]);
    const [documents, setDocuments] = useState([]);
    console.log("selected images", uploadImagesSelected);

    const handleCancelDocuments = () => {
        setDocuments([]);
        setIsModalOpenDocuments(false);
    };

    const showModalDocuments = () => {
        setIsModalOpenDocuments(true);
    };

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return file.name;
    });

    setuploadImagesSelected((previousImages) => previousImages.concat(imagesArray));

        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type.startsWith('image/'));

        const readers = validFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve({ src: reader.result, name: file.name });
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers).then(images => setSelectedImages(images));
    };

    

    const uploadDocuments = async (e) => {
        e.preventDefault()
        // Append selected images to the documents array
        setDocuments(prevDocuments => [...prevDocuments, ...selectedImages]);
        // Clear selected images and close modal
        setSelectedImages([]);
        setIsModalOpenDocuments(false);



        if (!isAccessTokenValid()) {
            await fetchAccess();
        }
        const accessToken = localStorage?.getItem("accessToken");
        try {
            const res = await fetch(`${APIBASEURL}/fundraisers/fundraiser_${fundraiserDetails.id}/add-documents`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body:documents ,
            });
            if (res.status !== 200) {
                handleError(res.status);
                return;
            }
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error(error);
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
                onCancel={handleCancelDocuments}
                footer={null}
            >
                <form  className="flex flex-col items-center gap-5 mt-8">
                   
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                        className="mb-4 p-2 border border-gray-300 rounded"
                    />
                   
                    {selectedImages.length > 0 && (
                        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image.src} alt={`Preview ${index}`} className="w-64 h-auto rounded border" />
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={uploadDocuments}
                        className="flex  items-center gap-2 p-2 bg-green-500 rounded-md text-white text-[15px] font-bold"
                    >
                        Upload
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default AddDocuments;
