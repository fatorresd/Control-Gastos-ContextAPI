import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types/index";

export type BudgetActions =
  | { type: "ADD_BUDGET"; payload: { budget: number } }
  | { type: "SHOW_MODAL" }
  | { type: "HIDE_MODAL" }
  | { type: "ADD_EXPENSE"; payload: { expense: DraftExpense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expense: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expense: [],
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "ADD_BUDGET") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === "SHOW_MODAL") {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === "HIDE_MODAL") {
    return {
      ...state,
      modal: false,
    };
  }
  if (action.type === "ADD_EXPENSE") {
    const newExpense = createExpense(action.payload.expense);

    return {
      ...state,
      expense: [...state.expense, newExpense],
      modal: false
    };
  }

  return state;
};
