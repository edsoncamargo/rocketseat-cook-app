create table
  public.recipes_ingredients (
    id uuid not null default gen_random_uuid (),
    recipe_id uuid null,
    ingredient_id uuid null,
    constraint recipes_ingredients_pkey primary key (id),
    constraint public_recipes_ingredients_ingredients_id_fkey foreign key (ingredient_id) references ingredients (id),
    constraint public_recipes_ingredients_recipe_id_fkey foreign key (recipe_id) references recipes (id)
  ) tablespace pg_default;