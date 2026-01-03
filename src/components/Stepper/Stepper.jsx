import { useEffect, useRef } from 'react';
import { StepperProvider, useStepperContext } from './StepperContext';
import './Stepper.css';

const Stepper = ({ 
  children, 
  initialStep = 0, 
  onStepChange,
  orientation = 'horizontal',
  className = '',
  ...props 
}) => {
  const stepperRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle keyboard navigation at the stepper level
      if (e.target === stepperRef.current || stepperRef.current?.contains(e.target)) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          // Navigation handled by Step components
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          // Navigation handled by Step components
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <StepperProvider initialStep={initialStep} onStepChange={onStepChange}>
      <div
        ref={stepperRef}
        className={`stepper ${orientation} ${className}`}
        role="group"
        aria-label="Stepper"
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    </StepperProvider>
  );
};

export default Stepper;

