
-- Tabela de usuários (dentistas e administradores)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text not null,
  user_type text check (user_type in ('dentist', 'admin')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table public.users enable row level security;

-- Criar política para usuários autenticados
create policy "Users can view their own profile"
  on public.users for select
  using ( auth.uid() = id );

-- Tabela de pacientes
create table public.patients (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text unique,
  phone text,
  birth_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table public.patients enable row level security;

-- Criar política para dentistas e admins
create policy "Authenticated users can view patients"
  on public.patients for select
  using ( auth.role() = 'authenticated' );

-- Tabela de consultas
create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patients not null,
  dentist_id uuid references public.users not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text check (status in ('scheduled', 'completed', 'cancelled')) not null default 'scheduled',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table public.appointments enable row level security;

-- Criar política para visualização de consultas
create policy "Users can view their appointments"
  on public.appointments for select
  using ( auth.uid() = dentist_id or exists (
    select 1 from public.users
    where users.id = auth.uid()
    and users.user_type = 'admin'
  ));

-- Tabela de disponibilidade dos dentistas
create table public.availability (
  id uuid default uuid_generate_v4() primary key,
  dentist_id uuid references public.users not null,
  day_of_week integer check (day_of_week between 0 and 6) not null,
  start_time time not null,
  end_time time not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(dentist_id, day_of_week)
);

-- Habilitar RLS
alter table public.availability enable row level security;

-- Criar política para visualização de disponibilidade
create policy "Users can view availability"
  on public.availability for select
  using ( auth.role() = 'authenticated' );

-- Triggers para updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Adicionar triggers para todas as tabelas
create trigger handle_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.patients
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.appointments
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.availability
  for each row
  execute function public.handle_updated_at();

