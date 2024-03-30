import React from "react";

interface CategoryProps {
  name: string;
  selectedCategory: string;
  setSelectedCategory: (cate: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  name,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div
      className={`flex items-center border rounded-md px-4 py-2 h-28 w-full ${
        selectedCategory === name.toLowerCase() // Added: Check if the current category matches the selected category
          ? "border-black font-bold" // Added: Apply black border and bold font if selected
          : "border-neutral-300" // Added: Apply neutral border color if not selected
      }`}
      onClick={() => setSelectedCategory(name.toLowerCase())} // Updated: Set selected category to the lowercase name of the category
    >
      <input
        type="radio"
        id="category"
        value={name.toLowerCase()}
        className="hidden"
      />
      <label className="text-center font-bold ">{name}</label>
    </div>
  );
};

export default Category;
