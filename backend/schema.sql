-- Create composers table
create table if not exists composers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  period text not null,
  image text not null,
  sheet_music_count int default 0,
  recording_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create works table
create table if not exists works (
  id uuid default uuid_generate_v4() primary key,
  composer_id uuid references composers(id) on delete cascade not null,
  title text not null,
  edition text,
  year text,
  file_url text,
  source_url text,
  source_credit text,
  license text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create recordings table
create table if not exists recordings (
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
-- 创建自定义函数来检查是否为管理员
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer set search_path = public;

-- Create policies (仅管理员可修改)
drop policy if exists "Public Access Composers" on composers;
drop policy if exists "Admin only Composers Insert" on composers;
drop policy if exists "Admin only Composers Update" on composers;
drop policy if exists "Admin only Composers Delete" on composers;
create policy "Authenticated Access Composers" on composers for select using (auth.uid() is not null);
create policy "Admin only Composers Insert" on composers for insert with check (public.is_admin());
create policy "Admin only Composers Update" on composers for update using (public.is_admin());
create policy "Admin only Composers Delete" on composers for delete using (public.is_admin());

drop policy if exists "Public Access Works" on works;
drop policy if exists "Admin only Works Insert" on works;
drop policy if exists "Admin only Works Update" on works;
drop policy if exists "Admin only Works Delete" on works;
create policy "Authenticated Access Works" on works for select using (auth.uid() is not null);
create policy "Admin only Works Insert" on works for insert with check (public.is_admin());
create policy "Admin only Works Update" on works for update using (public.is_admin());
create policy "Admin only Works Delete" on works for delete using (public.is_admin());

drop policy if exists "Public Access Recordings" on recordings;
drop policy if exists "Admin only Recordings Insert" on recordings;
drop policy if exists "Admin only Recordings Update" on recordings;
drop policy if exists "Admin only Recordings Delete" on recordings;
create policy "Authenticated Access Recordings" on recordings for select using (auth.uid() is not null);
create policy "Admin only Recordings Insert" on recordings for insert with check (public.is_admin());
create policy "Admin only Recordings Update" on recordings for update using (public.is_admin());
create policy "Admin only Recordings Delete" on recordings for delete using (public.is_admin());
