import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  header: {
    paddingHorizontal: 24,
    paddingTop: 62,
    marginBottom: 12,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.heading.md,
    marginTop: 22,
    marginBottom: 24,
  },
  recipes: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  recipesContent: {
    gap: 16,
  },
});
