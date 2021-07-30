import React, { useEffect, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import DefaultText from "../components/DefaultText";
import HeaderButton from "../components/HeaderButton";
import { toggleFavourite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const allMeals = useSelector((state) => state.meals.meals);
  const mealID = props.navigation.getParam("mealId");
  const isMealFavourite = useSelector((state) =>
    state.meals.favouriteMeals.some((meal) => mealID === meal.id)
  );
  const selectedMeal = allMeals.find((meal) => mealID === meal.id);

  const dispatch = useDispatch();

  const toggleFavouritehandler = useCallback(() => {
    dispatch(toggleFavourite(mealID));
  }, [dispatch, mealID]);

  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavouritehandler });
  }, [toggleFavouritehandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isMealFavourite });
  }, [isMealFavourite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  // const mealID = navigationData.navigation.getParam("mealId");
  // const selectedMeal = allMeals.find((meal) => mealID === meal.id);
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavourite = navigationData.navigation.getParam("toggleFav");
  const isFav = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favourite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavourite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
