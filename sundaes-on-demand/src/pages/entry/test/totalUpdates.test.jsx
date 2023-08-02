import { render, screen } from '../../../test-utils/testing-library-util';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('Update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();

  // using wrapper individually
  // wrapper option to render to apply context provider
  render(<Options optionType='scoops' />);

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

  render(<Options optionType='toppings' />);

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

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    // const { unmount } = render(<OrderEntry />);
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');
    // unmount();
  });

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });
    // update vanilla scoops to 2 and check grand total
    const vanilaInput = await screen.findByRole('spinbutton', {
      name: 'Vanila',
    });
    await user.clear(vanilaInput);
    await user.type(vanilaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total
    const cherrriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherrriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });

    // add cherries and check grand total
    const cherrriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherrriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla scoops to 2 and check grand total
    const vanilaInput = await screen.findByRole('spinbutton', {
      name: 'Vanila',
    });
    await user.clear(vanilaInput);
    await user.type(vanilaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates properly if topping is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });

    // add cherries and check grand total
    const cherrriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherrriesCheckbox);

    // update vanilla scoops to 2 and check grand total
    const vanilaInput = await screen.findByRole('spinbutton', {
      name: 'Vanila',
    });
    await user.clear(vanilaInput);
    await user.type(vanilaInput, '2');

    // remove 1 scoop of vanilla and check grand total
    await user.clear(vanilaInput);
    await user.type(vanilaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');

    // remove cherries and check grand total
    await user.click(cherrriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
