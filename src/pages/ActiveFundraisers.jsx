import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import ViewCard from "../components/ViewCard";
import { Link, useParams } from "react-router-dom";
import handleError from "../utils/ErrorHandler";

const ActiveFundraisers = () => {
  const { id } = useParams();
  const APIBASEURL= import.meta.env.VITE_API_BASEURL;
  const [query, setQuery] = useState("");
  const [activeFundraiser, setActiveFundraiser] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [fundraisersByCategory, setfundraisersByCategory] = useState([])
  const categoriesId = [];

  allCategories.map((data)=>{
    categoriesId.push(data.id);
  })
  console.log("category ids" , categoriesId);


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // const handleSearch = () => {
  //   onSearch(query);
  // };

  useEffect(() => {
const getAllCategories =async()=>{
      try {
        const res = await fetch(`${APIBASEURL}/categories/getall/`, {
          method: "GET",
          headers: {
            // "Authorization": `Bearer ${accessToken}`,
          },
        });
        if(res.status!=200){
          handleError(res.status); 
          }
        const data = await res.json();
        console.log("get cetegories data",data);
        setAllCategories(data)
        console.log("kajbaskbc",allCategories);
      
    
  
      } catch (error) {
        console.log(error);
      }
     }
     getAllCategories()

    const fundraiserDetails =async()=>{
      try {
        const res = await fetch(`${APIBASEURL}/fundraisers/active`, {
          method: "GET",
        });
        if(res.status!=200){
          handleError(res.status); 
          }
        const data = await res.json();
        console.log("Active fundraiser data",data);
         setActiveFundraiser(data)
      } catch (error) {
        console.log(error);
      }
     }
     fundraiserDetails()

     
     allCategories.map((data) => {
      if (categoriesId.includes(data.id)) {
        const getFundraiserById =async()=>{
          try {
            const res = await fetch(`${APIBASEURL}/fundraisers/category/${id}`, {
              method: "GET",
            });
            if(res.status!=200){
              handleError(res.status); 
              }
            const data = await res.json();
            console.log("Fundraiser by id ",data);
            setfundraisersByCategory(data);
          } catch (error) {
            console.log(error);
          }
         }
         getFundraiserById()
      }})

     

  }, [APIBASEURL, id])
  




  return (
    <div className="w-full flex flex-col items-center mb-10 overflow-x-hidden">
      <h1 className="text-4xl font-extrabold py-8 pl-8 md:pl-0">
        Currently Active Fundraiser
      </h1>
      <div className="flex flex-col md:flex-row w-full my-12">
        <form className="flex flex-col items-start w-full md:w-[30vw] pl-10">
          <h1 className="text-3xl font-semibold">Categories</h1>
          <ul className="text-sm flex flex-row flex-wrap gap-4 md:flex-col w-full md:w-[200px] font-semibold my-4">
          {allCategories.map((data) => (
    <li className="p-2" key={data.id}>
        <input type="checkbox" id={`item${data.id}`} className="mx-2" name={`item${data.id}`} />
        <label htmlFor={`item${data.id}`}>{data.categoryName}</label>
    </li>
))}
            
          </ul>
        </form>

        <div className="flex flex-col w-full md:w-[70vw] my-12">
          <div className="w-full flex flex-row md:ml-12">
            <div className="flex items-center w-full md:w-[90%]">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="border-2 border-red-300 rounded-full focus-within:ring-1 focus-within:ring-red-400 flex-grow outline-none px-4 sm:px-12 py-2 sm:py-3 bg-transparent rounded-l-full rounded-r-none"
              />
              <button
                // onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-white px-5 sm:px-7 py-3 md:py-4 rounded-r-full border-2 border-red-500 rounded-l-none focus:outline-none"
              >
                <BsSearch />
              </button>
            </div>
          </div>

          <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 my-16">
          {id ? (fundraisersByCategory.map((data, index) => (
              <div key={index} className="min-h-[400px] h-auto md:h-full">
                <Link to={`/fundraisers/${data.id}`}>
                  <ViewCard {...data} />
                </Link>
              </div>
            ))) : (activeFundraiser.map((data, index) => (
              <div key={index} className="min-h-[400px] h-auto md:h-full">
                <Link to={`/fundraisers/${data.id}`}>
                  <ViewCard {...data} />
                </Link>
              </div>
            )))}





            {/* {activeFundraiser.map((data, index) => (
              <div key={index} className="min-h-[400px] h-auto md:h-full">
                <Link to={`/fundraisers/${data.id}`}>
                  <ViewCard {...data} />
                </Link>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFundraisers;
