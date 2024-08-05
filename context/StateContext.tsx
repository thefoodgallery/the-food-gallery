import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface FoodOptions {
  name: string;
  price: number;
}

interface FoodItem {
  name: string;
  images: { src: string }[];
  price: number;
}

interface MyContextState {
  value: string;
  setValue: (value: string) => void;
  selectedFood: FoodItem[];
  setSelectedFood: (value: FoodItem[]) => void;
  handleRemoveItem: (food: FoodItem) => void;
  handleSelectFood: (food: FoodItem) => void;
}

const StateContext = createContext<MyContextState | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<FoodItem[]>([]);
  const handleRemoveItem = useCallback(
    (food: FoodItem) => {
      setSelectedFood((prevSelectedFood: FoodItem[]) => {
        const index = prevSelectedFood.findIndex((fd) => fd.name === food.name);
        if (index !== -1) {
          const newSelectedFood = [...prevSelectedFood];
          newSelectedFood.splice(index, 1);
          return newSelectedFood;
        }
        return prevSelectedFood;
      });
    },
    [setSelectedFood]
  );

  const handleSelectFood = useCallback(
    (food: FoodItem) => {
      setSelectedFood([...selectedFood, food]);
    },
    [selectedFood, setSelectedFood]
  );
  return (
    <StateContext.Provider
      value={{
        value,
        setValue,
        selectedFood,
        setSelectedFood,
        handleRemoveItem,
        handleSelectFood,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useMyContext must be used within a AppContextProvider");
  }
  return context;
};
