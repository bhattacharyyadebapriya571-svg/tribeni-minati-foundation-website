import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { signInWithGoogle, signInWithOtp, signInWithPassword, signUpWithPassword } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { error, message } = await signInWithOtp(email);
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg(message || 'Check your inbox for your secure login link!');
    }
  };

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'signup') {
      const { error } = await signUpWithPassword(email, password, fullName);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Account created successfully! You are now logged in.');
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      }
    } else {
      const { error } = await signInWithPassword(email, password);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        onSuccess?.();
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md double-bezel-outer my-auto max-h-[90vh] flex flex-col"
        >
          <div className="double-bezel-inner p-6 sm:p-8 bg-white text-[#151C18] relative overflow-y-auto max-h-[85vh]">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/[0.04] text-[#5C6760] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#1B3B2B]/8 p-2 flex items-center justify-center border border-[#1B3B2B]/15 mb-3 shadow-xs">
                <img
                  src="/tmf-assets/minati-badges/tmf-circular-emblem.png"
                  alt="TMF"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="font-['DM_Serif_Display'] text-2xl text-[#151C18]">
                {mode === 'signup'
                  ? 'Join Tribeni Minati Foundation'
                  : mode === 'magic'
                  ? 'Passwordless Magic Login'
                  : 'Donor & Member Sign In'}
              </h2>
              <p className="text-xs text-[#5C6760] mt-1 font-normal">
                Manage your 80G tax receipts, volunteer badges, and donation history
              </p>
            </div>

            {/* Google 1-Click OAuth Button */}
            <div className="mb-5">
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  setErrorMsg(null);
                  const { error } = await signInWithGoogle();
                  setLoading(false);
                  if (error) {
                    setErrorMsg(error.message);
                  }
                }}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl border border-black/[0.12] bg-white hover:bg-slate-50 text-[#151C18] text-xs font-bold transition-all flex items-center justify-center gap-3 shadow-xs hover:shadow-sm cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/[0.08]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                  <span className="bg-white px-2 text-[#5C6760]">or use email</span>
                </div>
              </div>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex p-1 bg-black/[0.04] rounded-xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white text-[#1B3B2B] shadow-xs'
                    : 'text-[#5C6760] hover:text-[#151C18]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-[#1B3B2B] shadow-xs'
                    : 'text-[#5C6760] hover:text-[#151C18]'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('magic');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'magic'
                    ? 'bg-white text-[#1B3B2B] shadow-xs'
                    : 'text-[#5C6760] hover:text-[#151C18]'
                }`}
              >
                Magic OTP
              </button>
            </div>

            {/* Error & Success Alerts */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Auth Form */}
            {mode === 'magic' ? (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#5C6760] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="donor@example.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.12] bg-[#FAF8F5] text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1B3B2B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#1B3B2B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{loading ? 'Sending Link...' : 'Send Magic Login Link'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleEmailPassword} className="space-y-3.5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-[11px] font-bold text-[#5C6760] uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.12] bg-[#FAF8F5] text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1B3B2B]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-[#5C6760] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="donor@example.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.12] bg-[#FAF8F5] text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1B3B2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5C6760] uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.12] bg-[#FAF8F5] text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1B3B2B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#1B3B2B] hover:bg-[#26533D] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#1B3B2B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer pt-2.5"
                >
                  <span>
                    {loading
                      ? 'Authenticating...'
                      : mode === 'signup'
                      ? 'Create Foundation Account'
                      : 'Sign In'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Mode Switcher Links */}
            <div className="mt-5 pt-4 border-t border-black/[0.06] text-center space-y-2 text-xs">
              {mode === 'signin' ? (
                <>
                  <div>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-[#1B3B2B] font-bold hover:underline cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setMode('magic')}
                      className="text-amber-800 text-[11px] font-semibold hover:underline cursor-pointer"
                    >
                      Sign in with Magic Link OTP
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-[#1B3B2B] font-bold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Statutory Security Note */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#5C6760] font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>DPDP & 256-bit Encrypted Auth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
