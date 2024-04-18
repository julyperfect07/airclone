import { Trash, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Category from "./Category";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

interface CreateListingProps {
  onClose: () => void;
}

const CreateListing: React.FC<CreateListingProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    category: selectedCategory,
    location: location,
    guests: guests,
    rooms: rooms,
    bathrooms: bathrooms,
    images: images,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategory,
      guests: guests,
      rooms: rooms,
      bathrooms: bathrooms,
      images: images,
    }));
  }, [selectedCategory, guests, rooms, bathrooms, images]);

  const categories = [
    "Beach",
    "Windmills",
    "Modern",
    "Countryside",
    "Pools",
    "Islands",
    "Lake",
    "Skiing",
    "Castles",
    "Caves",
    "Camping",
    "Arctic",
    "Desert",
    "Barns",
    "Lux",
  ];

  const increaseIndex = () => {
    setIndex((prev) => prev + 1);
  };
  const decreaseIndex = () => {
    setIndex((prev) => prev - 1);
  };

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

  const handleImageSubmit = () => {
    if (files.length > 0) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setImages((prev) => prev.concat(urls));
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          // Upload completed successfully
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              resolve(downloadUrl); // Resolve the promise with the download URL
            })
            .catch((error) => {
              reject(error); // Reject the promise if an error occurs while getting the download URL
            });
        }
      );
    });
  };

  const handleDeleteImage = (image: string) => {
    setImages(images.filter((img) => img !== image));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/listing/createlisting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
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
        <form onSubmit={handleSubmit}>
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  placeholder="Title"
                />
                <input
                  required
                  className=" p-4 outline-none border border-neutral-300 rounded-md focus:border-red-500"
                  type="text"
                  name=""
                  id="description"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
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
              <ScrollArea className="h-72 w-full">
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category, i) => (
                    <Category
                      name={categories[i]}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      key={i}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
          {index === 3 && (
            <div className=" flex flex-col">
              <h1 className=" text-xl font-bold">
                Where is your place located ?
              </h1>
              <span className=" text-neutral-400 mt-2 mb-5">
                Help guests find you
              </span>
              <input
                required
                className=" p-4 outline-none border border-neutral-300 rounded-md focus:border-red-500"
                type="text"
                name=""
                id="location"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
                placeholder="Location"
              />
            </div>
          )}
          {index === 4 && (
            <div>
              <div className=" flex flex-col">
                <h1 className=" text-xl font-bold">
                  Share some basics about your place
                </h1>
                <span className=" text-neutral-400 mt-2 mb-5">
                  What amenities do you have ?
                </span>
                <div className=" flex flex-col gap-4">
                  <div className=" flex border-b p-5 justify-between items-center">
                    <div>
                      <h1 className=" font-semibold">Guests</h1>
                      <span className=" text-neutral-500">
                        How many guests do you allow ?
                      </span>
                    </div>
                    <div className=" flex gap-2 items-center">
                      <button
                        disabled={guests === 0}
                        type="button"
                        onClick={() => setGuests((prev) => prev - 1)}
                        className=" flex justify-center items-center border border-black w-9 h-9 rounded-full p-4 text-lg cursor-pointer"
                      >
                        -
                      </button>
                      <span className=" text-lg font-semibold">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests((prev) => prev + 1)}
                        className=" flex justify-center items-center border border-black w-9 h-9 rounded-full p-4 text-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className=" flex border-b p-5 justify-between items-center">
                    <div>
                      <h1 className=" font-semibold">Rooms</h1>
                      <span className=" text-neutral-500">
                        How many rooms do you have ?
                      </span>
                    </div>
                    <div className=" flex gap-2 items-center">
                      <button
                        disabled={rooms === 0}
                        type="button"
                        onClick={() => setRooms((prev) => prev - 1)}
                        className=" flex justify-center items-center border border-black w-9 h-9 rounded-full p-4 text-lg cursor-pointer"
                      >
                        -
                      </button>
                      <span className=" text-lg font-semibold">
                        {rooms}
                      </span>
                      <button
                        type="button"
                        onClick={() => setRooms((prev) => prev + 1)}
                        className=" flex justify-center items-center border border-black w-9 h-9 rounded-full p-4 text-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className=" flex p-5 justify-between items-center">
                    <div>
                      <h1 className=" font-semibold">Bathrooms</h1>
                      <span className=" text-neutral-500">
                        How many bathrooms do you have ?
                      </span>
                    </div>
                    <div className=" flex gap-2 items-center">
                      <button
                        disabled={bathrooms === 0}
                        type="button"
                        onClick={() =>
                          setBathrooms((prev) => prev - 1)
                        }
                        className=" flex justify-center items-center border border-black w-9 h-9 rounded-full p-4 text-lg cursor-pointer"
                      >
                        -
                      </button>
                      <span className=" text-lg font-semibold">
                        {bathrooms}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setBathrooms((prev) => prev + 1)
                        }
                        className=" flex justify-center items-center border border-black w-9 h-9 rounded-full p-4 text-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {index === 5 && (
            <div className=" flex flex-col">
              <h1 className=" text-xl font-bold">
                Provide some images about your place
              </h1>
              <span className=" text-neutral-400 mt-2 mb-5">
                Remember quality over quantity
              </span>
              <div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                <Button
                  className=" bg-red-500"
                  onClick={handleImageSubmit}
                  type="button"
                >
                  upload
                </Button>
              </div>
              {images.length > 0 && (
                <ScrollArea className=" w-full whitespace-nowrap rounded-md border mt-5">
                  <div className="flex w-max space-x-4 p-4">
                    {images.map((image) => (
                      <figure key={image} className="shrink-0">
                        <div className="overflow-hidden rounded-md relative">
                          <Trash
                            onClick={() => handleDeleteImage(image)}
                            size={40}
                            strokeWidth={1.5}
                            className="absolute top-0 right-0 z-10 p-2 text-black hover:text-red-500 cursor-pointer"
                          />
                          <img
                            src={image}
                            className="aspect-[3/4] object-cover"
                            width={300}
                            height={400}
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
          )}

          <div className=" flex gap-3 w-full mt-5">
            <Button
              type="button"
              disabled={index === 1}
              onClick={decreaseIndex}
              className=" flex-1 text-lg text-black bg-white border border-black hover:bg-black hover:text-white transition-colors"
            >
              Back
            </Button>
            {index === 5 ? (
              <input
                type="submit"
                value="Create your listing"
                className="flex-1 text-lg text-white border border-red-500 bg-red-500 hover:bg-white hover:text-red-500 transition"
              />
            ) : (
              <Button
                type="button"
                disabled={index === 5}
                onClick={increaseIndex}
                className=" flex-1 text-lg border border-red-500 bg-red-500 hover:bg-white hover:text-red-500 transition"
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
