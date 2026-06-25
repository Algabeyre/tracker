import Dashboard from './components/Dashboard';
import { Activity } from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from '@clerk/clerk-react';
import './App.css';

function App() {
  const { user } = useUser();

  return (
    <div className="app-container">
      <header className="app-header animate-fade-in">
        <div className="brand-row">
          <Activity size={36} color="#60a5fa" />
          <h1>Tracker</h1>
        </div>

        <div className="auth-actions">
          <SignedIn>
            <span className="user-display">Hi, {user?.firstName || user?.fullName || 'there'}</span>
            <SignOutButton>
              <button className="auth-button">Sign out</button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="auth-button">Sign in</button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>
      
      <main>
        <SignedIn>
          <Dashboard />
        </SignedIn>

        <SignedOut>
          <div className="auth-prompt">
            <h2>Sign in to access your budget dashboard</h2>
            <p>Use Clerk authentication for secure login and session management.</p>
            <SignInButton mode="modal">
              <button className="auth-button auth-primary">Sign in with Clerk</button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}

export default App;
