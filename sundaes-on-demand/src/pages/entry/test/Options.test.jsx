import { render, screen } from '../../../test-utils/testing-library-util';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('Displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each toppings option from server', async () => {
  render(<Options optionType='toppings' />);

  // find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test("dont't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();

  render(<Options optionType='scoops' />);

  // wait for the vanilla input to appear after server call
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  // find the scoops total, which starts out at 0
  const scoopsSubTotal = screen.getByText('Scoops total: $0.00');

  // clear the input
  user.clear(vanillaInput);

  // invalid input
  user.type(vanillaInput, '2.5');

  // make sure scoops subtotal hasn't updated
  expect(scoopsSubTotal).toHaveTextContent('$0.00');

  // do the same test for 100
  user.clear(vanillaInput);
  user.type(vanillaInput, '100');
  expect(scoopsSubTotal).toHaveTextContent('$0.00');

  // and for -1
  user.clear(vanillaInput);
  user.type(vanillaInput, '-1');
  expect(scoopsSubTotal).toHaveTextContent('$0.00');
});
