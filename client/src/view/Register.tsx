
import React, { useState } from 'react';
import  { useForm } from 'react-hook-form';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../components/types/types';
import { useMutation } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import AuthAPI from '../api/Auth';
// import { register } from '../api/auth';

export interface IRegister {
  fullname: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IRegister>();
    const [serverError, setServerError] = useState<string | null>(null);


  const mutation = useMutation({
    mutationFn: async (data: IRegister) => {
      setServerError(null); // Clear previous errors
      const response = await new AuthAPI().register({
        fullname: data.fullname,
        email: data.email,
        password: data.password
      });
      try{
        if (!response.ok) {
          throw new Error(response.statusMessage || 'Registration failed. Please try again.');
        }
        return  (
                localStorage.setItem('token', response?.data?.token),
                response?.data
        )
      }catch(err){
        console.log(err);
        throw new Error(response.statusMessage || 'Registration failed. Please try again.');
      }
      
    },
    onSuccess: () => {
      // In a real app, you might auto-login here or show a success message
      navigate(RoutePath.HOME);
      
    },
    onError: (error: Error) => {
      setServerError(error.message);
    }
  });

  const onSubmit = (data: IRegister) => {
    mutation.mutate(data);
  };


return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-500 mt-2">Join us to start managing your team</p>
          </div>

          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${errors.fullname ? 'border-red-500' : 'border-slate-200'}`}
                  {...register('fullname', { required: 'Full name is required' })}
                />
              </div>
              {errors.fullname && <p className="mt-1 text-xs text-red-500">{errors.fullname.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none ${errors.password ? 'border-red-500' : 'border-slate-200'}`}
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
            >
              <span>{mutation.isPending ? 'Creating account...' : 'Create Account'}</span>
              {!mutation.isPending && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Already have an account? <button onClick={() => navigate(RoutePath.ROOT)} className="text-indigo-600 font-medium cursor-pointer hover:underline focus:outline-none">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Register
