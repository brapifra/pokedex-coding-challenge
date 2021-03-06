import * as React from 'react';
import { Spin as spin } from 'antd';
import styled from "styled-components";

interface Props {
  children: (loading: boolean, data: any, error: any) => React.ReactNode;
  url: string;
  config?: any;
}

interface State {
  loading: boolean;
  data?: any;
  error?: any;
}

export const BlurredScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spin = styled(spin)`
  .ant-spin-dot i{
    background-color: red;
  }
`;

export const Loading = ({ children }: { children?: any }) => (
  <BlurredScreen><Spin />{children}</BlurredScreen>
);

/**
 * Logic component that fetches data from an url and renders the children passed
 */
export default class Fetch extends React.PureComponent<Props, State> {
  public state: State = {
    loading: true
  }
  private mounted: boolean = false;

  public componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.url === this.props.url) {
      return;
    }
    if (!this.state.loading && this.mounted) {
      this.setState({ loading: true }, () => this.fetchData());
    }
  }

  public render() {
    return this.props.children(this.state.loading, this.state.data, this.state.error);
  }

  private async fetchData() {
    const { url, config } = this.props;
    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw new Error('Error fetching data');
      }
      const data = await res.json();
      if (this.mounted) {
        this.setState({ data, loading: false, error: null });
      }
    } catch (error) {
      if (this.mounted) {
        this.setState({ data: null, loading: false, error });
      }
    }
  }
}