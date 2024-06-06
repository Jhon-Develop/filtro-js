import { navigateTo } from "../../utils/router";
import { navbar } from "../common/navbar"; // Importar el Navbar

export function userDashboard() {
    const pageContent = `
        ${ navbar()}
        <h2>Welcome to User Dashboard</h2>
        <p>This is the dashboard for regular users.</p>
        <button id="logout-button">Logout</button>
    `;

    const logic = () => {
        // Logout button event listener
        document.getElementById('logout-button').addEventListener('click', () => {
            // Clear user data from localStorage
            localStorage.removeItem('user');
            // Redirect to login page
            navigateTo('/login');
        });
    };

    return { pageContent, logic };
}
