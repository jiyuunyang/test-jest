// redefine testing library render to access universally
import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-util';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles error for scoops and topping routes', async () => {
  // server endpoint reset
  // make error test
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

// test.skip('not a real test', () => {});
