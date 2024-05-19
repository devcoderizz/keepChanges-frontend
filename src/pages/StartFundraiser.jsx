 

const StartFundraiser = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col items-center gap-10 py-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#FF5C5C] tracking-wide">
            Start your fundraiser
          </h1>
          <p className="text-sm font-normal w-full max-w-xs text-center">
            *You have the flexibility to update these details whenever you choose.
          </p>
        </div>
        <form action="" className="w-[80%] flex flex-col items-center gap-4 p-5">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="title" className="font-bold">Fundraiser Title*</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Give your fundraiser a name"
              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
            <div className="relative flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="goal" className="font-bold">Goal*</label>
              <input
                type="text"
                name="goal"
                id="goal"
                placeholder="Amount in Rupees"
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none"
              />
              <p className="absolute bottom-2.5 right-3 font-bold">₹</p>
            </div>
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="end-date" className="font-bold">End date*</label>
              <input
                type="date"
                name="date"
                id="end-date"
                placeholder="mm/dd/yyyy"
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="category" className="font-bold">Category*</label>
            <select
              name="category"
              id="category"
              className="p-2.5 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            >
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="charity">Charity</option>
              <option value="community">Community</option>
              <option value="environment">Environment</option>
              <option value="emergency">Emergency</option>
              <option value="animals">Animals</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="email" className="font-bold">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abc@xyz.com"
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md pr-7 focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start w-full md:w-1/2">
              <label htmlFor="phone" className="font-bold">Phone*</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="0123456789"
                className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="description" className="font-bold">Description*</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description....."
              className="p-2 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full">
            <input
              type="file"
              className="flex items-center gap-5 px-4 py-2.5 w-full border-2 border-[#FF5C5C] border-opacity-55 rounded-md focus:outline-none"
            />
          </div>
          <button className="gap-5 px-4 py-2.5 w-full bg-[#FF5C5C] text-lg font-bold text-white rounded-md focus:outline-none">
            Create fundraiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartFundraiser;
