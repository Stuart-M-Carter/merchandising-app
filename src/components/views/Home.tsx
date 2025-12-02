import { useNavigate } from "react-router";
import ErrorBoundary from "../_core/error-boundary";
import styles from './Home.module.css';
import { useCallback } from "react";
import { features, Feature } from "./features";

type FeatureButtonProps = {
    feature: Feature;
    className?: string;
};

export function FeatureButton({ feature, className }: FeatureButtonProps) {
    const navigate = useNavigate();
    const onClick = useCallback(() => navigate(feature.route), [navigate, feature.route]);

    return (
        <button className={className} onClick={onClick} aria-label={feature.label}>
            <span className="material-icons" aria-hidden="true" style={{ marginRight: 8 }}>
                {feature.icon}
            </span>
            {feature.label}
        </button>
    );
}

function Home() {
    return (
        <ErrorBoundary fallback={<div className={styles.appView}>An error occurred while loading the Home Page.</div>}>
            <div className={styles.appView}>
                <div className={styles.buttonRow}>
                    {features.map((feature) => (
                        <FeatureButton key={feature.label} feature={feature} className={styles.button} />
                    ))}
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default Home;