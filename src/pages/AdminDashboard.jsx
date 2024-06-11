import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Select } from 'antd';

// import Calendar from './Calendar';
import Dashboard from '../components/AdminDashboard/Dashboard';
import AdminDonations from '../components/AdminDashboard/AdminDonations';
import AdminFundraisers from '../components/AdminDashboard/AdminFundraisers';
import AdminCategories from '../components/AdminDashboard/AdminCategories';
import AdminQueries from '../components/AdminDashboard/AdminQueries';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Donations':
        return < AdminDonations/>;
      case 'Fundraisers':
        return <AdminFundraisers />;
      case 'Categories':
        return <AdminCategories/>;
      case 'Queries':
        return <AdminQueries />;
      default:
        return <Dashboard />;
    }
  };

  const handleChange = (value) => {
    switch (value) {
      case '1':
        setSelectedComponent(<Dashboard />);
        break;
      case '2':
        setSelectedComponent(< AdminFundraisers/>);
        break;
      case '3':
        setSelectedComponent(<AdminDonations />);
        break;
      case '4':
        setSelectedComponent(<AdminCategories/>);
        break;
      case '5':
        setSelectedComponent(<AdminQueries />);
        break;
      default:
        setSelectedComponent(1);
        break;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center text-2xl text-white bg-red-500 w-full py-2 font-extrabold uppercase">
        <span>Admin Dashboard</span>
      </div>
      <div className=" md:flex-grow flex-grow-0 hidden md:flex h-screen ">
        <Sidebar className="h-full bg-[#cb3f43] text-black">
          <Menu className="mt-8">
            <MenuItem className="text-black hover:text-black" onClick={() => setCurrentView('Dashboard')}>
              Dashboard
            </MenuItem>
            <MenuItem className="text-black hover:text-black" onClick={() => setCurrentView('Fundraisers')}>
            Fundraisers
            </MenuItem>
            <MenuItem className="text-black hover:text-black" onClick={() => setCurrentView('Donations')}>
            Donations
            </MenuItem>
            <MenuItem className="text-black hover:text-black" onClick={() => setCurrentView('Categories')}>
              Categories
            </MenuItem>
            <MenuItem className="text-black hover:text-black" onClick={() => setCurrentView('Queries')}>
              Queries
            </MenuItem>
            
          </Menu>
        </Sidebar>
        <div className="p-4 flex-grow">
          {renderContent()}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center my-4 md:hidden '>
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
            label: 'Dashboard',
          },
          {
            value: '2',
            label: 'Fundraisers',
          },
          {
            value: '3',
            label: 'Donations',
          },
          {
            value: '4',
            label: 'Categories',
          },
          {
            value: '5',
            label: 'Queries',
          },
        
        ]}
      />
      {/* Render the selected custom component */}
      {selectedComponent}





      </div>
    </div>
  );
};

export default AdminDashboard;
