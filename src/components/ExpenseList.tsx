import { useMemo } from "react";
import ExpenseDetail from "./ExpenseDetail";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseList() {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory ? state.expense.filter(
    (expense) => expense.category === state.currentCategory
  ) : state.expense;

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            {" "}
            Listado de Gastos
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
