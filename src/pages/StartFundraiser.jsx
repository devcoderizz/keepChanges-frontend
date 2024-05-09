
const StartFundraiser = () => {

  var today = new Date();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="  h-full w-[650px] flex flex-col items-center gap-10 py-10">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <h1 className="text-5xl font-extrabold text-[#FF5C5C] tracking-wide">
            Start your fundraiser{" "}
          </h1>
          <p className="text-sm font-normal">
            *You have the flexibility to update these details whenever you
            choose.
          </p>
        </div>
        <form action="" className="w-full h-full flex flex-col items-center gap-4">
        <div className="flex flex-col items-start">
            <label htmlFor="" className="font-bold">Fundraiser Title*</label>
            <input type="text" name="title" placeholder="Give your raiser a name " className="p-2 w-[400px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none  " />
        </div>
        <div className="flex flex-row items-center justify-between gap-5 ">
        <div className=" relative flex flex-col items-start">
            <label htmlFor="" className="font-bold">Goal*</label>
            <input type="text " name="goal" placeholder="Rupees" className="p-2 w-[190px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none  " />
            <p className="absolute bottom-2.5 right-3 font-bold">₹</p>
        </div>
        <div className="  flex flex-col items-start">
            <label htmlFor="" className="font-bold">End date*</label>
            <input type="date" name="date" placeholder="mm/dd/yyyy" className="p-2 w-[190px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none   " />
            {/* <input type="date" id="start" name="trip-start"    min={today}  pattern="\d{4}-\d{2}-\d{2}"  className="p-2 w-[190px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none   " /> */}
            
        </div>
        </div>
        <div className="flex flex-col items-start">
            <label htmlFor="" className="font-bold">Category*</label>
            <select name="languages" id="lang" className="p-2.5 w-[400px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none   ">
        <option value="javascript">JavaScript</option>
        <option value="php">PHP</option>
        <option value="java">Java</option>
        <option value="golang">Golang</option>
        <option value="python">Python</option>
        <option value="c#">C#</option>
        <option value="C++">C++</option>
        <option value="erlang">Erlang</option>
      </select>  
        </div>
        <div className="flex flex-row items-center justify-between gap-5 ">
        <div className="  flex flex-col items-start">
            <label htmlFor="" className="font-bold">Email*</label>
            <input type="email" name="email" placeholder="abc@xyz.com" className="p-2 w-[190px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none  " />
        </div>
        <div className=" flex flex-col items-start">
            <label htmlFor="" className="font-bold">Phone*</label>
            <input type="number" name="number" placeholder="0123456789" className="p-2 w-[190px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none   " />
            
        </div>
        </div>
        <div className="flex flex-col items-start">
        <label htmlFor="" className="font-bold">Description*</label>
        <textarea name="description" id="" placeholder="Description....." className="p-2 w-[400px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none "></textarea>
        </div>
        <div >
            <input type="file"  className=" flex  items-center gap-5 px-4 py-2.5 w-[400px] border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none "  />
        </div>
        <button className="  gap-5 px-4 py-2.5 w-[400px] bg-[#FF5C5C] text-lg font-bold text-white  rounded-md focus:outline-none ">Create fundraiser</button>
 
        </form>
      </div>
    </div>
  );
};

export default StartFundraiser;
