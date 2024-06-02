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
import { useSelector } from "react-redux";

const Myaccount = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Card className=" w-[450px] mx-auto my-32">
      <CardHeader>
        <CardTitle>Your account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're
          done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Avatar>
            <AvatarImage
              className=" rounded-full m-auto hover:cursor-pointer mb-2"
              src={`${currentUser.profilePicture}`}
            />
          </Avatar>
          <Label className=" font-semibold">Username</Label>
          <Input
            type="text"
            className=" w-full mt-2 mb-2"
            value={currentUser.username}
          />
          <Label className=" font-semibold">Email</Label>
          <Input
            type="email"
            className=" w-full mt-2 mb-2"
            value={currentUser.email}
          />
          <Label className=" font-semibold">Change password</Label>
          <Input
            type="password"
            className=" w-full mt-2 mb-2"
            placeholder="Change your password"
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button className=" w-full bg-red-500 hover:bg-white hover:text-red-500">
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Myaccount;
