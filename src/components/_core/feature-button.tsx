import React from 'react';
import type { SvgIconProps } from '@mui/material';
import './feature-button.css';

type SizeOption = 'small' | 'medium' | 'large';

interface FeatureButtonProps {
  Icon: React.ComponentType<SvgIconProps>; // MUI icon component, e.g. Home, Search
  label: string;
  onClick?: () => void;
  size?: SizeOption; // 'small' | 'medium' | 'large'
  disabled?: boolean;
  className?: string;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({
  Icon,
  label,
  onClick,
  size = 'medium',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`icon-button icon-button--${size} ${disabled ? 'disabled' : ''} ${className}`.trim()}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={label}
    >
      <Icon className="icon" />
      <span className="label">{label}</span>
    </button>
  );
};

export default FeatureButton;
