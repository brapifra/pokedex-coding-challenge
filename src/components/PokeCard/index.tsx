import * as React from 'react';
import { Card as card } from 'antd';
import Fetch from '../Fetch';
import styled from 'styled-components';

interface Props {
  url: any;
  name: string;
  onClick?: (pokemon: any) => void;
}

const ImageCard = styled.img`
  width: 100%;
  height: 100%;
`;

const Card = styled(card)`
  cursor: pointer;
  .ant-card-body {
    height: 100%;
    text-align: center;
    font-weight: bold;
  }
  &:hover{
    transform: scale(1.1);
  }
`

class PokeCard extends React.Component<Props> {
  private pokemon: any;
  public render() {
    const { name } = this.props;
    const cardProps: any = {};
    if (this.props.onClick) {
      cardProps.onClick = this.onClick;
    }
    return (
      <Card {...cardProps}>
        <Fetch url={this.props.url}>
          {
            (data, error) => {
              if (error) {
                return <div>Error</div>;
              }
              this.pokemon = data;
              return (
                <ImageCard
                  src={data.sprites.front_default}
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

  private onClick = () => {
    if (this.props.onClick && this.pokemon) {
      this.props.onClick(this.pokemon);
    }
  }
}

export default PokeCard;
