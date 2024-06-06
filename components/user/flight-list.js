import { navigateTo } from "../../utils/router";
import { navbar } from "../common/navbar";

export function flightList() {
    const pageContent = `
        ${ navbar()}
        <h2>Flight List</h2>
        <div id="flight-list"></div>
    `;

    const logic = () => {
        const flightListContainer = document.getElementById('flight-list');
        const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario desde localStorage

        // Función para renderizar la lista de vuelos
        const renderFlightList = (flights) => {
            flightListContainer.innerHTML = '';
            flights.forEach(flight => {
                if (flight.capacity > 0) { // Verificar si hay capacidad disponible
                    const flightCard = document.createElement('div');
                    flightCard.classList.add('flight-card');
                    flightCard.innerHTML = `
                        <h3>Flight ${flight.number}</h3>
                        <p>From: ${flight.origin}</p>
                        <p>Departure: ${flight.departureTime}</p>
                        <p>Arrival: ${flight.arrivalTime}</p>
                        <p>Destination: ${flight.destination}</p>
                        <p>Available Seats: ${flight.capacity}</p>
                        <button class="reserve-button" data-flight-id="${flight.id}">Reserve</button>
                    `;
                    flightListContainer.appendChild(flightCard);

                    // Event listener para el botón de reserva
                    flightCard.querySelector('.reserve-button').addEventListener('click', () => {
                        const flightId = flight.id;
                        const reservationDate = prompt('Enter reservation date (YYYY-MM-DD):');
                        if (reservationDate) {
                            // Crear la reserva y disminuir la capacidad
                            createReservation(flightId, reservationDate, user.id, flightCard, flight);
                        }
                    });
                }
            });
        };

        // Función para crear una reserva y actualizar la capacidad
        const createReservation = (flightId, reservationDate, userId, flightCard, flight) => {
            fetch('http://localhost:3004/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ flightId, user_id: userId, reservationDate }) // Enviar también el ID del usuario
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create reservation');
                }
                return response.json();
            })
            .then(() => {
                // Disminuir la capacidad y eliminar la card si es necesario
                flight.capacity--;
                if (flight.capacity <= 0) {
                    flightCard.remove();
                } else {
                    flightCard.querySelector('p[data-field="capacity"]').textContent = `Available Seats: ${flight.capacity}`;
                }
                alert(`Flight ID ${flightId} reserved for ${reservationDate}`);
            })
            .catch(error => {
                console.error('Error creating reservation:', error);
                alert('Failed to create reservation. Please try again later.');
            });
        };

        // Obtener la lista de vuelos del servidor
        fetch('http://localhost:3004/flights')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch flight list');
                }
                return response.json();
            })
            .then(flights => renderFlightList(flights))
            .catch(error => {
                console.error('Error fetching flight list:', error);
                flightListContainer.innerHTML = '<p>Error fetching flight list. Please try again later.</p>';
            });
    };

    return { pageContent, logic };
}
