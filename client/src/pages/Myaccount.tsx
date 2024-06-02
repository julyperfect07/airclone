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
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";

interface FormData {
  profilePicture: string;
  email: string;
  username: string;
  password: string;
}

const MyAccount: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState<FormData>({
    profilePicture: currentUser.profilePicture,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
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
          <Avatar>
            <AvatarImage
              className="rounded-full m-auto hover:cursor-pointer mb-2"
              src={formData.profilePicture}
            />
          </Avatar>
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
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-red-500 hover:bg-white hover:text-red-500 border border-red-500"
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyAccount;
