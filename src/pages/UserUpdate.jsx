const UserUpdate = () => {
  return (
    <div className="w-full h-full flex items-start justify-center p-5">
      {" "}
      <div className=" w-[500px] h-[600px]  p-5 flex flex-col items-center gap-5">
        <h1 className=" text-2xl font-semibold">Edit personal details</h1>
        <div className="w-full h-[200px] bg-[#FFC1C1] rounded-md flex items-center justify-center">

            <div className="w-[150px] h-[150px] rounded-full bg-black overflow-hidden border-[4px]">
                <img src="https://res.cloudinary.com/dv6rzh2cp/image/upload/v1715890998/1636820072193_ktwjrf.jpg" alt="" className="object-cover"  />
            </div>
        </div>
        <div className="w-[150px]  ">
            <div>
                <form action="">
                    <label htmlFor="">Full Name</label>
                    <div>
                    <input type="text" />
                    </div>
                </form>
            </div>
            </div>

      </div>
    </div>
  );
};

export default UserUpdate;
