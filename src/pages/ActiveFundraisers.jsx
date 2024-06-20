import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import ViewCard from "../components/ViewCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import handleError from "../utils/ErrorHandler";

const ActiveFundraisers = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const [query, setQuery] = useState("");
  const [activeFundraiser, setActiveFundraiser] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [fundraisersByCategory, setFundraisersByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [multipleCategoryFundraiser, setMultipleCategoryFundraiser] = useState([]);
  const [showMultipleCategoryData, setShowMultipleCategoryData] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategory((prevState) => {
      if (checked) {
        return [...prevState, name];
      } else {
        return prevState.filter((id) => id !== name);
      }
    });
  };

  const handleCategoriesSubmit = async (e) => {
    e.preventDefault();
    setQuery("")
    try {
      const queryParams = new URLSearchParams();
      selectedCategory.forEach((id) => queryParams.append('categoryIds', id));

      const res = await fetch(`${APIBASEURL}/fundraisers/category/?${queryParams.toString()}`, {
        method: "GET",
      });

      if (res.status !== 200) {
        handleError(res.status);
        return;
      } else {
        const data = await res.json();
        setMultipleCategoryFundraiser(data.fundraisers);
        setShowMultipleCategoryData(true);
      }
    } catch (error) {
      console.log(error);
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

    const fundraiserDetails = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/fundraisers/active`, {
          method: "GET",
        });
        if (res.status !== 200) {
          handleError(res.status);
        }
        const data = await res.json();
        setActiveFundraiser(data.fundraisers);
      } catch (error) {
        console.log(error);
      }
    };
    fundraiserDetails();

    if (id) {
      const getFundraiserById = async () => {
        try {
          const res = await fetch(`${APIBASEURL}/fundraisers/category/${id}`, {
            method: "GET",
          });
          if (res.status !== 200) {
            handleError(res.status);
            navigate("/");
            return;
          }
          const data = await res.json();
          setFundraisersByCategory(data.fundraisers);
        } catch (error) {
          console.log(error);
        }
      };
      getFundraiserById();
    }
  }, [APIBASEURL, id, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${APIBASEURL}/fundraisers/title/${query}`, {
        method: "GET",
      });
      if (res.status !== 200) {
        handleError(res.status);
        navigate("/");
        return;
      }
      const data = await res.json();
      setActiveFundraiser(data);
      setShowMultipleCategoryData(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderFundraisers = () => {
    if (query) {
      return activeFundraiser.map((data, index) => (
        <div key={index} className="min-h-[400px] h-auto md:h-full">
          <Link to={`/fundraisers/${data.id}`}>
            <ViewCard {...data} />
          </Link>
        </div>
      ));
    } else if (showMultipleCategoryData) {
      return multipleCategoryFundraiser.map((data, index) => (
        <div key={index} className="min-h-[400px] h-auto md:h-full">
          <Link to={`/fundraisers/${data.id}`}>
            <ViewCard {...data} />
          </Link>
        </div>
      ));
    } else if (id) {
      return fundraisersByCategory.map((data, index) => (
        <div key={index} className="min-h-[400px] h-auto md:h-full">
          <Link to={`/fundraisers/${data.id}`}>
            <ViewCard {...data} />
          </Link>
        </div>
      ));
    } else {
      return activeFundraiser.map((data, index) => (
        <div key={index} className="min-h-[400px] h-auto md:h-full">
          <Link to={`/fundraisers/${data.id}`}>
            <ViewCard {...data} />
          </Link>
        </div>
      ));
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-10 overflow-x-hidden">
      <h1 className="text-4xl font-extrabold py-8 pl-8 md:pl-0">
        Currently Active Fundraiser
      </h1>
      <div className="flex flex-col md:flex-row w-full my-12">
        <form className="flex flex-col items-start w-full md:w-[30vw] pl-10" onSubmit={handleCategoriesSubmit}>
          <h1 className="text-3xl font-semibold">Categories</h1>
          <ul className="text-sm flex flex-row flex-wrap gap-4 md:flex-col w-full md:w-[200px] font-semibold my-4">
            {allCategories.map((data) => (
              <li className="p-2" key={data.id}>
                <input
                  onChange={handleChange}
                  type="checkbox"
                  id={`item${data.id}`}
                  className="mx-2"
                  name={data.id}
                />
                <label htmlFor={`item${data.id}`}>{data.categoryName}</label>
              </li>
            ))}
          </ul>
          <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-5 py-1 rounded-md border-2 border-red-500 text-xl font-semibold focus:outline-none">
            Search
          </button>
        </form>

        <div className="flex flex-col w-full md:w-[70vw] my-12">
          <div className="w-full flex flex-row md:ml-12">
            <div className="flex items-center w-full md:w-[90%]">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="border-2 border-red-300 rounded-full flex-grow outline-none px-4 sm:px-12 py-2 sm:py-3 bg-transparent rounded-l-full rounded-r-none"
              />
              <button
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-white px-5 sm:px-7 py-3 md:py-4 rounded-r-full border-2 border-red-500 rounded-l-none focus:outline-none"
              >
                <BsSearch />
              </button>
            </div>
          </div>

          <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 my-16">
            {renderFundraisers()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFundraisers;
