import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { Ingredients } from "@/components/ingredients/ingredients";

import { services } from "@/services";

export default function Home() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  useEffect(() => {
    services.ingredients.findAll().then((data) => setIngredients(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha{"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que vocÊ escolheu
      </Text>

      <Ingredients ingredients={ingredients} />
    </View>
  );
}
