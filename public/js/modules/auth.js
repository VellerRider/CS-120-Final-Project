export class AuthHandler {
    constructor() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        // 登录表单处理
        loginForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            await this.login(username, password);
        });
        
        // 注册表单处理
        registerForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            await this.register(username, password);
        });
    }
    
    // 用户登录
    async login(username, password) {
        try {
            console.log("Attempting login with username:", username);
            const response = await fetch('/api/user/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                console.error("Login failed: ", data.message);
                alert(`Login failed: ${data.message}`);
                return;
            }
            
            console.log("Login successful: ", data);
            
            // 保存令牌到客户端
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            
            // 登录成功后重定向到主页
            window.location.href = '/index.html';
        } catch (error) {
            console.error('Error during login request:', error);
            alert('An error occurred. Please try again.');
        }
    }

    // 用户注册
    async register(username, password) {
        try {
            console.log("Attempting registration with username:", username);
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                console.error('Registration failed:', data.message);
                alert(`Registration failed: ${data.message}`);
                return;
            }
    
            console.log('Registration successful:', data);
            // 注册成功后自动登录
            await this.login(username, password);
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
    }
}