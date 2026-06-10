import { Component } from 'react';
import { AlertTriangle, RefreshCw, Bug } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      recoveryAttempts: 0,
      isRetrying: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    if (this.state.recoveryAttempts < 3) {
      this.attemptRecovery();
    }
  }

  attemptRecovery = () => {
    this.setState(prev => ({
      recoveryAttempts: prev.recoveryAttempts + 1,
      isRetrying: true
    }));

    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isRetrying: false
      });
    }, 1000);
  };

  handleManualRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      recoveryAttempts: 0
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-brand-void flex items-center justify-center p-6">
          <div className="max-w-md w-full glass p-8 text-center">
            <div className="w-16 h-16 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {this.state.isRetrying ? (
                <RefreshCw className="w-8 h-8 text-brand-cyan animate-spin" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-brand-pink" />
              )}
            </div>
            
            <h2 className="text-2xl font-display mb-4 tracking-display">
              {this.state.isRetrying ? 'Recovering...' : 'Something went wrong'}
            </h2>
            
            <p className="text-brand-slate mb-6">
              {this.state.isRetrying
                ? 'EVA is attempting to recover automatically. Please wait...'
                : 'EVA encountered an error and attempted to recover automatically. You can try refreshing the page or report the issue.'
              }
            </p>
            
            {!this.state.isRetrying && (
              <div className="space-y-3">
                <button
                  onClick={this.handleManualRetry}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary w-full"
                >
                  Refresh Page
                </button>
                
                <details className="mt-4 text-left">
                  <summary className="text-brand-slate text-sm cursor-pointer hover:text-brand-white">
                    Error Details
                  </summary>
                  <pre className="mt-2 p-4 bg-brand-grey rounded-lg text-xs text-brand-slate overflow-auto max-h-40">
                    {this.state.error?.toString()}
                    {'\n\n'}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-brand-white/10">
              <div className="flex items-center justify-center gap-2 text-xs text-brand-slate">
                <Bug size={12} />
                <span>Auto-recovery attempt {this.state.recoveryAttempts} of 3</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
