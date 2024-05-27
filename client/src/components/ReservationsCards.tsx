import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format, parse } from "date-fns";

interface Props {
  category: string;
}

interface Reservation {
  _id: string;
  listingId: {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    guests: number;
    rooms: number;
    bathrooms: number;
    images: string[];
    price: string;
  };
  startDate: string; // Changed to string
  endDate: string; // Changed to string
  user: string;
}

const ReservationsCards = ({ category }: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [, setListings] = useState([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

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
              alt={listing.listingId.location}
            />
            <h1 className="font-bold mt-2">
              {listing.listingId.location}
            </h1>
            <h1 className=" text-[#767676] ">
              {format(
                parse(
                  listing.startDate,
                  "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                  new Date()
                ),
                "MMM dd, yyyy"
              )}{" "}
              -{" "}
              {format(
                parse(
                  listing.endDate,
                  "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                  new Date()
                ),
                "MMM dd, yyyy"
              )}
            </h1>
            <h1 className=" font-semibold">
              $ {listing.listingId.price} night
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ReservationsCards;
