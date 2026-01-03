import { useState } from 'react';
import Stepper from '../components/Stepper';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    preferences: {
      newsletter: false,
      notifications: false,
      theme: 'light'
    }
  });

  const handleStepDataUpdate = (stepIndex, data) => {
    const stepKeys = ['personalInfo', 'address', 'preferences'];
    const key = stepKeys[stepIndex];
    if (key) {
      setFormData(prev => ({
        ...prev,
        [key]: { ...prev[key], ...data }
      }));
    }
  };

  const handleFinish = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <div className="multi-step-form-container">
      <h1>Multi-Step Registration Form</h1>
      <p className="form-description">
        Complete the form using the stepper. Use arrow keys for navigation.
      </p>

      <Stepper
        initialStep={0}
        onStepChange={(step) => console.log('Step changed to:', step)}
      >
        <Stepper.List>
          {/* Step 1: Personal Information */}
          <Stepper.Step
            index={0}
            title="Personal Info"
            description="Your basic information"
            renderContent={({ isActive, updateStepData, markComplete }) => (
              <div className="form-step-content">
                <h2>Personal Information</h2>
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, firstName: value }
                      }));
                      updateStepData({ firstName: value });
                      if (value && formData.personalInfo.lastName && formData.personalInfo.email) {
                        markComplete();
                      }
                    }}
                    placeholder="Enter your first name"
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.personalInfo.lastName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, lastName: value }
                      }));
                      updateStepData({ lastName: value });
                      if (formData.personalInfo.firstName && value && formData.personalInfo.email) {
                        markComplete();
                      }
                    }}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: value }
                      }));
                      updateStepData({ email: value });
                      if (formData.personalInfo.firstName && formData.personalInfo.lastName && value) {
                        markComplete();
                      }
                    }}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: value }
                      }));
                      updateStepData({ phone: value });
                    }}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}
          />

          {/* Step 2: Address Information */}
          <Stepper.Step
            index={1}
            title="Address"
            description="Your address details"
            renderContent={({ isActive, updateStepData, markComplete }) => (
              <div className="form-step-content">
                <h2>Address Information</h2>
                <div className="form-group">
                  <label htmlFor="street">Street Address *</label>
                  <input
                    id="street"
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, street: value }
                      }));
                      updateStepData({ street: value });
                      if (value && formData.address.city && formData.address.zipCode) {
                        markComplete();
                      }
                    }}
                    placeholder="Enter your street address"
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, city: value }
                      }));
                      updateStepData({ city: value });
                      if (formData.address.street && value && formData.address.zipCode) {
                        markComplete();
                      }
                    }}
                    placeholder="Enter your city"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          address: { ...prev.address, state: value }
                        }));
                        updateStepData({ state: value });
                      }}
                      placeholder="Enter your state"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code *</label>
                    <input
                      id="zipCode"
                      type="text"
                      value={formData.address.zipCode}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          address: { ...prev.address, zipCode: value }
                        }));
                        updateStepData({ zipCode: value });
                        if (formData.address.street && formData.address.city && value) {
                          markComplete();
                        }
                      }}
                      placeholder="Enter zip code"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          />

          {/* Step 3: Preferences */}
          <Stepper.Step
            index={2}
            title="Preferences"
            description="Your preferences"
            renderContent={({ isActive, updateStepData, markComplete }) => (
              <div className="form-step-content">
                <h2>Preferences</h2>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.preferences.newsletter}
                      onChange={(e) => {
                        const value = e.target.checked;
                        setFormData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, newsletter: value }
                        }));
                        updateStepData({ newsletter: value });
                        markComplete();
                      }}
                    />
                    <span>Subscribe to newsletter</span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications}
                      onChange={(e) => {
                        const value = e.target.checked;
                        setFormData(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, notifications: value }
                        }));
                        updateStepData({ notifications: value });
                        markComplete();
                      }}
                    />
                    <span>Enable notifications</span>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="theme">Theme Preference</label>
                  <select
                    id="theme"
                    value={formData.preferences.theme}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, theme: value }
                      }));
                      updateStepData({ theme: value });
                      markComplete();
                    }}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div className="form-summary">
                  <h3>Review Your Information</h3>
                  <div className="summary-item">
                    <strong>Name:</strong> {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                  </div>
                  <div className="summary-item">
                    <strong>Email:</strong> {formData.personalInfo.email}
                  </div>
                  <div className="summary-item">
                    <strong>Address:</strong> {formData.address.street}, {formData.address.city}, {formData.address.zipCode}
                  </div>
                </div>
              </div>
            )}
          />
        </Stepper.List>

        <Stepper.Controls
          onFinish={handleFinish}
          finishLabel="Submit Form"
        />
      </Stepper>
    </div>
  );
};

export default MultiStepForm;

