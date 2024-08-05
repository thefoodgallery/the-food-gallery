import { createContext, useContext, useState, ReactNode } from "react";

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
}

const StateContext = createContext<MyContextState | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<FoodItem[]>([]);

  return (
    <StateContext.Provider
      value={{ value, setValue, selectedFood, setSelectedFood }}
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
