import { X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import OAuth from "./OAuth";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    try {
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      } else {
        onClose();
      }
      dispatch(signInSuccess(data));
    } catch (error) {
      // Handle JSON parsing error or other errors
      console.error(
        "Error parsing JSON or other fetch error:",
        error
      );
      setErrorMessage("An error occurred. Please try again.");
    }
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-3 rounded-lg shadow-md"
        style={{ width: "568px" }}
      >
        <div className=" flex justify-between min-h-[64px] items-center mb-8 border-b">
          <span>
            <X onClick={onClose} className=" hover:cursor-pointer" />
          </span>
          <h1 className=" text-center font-semibold text-lg">
            Login
          </h1>
          <div className=" grow-0 basis-4 text-right"></div>
        </div>

        <h2 className="text-2xl font-semibold mb-5">
          Welcome to Airbnb
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            id="email"
            required
            className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            id="password"
            required
            className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-red-500 text-white w-full py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Login
          </button>
          <OAuth onClose={onClose} />
          {errorMessage && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
