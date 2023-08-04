import Container from 'react-bootstrap/Container';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';

function App() {
  // orderPhase : 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
      Component = OrderEntry;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
