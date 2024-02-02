-- Create the database
CREATE DATABASE room_booking_app;

RAISE NOTICE 'Created database room_booking_app';

-- Use the created database
\c room_booking_app;

RAISE NOTICE 'Connected to database room_booking_app';

-- Grant privileges if needed
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;

RAISE NOTICE 'Granted privileges';
