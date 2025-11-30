import Box from '@mui/material/Box';
import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

// Define the types for the component's props and state
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    console.error("Error in getDerivedStateFromError:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // e.g., logErrorToMyService(error, errorInfo);
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI provided via props
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function ErrorView(props: {children: ReactNode}) {
  return (
    <Box className='app-view'>
        <ErrorIcon color="error" sx={{ mr: 1, verticalAlign: 'middle' }} />
        <b>{props.children}</b>
    </Box>
);
}

export default ErrorBoundary;
