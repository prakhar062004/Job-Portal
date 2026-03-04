import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/appcontext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ Jobs Available to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Find your dream job today and take the next step in your career journey.
        </p>

        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center">
            <img className="sm:h-5 h-4" src={assets.search_icon} alt="Search icon" />
            <input
              type="text"
              placeholder="Search for jobs"
              aria-label="Job title"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>

          <div className="flex items-center">
            <img className="sm:h-5 h-4" src={assets.location_icon} alt="Location icon" />
            <input
              type="text"
              placeholder="Location"
              aria-label="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded m-1"
            onClick={() => {
              setSearchFilter({
                title: titleRef.current.value,
                location: locationRef.current.value,
              });
              setIsSearched(true);
              console.log({
                title: titleRef.current.value,
                location: locationRef.current.value,
              });
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="Microsoft" />
          <img className="h-6" src={assets.accenture_logo} alt="Accenture" />
          <img className="h-6" src={assets.amazon_logo} alt="Amazon" />
          <img className="h-6" src={assets.walmart_logo} alt="Walmart" />
          <img className="h-6" src={assets.samsung_logo} alt="Samsung" />
          <img className="h-6" src={assets.adobe_logo} alt="Adobe" />
        </div>
      </div>
    </div>
  );
};

export default Hero;