import { useReducer, createContext, Dispatch, ReactNode } from "react"
import { BudgetState, BudgetActions, budgetReducer, initialState } from "../reducers/budget-reducers"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode
}

//Ambas se pueden usar, la primera es mas explicita
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return (
        //aca es donde llega el estado y el dispatch a todos los componentes que esten dentro de este provider
        <BudgetContext.Provider value={{state, dispatch}}>
            {children}
        </BudgetContext.Provider>
    )
}