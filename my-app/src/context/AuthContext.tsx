import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithOtp: (email: string) => Promise<{ error: Error | null; message?: string }>;
  signInWithPassword: (email: string, pass: string) => Promise<{ error: Error | null }>;
  signUpWithPassword: (email: string, pass: string, name?: string) => Promise<{ error: Error | null }>;
  signInWithMobileSession: (data: { phone: string; fullName?: string; id?: string }) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Fetch initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        setLoading(false);
      } else {
        // Check for active verified mobile donor session
        const savedMobile = localStorage.getItem('tmf_donor_session');
        if (savedMobile) {
          try {
            const d = JSON.parse(savedMobile);
            if (d && d.phone) {
              const mockUser = {
                id: d.id || `usr_mob_${Date.now()}`,
                app_metadata: {},
                user_metadata: {
                  full_name: d.fullName || 'Verified Donor',
                  phone: d.phone,
                },
                aud: 'authenticated',
                created_at: d.timestamp || new Date().toISOString(),
                email: d.email || undefined,
                phone: d.phone,
                role: 'authenticated',
              } as unknown as User;
              setUser(mockUser);
            }
          } catch (_) {}
        }
        setLoading(false);
      }
    });

    // 2. Listen to state changes from Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        setUser(session.user ?? null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithMobileSession = (data: { phone: string; fullName?: string; id?: string }) => {
    const donorRecord = {
      id: data.id || `usr_mob_${Date.now()}`,
      phone: data.phone,
      fullName: data.fullName || 'Verified Donor',
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('tmf_donor_session', JSON.stringify(donorRecord));

    const mockUser = {
      id: donorRecord.id,
      app_metadata: {},
      user_metadata: {
        full_name: donorRecord.fullName,
        phone: donorRecord.phone,
      },
      aud: 'authenticated',
      created_at: donorRecord.timestamp,
      phone: donorRecord.phone,
      role: 'authenticated',
    } as unknown as User;

    setUser(mockUser);
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/donor-portal`,
        },
      });
      return { error };
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      return { error: err };
    }
  };

  const signInWithOtp = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      return { error, message: error ? undefined : 'Magic login link sent to your inbox!' };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signInWithPassword = async (email: string, pass: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signUpWithPassword = async (email: string, pass: string, name?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: name || '',
          },
        },
      });
      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('tmf_donor_session');
    setUser(null);
    setSession(null);
    try {
      await supabase.auth.signOut();
    } catch (_) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithGoogle,
        signInWithOtp,
        signInWithPassword,
        signUpWithPassword,
        signInWithMobileSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
