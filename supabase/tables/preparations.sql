create table
  public.preparations (
    id uuid not null default gen_random_uuid (),
    recipe_id uuid null default gen_random_uuid (),
    description text null,
    step bigint null,
    constraint preparations_pkey primary key (id)
  ) tablespace pg_default;