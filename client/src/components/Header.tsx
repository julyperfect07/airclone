import { Earth, Menu, Navigation2, Search } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <header className=" max-w-[1500px] mx-auto p-5 flex justify-between border-b items-center">
      <div className=" text-lg flex gap-2 items-center hover:cursor-pointer">
        <Navigation2 size={40} className=" text-red-500" />
        <h1 className=" text-red-500 font-bold text-xl">airbnb</h1>
      </div>
      <div className=" flex items-center gap-5 border shadow-sm hover:shadow-md duration-75 rounded-3xl py-1 px-3">
        <span className=" font-semibold border-r border-gray-200 pr-6">
          Anywhere
        </span>
        <span className=" font-semibold border-r border-gray-200 pr-6">
          Any week
        </span>
        <span className=" font-semibold">Add guests</span>
        <div className=" bg-red-500 rounded-full text-white p-2">
          <Search className=" w-5 h-5" />
        </div>
      </div>
      <div className=" flex items-center gap-4">
        <h1 className=" text-base font-semibold hover:bg-gray-100 p-2 rounded-3xl">
          Airbnb your home
        </h1>
        <Earth />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className=" flex items-center border p-2 gap-2 rounded-3xl hover:cursor-pointer">
              <Menu />
              <img
                className=" object-cover w-10 h-10"
                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                alt=""
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Sign up</DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={openModal}>Log in</button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Gift Cards</DropdownMenuItem>
            <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
