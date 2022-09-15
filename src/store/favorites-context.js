import { createContext, useEffect, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export const FavoritesContextProvider = (props) => {
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      setUserFavorites(favorites);
    }
  }, []);

  const addFavoritesHandler = (favoriteMeetup) => {
    setUserFavorites((prevUserFavorites) => {
      const userFav = prevUserFavorites.concat(favoriteMeetup);
      localStorage.setItem("favorites", JSON.stringify(userFav));
      return userFav;
    });
  };

  const removeFavoritesHandler = (meetupId) => {
    setUserFavorites((prevUserFavorites) => {
      const userFav = prevUserFavorites.filter(
        (meetup) => meetup.id !== meetupId
      );
      localStorage.setItem("favorites", JSON.stringify(userFav));
      return userFav;
    });
  };

  const itemIsFavoritesHandler = (meetupId) => {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  };

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    removeFavorite: removeFavoritesHandler,
    itemIsFavorite: itemIsFavoritesHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
