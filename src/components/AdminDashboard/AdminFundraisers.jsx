import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import handleError from "../../utils/ErrorHandler";
import ViewCard from "../ViewCard";
import { Link } from "react-router-dom";

const AdminFundraisers = () => {
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const [allFundraisers, setAllFundraisers] = useState([]);
  console.log("data", allFundraisers)
  useEffect(() => {
    const getAllFundraisers = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/fundraisers/`, {
          method: "GET",
        });
        if (res.status !== 200) {
          handleError(res.status);
        }
        const data = await res.json();
        console.log("data", data)
        const pending = data.filter((fundraiser) => fundraiser.isReviewed === false);
        console.log("pending", pending)
        setAllFundraisers(pending);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFundraisers();
  }, [APIBASEURL]);

  return (
    <div className="flex flex-col h-max-[200vh] min-h-screen">
      <div className="p-4 flex-grow">
        <h1 className="text-3xl font-semibold my-4">All Fundraisers</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14 mb-4">
          <div className="h-[200px] md:w-[450px] bg-white p-4 rounded-2xl shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-medium">Total Fund</div>
          </div>
          <div className="md:ml-20 bg-white p-4 rounded-2xl h-[200px] w-[300px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-medium">Active Fundraisers</div>
          </div>
          <div className="bg-white p-4 rounded-2xl h-[200px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-medium">
              Total Created Funds this Month
            </div>
          </div>
        </div>
        <div className="w-full md:w-[95%] h-full my-4 overflow-y-scroll max-h-[150vh] no-scrollbar ">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <span className="text-2xl font-semibold text-red-500">Pending Fundraisers for Approval</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {allFundraisers.map((data, index) => (
                  <div key={index} className="min-h-[400px]">
                    <Link to={`/fundraisers/${data.id}`}>
                      <ViewCard {...data} />
                    </Link>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="h-16 flex-shrink-0"></div> {/* Spacer to ensure footer is not overlapped */}
    </div>
  );
};

export default AdminFundraisers;
