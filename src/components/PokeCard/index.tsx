import * as React from 'react';
import { Card as card } from 'antd';
import Fetch from '../Fetch';
import styled from 'styled-components';

interface Props {
  url: any;
  name: string;
}

const ImageCard = styled.img`
  width: 100%;
  height: 100%;
`;

const Card = styled(card)`
  .ant-card-body {
    height: 100%;
  }
`

class PokeCard extends React.Component<Props> {
  public render() {
    const { name } = this.props;
    return (
      <Card>
        <Fetch url={this.props.url}>
          {
            (data, error) => {
              if (error) {
                return <div>Error</div>;
              }
              return (
                <ImageCard
                  src={data.sprites.front_default}
                  onLoad={this.onImageLoad}
                />
              );
            }
          }
        </Fetch>
        <span>
          {name}
        </span>
      </Card>
    );
  }
  private onImageLoad = () => {
    this.setState({ loading: false });
  }
}

export default PokeCard;
