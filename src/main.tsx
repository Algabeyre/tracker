import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const root = createRoot(document.getElementById('root')!)
const isPlaceholderKey = clerkPublishableKey === 'your_clerk_publishable_key_here'

if (!clerkPublishableKey || isPlaceholderKey) {
  root.render(
    <StrictMode>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        maxWidth: '680px',
        margin: '80px auto',
        padding: '24px',
        color: '#0f172a',
        background: '#f8fafc',
        borderRadius: '18px',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
      }}>
        <h1 style={{ marginBottom: '16px', fontSize: '2rem' }}>Clerk configuration required</h1>
        <p style={{ marginBottom: '12px', lineHeight: 1.75 }}>
          The app cannot start because <code>VITE_CLERK_PUBLISHABLE_KEY</code> is not set or is still a placeholder value.
        </p>
        <p style={{ lineHeight: 1.75 }}>
          Update <code>.env</code> in the project root with your Clerk publishable key, then restart the dev server.
        </p>
      </div>
    </StrictMode>,
  )
} else {
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <App />
      </ClerkProvider>
    </StrictMode>,
  )
}
