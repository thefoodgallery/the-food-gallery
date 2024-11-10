import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface Menu {
  _id: string;
  name: string;
  images: string; // An array of images
  price: number;
  categoryId: string;
  status: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  status: string;
  __v: number;
  image: string;
  items: Menu[]; // An array of Menu items
}

interface MyContextState {
  value: string;
  setValue: (value: string) => void;
  selectedFood: Menu[];
  setSelectedFood: (value: Menu[]) => void;
  handleRemoveItem: (food: Menu) => void;
  handleSelectFood: (food: Menu) => void;
}

const StateContext = createContext<MyContextState | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<Menu[]>([]);
  const handleRemoveItem = useCallback(
    (food: Menu) => {
      setSelectedFood((prevSelectedFood: Menu[]) => {
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
    (food: Menu) => {
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
