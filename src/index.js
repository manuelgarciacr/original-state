import React from 'react';
import ReactDOM from 'react-dom';
import { CountProvider, useCountState, useCountUpdater } from './count-context';

function useRenderCounter() {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current.textContent = Number(ref.current.textContent || '0') + 1;
    });
    return (
        <span
            style={{
                backgroundColor: '#ccc',
                borderRadius: 4,
                padding: '2px 4px',
                fontSize: '0.8rem',
                margin: '0 6px',
                display: 'inline-block',
            }}
            ref={ref}
        />
    );
}

const CountDisplay = React.memo(function CountDisplay() {
    const count = useCountState();
    const renderCount = useRenderCounter();
    return (
        <div style={{ border: '1px solid black', padding: 10 }}>
            {renderCount}
            {`The current count is ${count}. `}
        </div>
    );
});

const Counter = React.memo(function Counter() {
    const increment = useCountUpdater();
    const renderCount = useRenderCounter();
    return (
        <div style={{ border: '1px solid black', padding: 10 }}>
            {renderCount}
            <button onClick={() => increment(2)}>Increment count</button>
        </div>
    );
});

function App() {
    const [, forceUpdate] = React.useState();
    const renderCount = useRenderCounter();
    return (
        <div style={{ border: '1px solid black', padding: 10 }}>
            {renderCount}
            <button onClick={() => forceUpdate({})}>force render</button>
            <CountProvider>
                <CountDisplay />
                <Counter />
            </CountProvider>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
