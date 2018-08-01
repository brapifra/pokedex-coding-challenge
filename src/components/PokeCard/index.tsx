import * as React from 'react';
import { Card as card } from 'antd';
import Fetch, { Loading } from '../Fetch';
import styled from 'styled-components';

interface Props {
  url: any;
  name: string;
  onClick?: (pokemon: any) => void;
}

const ImageCard = styled.img`
  height: 100%;
`;

const Card = styled(card)`
  cursor: pointer;
  .ant-card-body {
    height: 100%;
    text-align: center;
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }
  &:hover{
    transform: scale(1.05);
  }
  @media only screen and (max-width: 768px) {
    &:hover{
      transform: scale(1);
    }
    .ant-card-body {
    padding: 0;
  }
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
    const mobileMode = window.matchMedia("only screen and (max-width: 768px)").matches;
    return (
      <Card {...cardProps}>
        <Fetch url={this.props.url}>
          {
            (loading, data, error) => {
              if (loading) {
                return (
                  <Loading>
                    <ImageCard />
                  </Loading>
                )
              }
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
        {
          mobileMode ?
            null
            :
            <span>
              {name}
            </span>
        }
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
