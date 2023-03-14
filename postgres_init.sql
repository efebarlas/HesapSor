-- create table profiles();
-- CAUTION: THIS SCRIPT WILL CREATE EVERY POSTGRESQL
-- RESOURCE FROM SCRATCH, WHICH MEANS ALL DATA WILL BE LOST!!!
drop table if exists canvas_templates;
drop table table_documents;
drop table if exists entity_access;
drop table if exists entities;
DROP TABLE IF EXISTS profiles;

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

INSERT INTO profiles VALUES ('89a9cec6-ee50-4d27-90af-82a6076dc4a8','2023-02-13 16:02:47.733+00','Test Person',NULL,NULL,'9');


-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);


drop trigger if exists on_auth_user_created on auth.users;
-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars')
  on conflict do nothing;

DO $$ 
BEGIN
-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

DO $$ 
BEGIN
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');
EXCEPTION when duplicate_object then
null;
end $$;


CREATE TABLE entities (
  id SERIAL PRIMARY KEY
); 

create TABLE table_documents (
  id SERIAL PRIMARY KEY,
  table_content jsonb,
  created date,
  viewableByPublic boolean,
  last_updated date
  -- history hstore[],
  -- any other attributes you want to include
) INHERITS (entities);

INSERT INTO table_documents VALUES 
(2, '[{"id":1,"age":"12","col":"red","dob":"","name":"Oli Bob"},{"id":2,"age":"1","col":"blue","dob":"14/05/1982","name":"Mary May"},{"id":3,"age":"42","col":"green","dob":"22/05/1982","name":"Christine Lobowski"},{"id":4,"age":"125","col":"orange","dob":"01/08/1980","name":"Brendon Philips"},{"id":5,"age":"16","col":"yellow","dob":"31/01/1999","name":"Margret Marmajuke"}]', NULL, NULL, NULL),
(3, '[{"id":1,"age":"12","col":"red","dob":"","name":"Oli Bob"},{"id":2,"age":"1","col":"blue","dob":"14/05/1982","name":"Mary May"},{"id":3,"age":"42f","col":"green","dob":"22/05/1982","name":"Christine Lobowski"},{"id":4,"age":"125","col":"orange","dob":"01/08/1980","name":"Brendon Philips"},{"id":5,"age":"16","col":"yellow","dob":"31/01/1999","name":"Margret Marmajuke"}]', NULL, NULL, NULL);

create TABLE canvas_templates (
  id SERIAL PRIMARY KEY,
  tableId integer not null references table_documents(id) unique,
  canvasData text not null
) INHERITS (entities);

CREATE TABLE entity_access (
  id SERIAL PRIMARY KEY,
  entity_id integer NOT NULL REFERENCES entities(id),
  role_name TEXT NOT NULL CHECK (role_name in ('view', 'edit', 'moderate', 'manage')),
  user_id uuid not null REFERENCES auth.users,
  UNIQUE (entity_id, role_name, user_id)
);

/*
CREATE POLICY manage_policy ON entity_access
FOR ALL
TO manage
USING (
  EXISTS (
    SELECT 1 FROM entity_access
    WHERE entity_id = NEW.entity_id AND role_name = 'manage' AND user_id = current_user
  )
);


CREATE POLICY edit_policy ON my_table
FOR UPDATE TO edit_role
USING (EXISTS (
    SELECT 1 FROM entity_access
    WHERE entity_id = my_table.id AND role_name = 'edit' AND user_id = current_user
));

CREATE POLICY view_policy ON my_table
FOR SELECT TO view_role
USING (EXISTS (
    SELECT 1 FROM entity_access
    WHERE entity_id = my_table.id AND (role_name = 'view' OR user_id = current_user)
));

create policy "Users can view their own roles." on profiles
  for select
  to PUBLIC
  using (auth.uid() = )
*/
-- what happens to a users' entities when only they had the manage role for it?

-- users can only add / remove roles for entities they have a manage role for.

-- users can create a manage role for the entity they have created.

-- users can only create entities if the owner of said entity
