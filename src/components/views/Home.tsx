import ErrorBoundary from "../_core/error-boundary";

function Home() {
    const buttonLabels = ['Button 1', 'Button 2', 'Button 3'];

    return (
        <ErrorBoundary fallback={<div className='app-view'>An error occurred while loading the Home Page.</div>}>
            <div className='app-view'>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%' }}>
                    {buttonLabels.map((label) => (
                        <button key={label} style={{ flex: '0 1 auto' }}>{label}</button>
                    ))}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default Home;