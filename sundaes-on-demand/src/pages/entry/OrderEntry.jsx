import Options from './Options';
import ScoopOption from './ScoopOption';

export default function OderEntry() {
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </div>
  );
}
