import './App.css';
import { CircuitBreakerStep } from './CircuitBreakerStep';

export const App = () => {
  return (
    <div>
      <header>
        <p>
          Kaoto step extension for Circuit breaker
        </p>
      </header>
      <CircuitBreakerStep />
    </div>
  );
}
