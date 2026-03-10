import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Customer Auth States
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Admin Auth States
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleCustomerAuth = (e) => {
    e.preventDefault();
    setError('');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isLoginView) {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        navigate('/menu');
      } else {
        setError('Invalid username or password.');
      }
    } else {
      if (users.find(u => u.username === username)) {
        setError('Username already exists.');
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created successfully! Please Sign In.');
        setIsLoginView(true);
        setPassword('');
        setShowPassword(false);
      }
    }
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    setAdminError('');
    
    // Hardcoded Admin Credentials
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      navigate('/admin');
    } else {
      setAdminError('Invalid admin credentials.');
    }
  };

  const toggleAuthView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setUsername('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img 
          src="/images/logo.png" 
          alt="Restaurant Logo" 
          className="login-logo"
          onClick={() => {
            setIsAdmin(!isAdmin);
            setAdminError('');
            setError('');
          }}
          title="Click to switch login mode"
        />
        <h1>Flavour Fly</h1>
        <h2>Your Gateway to Culinary Delights!</h2>
        
        {isAdmin ? (
          <div className="login-section">
            <p className="login-caption admin-caption">Admin Access</p>
            
            <form onSubmit={handleAdminAuth} className="auth-form">
              <input 
                type="text" 
                placeholder="Admin Username" 
                value={adminUsername} 
                onChange={(e) => setAdminUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Admin Password" 
                value={adminPassword} 
                onChange={(e) => setAdminPassword(e.target.value)} 
                required 
              />
              {adminError && <p className="error-text">{adminError}</p>}
              
              <button type="submit" className="admin-btn">
                Login as Admin
              </button>
            </form>
          </div>
        ) : (
          <div className="login-section">
            <p className="login-caption customer-caption">
              Customer {isLoginView ? 'Sign In' : 'Sign Up'}
            </p>
            
            <form onSubmit={handleCustomerAuth} className="auth-form">
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <span 
                  className="password-toggle-icon" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {error && <p className="error-text">{error}</p>}
              
              <button type="submit" className="customer-btn">
                {isLoginView ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <p className="toggle-auth" onClick={toggleAuthView}>
              {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;