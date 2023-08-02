import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import Options from './Options';

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
}
