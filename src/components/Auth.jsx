import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, signup, selectRegisteredUsers } from '../store/slices/authSlice';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const registeredUsers = useSelector(selectRegisteredUsers);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) return alert('Fill all fields');
        if (isLogin) {
            const user = registeredUsers.find(u => u.username === username && u.password === password);
            if (user) dispatch(setCredentials({ user: user.username, token: 'dummy-token-' + Date.now(), role: user.role }));
            else alert('Invalid credentials');
        } else {
            if (registeredUsers.some(u => u.username === username)) return alert('Username already taken');
            dispatch(signup({ username, password }));
            alert('Signup successful! Please login.');
            setIsLogin(true);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        background: 'color-mix(in oklab, var(--foreground) 5%, transparent)',
        border: '1px solid color-mix(in oklab, var(--foreground) 12%, transparent)',
        borderRadius: '10px',
        color: 'var(--foreground)',
        outline: 'none',
        fontFamily: 'var(--font-sans)',
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4"
             style={{ background: 'var(--background)' }}>
            <div className="w-full max-w-md rounded-3xl p-10 text-center"
                 style={{
                     background: 'color-mix(in oklab, var(--card) 75%, transparent)',
                     backdropFilter: 'blur(20px) saturate(160%)',
                     border: '1px solid color-mix(in oklab, var(--foreground) 10%, transparent)',
                     boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                 }}>
                <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-glow)' }}>
                    Indian Lens Wholesale
                </h2>
                <h3 className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.18em] mb-1.5"
                               style={{ color: 'var(--muted-foreground)' }}>Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                               placeholder="admin" style={inputStyle} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.18em] mb-1.5"
                               style={{ color: 'var(--muted-foreground)' }}>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                               placeholder="••••••••" style={inputStyle} />
                    </div>
                    <button type="submit"
                            className="w-full py-3 font-semibold rounded-xl transition-all"
                            style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)', color: 'var(--primary-foreground)' }}>
                        {isLogin ? 'Sign In' : 'Register Account'}
                    </button>
                </form>

                <p className="mt-6 text-sm font-semibold cursor-pointer hover:underline"
                   style={{ color: 'var(--primary-glow)' }}
                   onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'New here? Set up an account' : 'Back to secure login'}
                </p>
            </div>
        </div>
    );
};

export default Auth;
