import React, { createContext, useContext, useState } from 'react';
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../Context/Authcontext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    if (user) {
      const docRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFavorites(docSnap.data().items || []);
      }
    }
  };

  const toggleFavorite = async (itemId) => {
    const updatedFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];

    setFavorites(updatedFavorites);

    if (user) {
      await setDoc(doc(db, "favorites", user.uid), { items: updatedFavorites });
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
