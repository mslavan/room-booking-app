# Room Booking App

## Overview

This is a simple room booking application that allows users to book rooms without the need for registration. Rooms are treated as independent entities, and the application stores reservations along with user information in a database. The focus is on providing a hassle-free booking experience without payment integration.

## Requirements

### 1. User Flow

- Users can book rooms without the need for registration.
- User information, including Full Name, email, and phoneNumber, is required for making reservations.

### 2. Room Independence

- Rooms are treated as independent entities, not grouped within hotels or other complexes.
- Each room is unique based on its Name and address.

### 3. Room Details

- Rooms have the following details:
  - Name
  - Address
  - Number of rooms
  - Price per day in USD

### 4. Booking Process

- Reservations are stored in the database.
- Duplicate reservations with the same email are considered as bookings made by the same user.

### 5. Payment

- The application does not handle payments.
- Users are expected to settle payments upon arrival at the location.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/room-booking-app.git
    ```

2. Install dependencies:

    ```bash
    cd room-booking-app
    npm install
    ```

3. Set up the database:

    - Create a PostgreSQL database with the name `room_booking_app`.
    - Update the database connection details in the `src/database/database.module.ts` file.

4. Run the application:

    ```bash
    npm start
    ```

## API Documentation

- The API endpoints are documented using Swagger.
- Access the Swagger documentation by navigating to `http://localhost:3000/api-docs` after starting the application.

## Contributing

If you would like to contribute to the development of this application, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

