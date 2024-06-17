import React from 'react';

const DonateFund = ({...data}) => {
    const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

    // Helper function to truncate the title to 30 words
    const truncateTitle = (title, wordLimit) => {
        const words = title.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return title;
    };

    return (
        <div className="w-[320px] md:w-[430px] mx-auto bg-white rounded-lg shadow-md overflow-hidden transform transition-all  duration-400 hover:bg-[#FFF1F1] border-[1px] hover:md:w-[450px] ">
            <div className="flex">
                <div className="w-1/4 h-[80px] md:h-[100px] overflow-hidden rounded-l-lg">
                    <img 
                        src={`${VITE_BASE_IMAGE_URL}${data.fundraiser.displayPhoto}`} 
                        alt="Fundraiser" 
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="w-3/4 p-3 flex flex-col justify-center">
                    <h1 className="text-sm md:text-base font-bold text-gray-800">
                        {truncateTitle(data.fundraiser.fundraiserTitle, 30)}
                    </h1>
                    <div className="mt-1 text-xs md:text-sm text-gray-600">
                        <p className="font-semibold">Amount Donated: <span className="text-green-600">{data.donationAmount}</span></p>
                        <p className="text-xs text-gray-500">{data.donationDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateFund;
