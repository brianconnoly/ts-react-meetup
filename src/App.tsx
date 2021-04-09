import Regular from './Suspence/Regular';
import WithSuspence from './Suspence/WithSuspence';
import SeveralLayers from './Suspence/SeveralLayers';
import WithErrorBoundary from './Suspence/WithErrorBoundary';

function App() {
    return (
        <div className="App">
            {/* <Regular /> */}
            {/* <WithSuspence /> */}
            <SeveralLayers />
            {/* <WithErrorBoundary /> */}
        </div>
    );
}

export default App;
