import { navigateTo } from "../../utils/router";

export function login() {
    const pageContent = `
      <h2>Login</h2>
      <form id="login-form">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Login</button>
      </form>
      <p>Not registered? <a href="#" id="register-link">Register</a></p>
    `;

    const logic = () => {
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const response = await fetch(`http://localhost:3004/users?email=${email}&password=${password}`);
                const users = await response.json();
                
                if (users.length > 0) {
                    const user = users[0];
                    alert(`Welcome ${user.username}!`);
                    localStorage.setItem('user', JSON.stringify(user));
                    if (user.role_id === 1) {
                        navigateTo('/admin');
                    } else {
                        navigateTo('/dashboard');
                    }
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });

        document.getElementById('register-link').addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('/register');
        });
    };

    return { pageContent, logic };
}
