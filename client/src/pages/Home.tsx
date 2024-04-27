import React from "react";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { HiHomeModern } from "react-icons/hi2";
import { LuTriangle } from "react-icons/lu";
import { TbPool } from "react-icons/tb";
import { GiIsland } from "react-icons/gi";
import { FaWater } from "react-icons/fa";
import { FaSkiing } from "react-icons/fa";
import { GiCastle } from "react-icons/gi";
import { GiCaveEntrance } from "react-icons/gi";
import { GiCampfire } from "react-icons/gi";
import { LuSnowflake } from "react-icons/lu";
import { TbCactusFilled } from "react-icons/tb";
import { GiBarn } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import ListingsCards from "@/components/ListingsCards";

const Home = () => {
  const categories = [
    {
      icon: <TbBeach className=" w-7 h-7 text-[#767676]" />,
      name: "Beach",
    },
    {
      icon: <GiWindmill className=" w-7 h-7 text-[#767676]" />,
      name: "Windmills",
    },
    {
      icon: <HiHomeModern className=" w-7 h-7 text-[#767676]" />,
      name: "Modern",
    },
    {
      icon: <LuTriangle className=" w-7 h-7 text-[#767676]" />,
      name: "Countryside",
    },
    {
      icon: <TbPool className=" w-7 h-7 text-[#767676]" />,
      name: "Pools",
    },
    {
      icon: <GiIsland className=" w-7 h-7 text-[#767676]" />,
      name: "Islands",
    },
    {
      icon: <FaWater className=" w-7 h-7 text-[#767676]" />,
      name: "Lake",
    },
    {
      icon: <FaSkiing className=" w-7 h-7 text-[#767676]" />,
      name: "Skiing",
    },
    {
      icon: <GiCastle className=" w-7 h-7 text-[#767676]" />,
      name: "Castles",
    },
    {
      icon: <GiCaveEntrance className=" w-7 h-7 text-[#767676]" />,
      name: "Caves",
    },
    {
      icon: <GiCampfire className=" w-7 h-7 text-[#767676]" />,
      name: "Camping",
    },
    {
      icon: <LuSnowflake className=" w-7 h-7 text-[#767676]" />,
      name: "Arctic",
    },
    {
      icon: <TbCactusFilled className=" w-7 h-7 text-[#767676]" />,
      name: "Desert",
    },
    {
      icon: <GiBarn className=" w-7 h-7 text-[#767676]" />,
      name: "Barns",
    },
    {
      icon: <IoDiamondOutline className=" w-7 h-7 text-[#767676]" />,
      name: "Lux",
    },
  ];

  return (
    <div className=" flex flex-col gap-5 max-w-7xl mx-auto mt-5">
      <div className=" flex gap-5 justify-between">
        {categories.map((category) => (
          <div className=" flex flex-col items-center gap-2">
            {category.icon}
            <h1 className=" text-[#767676]">{category.name}</h1>
          </div>
        ))}
      </div>
      <div className="w-full">
        <ListingsCards />
      </div>
    </div>
  );
};

export default Home;
