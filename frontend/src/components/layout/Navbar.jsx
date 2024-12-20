import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, Settings as SettingsIcon } from "lucide-react";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <nav className="bg-secondary shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                className="h-10 rounded"
                src="/escout-high-resolution-logo-grayscale-transparent.png"
                alt="Fragnation"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <Link to={"/"} className="text-neutral flex flex-col items-center">
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>
                <Link to="/network" className="text-neutral flex flex-col items-center relative">
                  <Users size={20} />
                  <span className="text-xs hidden md:block">My Network</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs
                      rounded-full size-3 md:size-4 flex items-center justify-center"
                    >
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>
                <Link to="/notifications" className="text-neutral flex flex-col items-center relative">
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Notifications</span>
                  {unreadNotificationCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs
                      rounded-full size-3 md:size-4 flex items-center justify-center"
                    >
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to={`/profile/${authUser.username}`}
                  className="text-neutral flex flex-col items-center"
                >
                  <User size={20} />
                  <span className="text-xs hidden md:block">Me</span>
                </Link>
                <Link to="/settings" className="text-neutral flex flex-col items-center">
                  <SettingsIcon size={20} />
                  <span className="text-xs hidden md:block">Settings</span>
                </Link>
                <button
                  className="flex items-center space-x-1 text-sm text-white hover:text-gray-800"
                  onClick={() => logout()}
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Gradient Sign In Button */}
                <Link
                  to="/login"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                >
                  Sign In
                </Link>
                {/* Gradient Join Now Button */}
                <Link
                  to="/signup"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
