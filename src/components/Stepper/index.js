import Stepper from './Stepper';
import Step from './Step';
import StepperList from './StepperList';
import StepperControls from './StepperControls';

// Compound Components pattern - export all components
Stepper.Step = Step;
Stepper.List = StepperList;
Stepper.Controls = StepperControls;

export default Stepper;
export { Step, StepperList, StepperControls };

