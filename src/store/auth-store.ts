import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/types/user';

interface AuthState {
    user: UserProfile | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (user: UserProfile, accessToken: string) => void;
    setAccessToken: (token: string) => void;
    logout: () => void;
    updateUser: (user: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            login: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
            setAccessToken: (accessToken) => set({ accessToken }),
            logout: () => {
                localStorage.removeItem('user'); // Clean up legacy manual storage
                localStorage.removeItem('access_token');
                set({ user: null, accessToken: null, isAuthenticated: false });
            },
            updateUser: (updatedUser) => set((state) => ({
                user: state.user ? { ...state.user, ...updatedUser } : null
            })),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                user: state.user, 
                isAuthenticated: state.isAuthenticated 
            }), // Do not persist accessToken
        }
    )
);
