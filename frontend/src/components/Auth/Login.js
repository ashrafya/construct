// frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, 
    Input, VStack, Heading, useToast 
} from '@chakra-ui/react';
import axios from 'axios'; // For API calls

const Login = () => {
    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between login/register
    const [role, setRole] = useState('contractor'); // Default role
    const toast = useToast(); // For notifications

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Determine API endpoint
        const endpoint = isRegistering ? '/auth/register' : '/auth/login';
        
        try {
            // Call backend API
            const { data } = await axios.post(
                `http://localhost:5000${endpoint}`,
                isRegistering ? { email, password, role } : { email, password }
            );
            
            // If login returns a token
            if (data.token) {
                localStorage.setItem('token', data.token); // Store token
                toast({
                    title: 'Success!',
                    description: isRegistering 
                        ? 'Account created' 
                        : 'Logged in successfully',
                    status: 'success',
                });
                window.location = '/dashboard'; // Redirect after login
            }
        } catch (err) {
            // Show error notification
            toast({
                title: 'Error',
                description: err.response?.data || 'Authentication failed',
                status: 'error',
            });
        }
    };

    return (
        <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Heading mb={6}>
                {isRegistering ? 'Create Account' : 'Login'}
            </Heading>
            
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    {/* Email Field */}
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                        />
                    </FormControl>
                    
                    {/* Password Field */}
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </FormControl>
                    
                    {/* Role Selector (Shows only during registration) */}
                    {isRegistering && (
                        <FormControl isRequired>
                            <FormLabel>Role</FormLabel>
                            <select 
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    padding: '0.5rem', 
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '0.375rem' 
                                }}
                            >
                                <option value="consultant">Consultant</option>
                                <option value="contractor">Contractor</option>
                                <option value="client">Client</option>
                            </select>
                        </FormControl>
                    )}
                    
                    {/* Submit Button */}
                    <Button type="submit" colorScheme="blue" width="full">
                        {isRegistering ? 'Register' : 'Sign In'}
                    </Button>
                    
                    {/* Toggle between Login/Register */}
                    <Button 
                        variant="link" 
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering 
                            ? 'Already have an account? Login' 
                            : 'Need an account? Register'}
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Login;
