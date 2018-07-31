import * as React from 'react';
import styled from "styled-components";

interface FetchState {
  loading: boolean;
  data?: object;
}

const LoadingScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: red;
  filter: blur(5px);
`

export default (Component: React.ComponentClass<any, any>) => (url: string, config?: any) => (
  class Fetch extends React.PureComponent<any, FetchState> {
    public state: FetchState = {
      loading: true
    }
    public async componentDidMount() {
      const res = await fetch(url, config);
      const data = await res.json();
      this.setState({ data, loading: false });
    }
    public render() {
      if (this.state.loading) {
        return <LoadingScreen />;
      }
      if (!this.state.loading && this.state.data) {
        return (<Component data={this.state.data} />);
      }
      return null;
    }
  }
)