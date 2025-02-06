import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import {
  BudgetState,
  BudgetActions,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducers";


type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

//Ambas se pueden usar, la primera es mas explicita
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(() => {
    return state.expense.reduce((total, expense) => total + expense.amount, 0);
  }, [state.expense]);

  const remainingBudget = state.budget - totalExpenses;

  return (
    //aca es donde llega el estado y el dispatch a todos los componentes que esten dentro de este provider
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
