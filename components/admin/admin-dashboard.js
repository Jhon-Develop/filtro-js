import { navigateTo } from "../../utils/router";
import { navbar } from "../common/navbar";

export function adminDashboard() {
    const pageContent = `
        ${navbar()}
        <h2>Admin Dashboard</h2>
        <p>Welcome to the Admin Dashboard! Here you can manage flights and reservations.</p>
        <button id="manage-flights">Manage Flights</button>
        <button id="manage-reservations">Manage Reservations</button>
        <button id="logout-button">Logout</button>
        <div id="reservation-list"></div>
    `;

    const logic = () => {
        document.getElementById('manage-flights').addEventListener('click', () => {
            // Lógica para redirigir a la página de gestión de vuelos
            navigateTo('/flight-management');
        });

        document.getElementById('manage-reservations').addEventListener('click', () => {
            // Mostrar la lista de reservas
            fetchReservationList();
        });

        document.getElementById('logout-button').addEventListener('click', () => {
            // Clear user data from localStorage
            localStorage.removeItem('user');
            // Redirect to login page
            navigateTo('/login');
        });

        // Variable para almacenar las reservas
        let reservations = [];

        const fetchReservationList = () => {
            const reservationListContainer = document.getElementById('reservation-list');

            // Realizar la petición fetch para obtener la lista de reservas
            fetch('http://localhost:3004/reservations')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch reservation list');
                    }
                    return response.json();
                })
                .then(data => {
                    reservations = data; // Asignar los datos obtenidos a la variable reservations
                    // Renderizar la lista de reservas
                    renderReservationList();
                })
                .catch(error => {
                    console.error('Error fetching reservation list:', error);
                    reservationListContainer.innerHTML = '<p>Error fetching reservation list. Please try again later.</p>';
                });
        };

        const renderReservationList = () => {
            const reservationListContainer = document.getElementById('reservation-list');
            reservationListContainer.innerHTML = '';

            reservations.forEach(reservation => {
                const reservationItem = createReservationItem(reservation);
                reservationListContainer.appendChild(reservationItem);
            });
        };

        const createReservationItem = (reservation) => {
            const reservationItem = document.createElement('div');
            reservationItem.classList.add('reservation-item');
            reservationItem.innerHTML = `
                <p>Reservation ID: ${reservation.id}</p>
                <p>Flight ID: ${reservation.flightId}</p>
                <p>User ID: ${reservation.userId}</p>
                <p>Reservation Date: ${reservation.reservationDate}</p>
                <button class="edit-reservation" data-reservation-id="${reservation.id}">Edit</button>
                <button class="delete-reservation" data-reservation-id="${reservation.id}">Delete</button>
            `;

            // Event listener para el botón de editar reserva
            reservationItem.querySelector('.edit-reservation').addEventListener('click', () => {
                editReservation(reservation.id);
            });

            // Event listener para el botón de eliminar reserva
            reservationItem.querySelector('.delete-reservation').addEventListener('click', () => {
                deleteReservation(reservation.id);
            });

            return reservationItem;
        };

        const editReservation = (reservationId) => {
            const reservationIndex = reservations.findIndex(reservation => reservation.id === reservationId);
            if (reservationIndex !== -1) {
                const reservation = reservations[reservationIndex];
                // Aquí puedes implementar la lógica para editar la reserva en el array 'reservations'
                const newFlightId = prompt('Enter new Flight ID:', reservation.flightId);
                const newUserId = prompt('Enter new User ID:', reservation.userId);
                const newReservationDate = prompt('Enter new Reservation Date:', reservation.reservationDate);

                // Actualizar los valores de la reserva editada
                reservations[reservationIndex] = {
                    ...reservation,
                    flightId: newFlightId,
                    userId: newUserId,
                    reservationDate: newReservationDate
                };

                // Enviar la actualización al servidor
                fetch(`http://localhost:3004/reservations/${reservationId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reservations[reservationIndex])
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update reservation');
                    }
                    return response.json();
                })
                .then(() => {
                    alert(`Reservation with ID ${reservationId} updated successfully`);
                    fetchReservationList(); // Volver a cargar la lista de reservas
                })
                .catch(error => {
                    console.error('Error updating reservation:', error);
                    alert('Failed to update reservation. Please try again later.');
                });
            }
        };

        const deleteReservation = (reservationId) => {
            fetch(`http://localhost:3004/reservations/${reservationId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete reservation');
                }
                alert(`Reservation with ID ${reservationId} deleted successfully`);
                fetchReservationList(); // Volver a cargar la lista de reservas
            })
            .catch(error => {
                console.error('Error deleting reservation:', error);
                alert('Failed to delete reservation. Please try again later.');
            });
        };

        // Inicializar sin mostrar las reservas
        renderReservationList();
    };

    return { pageContent, logic };
}
