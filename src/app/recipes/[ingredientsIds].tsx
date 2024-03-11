import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/components/recipe";
import { useEffect, useState } from "react";
import { services } from "@/services";
import { Ingredients } from "@/components/ingredients/ingredients";

export default function Recipes() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const ingredientsIds = params.ingredientsIds?.split(",");

  useEffect(() => {
    services.ingredients.findByIds(ingredientsIds).then(setIngredients);
  }, []);

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />

        <Text style={styles.title}>Ingredientes</Text>

        <Ingredients ingredients={ingredients} hasInteraction={false} />
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item, index) => item.id + index}
        style={[
          styles.recipes,
          { marginTop: ingredients && ingredients.length ? -200 + 24 : 0 },
        ]}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
        renderItem={({ item }) => (
          <Recipe
            recipe={item}
            onPressOut={() => router.navigate("/recipe/" + item.id)}
          />
        )}
      />
    </View>
  );
}
