import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { User } from "lucide-react";

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    },
  });

  const [settings, setSettings] = useState({
    name: "",
    username: "",
    email: "",
    about: "",
    location: "",
  });

  useEffect(() => {
    if (authUser) {
      setSettings({
        name: authUser.name || "",
        username: authUser.username || "",
        email: authUser.email || "",
        about: authUser.about || "",
        location: authUser.location || "",
      });
    }
  }, [authUser]);

  const mutation = useMutation({
    mutationFn: async (updatedSettings) => {
      const response = await axiosInstance.put("/users/profile", updatedSettings);
      return response.data;
    },
    onSuccess: (data) => {
      alert("Profile updated successfully!");
      queryClient.invalidateQueries(["authUser"]);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(settings);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <div className="bg-secondary rounded-lg shadow p-8">
          <h1 className="text-3xl text-primary font-bold mb-6">Account Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "username", "email", "about", "location"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-Neutral font-medium mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={settings[field]}
                  onChange={handleInputChange}
                  className="w-full border-accent bg-secondary text-Neutral px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-1 hidden lg:block">
        <div className="bg-secondary rounded-lg shadow p-4">
          <h2 className="font-semibold mb-4">Account Info</h2>
          <div className="flex items-center mb-4">
            <User size={32} className="mr-4 text-accent-content" />
            <div>
              <p className="text-sm text-neutral">Username: {authUser?.username}</p>
              <p className="text-sm text-neutral">Email: {authUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
