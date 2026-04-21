import type { Budget } from "../../types";
import "./BudgetWidget.css";

export default function BudgetWidget({ budget }: { budget: Budget }) {
  const budgetLeft = budget.expected - 50; //budget.spent;
  const percentLeft = Math.round((budgetLeft / budget.expected) * 100);

  return (
    <div className={"budget-widget"}>
      <h2>RECURSOS DISPONIBLES</h2>
      <div className={`energy-container ${budgetLeft <= 0 && "danger-mode"}`}>
        <EnergyBar percentLeft={percentLeft} />
        <EnergyTag budgetLeft={budgetLeft} />
      </div>
    </div>
  );
}

function EnergyBar({ percentLeft }: { percentLeft: number }) {
  const NUMBER_OF_CELLS = 20;
  let energyLevel = Math.round((NUMBER_OF_CELLS * percentLeft) / 100);
  energyLevel = energyLevel > 0 ? energyLevel : 0;

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

function EnergyTag({ budgetLeft }: { budgetLeft: number }) {
  let activeTag = budgetLeft.toString().replace("-", "");
  let desactiveTag =
    activeTag.length <= 4 ? "0".repeat(4 - activeTag.length) : "";

  return (
    <p>
      <span className={budgetLeft > 0 ? "desactive-tag" : "active-tag"}>-</span>
      <span className="desactive-tag">{desactiveTag}</span>
      <span className="active-tag">{activeTag}</span>
    </p>
  );
}
