import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallback: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
        };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
