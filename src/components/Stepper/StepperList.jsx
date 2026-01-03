import { useStepperContext } from './StepperContext';

const StepperList = ({ children, className = '', ...props }) => {
  const { activeStep } = useStepperContext();
  const steps = Array.isArray(children) ? children : [children];
  const totalSteps = steps.length;

  return (
    <div 
      className={`stepper-list ${className}`}
      role="tablist"
      aria-label={`Step ${activeStep + 1} of ${totalSteps}`}
      {...props}
    >
      {steps.map((step, index) => {
        if (step && typeof step === 'object' && step.type?.name === 'Step') {
          return (
            <div key={index} className="stepper-list-item">
              {step}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default StepperList;

