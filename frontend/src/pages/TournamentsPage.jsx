import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { Trophy, UserPlus, GamepadIcon } from "lucide-react";

const TournamentsPage = () => {
  const queryClient = useQueryClient();
  const [tournamentForm, setTournamentForm] = useState({
    name: '',
    game: '',
    description: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    prizePool: ''
  });

  // Fetch existing tournaments
  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const res = await axiosInstance.get('/tournaments');
      return res.data;
    }
  });

  // Mutation for creating a tournament
  const createTournamentMutation = useMutation({
    mutationFn: async (tournamentData) => {
      const res = await axiosInstance.post('/tournaments/create', tournamentData);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch tournaments list
      queryClient.invalidateQueries(['tournaments']);
      // Reset form
      setTournamentForm({
        name: '',
        game: '',
        description: '',
        startDate: '',
        endDate: '',
        maxParticipants: '',
        prizePool: ''
      });
    }
  });

  // Mutation for joining a tournament
  const joinTournamentMutation = useMutation({
    mutationFn: async (tournamentId) => {
      const res = await axiosInstance.post(`/tournaments/${tournamentId}/join`);
      return res.data;
    },
    onSuccess: () => {
      // Refetch tournaments to update participant lists
      queryClient.invalidateQueries(['tournaments']);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTournamentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTournamentMutation.mutate(tournamentForm);
  };

  const handleJoinTournament = (tournamentId) => {
    joinTournamentMutation.mutate(tournamentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tournament Creation Form */}
        <div className="bg-secondary shadow-lg rounded-lg p-6">
          <h2 className="text-2xl text-primary font-bold mb-6 flex items-center">
            <Trophy className="mr-2 text-primary" /> Create Tournament
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">Tournament Name</label>
              <input
                type="text"
                name="name"
                value={tournamentForm.name}
                onChange={handleInputChange}
                placeholder="Enter tournament name"
                className="input bg-secondary border-accent input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Game</label>
              <select
                name="game"
                value={tournamentForm.game}
                placeholder="Select game"
                onChange={handleInputChange}
                className="border-accent bg-secondary select select-bordered w-full"
                required
              >
                <option value="">Select Game</option>
                <option value="valorant">Valorant</option>
                <option value="lol">League of Legends</option>
                <option value="csgo">Counter-Strike</option>
                <option value="dota2">Dota 2</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">Description</label>
              <textarea
                name="description"
                value={tournamentForm.description}
                placeholder="Enter tournament description"
                onChange={handleInputChange}
                className="border-accent bg-secondary textarea textarea-bordered w-full"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={tournamentForm.startDate}

                  onChange={handleInputChange}
                  className="bg-secondary border-accent input  input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={tournamentForm.endDate}
                  onChange={handleInputChange}
                  className=" bg-secondary border-accent input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Max Participants</label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={tournamentForm.maxParticipants}
                  onChange={handleInputChange}
                  className="border-accent bg-secondary input input-bordered w-full"
                  min="4"
                  max="64"
                  placeholder="4-64"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Prize Pool ($)</label>
                <input
                  type="number"
                  name="prizePool"
                  value={tournamentForm.prizePool}
                  onChange={handleInputChange}
                  className="border-accent bg-secondary input input-bordered w-full"
                  min="0"
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary text-white w-full mt-4"
              disabled={createTournamentMutation.isLoading}
            >
              Create Tournament
            </button>
          </form>
        </div>

        {/* Tournaments List */}
        <div className="bg-secondary shadow-lg rounded-lg p-6">
          <h2 className="text-2xl text-primary font-bold mb-6 flex items-center">
            <GamepadIcon className="mr-2 text-primary" /> Active Tournaments
          </h2>
          {isLoading ? (
            <div className="text-center">Loading tournaments...</div>
          ) : tournaments?.length === 0 ? (
            <div className="text-center text-neutral">
              No tournaments available
            </div>
          ) : (
            <div className="space-y-4">
              {tournaments?.map((tournament) => (
                <div 
                  key={tournament._id} 
                  className="border rounded-lg border-accent p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-accent text-lg">{tournament.name}</h3>
                    <span className="badge bg-accent-content badge-primary">{tournament.game}</span>
                  </div>
                  <p className="text-sm text-neutral mb-2">{tournament.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <strong>Start:</strong> {new Date(tournament.startDate).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Prize:</strong> ${tournament.prizePool}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <UserPlus className="mr-2" />
                      <span>
                        {tournament.participants.length} / {tournament.maxParticipants} Participants
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleJoinTournament(tournament._id)}
                    className="btn btn-primary text-white "
                    disabled={tournament.participants.length >= tournament.maxParticipants}
                  >
                    {tournament.participants.length >= tournament.maxParticipants 
                      ? 'Tournament Full' 
                      : 'Join Tournament'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;