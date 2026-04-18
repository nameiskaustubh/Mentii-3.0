import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserProfile } from "../services/firebase/profile.service";

export const useProfile = () => {
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Fetch / Initialize profile
  useEffect(() => {
    if (!currentUser) return;

    const fetchProfile = async () => {
      try {
        // 🔥 TEMP MOCK (replace with Firebase later)
        // const mockData = {
        //   currentStreak: 7,
        //   totalXP: 420,
        //   totalActiveDays: 24,

        //   moduleProgress: {
        //     sentimentAnalysis: {
        //       completed: true,
        //       score: 85,
        //       completedAt: new Date(),
        //     },
        //     cbt: {
        //       completed: true,
        //       summary: { entryCount: 6 },
        //       completedAt: new Date(),
        //     },
        //     colorPsychology: {
        //       completed: false,
        //       score: null,
        //     },
        //   },
        // };

        // setProfile(mockData);
        const data = await fetchUserProfile(currentUser.uid);

if (data) {
  setProfile(data);
} else {
  console.warn("No profile found for user");
  setProfile(null);
}
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  // 🧠 Helper Functions

  const getModuleStatus = (module) => {
    return profile?.moduleProgress?.[module]?.completed
      ? "completed"
      : "pending";
  };

  const getModuleScore = (module) => {
    return profile?.moduleProgress?.[module]?.score ?? null;
  };

  const completedCount = () => {
    if (!profile?.moduleProgress) return 0;

    return Object.values(profile.moduleProgress).filter(
      (m) => m.completed
    ).length;
  };

  const canViewFinalResult = () => {
    return completedCount() === 3;
  };

  // 🎯 Return API
  return {
    profile,
    loading,
    getModuleStatus,
    getModuleScore,
    completedCount,
    canViewFinalResult,
  };
};