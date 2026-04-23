import Icon from "../Utils/Icon";

export default function BudgetEditor({
  budget,
  handleBudgetChange,
}: {
  budget: number;
  handleBudgetChange: any;
}) {
  const handleChange = (value: number) => {
    handleBudgetChange("budget.expected", value);
  };
  return (
    <div className="budget-editor">
      <InputBudgetValue
        budget={budget}
        exponent={1000}
        handleChange={handleChange}
      />
      <InputBudgetValue
        budget={budget}
        exponent={100}
        handleChange={handleChange}
      />
      <InputBudgetValue
        budget={budget}
        exponent={10}
        handleChange={handleChange}
      />
      <InputBudgetValue
        budget={budget}
        exponent={1}
        handleChange={handleChange}
      />
    </div>
  );
}

function InputBudgetValue({
  budget,
  exponent,
  handleChange,
}: {
  budget: number;
  exponent: number;
  handleChange: any;
}) {
  const handleValueChange = (add: boolean) => {
    const addValue = add ? 1 * exponent : -1 * exponent;
    const newValue = budget + addValue;
    if (newValue > 0 && newValue < 10000)
      newValue >= 0 && handleChange(newValue);
  };

  return (
    <div>
      <Icon
        icon="fa-angle-double-up"
        color="--stone-dark-2"
        onClick={() => handleValueChange(true)}
      />
      <p>{Math.trunc((budget % (exponent * 10)) / exponent)}</p>
      <Icon
        icon="fa-angle-double-down"
        color="--stone-dark-2"
        onClick={() => handleValueChange(false)}
      />
    </div>
  );
}
