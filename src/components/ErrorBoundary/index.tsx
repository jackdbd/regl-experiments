import React from "react";
import styled from "styled-components";

const Div = styled.div`
  background-color: #ff0000;
`;
Div.displayName = "ErrorBoundaryDiv";

interface IProps {
  children: Array<React.ReactElement<{}>> | React.ReactElement<{}>;
}

interface IErrorInfo {
  componentStack: string;
}

interface IState {
  error: Error | null;
  errorInfo: IErrorInfo | null;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  public componentDidCatch(error: Error, errorInfo: IErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }
  public render() {
    if (this.state.error) {
      const summaryInfo = this.state.error.toString();
      const detailedInfo = this.state.errorInfo
        ? this.state.errorInfo.componentStack.toString()
        : null;
      return (
        <Div>
          <p data-testid="error-boundary-summary">{summaryInfo}</p>
          <p>{detailedInfo}</p>
        </Div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
