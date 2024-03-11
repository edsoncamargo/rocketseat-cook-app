create table
  public.ingredients (
    id uuid not null default gen_random_uuid (),
    name character varying null,
    image text null,
    constraint ingredients_pkey primary key (id)
  ) tablespace pg_default;