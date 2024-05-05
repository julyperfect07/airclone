import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  category: string;
}

const ListingsCards = ({ category }: Props) => {
  const [listings, setListings] = useState([]);
  console.log(category);
  console.log(listings);
  useEffect(() => {
    const getlistings = async () => {
      try {
        const res = await fetch(
          `/api/listing/getlistings?category=${category}`
        );
        const data = await res.json();
        if (res.ok) {
          setListings(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getlistings();
  }, [category]);
  return (
    <div className=" grid grid-cols-5 gap-3">
      {listings.map((listing) => (
        <Link
          to={`/listing/${listing._id}`}
          className=" flex flex-col "
        >
          <img
            src={listing.images[0]}
            className="w-full h-60 object-cover rounded-md"
          />
          <h1 className=" font-bold mt-2">{listing.location}</h1>
          <h1 className="text-[#767676] capitalize">
            {listing.category}
          </h1>
          <h1>$ {listing?.price} night</h1>
        </Link>
      ))}
    </div>
  );
};

export default ListingsCards;
