create table
  public.recipes (
    id uuid not null default gen_random_uuid (),
    name character varying null,
    minutes bigint null,
    image text null,
    constraint recipes_pkey primary key (id)
  ) tablespace pg_default;