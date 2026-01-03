import { useState } from 'react';
import MultiStepForm from './examples/MultiStepForm';
import AdvancedStepperExample from './examples/AdvancedStepperExample';
import './App.css';

function App() {
  const [activeExample, setActiveExample] = useState('basic');

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Stepper Component Library</h1>
        <p className="subtitle">
          Industrial-grade Stepper with Compound Components & Render Props
        </p>
      </header>

      <nav className="example-nav">
        <button
          className={`nav-button ${activeExample === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveExample('basic')}
        >
          Basic Multi-Step Form
        </button>
        <button
          className={`nav-button ${activeExample === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveExample('advanced')}
        >
          Advanced Example
        </button>
      </nav>

      <main className="app-main">
        {activeExample === 'basic' && <MultiStepForm />}
        {activeExample === 'advanced' && <AdvancedStepperExample />}
      </main>
    </div>
  );
}

export default App;

