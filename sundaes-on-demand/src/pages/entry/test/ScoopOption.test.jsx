import { render, screen } from '../../../test-utils/testing-library-util';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('Displays image for each scoop option from server', async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);

  //expect input to be invalid with negative number
  const vanillaInput = screen.getByRole('spinbutton');
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with decimal input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with input that's too high
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with valid input
  // note: here we're testing our validation rules(namely that the input can display)
  // are not react-bootstrap's response
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
