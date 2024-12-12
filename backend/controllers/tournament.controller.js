import { Tournament } from '../models/tournament.model.js';

import User from '../models/user.model.js';  // Corrected import

export const createTournament = async (req, res) => {
  try {
    const { 
      name, 
      game, 
      description, 
      startDate, 
      endDate, 
      maxParticipants, 
      prizePool 
    } = req.body;

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: 'Start date must be before end date' });
    }

    const newTournament = new Tournament({
      name,
      game,
      description,
      startDate,
      endDate,
      maxParticipants,
      prizePool,
      creator: req.user._id,
      participants: [req.user._id]
    });

    await newTournament.save();

    res.status(201).json(newTournament);
  } catch (error) {
    console.error('Error creating tournament:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({
      endDate: { $gte: new Date() } // Only fetch upcoming/ongoing tournaments
    })
    .populate('creator', 'name username profilePicture')
    .populate('participants', 'name username profilePicture');

    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const joinTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    // Check if tournament is full
    if (tournament.participants.length >= tournament.maxParticipants) {
      return res.status(400).json({ error: 'Tournament is full' });
    }

    // Check if user is already participating
    if (tournament.participants.includes(req.user._id)) {
      return res.status(400).json({ error: 'Already joined this tournament' });
    }

    tournament.participants.push(req.user._id);
    await tournament.save();

    res.status(200).json(tournament);
  } catch (error) {
    console.error('Error joining tournament:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({
      $or: [
        { creator: req.user._id },
        { participants: req.user._id }
      ]
    })
    .populate('creator', 'name username profilePicture')
    .populate('participants', 'name username profilePicture');

    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Error fetching user tournaments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};