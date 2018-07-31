import * as React from 'react';
import { Spin as spin } from 'antd';
import styled from "styled-components";

interface Props {
  children: (data: any, error: any) => React.ReactNode;
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

export default class Fetch extends React.PureComponent<Props, State> {
  public state: State = {
    loading: true
  }
  public async componentDidMount() {
    const { url, config } = this.props;
    try {
      const res = await fetch(url, config);
      const data = await res.json();
      this.setState({ data, loading: false, error: null });
    } catch (error) {
      this.setState({ data: null, loading: false, error });
    }
  }
  public render() {
    if (this.state.loading) {
      return <LoadingScreen loading={true} ><Spin /></LoadingScreen>;
    }
    return this.props.children(this.state.data, this.state.error);
  }
}