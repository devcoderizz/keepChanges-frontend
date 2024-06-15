import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import handleError from "../../utils/ErrorHandler";
import ViewCard from "../ViewCard";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Select } from 'antd';

const AdminFundraisers = () => {
  const APIBASEURL = import.meta.env.VITE_API_BASEURL;
  const [allFundraisers, setAllFundraisers] = useState([]);
  const [selectedHeadIndex, setSelectedHeadIndex] = useState(0);
  const [fundrasierStats, setFundraiserStats] = useState([])
  const [selectedComponent, setSelectedComponent] = useState(null);
  console.log("fundraiserStats", fundrasierStats);

  const active = allFundraisers.filter(
    (fundraiser) => fundraiser.status === "OPEN"
  );
  
  const pending = allFundraisers.filter(
    (fundraiser) => fundraiser.status === "INACTIVE"
  );

  const disapproved = allFundraisers.filter(
    (fundraiser) => fundraiser.status === "CANCELLED"
  );
  
  const completed = allFundraisers.filter(
    (fundraiser) => fundraiser.status === "COMPLETED"
  );

  const closed = allFundraisers.filter(
    (fundraiser) => fundraiser.status === "CLOSED"
  );
  
  const pendingForAdmin = allFundraisers.filter(
    (fundraiser) => fundraiser.isReviewed === false
  );


  const handleChange = (value) => {
    switch (value) {
      case '1':
        setSelectedComponent(   <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
          {active.map((data, index) => (
            <div key={index} className="min-h-[400px]">
              <Link to={`/fundraisers/${data.id}`}>
                <ViewCard {...data} />
              </Link>
            </div>
          ))}
        </div>);
        break;
      case '2':
        setSelectedComponent(   <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
          {pending.map((data, index) => (
            <div key={index} className="min-h-[400px]">
              <Link to={`/fundraisers/${data.id}`}>
                <ViewCard {...data} />
              </Link>
            </div>
          ))}
        </div>);
        break;
      case '3':
        setSelectedComponent(   <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
          {disapproved.map((data, index) => (
            <div key={index} className="min-h-[400px]">
              <Link to={`/fundraisers/${data.id}`}>
                <ViewCard {...data} />
              </Link>
            </div>
          ))}
        </div>);
        break;
      case '4':
        setSelectedComponent(   <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
          {completed.map((data, index) => (
            <div key={index} className="min-h-[400px]">
              <Link to={`/fundraisers/${data.id}`}>
                <ViewCard {...data} />
              </Link>
            </div>
          ))}
        </div>);
        break;
      case '5':
        setSelectedComponent(   <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
          {closed.map((data, index) => (
            <div key={index} className="min-h-[400px]">
              <Link to={`/fundraisers/${data.id}`}>
                <ViewCard {...data} />
              </Link>
            </div>
          ))}
        </div>);
        break;
      default:
     
        break;
    }
  };




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
        console.log("data", data);
        setAllFundraisers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFundraisers();
    const fundrasierStats = async () => {
      try {
        const res = await fetch(`${APIBASEURL}/admin/dashboard/fundraisers/`, {
          method: "GET",
        });
        if (res.status !== 200) {
          handleError(res.status);
        }
        const data = await res.json();
        console.log("data", data);
        setFundraiserStats(data)
      } catch (error) {
        console.log(error);
      }
    };
    fundrasierStats();
  }, [APIBASEURL]);

  return (
    <div className="flex flex-col h-max-[200vh] min-h-screen">
      <div className="p-4 flex-grow">
        <h1 className="text-3xl font-semibold my-4">All Fundraisers</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14 mb-4">
          <div className="h-[200px] md:w-[450px] bg-white p-4 rounded-2xl shadow-md text-black hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
            <div className="text-md font-bold">Total Fundraisers
              <h1 className="text-5xl " > {fundrasierStats.totalFundraisers} </h1>
            </div>
          </div>
          <div className="md:ml-20 bg-white p-4 rounded-2xl h-[200px] w-[300px] md:w-[300px] shadow-md text-black  hover:text-white hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-bold">Active Fundraisers
            <h1 className="text-5xl" > {fundrasierStats.totalActiveFundraisers} </h1>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl h-[200px] text-black hover:text-white md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-bold">
              Total Created Funds this Month
              <h1 className="text-5xl"> {fundrasierStats.createdThisMonth} </h1>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[100%] h-full my-4 overflow-y-scroll max-h-[80vh]  ">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <span className="text-2xl font-semibold text-red-500  ">
                Pending Fundraisers for Approval <span className="text-xl "> ({pendingForAdmin.length})</span>
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingForAdmin.map((data, index) => (
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
        <div className="my-8 md:block hidden ">
          <Tabs className="bg-white min-h-[600px] flex flex-col rounded-md">
            <TabList className="flex flex-row items-center justify-center md:justify-around text-sm md:text-xl font-semibold w-full  bg-red-200 rounded-md">
              <Tab
                className={
                  selectedHeadIndex === 0
                    ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                    : "text-black w-1/2 py-2 rounded-l-md"
                }
                onClick={() => setSelectedHeadIndex(0)}
              >
                Active &nbsp; <span className="text-xl hidden md:block "> ({active.length})</span>
              </Tab>
              <Tab
                className={
                  selectedHeadIndex === 1
                    ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                    : "text-black w-1/2 py-2 rounded-l-md"
                }
                onClick={() => setSelectedHeadIndex(1)}
              >
                Pending
                &nbsp; <span className="text-xl hidden  md:block "> ({pending.length})</span>
              </Tab>
              <Tab
                className={
                  selectedHeadIndex === 2
                    ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                    : "text-black w-1/2 py-2 rounded-l-md"
                }
                onClick={() => setSelectedHeadIndex(2)}
              >
                Disapproved
                &nbsp; <span className="text-xl hidden  md:block "> ({disapproved.length})</span>
              </Tab>
              <Tab
                className={
                  selectedHeadIndex === 3
                    ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                    : "text-black w-1/2 py-2 rounded-l-md"
                }
                onClick={() => setSelectedHeadIndex(3)}
              >
                Completed
                &nbsp; <span className="text-xl hidden md:block"> ({completed.length})</span>
              </Tab>
              <Tab
                className={
                  selectedHeadIndex === 4
                    ? "text-white underline bg-red-500 py-2 w-1/2 rounded-l-md"
                    : "text-black w-1/2 py-2 rounded-l-md"
                }
                onClick={() => setSelectedHeadIndex(4)}
              >
                Closed
                &nbsp; <span className="text-xl hidden  md:block"> ({closed.length})</span>
              </Tab>
            </TabList>

            <TabPanels className=" max-h-[75vh] overflow-y-scroll no-scrollbar " >
              <TabPanel>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
                  {active.map((data, index) => (
                    <div key={index} className="min-h-[400px]">
                      <Link to={`/fundraisers/${data.id}`}>
                        <ViewCard {...data} />
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
                  {pending.map((data, index) => (
                    <div key={index} className="min-h-[400px]">
                      <Link to={`/fundraisers/${data.id}`}>
                        <ViewCard {...data} />
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
                  {disapproved.map((data, index) => (
                    <div key={index} className="min-h-[400px]">
                      <Link to={`/fundraisers/${data.id}`}>
                        <ViewCard {...data} />
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
                  {completed.map((data, index) => (
                    <div key={index} className="min-h-[400px]">
                      <Link to={`/fundraisers/${data.id}`}>
                        <ViewCard {...data} />
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 my-4 gap-10">
                  {closed.map((data, index) => (
                    <div key={index} className="min-h-[400px]">
                      <Link to={`/fundraisers/${data.id}`}>
                        <ViewCard {...data} />
                      </Link>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      <div className="md:hidden items-center flex flex-col" >
      <Select
        showSearch
        style={{
          width: 300,
        }}
        placeholder="Explore Advanced Administrative Tools "
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        onChange={handleChange}
        options={[
          {
            value: '1',
            label: 'Active',
          },
          {
            value: '2',
            label: 'Pending',
          },
          {
            value: '3',
            label: 'Dissapproved',
          },
          {
            value: '4',
            label: 'Completed',
          },
          {
            value: '5',
            label: 'Closed',
          },
        
        ]}
      />
      {/* Render the selected custom component */}
      <div>
      {selectedComponent}
      </div>
      </div>









      </div>
      <div className="h-16 flex-shrink-0"></div>{" "}
      {/* Spacer to ensure footer is not overlapped */}
    </div>
  );
};

export default AdminFundraisers;
