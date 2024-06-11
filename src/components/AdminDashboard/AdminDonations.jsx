
const AdminDonations = () => {
  return (
    <div className="p-4  "  >
          <h1 className='text-3xl font-semibold my-4 ' >All Donations</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-14">
     <div className="h-[200px] md:w-[450px] bg-white p-4 rounded-2xl shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-medium">Total Donations</div>
     </div>
     <div className="md:ml-20 bg-white p-4 rounded-2xl h-[200px] w-[300px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-medium">Active Donations</div>
     </div>
     <div className="bg-white p-4 rounded-2xl h-[200px] md:w-[300px] shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
       <div className="text-md font-medium">Total Donations this Month</div>
     </div>
   </div>
   <div className='my-4' >
  
 </div>
 </div>
  )
}

export default AdminDonations