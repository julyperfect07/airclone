import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface Props {
  category: string;
}

const MyListingsCards = ({ category }: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getlistings = async () => {
      try {
        const res = await fetch(
          `/api/listing/getuserlistings/${currentUser._id}`
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
  }, [category, currentUser]);

  return (
    <div className="grid grid-cols-5 gap-3">
      {listings.map((listing) => (
        <div key={listing._id} className="flex flex-col relative">
          <Link
            to={`/listing/${listing._id}`}
            className="flex flex-col"
          >
            <img
              src={listing.images[0]}
              className="w-full h-60 object-cover rounded-md"
              alt={listing.location}
            />
            <h1 className="font-bold mt-2">{listing.location}</h1>
            <h1 className="text-[#767676] capitalize">
              {" "}
              {listing.category}{" "}
            </h1>
            <h1>$ {listing.price} night</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyListingsCards;
