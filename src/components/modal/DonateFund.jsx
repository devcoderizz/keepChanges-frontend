const DonateFund = ({...data}) => {
    const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
  return (
    <div>
      <div className="w-[300px] md:w-[450px] h-[100px] md:h-[130px] border-[3px] border-red-500 border-opacity-50 flex  items-center justify-around">
        <div className="w-[100px] md:w-[130px] h-[100px] md:h-[120px] flex items-center  overflow-hidden object-fill"><img src={`${VITE_BASE_IMAGE_URL}${data.fundraiser.displayPhoto}`} alt="" /></div>
        <div className=" h-[100px] md:h-[120px] w-[250px] md:w-[300px] text-[17px] font-bold flex flex-col justify-between py-1">
            <h1>{data.fundraiser.fundraiserTitle}</h1>
        <div className="flex flex-row items-center justify-between text-[9px] md:text-xs font-semibold text-red-500 px-3">
            <p>Amount Donated: {data.donationAmount}</p>
            <p>{data.donationDate}</p>
         </div>
        </div>
      </div>
      
    </div>
  );
};

export default DonateFund;
