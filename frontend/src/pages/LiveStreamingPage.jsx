import React, { useState } from "react";
import { MessageSquare, Users, Heart, Share2 } from "lucide-react";
const LiveStreamingPage = () => {
  
  const streams = [
    {
      id: 1,
      title: "Epic Battle Royale Gaming",
      streamer: "ProGamer123",
      game: "Fortnite",
      viewers: "15.2K",
      description: "Join the action as we dive into the latest battle royale games!",
      streamUrl: "https://www.youtube.com/embed/s5X2cYtMgvY",
      tags: ["English", "Competitive", "Squad Games"]
    },
    {
      id: 2,
      title: "Minecraft Adventure: Building and Exploring",
      streamer: "BlockMaster",
      game: "Minecraft",
      viewers: "8.7K",
      description: "Watch as we build amazing creations and explore new worlds!",
      streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["English", "Building", "Survival"]
    },
    {
      id: 3,
      title: "League of Legends Live Gameplay",
      streamer: "LOLChampion",
      game: "League of Legends",
      viewers: "12.4K",
      description: "Get ready for some intense League of Legends gameplay!",
      streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["English", "Ranked", "Mid Lane"]
    },
    {
      id: 4,
      title: "Just Chatting with Viewers",
      streamer: "ChatMaster",
      game: "Just Chatting",
      viewers: "5.9K",
      description: "Hanging out and chatting with the community!",
      streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tags: ["English", "IRL", "Chat"]
    }
  ];

  const [selectedStream, setSelectedStream] = useState(streams[0]);
  const [showChat, setShowChat] = useState(true);

  return (
    <div className="min-h-screen bg-transparent rounded-lg">
     

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="p-4 ">
          {/* Main Stream */}
          <div className={`${showChat ? 'col-span-9' : 'col-span-12'} space-y-4 `}>
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
            
           { /* Stream Info */}
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src="https://www.thisiscolossal.com/wp-content/uploads/2018/08/Isopoly_05.gif" alt="Streamer" className="rounded-full h-16 w-16" />
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
                    {selectedStream.tags.map(tag => (
                      <span key={tag} className="bg-gray-700 text-neutral px-2 py-1 rounded text-sm">
                      {tag}
                      </span>
                    ))}
                    </div>
                  </div>
                  </div>

                 
                </div>

                {/* Recommended Streams */}
        <div className="mt-8">
          <h3 className="text-white text-xl font-bold mb-4">Recommended Streams</h3>
          <div className="grid grid-cols-4 gap-4">
            {streams.map(stream => (
              <div
                key={stream.id}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700"
                onClick={() => setSelectedStream(stream)}
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
                    <img src="https://www.thisiscolossal.com/wp-content/uploads/2018/08/Isopoly_05.gif" alt="Streamer" className="rounded-full w-12 h-12" />
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
      </div>
    </div>
  );

};

export default LiveStreamingPage;
