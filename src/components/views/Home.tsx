import ErrorBoundary from "../_core/error-boundary";
import styles from './Home.module.css';

function Home() {
    const buttonLabels = ['Button 1', 'Button 2', 'Button 3'];

    return (
        <ErrorBoundary fallback={<div className={styles.appView}>An error occurred while loading the Home Page.</div>}>
            <div className={styles.appView}>
                <div className={styles.buttonRow}>
                    {buttonLabels.map((label) => (
                        <button key={label} className={styles.button}>{label}</button>
                    ))}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default Home;