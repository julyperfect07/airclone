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
    <div className=" grid grid-cols-5 gap-3">
      {listings.map((listing) => (
        <div className=" flex flex-col ">
          <img
            src={listing.images[0]}
            className="w-full h-60 object-cover rounded-md"
          />
          <h1 className=" font-bold mt-2">{listing.location}</h1>
          <h1 className="text-[#767676]">{listing.category}</h1>
          <h1>$ {listing?.price} night</h1>
        </div>
      ))}
    </div>
  );
};

export default ListingsCards;
