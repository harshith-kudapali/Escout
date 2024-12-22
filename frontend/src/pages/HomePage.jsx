// HomePage.js
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"; // Import useState
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import { FcSearch } from "react-icons/fc";
import ChatToggle from "../components/ChatToggle"; // Import the ChatToggle component

const HomePage = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me"); // Ensure API endpoint exists
      return res.data;
    },
    initialData: null, // Provide a default value
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { data: recommendedUsers = [] } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions", {
        params: { limit: 5 },
      });
      return res.data;
    },
    initialData: [], // Provide a default value
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
    initialData: [], // Provide a default value
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />

        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {posts?.length === 0 && (
          <div className="bg-secondary rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              No Posts Yet
            </h2>
            <p className="text-neutral mb-6">
              Connect with others to start seeing posts in your feed!
            </p>
          </div>
        )}
      </div>

      {recommendedUsers?.length > 0 && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-secondary rounded-lg shadow p-4 space-y-4">
            <h2 className="text-xl text-neutral font-semibold mb-4">
              People you may know
            </h2>
            <div className="flex items-center">
              <FcSearch size={30} className="text-primary mr-2 mb-4" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users"
                className="w-full bg-base-100 rounded-lg p-2 mb-4"
              />
            </div>
            <div className="space-y-4 h-96 overflow-y-auto custom-scrollbar">
              {recommendedUsers
                ?.filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <RecommendedUser key={user._id} user={user} />
                ))}
            </div>
            <style>
              {`
                .custom-scrollbar {
                  scrollbar-width: none; /* For Firefox */
                }

                .custom-scrollbar::-webkit-scrollbar {
                  display: none; /* For Chrome, Safari, and Edge */
                }
              `}
            </style>
          </div>
        </div>
      )}

      {/* Import the ChatToggle component */}
      <ChatToggle />
    </div>
  );
};

export default HomePage;
