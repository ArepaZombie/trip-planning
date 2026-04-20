import type { Budget } from "../../types";
import "./BudgetWidget.css";

const NUMBER_OF_CELLS = 20;

export default function BudgetWidget({ budget }: { budget: Budget }) {
  const budgetLeft = budget.expected - 30; //budget.spent;
  const percetnLeft = Math.round((budgetLeft * 100) / budget.expected);
  const energyLevel = Math.round((NUMBER_OF_CELLS * percetnLeft) / 100);

  return (
    <div className="budget-widget">
      <h2>RECURSOS DISPONIBLES</h2>
      <p>{budgetLeft}</p>
      <p>{percetnLeft}</p>
      <EnergyBar energyLevel={energyLevel} />
    </div>
  );
}

function EnergyBar({ energyLevel }: { energyLevel: number }) {
  const fullCells = Array.from({ length: energyLevel }).map((_, i) => (
    <div key={i} className="full-cell" />
  ));

  const emptyCells = Array.from({ length: 20 - energyLevel }).map((_, i) => (
    <div key={i} className="empty-cell" />
  ));

  return (
    <div className="energy-bar">
      {fullCells}
      {emptyCells}
    </div>
  );
}
