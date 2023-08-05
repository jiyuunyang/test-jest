// redefine testing library render to access universally
import { render, screen } from '../../../test-utils/testing-library-util';
import OrderConfirmation from '../OrderConfirmation';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles error for scoops and topping routes', async () => {
  // override default msw response for options endpoint with error responase
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error occured. Please try again later.'
  );
});
