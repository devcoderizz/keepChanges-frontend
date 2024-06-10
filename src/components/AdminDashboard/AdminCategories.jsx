import { useEffect, useState } from "react";
import handleError from "../../utils/ErrorHandler";
import { Button, message, Popconfirm } from "antd";
import useAuth from "../../utils/IsAuthenticated";
import toast from "react-hot-toast";

const AdminCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categorySvg, setCategorySvg] = useState(null);
  const [loading, setLoading] = useState(null)
  const { fetchAccess, isAccessTokenValid } = useAuth();
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  const accessToken = localStorage.getItem("accessToken");
  // const confirm = (data) => {
  //   setSelectedCategory(data)
  //   // console.log(e);
  // };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleImageChange = (e) => {
    setCategorySvg(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    const words = e.target.value.split(" ");
    if (words.length <= 50) {
      setCategoryDescription(e.target.value);
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/categories/getall/`, {
          method: "GET",
        });
        if (res.status !== 200) {
          handleError(res.status);
        }
        const data = await res.json();
        setAllCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, [APIBASEURL]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    setLoading(true)
    try {
      const payload = new FormData();
      payload.append("categoryName", categoryName);
      payload.append("categoryDescription", categoryDescription);
      payload.append("categorySvg", categorySvg);

      const res = await fetch(`${APIBASEURL}/categories/add`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: payload,
      });
      
      console.log("res", res)
      if (res.status !== 200) {
      
        handleError(res.status);
      }
      const data = await res.json();
      setLoading(false)
      setShowModal(false);
      setAllCategories([...allCategories, data]);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    try {
      const payload = new FormData();
      payload.append("categoryName", categoryName);
      payload.append("categoryDescription", categoryDescription);
      if (categorySvg) {
        payload.append("categorySvg", categorySvg);
      }

      const res = await fetch(
        `${APIBASEURL}/categories/category_${selectedCategory.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "PATCH",
          body: payload,
        }
      );
      if (res.status !== 200) {
        handleError(res.status);
      }
      const data = await res.json();
      setShowEditModal(false);
      setAllCategories(
        allCategories.map((cat) => (cat.id === data.id ? data : cat))
      );
    } catch (error) {
      console.log(error);
    }
  };



  const handleDeleteCategory = async (category) => {
    if (!isAccessTokenValid()) {
      await fetchAccess();
    }
    console.log("state", category.id);
  
    try {
      const res = await fetch(
        `${APIBASEURL}/categories/category_${category.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "DELETE",
        }
      );
      if (res.status !== 200) {
        handleError(res.status);
      } else {
        // setAllCategories(
        //   allCategories.filter((category) => category.id !== category.id)
        // );
        window.location.reload(false)
        message.success("Category deleted successfully");

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButtonClick = (category) => {
    setSelectedCategory(category);
    console.log( "category", category)
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
    setCategorySvg(null);
    setShowEditModal(true);
  };

  const deleteCategory = (category) => {
    setSelectedCategory(category);
    handleDeleteCategory(category);
  };
  




  return (
    <div className="h-[70vh] md:h-[90vh] p-4">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-8">
        <div className="flex flex-col my-4 items-center md:items-start">
          <h1 className="text-3xl font-semibold mb-4">All Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-[70vh] md:h-[80vh]  no-scrollbar overflow-y-scroll md:overflow-y-auto">
            {allCategories.map((data) => (
              <div
                key={data.id}
                className="border rounded-lg shadow-md p-4 bg-white w-[300px]"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={`${VITE_BASE_IMAGE_URL}${data.categorySvg}`}
                    alt={data.categoryName}
                    className="w-24 h-24 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    {data.categoryName}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 max-h-20 overflow-hidden overflow-ellipsis">
                    {data.categoryDescription}
                  </p>
                </div>
                <div className="flex justify-around mt-4">
                  <Button
                    type="primary"
                    onClick={() => handleEditButtonClick(data)}
                    className="mr-2"
                  >
                    Edit
                  </Button>

                  {/* <Button onClick={() => deleteCategory(data)} >Del</Button> */}

                  {/* <button onClick={handleDeleteCategory(data)} >Del</button> */}
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => deleteCategory(data)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-start mt-0 md:mt-0 p-[2] md:p-0">
          <Button
            type="primary"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => setShowModal(true)}
          >
            Add Category
          </Button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-md z-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryDescription"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Category Description
                </label>
                <textarea
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={handleDescriptionChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength={50}
                ></textarea>
                <p className="text-sm text-gray-500">Max 50 words</p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryImage"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  id="categoryImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                 {loading ? "Adding...": "Add Category"}
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

      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-md z-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Category</h2>
            <form onSubmit={handleEditCategory}>
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryDescription"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Category Description
                </label>
                <textarea
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={handleDescriptionChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength={50}
                ></textarea>
                <p className="text-sm text-gray-500">Max 50 words</p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="categoryImage"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  id="categoryImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Edit Category
              </button>
              <button
                type="button"
                className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
