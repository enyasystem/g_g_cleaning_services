-- Create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL, -- e.g., 'Pending', 'Confirmed', 'Completed', 'Cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add RLS (Row Level Security) policies if you plan to expose this table directly to client-side Supabase calls
-- For now, we'll assume Server Actions handle writes, so RLS is less critical for insertion.
-- If you later fetch bookings directly from the client, you'll need RLS.
