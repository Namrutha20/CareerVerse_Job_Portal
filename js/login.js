// Client-side authentication for demo/portfolio use only.
// Do NOT use this as-is for real production auth.

const STORAGE_KEYS = {
    USERS: 'jp_users',
    CURRENT_USER: 'jp_current_user'
};

function getStoredUsers() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.USERS);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Failed to parse stored users', e);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Hash password with SHA‑256 using Web Crypto API
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function setCurrentUser(user, remember) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        headline: user.headline,
        skills: user.skills,
        lastLogin: new Date().toISOString(),
        remember: !!remember
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(payload));
    // Keep backward compatibility with existing auth checks
    localStorage.setItem('user', JSON.stringify(payload));
}

function getCurrentUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem('user');
}

function showFieldError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message || '';
}

function setStatus(id, message, type = 'info') {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message || '';
    el.className = `form-alert ${type}`;
}

function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(toggleId);
    if (!input || !btn) return;

    btn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.textContent = isPassword ? 'Hide' : 'Show';
    });
}

function evaluatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}

function initPasswordStrengthMeter() {
    const input = document.getElementById('regPassword');
    const barContainer = document.getElementById('passwordStrength');
    if (!input || !barContainer) return;

    const bar = barContainer.querySelector('.password-strength-bar');
    const text = barContainer.querySelector('.password-strength-text');

    input.addEventListener('input', () => {
        const value = input.value || '';
        const score = evaluatePasswordStrength(value);
        if (!bar || !text) return;

        bar.dataset.score = String(score);
        if (!value) {
            text.textContent = 'Minimum 8 characters, use letters, numbers & symbols.';
        } else if (score <= 1) {
            text.textContent = 'Weak password';
        } else if (score === 2) {
            text.textContent = 'Could be stronger';
        } else if (score === 3) {
            text.textContent = 'Strong password';
        } else {
            text.textContent = 'Very strong password';
        }
    });
}

async function handleRegisterSubmit(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const username = document.getElementById('regUsername')?.value.trim();
    const password = document.getElementById('regPassword')?.value || '';
    const confirmPassword = document.getElementById('confirmPassword')?.value || '';
    const role = document.getElementById('role')?.value;
    const headline = document.getElementById('headline')?.value.trim();
    const skills = document.getElementById('skills')?.value.trim();
    const acceptTerms = document.getElementById('acceptTerms')?.checked;

    ['fullNameError', 'emailError', 'regUsernameError', 'regPasswordError', 'confirmPasswordError', 'roleError']
        .forEach(id => showFieldError(id, ''));
    setStatus('registerStatus', '');

    let hasError = false;
    if (!fullName) {
        showFieldError('fullNameError', 'Full name is required.');
        hasError = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        showFieldError('emailError', 'Enter a valid email address.');
        hasError = true;
    }

    if (!username || username.length < 3) {
        showFieldError('regUsernameError', 'Username must be at least 3 characters.');
        hasError = true;
    }

    if (password.length < 8) {
        showFieldError('regPasswordError', 'Password must be at least 8 characters.');
        hasError = true;
    } else if (evaluatePasswordStrength(password) < 3) {
        showFieldError('regPasswordError', 'Use upper/lowercase letters, numbers & symbols.');
        hasError = true;
    }

    if (password !== confirmPassword) {
        showFieldError('confirmPasswordError', 'Passwords do not match.');
        hasError = true;
    }

    if (!role) {
        showFieldError('roleError', 'Please select a role.');
        hasError = true;
    }

    if (!acceptTerms) {
        setStatus('registerStatus', 'You must accept the data storage notice to continue.', 'error');
        hasError = true;
    }

    const users = getStoredUsers();
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        showFieldError('regUsernameError', 'This username is already taken.');
        hasError = true;
    }
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showFieldError('emailError', 'An account with this email already exists.');
        hasError = true;
    }

    if (hasError) return;

    setStatus('registerStatus', 'Creating your account…', 'info');

    const passwordHash = await hashPassword(password);
    const newUser = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        fullName,
        email,
        username,
        passwordHash,
        role,
        headline,
        skills,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser, true);

    setStatus('registerStatus', 'Account created successfully. Redirecting…', 'success');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 600);
}

async function handleLoginSubmit(e) {
    e.preventDefault();

    const usernameOrEmail = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value || '';
    const remember = document.getElementById('rememberMe')?.checked;

    showFieldError('usernameError', '');
    showFieldError('passwordError', '');
    setStatus('loginStatus', '');

    if (!usernameOrEmail) {
        showFieldError('usernameError', 'Please enter your email or username.');
        return;
    }
    if (!password) {
        showFieldError('passwordError', 'Please enter your password.');
        return;
    }

    const users = getStoredUsers();
    const passwordHash = await hashPassword(password);
    const user = users.find(u =>
        u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
        u.email.toLowerCase() === usernameOrEmail.toLowerCase()
    );

    if (!user || user.passwordHash !== passwordHash) {
        setStatus('loginStatus', 'Invalid credentials. Please check your details and try again.', 'error');
        return;
    }

    setCurrentUser(user, !!remember);
    setStatus('loginStatus', 'Login successful. Redirecting…', 'success');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 500);
}

function initGuestAccess() {
    const btn = document.getElementById('guestAccess');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const guestUser = {
            id: 'guest',
            username: 'guest',
            email: 'guest@example.com',
            fullName: 'Guest User',
            role: 'guest',
            headline: 'Exploring opportunities',
            skills: 'Browsing only'
        };
        setCurrentUser(guestUser, false);
        window.location.href = 'home.html';
    });
}

function initDemoLogin() {
    const btn = document.getElementById('demoLogin');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const users = getStoredUsers();
        let demoUser = users.find(u => u.username === 'demo');
        if (!demoUser) {
            const demoPassword = 'DemoUser@123';
            const passwordHash = await hashPassword(demoPassword);
            demoUser = {
                id: 'demo-user',
                fullName: 'Demo Candidate',
                email: 'demo.candidate@example.com',
                username: 'demo',
                passwordHash,
                role: 'job-seeker',
                headline: 'Full‑stack developer (demo account)',
                skills: 'JavaScript, React, Node.js',
                createdAt: new Date().toISOString()
            };
            users.push(demoUser);
            saveUsers(users);
        }
        setCurrentUser(demoUser, false);
        setStatus('loginStatus', 'Logging in as demo user…', 'info');
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
        togglePasswordVisibility('password', 'togglePassword');
        initGuestAccess();
        initDemoLogin();
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
        togglePasswordVisibility('regPassword', 'toggleRegPassword');
        initPasswordStrengthMeter();
    }
});
