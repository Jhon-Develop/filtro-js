import { navigateTo } from "../../utils/router";

export function navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.role_id === 1;

    const adminNavbar = `
        <nav>
            <ul>
                <li><a href="/admin">Admin Dashboard</a></li>
                <li><a href="/flight-management">Flight List</a></li>
                <li><a href="/login" class="logout-link">Logout</a></li>
            </ul>
        </nav>
    `;

    const userNavbar = `
        <nav>
            <ul>
                <li><a href="/dashboard">User Dashboard</a></li>
                <li><a href="/flights">Flight List</a></li>
                <li><a href="/login" class="logout-link">Logout</a></li>
            </ul>
        </nav>
    `;

    const navbarContent = isAdmin ? adminNavbar : userNavbar;

    const handleLogout = () => {
        localStorage.clear(); // Elimina todas las claves y valores del almacenamiento local
        navigateTo('/login');
    };

    const navbarElement = document.createElement('div');
    navbarElement.innerHTML = navbarContent;

    navbarElement.querySelector('.logout-link').addEventListener('click', handleLogout);

    return navbarContent;
}
