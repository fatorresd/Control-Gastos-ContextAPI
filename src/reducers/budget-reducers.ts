import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from '../types/index';

export type BudgetActions =
  | { type: "ADD_BUDGET"; payload: { budget: number } }
  | { type: "SHOW_MODAL" }
  | { type: "HIDE_MODAL" }
  | { type: "ADD_EXPENSE"; payload: { expense: DraftExpense } }
  | { type: "REMOVE_EXPENSE"; payload: { id: string } }
  | { type: "EDIT_ID_EXPENSE"; payload: { id: Expense["id"] } }
  | { type: "UPDATE_EXPENSE"; payload: { expense: Expense } }
  | { type: "RESET_EXPENSE"}
  | { type: "ADD_FILTER_CATEGORY"; payload: { id : Category['id']} }

export type BudgetState = {
  budget: number;
  modal: boolean;
  expense: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

const initialBudget = () : number => {
  const budget = localStorage.getItem("budget");
  return budget ? JSON.parse(budget) : 0;
}

const loadExpenseFromLocalStorage = () : Expense[] => {
  const expense = localStorage.getItem("expense");
  return expense ? JSON.parse(expense) : [];
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expense: loadExpenseFromLocalStorage(),
  editingId: "",
  currentCategory: "",
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
      editingId: "",
    };
  }
  if (action.type === "ADD_EXPENSE") {
    const newExpense = createExpense(action.payload.expense);
    return {
      ...state,
      expense: [...state.expense, newExpense],
      modal: false,
    };
  }
  if (action.type === "REMOVE_EXPENSE") {
    const newExpenseList = state.expense.filter(
      (expense) => expense.id !== action.payload.id
    );
    return {
      ...state,
      expense: newExpenseList,
    };
  }
  if (action.type === "EDIT_ID_EXPENSE") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
      saveExpenseToLocalStorage: state.expense,
    };
  }
  if(action.type === "UPDATE_EXPENSE") {
    const updatedExpenseList = state.expense.map((expense) =>
      expense.id === action.payload.expense.id ? action.payload.expense : expense
    );
    return {
      ...state,
      expense: updatedExpenseList,
      modal: false,
      editingId: "",
  }}
  if(action.type === "RESET_EXPENSE") {
    return {
      ...state,
      expense: [],
      budget: 0,
    }
  }
  if(action.type === "ADD_FILTER_CATEGORY") {
    return {
      ...state,
      currentCategory: action.payload.id,
    }
  }
  return state;
};
