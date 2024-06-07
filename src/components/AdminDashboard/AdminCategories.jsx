import { useEffect, useState } from "react";
import handleError from "../../utils/ErrorHandler";

const AdminCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log({
      categoryName,
      categoryDescription,
      categoryImage,
    });
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/categories/getall/`, {
          method: "GET",
          headers: {
            // "Authorization": `Bearer ${accessToken}`,
          },
        });
        if (res.status != 200) {
          handleError(res.status);
        }
        const data = await res.json();
        console.log("get categories data", data);
        setAllCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, [APIBASEURL]);

  return (
    <>
      <div className="flex flex-col my-4 h-[70vh] md:h-[20vh] items-center md:items-start">
        <h1 className="text-3xl font-semibold">All Categories</h1>
        <span className="text-[12px] md:text-sm text-red-500  ">Select the categories you want to delete</span>
        <ol className="text-sm flex flex-col md:flex-row flex-wrap gap-4 w-full md:w-auto font-semibold my-4">
          {allCategories.map((data, index) => (
            <li className="p-2 flex items-center" key={data.id}>
              <input type="checkbox" id={`item${data.id}`} className="mx-2" name={data.id} />
              <label htmlFor={`item${data.id}`} className="text-lg">
                {index + 1}. {data.categoryName}
              </label>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-row gap-4">
        <button
          className="p-3 bg-red-500 font-semibold rounded-lg text-white hover:bg-red-600"
          onClick={() => setShowModal(true)}
        >
          Add Categories
        </button>
        <button className="p-3 bg-red-500 font-semibold rounded-lg text-white hover:bg-red-600">
          Delete Categories
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-md z-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-gray-700 font-semibold mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="categoryDescription" className="block text-gray-700 font-semibold mb-2">
                  Category Description
                </label>
                <textarea
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="categoryImage" className="block text-gray-700 font-semibold mb-2">
                  Category Image
                </label>
                <input
                  type="file"
                  id="categoryImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Add Category
              </button>
              <button
                type="button"
                className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCategories;
