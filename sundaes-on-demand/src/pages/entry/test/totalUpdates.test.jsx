import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('Update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();

  // using wrapper individually
  // wrapper option to render to apply context provider
  render(<Options optionType='scoops' />, {
    wrapper: OrderDetailsProvider,
  });

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1, and check subtotal
  const vanilaInput = await screen.findByRole('spinbutton', { name: 'Vanila' });

  // userEvent.clear: clear exist text
  // userEvetn.type: enter number
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

test('Update topping subtotal when toppings change', async () => {
  const user = userEvent.setup();

  render(<Options optionType='toppings' />, {
    wrapper: OrderDetailsProvider,
  });

  // make sure total starts out at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // add cherries and check subtotal
  const cherrriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  // any user event must be waited
  await user.click(cherrriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  //remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});
