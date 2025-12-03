import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersProfile, { IUsersProfile } from '../models/UsersProfile';

// Create Profile handler 
export const createProfile = async (req: Request, res: Response) => {

  try {
    const { userId, currentJob, age, company, skills } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const skillsArray = Array.isArray(skills) ? skills : [];

    const newProfile: IUsersProfile = new UsersProfile({
      userId,
      currentJob,
      age,
      company,
      skills: skillsArray,
    });
    await newProfile.save();
    return res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  }catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// get Profile by id handler
export const getProfileById = async (req: Request, res: Response) => {
  const userId  = req.params.id;

  try {
    const profile = await UsersProfile.findOne({userId});
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

//update Profile handler
export const updateProfileById = async (req: Request, res: Response) => {
  const userId  = req.params.id;
  const { currentJob, age, company, skills } = req.body;

  try {
    const updatedProfile = await UsersProfile.findOneAndUpdate(
      { userId },
      { currentJob, age, company, skills },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

// delete Profile handler by userId
export const deleteProfileById = async (req: Request, res: Response) => {
  const userId  = req.params.id;

  try {
    const deletedProfile = await UsersProfile.findOneAndDelete({ userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export default { createProfile, getProfileById, updateProfileById, deleteProfileById };