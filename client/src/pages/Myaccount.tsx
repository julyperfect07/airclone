import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

interface FormData {
  profilePicture: string;
  email: string;
  username: string;
  password: string;
}

const MyAccount: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    profilePicture: currentUser.profilePicture,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [uploadProgress, setUploadProgress] = useState<number | null>(
    null
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/updateProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(
        "There was an error updating the profile!",
        error
      );
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormData({ ...formData, profilePicture: downloadURL });
            setUploadProgress(null);
          }
        );
      }
    );
  };

  return (
    <Card className="w-[450px] mx-auto my-32">
      <CardHeader>
        <CardTitle>Your account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're
          done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveChanges}>
          <div className="relative h-24 w-24 mx-auto">
            <Avatar className="h-full w-full">
              <Input
                type="file"
                className="hidden"
                ref={fileRef}
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <AvatarImage
                className="rounded-full h-full w-full object-cover cursor-pointer"
                src={
                  formData.profilePicture ||
                  currentUser.profilePicture
                }
                onClick={() => fileRef.current?.click()}
              />
            </Avatar>
            {uploadProgress !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <span className="text-white">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            )}
          </div>
          <Label className="font-semibold">Username</Label>
          <Input
            type="text"
            name="username"
            className="w-full mt-2 mb-2"
            value={formData.username}
            onChange={handleChange}
          />
          <Label className="font-semibold">Email</Label>
          <Input
            type="email"
            name="email"
            className="w-full mt-2 mb-2"
            value={formData.email}
            onChange={handleChange}
          />
          <Label className="font-semibold">Change password</Label>
          <Input
            type="password"
            name="password"
            className="w-full mt-2 mb-2"
            placeholder="Change your password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-white hover:text-red-500 border border-red-500"
          >
            Save changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MyAccount;
