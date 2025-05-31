import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const SignupContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--light) 0%, #f5f5f5 100%);
  font-family: 'Inter', sans-serif;
  align-items: center;
  margin-top:20px;
  justify-content: center;
`;

const FormWrapper = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: var(--light);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
`;

const FormTitle = styled.h2`
  margin: 0 0 2rem;
  color: var(--text);
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: var(--text);

  &:focus {
    border-color: var(--primary-light);
    box-shadow: 0 0 0 3px rgba(110, 0, 255, 0.1);
    outline: none;
  }

  &::placeholder {
    color: var(--text-light);
    opacity: 0.6;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  transition: all 0.3s ease;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(to right, var(--primary), var(--primary-light));
  color: var(--light);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(110, 0, 255, 0.3);
  position: relative;
  overflow: hidden;
`;

const Notification = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  font-size: 0.9rem;
  text-align: center;
  background: ${props => props.isError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'};
  color: ${props => props.isError ? '#ff3333' : 'var(--primary)'};
  border: 1px solid ${props => props.isError ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)'};
`;

const ToggleLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-light);
  font-size: 0.9rem;

  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(110, 0, 255, 0.05);
`;

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", pass: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.text();

      if (!res.ok) {
        setIsError(true);
        setMessage(data || "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      setIsError(false);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      setIsError(true);
      setMessage("Failed to connect to backend.");
      setIsSubmitting(false);
    }
  };

  return (
    <SignupContainer>
      <FormWrapper
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FloatingShapes>
          <FloatingShape
            initial={{ x: -100, y: -100, width: 200, height: 200 }}
            animate={{ x: [null, 50, -100], y: [null, 100, -100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <FloatingShape
            initial={{ x: 300, y: 200, width: 150, height: 150 }}
            animate={{ x: [null, 200, 300], y: [null, 300, 200] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          />
        </FloatingShapes>

        <FormTitle>Create Your Account</FormTitle>
        
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </InputIcon>
            <FormInput
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </InputIcon>
            <FormInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </InputIcon>
            <FormInput
              type="password"
              name="pass"
              placeholder="Password"
              value={form.pass}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ display: 'inline-block' }}
              >
                🔄
              </motion.span>
            ) : (
              'Sign Up'
            )}
          </SubmitButton>
        </form>
        
        <AnimatePresence>
          {message && (
            <Notification
              isError={isError}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </Notification>
          )}
        </AnimatePresence>
        
        <ToggleLink>
          <a href="/login">Already have an account? Login</a>
        </ToggleLink>
      </FormWrapper>
    </SignupContainer>
  );
};

export default SignupPage;