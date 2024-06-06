import { login } from '../components/auth/login';
import { register } from '../components/auth/Register';
import { notFound } from '../components/common/not-found';
import { userDashboard } from '../components/user/user-dashboard';
import { adminDashboard } from '../components/admin/admin-dashboard';
import { flightList } from '../components/user/flight-list';
import { flightManagement } from '../components/admin/flight-management';
import { userManagement } from '../components/admin/user-management';

const routes = {
    '/': login,
    '/login': login,
    '/register': register,
    '/dashboard': userDashboard,
    '/admin': adminDashboard,
    '/flights': flightList,
    '/flight-management': flightManagement, // Nueva ruta para la gestión de vuelos
    '/user-management': userManagement, // Nueva ruta para la gestión de usuarios
    '/not-found': notFound
};

export function navigateTo(path) {
    window.history.pushState(null, null, path);
    router();
}

export function router() {
    const root = document.getElementById('root');
    const path = window.location.pathname;
    root.innerHTML = '';

    // Verificar si el usuario está autenticado
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user && path !== '/login' && path !== '/register') {
        // Si no está autenticado y no está en la página de inicio de sesión o registro,
        // redirigirlo a la página de inicio de sesión
        navigateTo('/login');
        return;
    }

    if (routes[path]) {
        const { pageContent, logic } = routes[path]();
        root.innerHTML = pageContent;
        if (typeof logic === 'function') {
            logic();
        }
    } else {
        const { pageContent, logic } = notFound();
        root.innerHTML = pageContent;
        if (typeof logic === 'function') {
            logic();
        }
    }
}

window.addEventListener('popstate', router);
