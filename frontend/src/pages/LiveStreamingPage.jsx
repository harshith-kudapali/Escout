import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Users, Heart, Share2 } from "lucide-react";

const API_KEY = "AIzaSyDp5GxfXoryy8FshBOZbA9O9cjZQAHdbog"; // Replace with your YouTube API key
const API_URL = "https://www.googleapis.com/youtube/v3";

const LiveStreamingPage = () => {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [showChat, setShowChat] = useState(true);
  const [error, setError] = useState(null);
  
  // Ref for main stream container
  const mainStreamRef = useRef(null);

  const fetchStreams = async () => {
    try {
      setError(null);
      const response = await fetch(
        `${API_URL}/search?part=snippet&type=video&q=esports&maxResults=8&order=viewCount&eventType=live&regionCode=US&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch streams");
      }
      const data = await response.json();
      const streamsData = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        streamer: item.snippet.channelTitle,
        game: "eSports", // Example value
        viewers: `${Math.floor(Math.random() * 50)}K`, // Mock viewers count
        description: item.snippet.description,
        streamUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
        tags: ["English", "Live", "Gaming"], // Example tags
      }));
      setStreams(streamsData);
      setSelectedStream(streamsData[0] || null); // Handle empty results
    } catch (error) {
      console.error(error);
      setError("Unable to fetch live streams. Please try again later.");
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  const handleStreamClick = (stream) => {
    setSelectedStream(stream);

    // Scroll the main stream container into view
    if (mainStreamRef.current) {
      mainStreamRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-transparent rounded-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="p-4">
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              {/* Refresh Button */}
              <div className="flex justify-between mb-4">
                <h3 className="text-white text-xl font-bold">Live Streams</h3>
                <button
                  onClick={fetchStreams}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Refresh
                </button>
              </div>

              {/* Main Stream */}
              <div
                ref={mainStreamRef} // Attach ref here
                className={`${showChat ? "col-span-9" : "col-span-12"} space-y-4`}
              >
                {selectedStream ? (
                  <>
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                      <iframe
                        src={selectedStream.streamUrl}
                        title={selectedStream.title}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-96"
                      />
                    </div>
                    <div className="bg-secondary rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://www.thisiscolossal.com/wp-content/uploads/2018/08/Isopoly_05.gif"
                            alt="Streamer"
                            className="rounded-full h-16 w-16"
                          />
                          <div>
                            <h2 className="text-2xl font-bold text-white">{selectedStream.title}</h2>
                            <p className="text-purple-400">{selectedStream.streamer}</p>
                            <p className="text-gray-400">{selectedStream.game}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                            <Heart size={24} />
                            <span>Follow</span>
                          </button>
                          <button className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            <Share2 size={24} />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        {selectedStream.tags.map((tag) => (
                          <span key={tag} className="bg-gray-700 text-neutral px-2 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-400">Loading streams...</p>
                )}
              </div>

              {/* Recommended Streams */}
              <div className="mt-8">
                <h3 className="text-white text-xl font-bold mb-4">Recommended Streams</h3>
                <div className="grid grid-cols-4 gap-4">
                  {streams.map((stream) => (
                    <div
                      key={stream.id}
                      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700"
                      onClick={() => handleStreamClick(stream)}
                    >
                      <div className="relative">
                        <iframe
                          src={stream.streamUrl}
                          title={stream.title}
                          frameBorder="0"
                          className="w-full aspect-video"
                        />
                        <div className="absolute bottom-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
                          LIVE
                        </div>
                        <div className="absolute bottom-2 right-2 bg-secondary bg-opacity-70 text-white text-sm px-2 py-1 rounded flex items-center">
                          <Users size={16} className="mr-1" />
                          {stream.viewers}
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src="https://www.thisiscolossal.com/wp-content/uploads/2018/08/Isopoly_05.gif"
                            alt="Streamer"
                            className="rounded-full w-12 h-12"
                          />
                          <div>
                            <h4 className="text-primary font-medium">{stream.title}</h4>
                            <p className="text-neutral text-sm">{stream.streamer}</p>
                            <p className="text-neutral text-sm">{stream.game}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveStreamingPage;
