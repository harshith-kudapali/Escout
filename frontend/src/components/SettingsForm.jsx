// src/components/SettingsForm.jsx
import React, { useState } from "react";

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, like sending the data to the backend
    console.log("Settings saved:", settings);
    // Reset form or show success message
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Account Settings</h2>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          value={settings.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
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
  );
};

export default SettingsForm;
