import { Image, Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";
import { services } from "@/services";

export type IngredientProps = PressableProps & {
  name: string;
  image: string;
  selected?: boolean;
};

export function Ingredient({
  name,
  image,
  selected = false,
  ...rest
}: IngredientProps) {
  const storageUrl = services.storage.getUrl();

  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image
        source={{
          uri: `${storageUrl}${image}`,
        }}
        style={styles.image}
      ></Image>

      <Text style={styles.title}>{name}</Text>
    </Pressable>
  );
}
