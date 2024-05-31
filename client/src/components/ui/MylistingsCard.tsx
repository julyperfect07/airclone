import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { useToast } from "./use-toast";
import { Check } from "lucide-react";

interface Props {
  category: string;
}

const MyListingsCards = ({ category }: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [listings, setListings] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    const getlistings = async () => {
      try {
        const res = await fetch(
          `/api/listing/getuserlistings/${currentUser._id}?category=${category}`
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

  const handleDelete = async (listingId: string) => {
    try {
      const res = await fetch(
        `/api/listing/deleteuserlistings/${currentUser._id}/${listingId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setListings((prevlistings) =>
          prevlistings.filter(
            (prevlisting) => prevlisting._id !== listingId
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
          <Button
            onClick={() => handleDelete(listing._id)}
            className=" mt-2 bg-red-500 text-white hover:bg-white hover:text-red-500 border border-red-500 text-base"
          >
            Delete Listing
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MyListingsCards;
