import {fireEvent, render, screen} from '@testing-library/react';
import LoadBalanceStep, {LoadBalanceStepProperties} from "./LoadBalanceStep";

let notifyKaotoCount = 0;
let step: LoadBalanceStepProperties = {
    parameters: [
        {value: null}
    ],
};

test('renders and update LoadBalance Step', () => {
    render(<LoadBalanceStep
        notifyKaoto={() => notifyKaotoCount++}
        updateStep={(p: LoadBalanceStepProperties) => step = p}
        step={step}
    />);

    const loadBalanceSelect = screen.getByTestId('load-balance-select');
    expect(loadBalanceSelect).toBeInTheDocument();

    const applyBtn = screen.getByTestId('lb-apply-button');
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);

    expect(notifyKaotoCount).toBeGreaterThan(0);
    expect(step.parameters[0].value).not.toBe(null);
});

test('renders ChoiceStep with initial branches', () => {
    let notifyKaotoCount = 0;
    render(<LoadBalanceStep
        notifyKaoto={() => notifyKaotoCount++}
        updateStep={(p: LoadBalanceStepProperties) => step = p}
        step={step}
    />);

    fireEvent.change(screen.getByTestId('load-balance-select'), {target: {value: 'Round Robin'}});

    const applyBtn = screen.getByTestId('lb-apply-button');
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);

    expect(notifyKaotoCount).toBeGreaterThan(0);
    expect(Object.entries(step.parameters[0].value)[0]).toContain('round-robin');
});
