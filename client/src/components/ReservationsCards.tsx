import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface Props {
  category: string;
}

const ReservationsCards = ({ category }: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [listings, setListings] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/getlistings?category=${category}`
        );
        const data = await res.json();
        if (res.ok) {
          setListings(data);
        }
        if (currentUser) {
          const reservationRes = await fetch(
            `/api/reservation/getReservations/${currentUser._id}`
          );
          const data = await reservationRes.json();
          if (reservationRes.ok) {
            setReservations(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListings();
  }, [category, currentUser]);

  return (
    <div className="grid grid-cols-5 gap-3">
      {reservations.map((listing) => (
        <div
          key={listing.listingId._id}
          className="flex flex-col relative"
        >
          <Link
            to={`/listing/${listing.listingId._id}`}
            className="flex flex-col"
          >
            <img
              src={listing.listingId.images[0]}
              className="w-full h-60 object-cover rounded-md"
              alt={listing.location}
            />
            <h1 className="font-bold mt-2">
              {listing.listingId.location}
            </h1>
            <h1 className="text-[#767676] capitalize">
              {" "}
              {listing.category}{" "}
            </h1>
            <h1>$ {listing.listingId.price} night</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ReservationsCards;
