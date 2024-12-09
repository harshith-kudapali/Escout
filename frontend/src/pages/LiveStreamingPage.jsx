import React, { useState } from "react";

const LiveStreamingPage = () => {
  // Dummy data for streams
  const streams = [
    {
      id: 1,
      title: "Epic Battle Royale Gaming",
      description: "Join the action as we dive into the latest battle royale games!",
      streamUrl: "https://www.youtube.com/embed/s5X2cYtMgvY", // YouTube embed URL
    },
    {
      id: 2,
      title: "Minecraft Adventure: Building and Exploring",
      description: "Watch as we build amazing creations and explore new worlds!",
      streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual stream URL
    },
    {
      id: 3,
      title: "League of Legends Live Gameplay",
      description: "Get ready for some intense League of Legends gameplay!",
      streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual stream URL
    },
    {
      id: 4,
      title: "Fortnite Live Stream: Victory Royale",
      description: "Watch me play Fortnite and attempt to get that Victory Royale!",
      streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual stream URL
    },
    {
      id: 5, // New stream added
      title: "Epic Gaming Tournament",
      description: "Watch the action-packed tournament with top gamers!",
      streamUrl: "https://www.youtube.com/embed/qabacdJ0eDA", // New YouTube video embed URL
    },
    // Add more streams as needed...
  ];

  // State to store the selected stream URL and title
  const [selectedStream, setSelectedStream] = useState(streams[0]);

  // Handle clicking on a video thumbnail
  const handleStreamClick = (stream) => {
    setSelectedStream(stream);
  };

  return (
    <div className="bg-gray-100">
      {/* Main Page Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">Live Streaming Platform</h1>
        </div>
      </header>

      {/* Live Stream Player Section */}
      <section className="p-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            {/* Main Video Player */}
            <div className="bg-black mb-4 rounded-lg">
              <iframe
                src={selectedStream.streamUrl}
                title={selectedStream.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-96 rounded-lg"
              />
            </div>
            {/* Stream Details */}
            <div className="text-white">
              <h2 className="text-2xl font-semibold mb-2 text-black">{selectedStream.title}</h2>
              <p className="text-lg text-gray-400">{selectedStream.description}</p>
            </div>
          </div>

          {/* Ongoing Live Streams Section */}
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ongoing Live Streams</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* Stream Thumbnails */}
              {streams.map((stream) => (
                <div
                  key={stream.id}
                  className="stream-item bg-white rounded-lg shadow-lg cursor-pointer"
                  onClick={() => handleStreamClick(stream)} // Update selected stream on click
                >
                  <div className="stream-thumbnail relative">
                    <iframe
                      src={stream.streamUrl}
                      title={stream.title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-56 rounded-lg"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-semibold text-black">{stream.title}</h3>
                    <p className="text-gray-600">{stream.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Live Streaming Platform Clone</p>
      </footer>
    </div>
  );
};

export default LiveStreamingPage;
