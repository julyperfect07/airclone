import { Menu, Navigation2, Search } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../../redux/user/userSlice";
import CreateListing from "./CreateListing";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";

const Header = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] =
    useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  const openCreateListing = () => {
    setIsCreateListingOpen(true);
  };
  const closeCreateListing = () => {
    setIsCreateListingOpen(false);
  };
  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/user/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success === false) {
        console.log("Something went wrong");
      }
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className=" w-full sm:max-w-[1500px] mx-auto p-1 sm:p-5 flex justify-between border-b items-center">
      <Link
        to={"/"}
        className="  hidden sm:flex text-lg gap-2 items-center hover:cursor-pointer"
      >
        <Navigation2 size={40} className=" text-red-500" />
        <h1 className=" text-red-500 font-bold text-xl">airbnb</h1>
      </Link>
      <div className=" w-full sm:w-[450px] flex items-center shadow-sm hover:shadow-md duration-75 rounded-3xl py-1 px-0 sm:px-3">
        <Input
          className=" w-full border-none focus-visible:ring-transparent"
          placeholder="Search..."
        />
        <div className=" bg-red-500 rounded-full text-white p-2 cursor-pointer">
          <Search className=" w-5 h-5" />
        </div>
      </div>
      <div className=" flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className=" flex items-center border p-2 gap-2 rounded-3xl hover:cursor-pointer">
              <Menu />
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  className=" hidden sm:block  object-cover w-10 h-10 rounded-full overflow-hidden"
                  alt=""
                />
              ) : (
                <img
                  className="hidden sm:block object-cover w-10 h-10"
                  src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  alt=""
                />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              {currentUser ? (
                <Link to="/mylistings">My Listings</Link>
              ) : (
                <button onClick={openSignupModal}>Sign up</button>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {currentUser ? (
                <Link to={`/favorites/${currentUser._id}`}>
                  My favourites
                </Link>
              ) : (
                <button onClick={openLoginModal}>Log in</button>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {currentUser && (
                <button onClick={openCreateListing}>
                  Create a listing
                </button>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/reservations"}>My reservations</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {currentUser ? (
                <Link to="/myaccount">My Account</Link>
              ) : (
                "Team"
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
            {currentUser && (
              <DropdownMenuItem
                onClick={handleLogout}
                className=" hover:cursor-pointer"
              >
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      {isSignupModalOpen && (
        <SignupModal onClose={closeSignupModal} />
      )}
      {isCreateListingOpen && (
        <CreateListing onClose={closeCreateListing} />
      )}
    </header>
  );
};

export default Header;
