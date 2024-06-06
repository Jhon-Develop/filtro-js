import { navbar } from "../common/navbar";

export function flightManagement() {
    const pageContent = `
        ${navbar()}
        <h2>Flight Management</h2>
        <div id="flight-list"></div>
        <button id="new-flight-button">New Flight</button>
    `;

    const logic = () => {
        const flightListContainer = document.getElementById('flight-list');
        let flights = []; // Lista de vuelos

        // Función para mostrar la lista de vuelos
        const renderFlightList = () => {
            flightListContainer.innerHTML = '';
            flights.forEach(flight => {
                const flightCard = createFlightCard(flight);
                flightListContainer.appendChild(flightCard);
            });
        };

        // Función para crear una tarjeta de vuelo
        const createFlightCard = (flight) => {
            const flightCard = document.createElement('div');
            flightCard.classList.add('flight-card');
            flightCard.innerHTML = `
                <h3>Flight ${flight.number}</h3>
                <p>From: ${flight.origin}</p>
                <p>Departure: ${flight.departureTime}</p>
                <p>Arrival: ${flight.arrivalTime}</p>
                <p>Destination: ${flight.destination}</p>
                <p>Capacity: ${flight.capacity}</p>
                <button class="edit-button" data-flight-id="${flight.id}">Edit</button>
                <button class="delete-button" data-flight-id="${flight.id}">Delete</button>
            `;

            // Event listener para el botón de editar
            flightCard.querySelector('.edit-button').addEventListener('click', () => {
                editFlight(flight.id);
            });

            // Event listener para el botón de eliminar
            flightCard.querySelector('.delete-button').addEventListener('click', () => {
                deleteFlight(flight.id);
            });

            return flightCard;
        };

        // Función para obtener la lista de vuelos del servidor
const fetchFlightList = () => {
    fetch('http://localhost:3004/flights')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch flight list');
            }
            return response.json();
        })
        .then(data => {
            // Guardar los vuelos obtenidos en la variable 'flights'
            flights = data;
            // Renderizar la lista de vuelos
            renderFlightList();
        })
        .catch(error => {
            console.error('Error fetching flight list:', error);
            flightListContainer.innerHTML = '<p>Error fetching flight list. Please try again later.</p>';
        });
};

// Llamada inicial para obtener y mostrar la lista de vuelos
fetchFlightList();


        // Función para agregar un nuevo vuelo
        const addNewFlight = () => {
            const newFlight = {
                id: generateUniqueId(), // Generar un ID único para el nuevo vuelo
                number: 'New Flight',
                origin: '',
                destination: '',
                departureTime: '',
                arrivalTime: '',
                capacity: ''
            };
            flights.push(newFlight);
            renderFlightList();
        };

// Función para editar un vuelo
const editFlight = (flightId) => {
    const flightIndex = flights.findIndex(flight => flight.id === flightId);
    if (flightIndex !== -1) {
        const flight = flights[flightIndex];
        // Aquí puedes implementar la lógica para editar el vuelo en el array 'flights'
        // Por ejemplo, podrías solicitar al usuario que ingrese nuevos valores para el vuelo
        const newNumber = prompt('Enter new flight number:', flight.number);
        const newOrigin = prompt('Enter new origin:', flight.origin);
        const newDestination = prompt('Enter new destination:', flight.destination);
        const newDepartureTime = prompt('Enter new departure time:', flight.departureTime);
        const newArrivalTime = prompt('Enter new arrival time:', flight.arrivalTime);
        const newCapacity = prompt('Enter new capacity:', flight.capacity);

        // Actualizar los valores del vuelo editado
        flights[flightIndex] = {
            ...flight,
            number: newNumber,
            origin: newOrigin,
            destination: newDestination,
            departureTime: newDepartureTime,
            arrivalTime: newArrivalTime,
            capacity: newCapacity
        };

        // Renderizar la lista actualizada
        renderFlightList();
    }
};


        // Función para eliminar un vuelo
        const deleteFlight = (flightId) => {
            flights = flights.filter(flight => flight.id !== flightId);
            renderFlightList();
        };

        // Generar un ID único para un nuevo vuelo
        const generateUniqueId = () => {
            return '_' + Math.random().toString(36).substr(2, 9);
        };

        // Event listener para el botón de nuevo vuelo
        document.getElementById('new-flight-button').addEventListener('click', () => {
            addNewFlight();
        });

        // Llamada inicial para mostrar la lista de vuelos
        renderFlightList();
    };

    return { pageContent, logic };
}
