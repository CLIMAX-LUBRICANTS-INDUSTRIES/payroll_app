import { useState } from "react";
// import { supabase } from "../utils/supabaseclient.js"; // Adjust this path to your actual supabase client location
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import supabase from "../utils/supabaseclient";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        // Basic verification
        if (!email || !password) {
            setErrorMessage("Please fill in all credential fields.");
            setIsLoading(false);
            return;
        }

        try {
            // Supabase client authenticates user session
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                // Catches wrong passwords or unregistered accounts
                setErrorMessage(error.message);
            } else if (data?.user) {
                // Successfully logged in! Push them right into the protected application dashboard
                navigate("/payroll");
            }
        } catch (err) {
            setErrorMessage("An unexpected authentication error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center min-h-screen bg-slate-200 p-4 font-fit">
                <div className="w-full max-w-md bg-white rounded-2xl border border-slate-300 shadow-sm flex flex-col p-8">
                    
                    {/* Brand Header */}
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-extrabold text-slate-700">Welcome Back</h2>
                        <p className="text-gray-500 text-sm mt-1">Climax Payroll Administration Portal</p>
                    </div>

                    {/* Error Box Display */}
                    {errorMessage && (
                        <div className="mb-4 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold font-montserrat">
                            {errorMessage}
                        </div>
                    )}

                    <form 
                        className="flex flex-col gap-5"
                        onSubmit={handleFormSubmit}
                    >
                        {/* Email Address Input */}
                        <div className="relative flex flex-col justify-center">
                            <Mail className="absolute left-4 text-slate-400 pointer-events-none" size={16} />
                            <input
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm bg-white border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 placeholder-slate-400 transition-all font-montserrat"
                                placeholder="Corporate Email"
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative flex flex-col justify-center">
                            <Lock className="absolute left-4 text-slate-400 pointer-events-none" size={16} />
                            <input
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm bg-white border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 placeholder-slate-400 transition-all font-montserrat"
                                placeholder="Password"
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Submission Action Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-100 hover:bg-emerald-300 border border-emerald-200 disabled:bg-emerald-400 px-6 py-3.5 rounded-2xl transition-all cursor-pointer shadow-sm mt-2 font-montserrat tracking-wide"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Verifying Session...
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Sign In to System
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}