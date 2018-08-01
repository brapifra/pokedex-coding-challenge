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

const LoadingScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  filter: ${(props: any) => props.loading ? 'blur(5px)' : 'blur(0px)'};
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
  <LoadingScreen loading={true} ><Spin />{children}</LoadingScreen>
);

export default class Fetch extends React.PureComponent<Props, State> {
  public state: State = {
    loading: true
  }

  public componentDidMount() {
    this.fetchData();
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.url === this.props.url) {
      return;
    }
    if (!this.state.loading) {
      this.setState({ loading: true }, () => this.fetchData(nextProps));
    }
  }

  public render() {
    return this.props.children(this.state.loading, this.state.data, this.state.error);
  }

  private async fetchData(props?: Props) {
    const { url, config } = props || this.props;
    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw Error();
      }
      const data = await res.json();
      this.setState({ data, loading: false, error: null });
    } catch (error) {
      this.setState({ data: null, loading: false, error });
    }
  }
}