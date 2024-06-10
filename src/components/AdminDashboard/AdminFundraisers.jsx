import React from 'react';
import { PanelGroup, Panel, Placeholder } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const AdminFundraisers = () => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className='text-3xl font-semibold my-4 ' >All Fundraisers</h1>
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14 mb-4">
          <div className="h-[200px] md:w-[450px] bg-white p-4 rounded-2xl shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-medium">Total Fund</div>
          </div>
          <div className="md:ml-20 bg-white p-4 rounded-2xl h-[200px] w-[300px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-medium">Active Fundraisers</div>
          </div>
          <div className="bg-white p-4 rounded-2xl h-[200px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
            <div className="text-md font-medium">Total Created Funds this Month</div>
          </div>
        </div>
        <div className="my-4">
          <PanelGroup accordion bordered className="w-[95%] ">
            <Panel header="Panel 1" defaultExpanded>
              <Placeholder.Paragraph />
            </Panel>
            <Panel header="Panel 2">
              <Placeholder.Paragraph />
            </Panel>
            <Panel header="Panel 3">
              <Placeholder.Paragraph />
            </Panel>
          </PanelGroup>
        </div>
      </div>
      <div className="h-16"></div> {/* Spacer to ensure footer is not overlapped */}
    </div>
  );
};

export default AdminFundraisers;
