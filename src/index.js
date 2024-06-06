import '../assets/css/style.css';
import { login } from '../components/auth/login';
import { register } from '../components/auth/Register';
import { navbar } from '../components/common/navbar';
import { notFound } from '../components/common/not-found';
import { adminDashboard } from '../components/admin/admin-dashboard';
import { flightManagement } from '../components/admin/flight-management';
import { userManagement } from '../components/admin/user-management';
import { flightList } from '../components/user/flight-list';
import { userDashboard } from '../components/user/user-dashboard';
import { router } from '../utils/router';

document.addEventListener('DOMContentLoaded', () => {
    navbar();
    router();
});
