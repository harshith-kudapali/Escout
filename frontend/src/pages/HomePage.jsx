// HomePage.js
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import ChatToggle from "../components/ChatToggle"; // Import the ChatToggle component

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4'>
      <div className='hidden lg:block lg:col-span-1'>
        <Sidebar user={authUser} />
      </div>

       <div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
        <PostCreation user={authUser} />

        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {posts?.length === 0 && (
          <div className='bg-secondary rounded-lg shadow p-8 text-center'>
            <div className='mb-6'>
              <Users size={64} className='mx-auto text-accent' />
            </div>
            <h2 className='text-2xl font-bold mb-4 text-primary'>No Posts Yet</h2>
            <p className='text-neutral mb-6'>Connect with others to start seeing posts in your feed!</p>
          </div>
        )}
      </div>

      {recommendedUsers?.length > 0 && (
  <div className=" col-span-1 lg:col-span-1 hidden lg:block h-screen overflow-y-auto">
    <div className="bg-secondary rounded-lg shadow p-4 h-full">
      <h2 className="font-semibold mb-4">People you may know</h2>
      <div className="space-y-4">
        {recommendedUsers?.map((user) => (
          <RecommendedUser key={user._id} user={user} />
        ))}
      </div>
    </div>
  </div>
)}



      {/* Import the ChatToggle component */}
      <ChatToggle />
    </div>
  );
};

export default HomePage;
