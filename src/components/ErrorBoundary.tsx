import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in SocialSphere application:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D0B14] text-[#FAFAFD] flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-[#161224] border border-amber-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-amber-500 to-purple-600" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-white">Application Exception Caught</h2>
                <p className="text-sm text-zinc-400">The SocialSphere error boundary safely captured an issue</p>
              </div>
            </div>

            <div className="bg-[#0D0B14] rounded-xl p-4 border border-zinc-800 mb-6 font-mono text-xs text-rose-300 overflow-x-auto max-h-40">
              {this.state.error?.message || 'Unknown runtime error occurred.'}
            </div>

            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              Your session state has been preserved. You can refresh the interface or return to the overview dashboard.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
