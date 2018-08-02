import * as React from 'react';
import { Card as card, Icon } from 'antd';
import Fetch, { Loading, BlurredScreen } from '../Fetch';
import styled from 'styled-components';

interface Props {
  url: any;
  name: string;
  onClick?: (pokemon: any) => void;
  visible: boolean;
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
  display: ${({ visible }: { visible: boolean }) => visible ? 'block' : 'none'};
`
/**
 * Shows an image preview of a pokemon and fetches its info.
 */
class PokeCard extends React.Component<Props> {
  private pokemon: any;
  public render() {
    const { name, visible } = this.props;
    const cardProps: any = { visible: visible ? 1 : 0 };
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
                return (
                  <BlurredScreen>
                    <Icon type="close" style={{ fontSize: '1600%' }} />
                  </BlurredScreen>
                );
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
