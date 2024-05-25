import ReservationsCards from "@/components/ReservationsCards";
import { useState } from "react";
import { FaSkiing, FaWater } from "react-icons/fa";
import {
  GiBarn,
  GiCampfire,
  GiCastle,
  GiCaveEntrance,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { HiHomeModern } from "react-icons/hi2";
import { IoDiamondOutline } from "react-icons/io5";
import { LuSnowflake, LuTriangle } from "react-icons/lu";
import {
  TbBaselineDensitySmall,
  TbBeach,
  TbCactusFilled,
  TbPool,
} from "react-icons/tb";

const ReservationsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    {
      icon: (
        <TbBaselineDensitySmall
          className={`w-7 h-7 ${
            activeCategory === "All" ? "text-black" : "text-[#767676]"
          }`}
        />
      ),
      name: "All",
    },
    {
      icon: (
        <TbBeach
          className={`w-7 h-7 ${
            activeCategory === "Beach"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Beach",
    },
    {
      icon: (
        <GiWindmill
          className={`w-7 h-7 ${
            activeCategory === "Windmills"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Windmills",
    },
    {
      icon: (
        <HiHomeModern
          className={`w-7 h-7 ${
            activeCategory === "Modern"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Modern",
    },
    {
      icon: (
        <LuTriangle
          className={`w-7 h-7 ${
            activeCategory === "Countryside"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Countryside",
    },
    {
      icon: (
        <TbPool
          className={`w-7 h-7 ${
            activeCategory === "Pools"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Pools",
    },
    {
      icon: (
        <GiIsland
          className={`w-7 h-7 ${
            activeCategory === "Islands"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Islands",
    },
    {
      icon: (
        <FaWater
          className={`w-7 h-7 ${
            activeCategory === "Lake"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Lake",
    },
    {
      icon: (
        <FaSkiing
          className={`w-7 h-7 ${
            activeCategory === "Skiing"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Skiing",
    },
    {
      icon: (
        <GiCastle
          className={`w-7 h-7 ${
            activeCategory === "Castles"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Castles",
    },
    {
      icon: (
        <GiCaveEntrance
          className={`w-7 h-7 ${
            activeCategory === "Caves"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Caves",
    },
    {
      icon: (
        <GiCampfire
          className={`w-7 h-7 ${
            activeCategory === "Camping"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Camping",
    },
    {
      icon: (
        <LuSnowflake
          className={`w-7 h-7 ${
            activeCategory === "Arctic"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Arctic",
    },
    {
      icon: (
        <TbCactusFilled
          className={`w-7 h-7 ${
            activeCategory === "Desert"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Desert",
    },
    {
      icon: (
        <GiBarn
          className={`w-7 h-7 ${
            activeCategory === "Barns"
              ? "text-black"
              : "text-[#767676]"
          }`}
        />
      ),
      name: "Barns",
    },
    {
      icon: (
        <IoDiamondOutline
          className={`w-7 h-7 ${
            activeCategory === "Lux" ? "text-black" : "text-[#767676]"
          }`}
        />
      ),
      name: "Lux",
    },
  ];
  const handleClick = (name: string) => {
    setActiveCategory(name);
  };
  return (
    <div className=" flex flex-col gap-5 max-w-7xl mx-auto mt-5">
      <div className=" flex gap-5 justify-between">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleClick(category.name)}
            className={` flex flex-col items-center gap-2 cursor-pointer ${
              activeCategory === category.name
                ? " font-semibold text-black underline"
                : ""
            }`}
          >
            {category.icon}
            <h1
              className={`${
                activeCategory === category.name
                  ? " text-black"
                  : "text-[#767676]"
              } `}
            >
              {category.name}
            </h1>
          </div>
        ))}
      </div>
      <div className="w-full">
        <ReservationsCards category={activeCategory} />
      </div>
    </div>
  );
};

export default ReservationsPage;
