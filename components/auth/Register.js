import { navigateTo } from '../../utils/router';

export function register() {
    const pageContent = `
      <h2>Register</h2>
      <form id="register-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="date">Birthday:</label>
        <input type="date" id="birthday" name="birthday" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <a href="#" id="login-link">Login</a></p>
    `;

    const logic = () => {
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const birthday = e.target.birthday.value;
            const password = e.target.password.value;
            const role_id = 2;

            fetch('http://localhost:3004/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, birthday, password, role_id })
            })
                .then(response => response.json())
                .then(() => {
                    alert('User registered successfully!');
                    navigateTo('/login');
                });
        });

        document.getElementById('login-link').addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('/login');
        });
    };

    return { pageContent, logic };
}
