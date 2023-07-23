import { useEffect, useState } from 'react';
import ScoopOptions from './ScoopOptions';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  // optionType is 'scoops' or 'topping'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: handle error responseaa
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
