-- Create composers table
create table composers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  period text not null,
  image text not null,
  sheet_music_count int default 0,
  recording_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create works table
create table works (
  id uuid default uuid_generate_v4() primary key,
  composer_id uuid references composers(id) on delete cascade not null,
  title text not null,
  edition text,
  year text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create recordings table
create table recordings (
  id uuid default uuid_generate_v4() primary key,
  composer_id uuid references composers(id) on delete cascade not null,
  title text not null,
  performer text,
  duration text,
  year text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) if needed, but for now we can leave it open or set policies.
-- For simplicity in this demo, we might want to disable RLS or create a policy to allow public access if auth is not implemented.
alter table composers enable row level security;
alter table works enable row level security;
alter table recordings enable row level security;

-- Create policies to allow public read/write (WARNING: In production, secure this!)
create policy "Public Access Composers" on composers for all using (true) with check (true);
create policy "Public Access Works" on works for all using (true) with check (true);
create policy "Public Access Recordings" on recordings for all using (true) with check (true);
