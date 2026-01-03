import { useStepperContext } from './StepperContext';

const StepperControls = ({ 
  showPrevious = true,
  showNext = true,
  showFinish = true,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  finishLabel = 'Finish',
  onFinish,
  renderControls,
  className = '',
  ...props 
}) => {
  const { 
    activeStep, 
    nextStep, 
    previousStep, 
    goToStep,
    completedSteps 
  } = useStepperContext();

  const handleFinish = () => {
    onFinish?.();
  };

  // Render Props pattern for custom controls
  if (renderControls) {
    return renderControls({
      activeStep,
      nextStep,
      previousStep,
      goToStep,
      completedSteps,
      handleFinish
    });
  }

  return (
    <div className={`stepper-controls ${className}`} {...props}>
      {showPrevious && activeStep > 0 && (
        <button
          type="button"
          className="stepper-button stepper-button-previous"
          onClick={previousStep}
          aria-label="Go to previous step"
        >
          {previousLabel}
        </button>
      )}
      {showNext && (
        <button
          type="button"
          className="stepper-button stepper-button-next"
          onClick={nextStep}
          aria-label="Go to next step"
        >
          {nextLabel}
        </button>
      )}
      {showFinish && completedSteps.has(activeStep) && (
        <button
          type="button"
          className="stepper-button stepper-button-finish"
          onClick={handleFinish}
          aria-label="Finish stepper"
        >
          {finishLabel}
        </button>
      )}
    </div>
  );
};

export default StepperControls;

