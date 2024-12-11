// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { User } from "lucide-react";

const SettingsPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const [settings, setSettings] = useState({
    username: authUser?.username || "",
    email: authUser?.email || "",
    password: "", // For password change
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/users/update", settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings", error);
      alert("There was an error updating your settings.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={settings.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                New Password (Optional)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={settings.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
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
            <User size={32} className="mr-4 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Username: {authUser?.username}</p>
              <p className="text-sm text-gray-600">Email: {authUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
