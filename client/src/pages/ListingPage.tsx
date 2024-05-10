import Calendar from "@/components/Calendar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Listing {
  title: string;
  location: string;
  images: string[];
  guests: number;
  rooms: number;
  bathrooms: number;
  description: string;
  category: string;
}

const ListingPage = () => {
  const params = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await fetch(
          `/api/listing/onelisting/${params.id}`
        );
        const data = await res.json();
        if (res.ok) {
          setListing(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  }, [params.id]);

  if (!listing) return <div>Loading...</div>;
  return (
    <div className=" max-w-6xl m-auto mt-7">
      <h1 className=" font-bold text-lg">{listing.title}</h1>
      <h2 className=" text-[#767676] mt-3"> {listing.location}</h2>
      {listing.images && listing.images.length > 0 && (
        <img
          src={listing.images[0]}
          className="w-full object-cover max-h-[700px] rounded-lg mt-3"
          alt="Listing"
        />
      )}
      <div className=" flex gap-2 w-full mt-5 ">
        <div className=" flex-1">
          <h1 className=" font-semibold text-lg">Hosted by </h1>
          <div className=" flex gap-3 mt-3 ">
            <span className=" text-[#767676] text-base">
              {listing.guests} guests
            </span>
            <span className=" text-[#767676]">
              {listing.rooms} rooms
            </span>
            <span className=" text-[#767676]">
              {listing.bathrooms} bathrooms
            </span>
          </div>
          <div className=" flex flex-col mt-5 pt-6 pb-6 border-t-2 border-b-2">
            <h1 className=" font-semibold text-lg capitalize">
              {listing.category}
            </h1>
            <h2 className=" text-[#767676] ">
              This property is brand new and luxurious!
            </h2>
          </div>
          <p className=" mt-5 text-lg text-[#767676]">
            {listing.description}
          </p>
        </div>
        <div className=" flex-1">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
