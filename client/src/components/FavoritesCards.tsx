import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface Props {
  category: string;
}

const FavoritesCards = ({ category }: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [listings, setListings] = useState([]);

  const [favoritedListings, setFavoritedListings] = useState<
    string[]
  >([]);

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

        if (currentUser) {
          const favoritesResponse = await fetch(
            `/api/user/favorites`
          );
          const favoritesData = await favoritesResponse.json();
          if (favoritesResponse.ok) {
            setFavoritedListings(favoritesData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getlistings();
  }, [category, currentUser]);

  const toggleFavorite = async (listingId: string) => {
    try {
      const res = await fetch(`/api/user/favorite/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const { favoritedListings } = await res.json();
        setFavoritedListings(favoritedListings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredListings = listings.filter((listing) =>
    favoritedListings.includes(listing._id)
  );

  if (filteredListings.length === 0) {
    return <div className=" text-center">Wow ! such an empty</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {filteredListings.map((listing) => (
        <div key={listing._id} className="flex flex-col relative">
          <Link
            to={`/listing/${listing._id}`}
            className="flex flex-col"
          >
            <img
              src={listing.images[0]}
              className="w-full h-80 sm:h-60  object-cover rounded-md"
              alt={listing.location}
            />
            <h1 className="font-bold mt-2">{listing.location}</h1>
            <h1 className="text-[#767676] capitalize">
              {" "}
              {listing.category}{" "}
            </h1>
            <h1>$ {listing.price} night</h1>
          </Link>
          {currentUser && (
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => toggleFavorite(listing._id)}
            >
              {favoritedListings.includes(listing._id) ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-2xl" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FavoritesCards;
