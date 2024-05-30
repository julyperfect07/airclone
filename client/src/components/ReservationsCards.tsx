import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format, parse } from "date-fns";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Check } from "lucide-react";

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
  const { toast } = useToast();
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

  const handleDelete = async (reservationId: string) => {
    try {
      const res = await fetch(
        `/api/reservation/deleteReservation/${currentUser._id}/${reservationId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        // Update the front-end state
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation._id !== reservationId
          )
        );
      }
      const data = await res.json();
      toast({
        description: (
          <div className=" flex gap-2 items-center ">
            <Check className=" text-green-700" />
            <p>{data}</p>
          </div>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button
            onClick={() => handleDelete(listing._id)}
            className=" mt-2 bg-red-500 text-white hover:bg-white hover:text-red-500 border border-red-500 text-base"
          >
            Cancel Reservation
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ReservationsCards;
