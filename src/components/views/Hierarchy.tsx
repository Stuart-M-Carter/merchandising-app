import ErrorBoundary, { ErrorView } from "../_core/error-boundary";

function Inner() {

    throw new Error("Test error in Hierarchy view");
    
    return <div className='app-view'>Hierarchy Page</div>;
}

function Hierarchy() {
    return (
        <ErrorBoundary fallback={<ErrorView>An error occurred while loading the Hierarchy Page.</ErrorView>}>
            <Inner/>
        </ErrorBoundary>
    );
}

export default Hierarchy;