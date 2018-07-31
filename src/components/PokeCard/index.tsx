import * as React from 'react';
import { Card } from 'antd';
import LoadingComponent from '../LoadingComponent';
import styled from 'styled-components';

interface Props {
  url: any;
  name?: string;
}

interface State {
  loading: any;
  data?: any;
}

const ImageCard = styled.img`
  width: 100%;
  height: 100%;
`;

class PokeCard extends React.Component<Props, State> {
  public state: State = {
    loading: true,
  }
  public async componentDidMount() {
    const res = await fetch(this.props.url);
    const data = await res.json();
    this.setState({ data });
  }
  public render() {
    const { data } = this.state;
    const { name } = this.props;
    return (
      <Card>
        <LoadingComponent loading={this.state.loading}>
          <ImageCard src={data ? data.sprites.front_default : ""} onLoad={this.onImageLoad} />
        </LoadingComponent>
        <span>
          {data ? data.name : (name || "Loading Pokemon...")}
        </span>
      </Card>
    );
  }
  private onImageLoad = () => {
    this.setState({ loading: false });
  }
}

export default PokeCard;
