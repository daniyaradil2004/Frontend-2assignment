import { useState } from 'react';
import Stepper from '../components/Stepper';
import './AdvancedStepperExample.css';

const AdvancedStepperExample = () => {
  const [customData, setCustomData] = useState({});

  // Example of using Render Props for custom controls
  const renderCustomControls = ({ activeStep, nextStep, previousStep, goToStep, handleFinish }) => (
    <div className="custom-controls">
      <div className="control-buttons">
        <button
          onClick={() => goToStep(0)}
          disabled={activeStep === 0}
          className="control-button"
        >
          First
        </button>
        <button
          onClick={previousStep}
          disabled={activeStep === 0}
          className="control-button"
        >
          ← Previous
        </button>
        <span className="step-indicator-text">Step {activeStep + 1} of 4</span>
        <button
          onClick={nextStep}
          disabled={activeStep === 3}
          className="control-button"
        >
          Next →
        </button>
        <button
          onClick={() => goToStep(3)}
          disabled={activeStep === 3}
          className="control-button"
        >
          Last
        </button>
      </div>
      {activeStep === 3 && (
        <button
          onClick={handleFinish}
          className="control-button finish-button"
        >
          Complete Process
        </button>
      )}
    </div>
  );

  // Example of using Render Props for custom step labels
  const renderCustomLabel = ({ isActive, isCompleted, title, description, index }) => (
    <div className="custom-step-label">
      <div className="custom-step-title">{title}</div>
      <div className="custom-step-description">{description}</div>
      {isActive && <div className="active-indicator">Active</div>}
    </div>
  );

  return (
    <div className="advanced-stepper-container">
      <h1>Advanced Stepper Example</h1>
      <p className="example-description">
        This example demonstrates advanced features including custom render props for controls and labels.
      </p>

      <Stepper initialStep={0} className="advanced-stepper">
        <Stepper.List>
          <Stepper.Step
            index={0}
            title="Setup"
            description="Initial configuration"
            renderLabel={renderCustomLabel}
            renderContent={({ updateStepData, markComplete }) => (
              <div className="step-content-wrapper">
                <h2>Initial Setup</h2>
                <p>Configure your initial settings.</p>
                <div className="input-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    onChange={(e) => {
                      updateStepData({ projectName: e.target.value });
                      if (e.target.value) markComplete();
                    }}
                  />
                </div>
              </div>
            )}
          />

          <Stepper.Step
            index={1}
            title="Configuration"
            description="Advanced settings"
            renderLabel={renderCustomLabel}
            renderContent={({ updateStepData, markComplete, goToNext }) => (
              <div className="step-content-wrapper">
                <h2>Configuration</h2>
                <p>Set up your advanced configuration options.</p>
                <div className="input-group">
                  <label>Environment</label>
                  <select
                    onChange={(e) => {
                      updateStepData({ environment: e.target.value });
                      markComplete();
                    }}
                  >
                    <option value="">Select environment</option>
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>API Endpoint</label>
                  <input
                    type="text"
                    placeholder="https://api.example.com"
                    onChange={(e) => {
                      updateStepData({ apiEndpoint: e.target.value });
                    }}
                  />
                </div>
              </div>
            )}
          />

          <Stepper.Step
            index={2}
            title="Validation"
            description="Verify settings"
            renderLabel={renderCustomLabel}
            renderContent={({ updateStepData, markComplete, getStepData: getStepDataFromProps }) => {
              // Access data from previous steps
              const step0Data = getStepDataFromProps(0);
              const step1Data = getStepDataFromProps(1);

              return (
                <div className="step-content-wrapper">
                  <h2>Validation</h2>
                  <p>Review and validate your configuration.</p>
                  <div className="validation-summary">
                    <h3>Configuration Summary</h3>
                    <div className="summary-row">
                      <strong>Project Name:</strong>
                      <span>{step0Data.projectName || 'Not set'}</span>
                    </div>
                    <div className="summary-row">
                      <strong>Environment:</strong>
                      <span>{step1Data.environment || 'Not set'}</span>
                    </div>
                    <div className="summary-row">
                      <strong>API Endpoint:</strong>
                      <span>{step1Data.apiEndpoint || 'Not set'}</span>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          updateStepData({ confirmed: e.target.checked });
                          if (e.target.checked) markComplete();
                        }}
                      />
                      I confirm the configuration is correct
                    </label>
                  </div>
                </div>
              );
            }}
          />

          <Stepper.Step
            index={3}
            title="Complete"
            description="Final step"
            renderLabel={renderCustomLabel}
            renderContent={({ getStepData: getStepDataFromProps }) => {
              const allData = {
                step0: getStepDataFromProps(0),
                step1: getStepDataFromProps(1),
                step2: getStepDataFromProps(2),
              };

              return (
                <div className="step-content-wrapper">
                  <h2>Setup Complete!</h2>
                  <div className="completion-message">
                    <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Your configuration has been successfully set up.</p>
                    <pre className="data-preview">
                      {JSON.stringify(allData, null, 2)}
                    </pre>
                  </div>
                </div>
              );
            }}
          />
        </Stepper.List>

        <Stepper.Controls renderControls={renderCustomControls} />
      </Stepper>
    </div>
  );
};

export default AdvancedStepperExample;

