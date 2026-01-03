import { useEffect, useRef } from 'react';
import { useStepperContext } from './StepperContext';

const Step = ({ 
  index, 
  children, 
  title, 
  description,
  renderContent,
  renderLabel,
  onEnter,
  onExit,
  className = '',
  disabled = false,
  ...props 
}) => {
  const { 
    activeStep, 
    completedSteps, 
    goToStep,
    nextStep,
    previousStep,
    markStepComplete,
    updateStepData,
    getStepData,
    stepData: allStepData
  } = useStepperContext();

  const stepRef = useRef(null);
  const isActive = activeStep === index;
  const isCompleted = completedSteps.has(index);
  const stepData = getStepData(index);
  
  // Helper function to get data from any step (for render props)
  const getStepDataHelper = (stepIndex) => {
    return allStepData[stepIndex] || {};
  };

  useEffect(() => {
    if (isActive && stepRef.current) {
      stepRef.current.focus();
      onEnter?.(index);
    } else if (!isActive) {
      onExit?.(index);
    }
  }, [isActive, index, onEnter, onExit]);

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        if (isActive) {
          nextStep();
        } else {
          goToStep(index);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        if (isActive) {
          previousStep();
        } else {
          goToStep(index);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isActive) {
          goToStep(index);
        }
        break;
      case 'Home':
        e.preventDefault();
        goToStep(0);
        break;
      case 'End':
        e.preventDefault();
        // Will need total steps count - handled by StepperList
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    if (!disabled) {
      goToStep(index);
    }
  };

  // Render Props pattern for content
  const content = renderContent 
    ? renderContent({ 
        isActive, 
        isCompleted, 
        stepData, 
        updateStepData: (data) => updateStepData(index, data),
        markComplete: () => markStepComplete(index),
        goToNext: nextStep,
        goToPrevious: previousStep,
        goToStep: (step) => goToStep(step),
        getStepData: getStepDataHelper
      })
    : children;

  // Render Props pattern for label
  const label = renderLabel
    ? renderLabel({ isActive, isCompleted, title, description, index })
    : (
        <div className="step-label">
          {title && <span className="step-title">{title}</span>}
          {description && <span className="step-description">{description}</span>}
        </div>
      );

  return (
    <div
      ref={stepRef}
      className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      aria-label={title || `Step ${index + 1}`}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
    >
      <div className="step-indicator">
        {isCompleted ? (
          <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="step-number">{index + 1}</span>
        )}
      </div>
      {label}
      {isActive && (
        <div className="step-content" role="tabpanel">
          {content}
        </div>
      )}
    </div>
  );
};

export default Step;

