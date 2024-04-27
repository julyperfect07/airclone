import React, { useEffect, useState } from "react";

const ListingsCards = () => {
  const [listings, setListings] = useState([]);
  console.log(listings);
  useEffect(() => {
    const getlistings = async () => {
      try {
        const res = await fetch(`/api/listing/getlistings`);
        const data = await res.json();
        if (res.ok) {
          setListings(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getlistings();
  }, []);
  return (
    <div className=" grid grid-cols-6 gap-3">
      {listings.map((listing) => (
        <div className=" flex flex-col items-center">
          <img
            src={listing.images[0]}
            className="w-full max-h-60 object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default ListingsCards;
