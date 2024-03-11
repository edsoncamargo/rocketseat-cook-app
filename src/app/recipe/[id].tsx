import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, router, useLocalSearchParams } from "expo-router";

import { styles } from "./styles";
import { Step } from "@/components/step";
import { Loading } from "@/components/loading";
import { Ingredients } from "@/components/ingredients/ingredients";
import { services } from "@/services";

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [preparations, setPreparations] = useState<PreparationsResponse[]>([]);

  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    services.recipes
      .show(id)
      .then((response) => setRecipe(response))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    services.ingredients
      .findByRecipeId(id)
      .then((response) => setIngredients(response));
  }, []);

  useEffect(() => {
    services.preparations
      .findByRecipeId(id)
      .then((response) => setPreparations(response));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!id || !recipe) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.header}>
        <MaterialIcons
          size={32}
          name="arrow-back"
          onPress={() => router.back()}
        />

        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.time}>{recipe.minutes} minutos de preparo</Text>

        <Ingredients ingredients={ingredients} hasInteraction={false} />
      </View>

      <ScrollView
        style={[
          styles.body,
          { marginTop: ingredients && ingredients.length ? -200 + 24 : 0 },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.preparation}>Modo de preparado</Text>

          <View style={styles.preparations}>
            {preparations.map((item) => (
              <Step
                key={item.id}
                step={item.step}
                description={item.description}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
