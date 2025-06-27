import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ApiService } from '../../services/ApiService';
import { useAuth } from './AuthContext';

interface UserStats {
  solvedChallenges: number;
  totalPoints: number;
  level: string;
  completedExercises: string[];
  totalAttempts: number;
  averageScore: number;
}

interface StatsContextType {
  stats: UserStats | null;
  loading: boolean;
  refreshStats: () => Promise<void>;
  markExerciseCompleted: (exerciseId: string, result: any) => Promise<void>;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

interface StatsProviderProps {
  children: ReactNode;
}

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userStats = await ApiService.getUserStats(user.uid);
      setStats(userStats);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      // Définir des stats par défaut si l'API n'est pas disponible
      setStats({
        solvedChallenges: 0,
        totalPoints: 0,
        level: 'Débutant',
        completedExercises: [],
        totalAttempts: 0,
        averageScore: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    await fetchStats();
  };

  const markExerciseCompleted = async (exerciseId: string, result: any) => {
    if (!user || !stats) return;

    try {
      // Mettre à jour les statistiques sur le serveur
      await ApiService.updateUserStats(user.uid, exerciseId, result);
      
      // Mettre à jour les statistiques localement
      if (result.passed && !stats.completedExercises.includes(exerciseId)) {
        const updatedStats = {
          ...stats,
          solvedChallenges: stats.solvedChallenges + 1,
          totalPoints: stats.totalPoints + (result.points || 10),
          completedExercises: [...stats.completedExercises, exerciseId],
          totalAttempts: stats.totalAttempts + 1,
          averageScore: ((stats.averageScore * stats.totalAttempts) + result.score) / (stats.totalAttempts + 1)
        };

        // Calculer le niveau basé sur les points
        if (updatedStats.totalPoints >= 1000) {
          updatedStats.level = 'Expert';
        } else if (updatedStats.totalPoints >= 500) {
          updatedStats.level = 'Avancé';
        } else if (updatedStats.totalPoints >= 100) {
          updatedStats.level = 'Intermédiaire';
        } else {
          updatedStats.level = 'Débutant';
        }

        setStats(updatedStats);
      } else {
        // Juste mettre à jour les tentatives si l'exercice n'est pas réussi
        setStats({
          ...stats,
          totalAttempts: stats.totalAttempts + 1,
          averageScore: ((stats.averageScore * stats.totalAttempts) + result.score) / (stats.totalAttempts + 1)
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des statistiques:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStats();
    } else {
      setStats(null);
    }
  }, [user]);

  return (
    <StatsContext.Provider value={{
      stats,
      loading,
      refreshStats,
      markExerciseCompleted
    }}>
      {children}
    </StatsContext.Provider>
  );
};
