export { useStore };
import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface Ingredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
  extendedName?: string;
}

interface Recipe {
  id: number;
  title: string;
  likes: number;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
}

type Store = {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
};

type MyPersist = (
  config: StateCreator<Store>,
  options: PersistOptions<Store>
) => StateCreator<Store>;

const useStore = create<Store>(
  (persist as MyPersist)(
    (set) => ({
      recipes: [],
      setRecipes: (recipes) => set({ recipes }),
    }),
    {
      name: "recipe-storage", // Name of the item in the storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;
