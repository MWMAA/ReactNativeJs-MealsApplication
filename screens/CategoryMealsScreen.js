import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import MealList from "../components/MealList";
import { CATEGORIES } from "../data/dummy-data";

const CategoriesMealScreen = (props) => {
  const cid = props.navigation.getParam("categoryID");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(cid) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No Meals Found! Maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoriesMealScreen.navigationOptions = (navigationData) => {
  const cid = navigationData.navigation.getParam("categoryID");
  const selectedcat = CATEGORIES.find((cat) => cat.id === cid);

  return {
    headerTitle: selectedcat.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesMealScreen;
