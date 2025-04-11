import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });
    const {signup, loading} = useUserStore();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await signup(formData);
        } catch (error) {
            console.log("Login failed:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <motion.div
                className="sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="mt-6 bg-gradient-to-b from-purple-700  to-indigo-400 bg-clip-text text-center text-3xl font-extrabold text-transparent  ">
                    Bir Hesap Oluştur
                </h2>
            </motion.div>

            <motion.div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit = {handleSubmit}className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-100"
                            >
                                Ad
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User
                                        className="h-5 w-5 text-indigo-400"
                                        aria-hidden:true
                                    />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                    className="block w-full px-3 py-2 pl-10 text-gray-100 bg-gray-700 border border-gray-700 rounded-md shadow-sm
                                    placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Adınızı Giriniz"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-100"
                            >
                                E-Mail
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail
                                        className="h-5 w-5 text-indigo-400"
                                        aria-hidden:true
                                    />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                    className="block w-full px-3 py-2 pl-10 text-gray-100 bg-gray-700 border border-gray-700 rounded-md shadow-sm
                                    placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="you@examle.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-100"
                            >
                                Şifre
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock
                                        className="h-5 w-5 text-indigo-400"
                                        aria-hidden:true
                                    />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    required
                                    className="block w-full px-3 py-2 pl-10 text-gray-100 bg-gray-700 border border-gray-700 rounded-md shadow-sm
                                    placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="confirmpassword"
                                className="block text-sm font-medium text-gray-100"
                            >
                                Tekrar Şifre
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock
                                        className="h-5 w-5 text-indigo-400"
                                        aria-hidden:true
                                    />
                                </div>
                                <input
                                    id="confirmpassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    required
                                    className="block w-full px-3 py-2 pl-10 text-gray-100 bg-gray-700 border border-gray-700 rounded-md shadow-sm
                                    placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button
                            className="w-full flex justify-center py-2 px-4 border border-transparent
                            rounded-md shadow-md text-sm font-medium text-gray-100 bg-indigo-500
                            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? (
                                <>
                                    <Loader
                                        className="mr-2 h-5 w-5 animate-spin"
                                        aria-hidden="true"
                                    />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <UserPlus
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Üye Ol
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400" >
                        Zaten bir hesabın var mı{" "}
                        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                        Giriş Yap <ArrowRight className="inline h-4 w-4" />
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
