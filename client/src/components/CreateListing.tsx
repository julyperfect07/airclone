import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface CreateListingProps {
  onClose: () => void;
}

const CreateListing: React.FC<CreateListingProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(2);

  const increaseIndex = () => {
    setIndex((prev) => prev + 1);
  };
  const decreaseIndex = () => {
    setIndex((prev) => prev - 1);
  };

  console.log(index);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className=" w-[568px] bg-white p-8 rounded-lg shadow-md"
      >
        <div className=" flex justify-between items-center border-b p-4 mb-8">
          <span>
            <X onClick={onClose} className=" hover:cursor-pointer" />
          </span>
          <h1 className=" text-center font-semibold text-lg">
            Airbnb your home
          </h1>
          <div className=" grow-0 basis-4 text-right"></div>
        </div>
        <form>
          {index === 1 && (
            <div className=" flex flex-col gap-2">
              <h1 className=" font-bold text-xl">
                How would you describe your place ?
              </h1>
              <span className=" text-neutral-400">
                {" "}
                Short and sweet works best !
              </span>
              <div className=" w-full flex flex-col gap-4">
                <input
                  required
                  className=" p-4 outline-none border border-neutral-300 rounded-md focus:border-red-500"
                  type="text"
                  name=""
                  id="title"
                  placeholder="Title"
                />
                <input
                  required
                  className=" p-4 outline-none border border-neutral-300 rounded-md focus:border-red-500"
                  type="text"
                  name=""
                  id="description"
                  placeholder="Description"
                />
              </div>
            </div>
          )}
          {index === 2 && (
            <div className="flex flex-col gap-2">
              <h1 className=" text-xl font-bold">
                Which of these describes your place ?
              </h1>
              <span className=" text-neutral-400">
                Pick a category
              </span>
            </div>
          )}
          {index === 3 && <div></div>}
          {index === 4 && <div></div>}
          {index === 5 && <div></div>}

          <div className=" flex gap-3 w-full mt-5">
            <Button
              disabled={index === 1}
              onClick={decreaseIndex}
              className=" flex-1 text-lg text-black bg-white border border-black hover:bg-black hover:text-white transition-colors"
            >
              Back
            </Button>
            <Button
              disabled={index === 5}
              onClick={increaseIndex}
              className=" flex-1 text-lg border border-red-500 bg-red-500 hover:bg-white hover:text-red-500 transition"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
