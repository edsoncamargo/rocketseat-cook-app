import { Alert, ScrollView } from "react-native";
import { styles } from "./styles";
import { Ingredient, IngredientProps } from "../ingredient/ingredient";
import { useState } from "react";
import { Selected } from "../selected";
import { router } from "expo-router";

type IngredientsProps = {
  ingredients: IngredientProps[];
  hasInteraction?: boolean;
};

export function Ingredients({
  ingredients,
  hasInteraction = true,
}: IngredientsProps) {
  const [selecteds, setSelecteds] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (hasInteraction) {
      if (selecteds.includes(value))
        return setSelecteds((state) => state.filter((item) => item !== value));

      setSelecteds((state) => [...state, value]);
    }
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => setSelecteds([]),
      },
    ]);
  }

  function handleSearch() {
    const url = `/recipes/${selecteds}`;
    router.navigate(url);
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {ingredients.map((item) => (
          <Ingredient
            key={item.id}
            name={item.name}
            image={item.image}
            selected={selecteds.includes(item.id!)}
            onPress={() => handleToggleSelected(item.id!)}
          />
        ))}
      </ScrollView>

      {selecteds.length > 0 && (
        <Selected
          quantity={selecteds.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </>
  );
}
