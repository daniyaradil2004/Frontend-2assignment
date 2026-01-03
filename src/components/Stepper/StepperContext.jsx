import { createContext, useContext, useState, useCallback } from 'react';

const StepperContext = createContext(null);

export const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper');
  }
  return context;
};

export const StepperProvider = ({ children, initialStep = 0, onStepChange }) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [stepData, setStepData] = useState({});

  const goToStep = useCallback((stepIndex) => {
    setActiveStep(stepIndex);
    onStepChange?.(stepIndex);
  }, [onStepChange]);

  const nextStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = prev + 1;
      onStepChange?.(next);
      return next;
    });
  }, [onStepChange]);

  const previousStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = Math.max(0, prev - 1);
      onStepChange?.(next);
      return next;
    });
  }, [onStepChange]);

  const markStepComplete = useCallback((stepIndex) => {
    setCompletedSteps((prev) => new Set([...prev, stepIndex]));
  }, []);

  const markStepIncomplete = useCallback((stepIndex) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.delete(stepIndex);
      return next;
    });
  }, []);

  const updateStepData = useCallback((stepIndex, data) => {
    setStepData((prev) => ({
      ...prev,
      [stepIndex]: { ...prev[stepIndex], ...data }
    }));
  }, []);

  const getStepData = useCallback((stepIndex) => {
    return stepData[stepIndex] || {};
  }, [stepData]);

  const value = {
    activeStep,
    completedSteps,
    stepData,
    goToStep,
    nextStep,
    previousStep,
    markStepComplete,
    markStepIncomplete,
    updateStepData,
    getStepData,
  };

  return (
    <StepperContext.Provider value={value}>
      {children}
    </StepperContext.Provider>
  );
};

