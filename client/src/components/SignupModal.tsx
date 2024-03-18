import { X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface SignupModalProps {
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    onClose();
  };

  // Close the modal when clicking outside of it
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
            Sign up
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-red-500 text-white w-full py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sign up
          </button>
          <div className=" flex w-full justify-between px-5 py-2 border rounded-lg border-black hover:cursor-pointer hover:bg-neutral-200">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="black"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M12 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.3807 7 14.6307 7.55964 15.5355 8.46447"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <h1> Continue with Google</h1>
            <div className=" grow-0 basis-4 text-right"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
