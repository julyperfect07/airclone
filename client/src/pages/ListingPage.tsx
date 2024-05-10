import Calendar from "@/components/Calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
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
  price: number;
}

const ListingPage = () => {
  const params = useParams();
  const [selectedRange, setSelectedRange] =
    useState<DateRange | null>(null);

  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleRangeSelect = (range: DateRange) => {
    setSelectedRange(range);
  };

  console.log(selectedRange);
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

  useEffect(() => {
    if (selectedRange && listing) {
      const startDate = selectedRange.startDate.getTime();
      const endDate = selectedRange.endDate.getTime();
      const numberOfDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      ); // Calculate number of days

      setTotalCost(numberOfDays * listing.price); // Calculate total cost
    } else {
      setTotalCost(null);
    }
  }, [selectedRange, listing]);

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
          <div className=" mb-4">
            {totalCost ? (
              <p>Total cost: ${totalCost.toFixed(2)}</p>
            ) : (
              <h1>{listing?.price}</h1>
            )}
          </div>

          <Calendar onSelectRange={handleRangeSelect} />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
