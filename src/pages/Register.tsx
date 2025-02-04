import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { supabase } from '@/lib/supabase';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { error } = await supabase.from('users').insert([
        {
          id: user.uid,
          name,
          email,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-field">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Full Name"
            title="Enter your full name"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            title="Enter your email address"
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            title="Enter your password"
            placeholder="Enter your password"
            aria-label="Password"
          />
        </div>
        <div className="form-field">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            title="Confirm your password"
            placeholder="Confirm your password"
            aria-label="Confirm Password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <a href="/login" onClick={() => navigate('/login')}>
          Login here
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;