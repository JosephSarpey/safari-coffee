import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/lib/api/user';

interface AuthState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    login: (user: UserProfile) => void;
    logout: () => void;
    updateUser: (user: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => {
                // Token is now managed via httpOnly cookies (cleared by backend logout endpoint)
                localStorage.removeItem('user'); // Clean up legacy manual storage just in case
                set({ user: null, isAuthenticated: false });
            },
            updateUser: (updatedUser) => set((state) => ({
                user: state.user ? { ...state.user, ...updatedUser } : null
            })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
