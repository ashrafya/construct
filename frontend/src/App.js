// frontend/src/App.js
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Auth/Dashboard'; // Create this tomorrow!
import ProtectedRoute from './components/Auth/ProtectedRoute'; // See below

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['consultant', 'contractor', 'client']}>
                <Dashboard /> {/* Will build tomorrow */}
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/consultant-only" 
            element={
              <ProtectedRoute allowedRoles={['consultant']}>
                <h1>Consultant Dashboard</h1>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;