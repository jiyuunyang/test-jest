import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('Update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();

  // using wrapper individually
  render(<Options optionType='scoops' />, {
    wrapper: OrderDetailsProvider,
  });

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1, and check subtotal
  const vanilaInput = await screen.findByRole('spinbutton', { name: 'Vanila' });

  await user.clear(vanilaInput);
  await user.type(vanilaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2, and check subtoal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
