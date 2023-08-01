import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate",2], ["vanila", 1]]
  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  const toppingArray = Object.keys(optionCounts.toppings); // ["M&Ms", "Gummi bears"]
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Scoops: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  );
}
