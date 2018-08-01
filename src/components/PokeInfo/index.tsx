import * as React from 'react';
import { Card as card, Carousel, Icon } from 'antd';
import styled from 'styled-components';
import PokeType from '../PokeType';

interface Props {
  pokemon?: any;
  onClose: () => void;
}

const ImageCard = styled.img`
  max-width: 33%;
  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: ${({ visible }: { visible: any }) => visible ? "100%" : "0"};
	transition: max-height 1s;
  @media only screen and (max-width: 768px) {
    max-height: ${({ visible }: { visible: any }) => visible ? "100%" : "0"};
  }
  z-index: 5;
`;

const Card = styled(card)`
  .ant-card-body {
    display: grid;
    grid-template-columns: 24% 74%;
    grid-gap: 2%
  }

  .ant-card-body .ant-carousel {
    grid-column: 1;
    grid-row: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .ant-carousel .slick-dots li button {
    background: grey;
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: grey;
  }

  @media only screen and (max-width: 768px) {
    .ant-carousel .slick-dots li {
      display: none;
    }
    .ant-card-body {
      padding: 24px 24px 24px 12px;
    }
  }
`;

const InfoContainer = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover{
    font-weight: bold;
    color: red;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 5px;
  & > span{
    flex: 1;
  }
  & > span:first-child{
    font-weight: bold;
  }
  @media only screen and (max-width: 768px) {
    margin-bottom: 5px !important;
  }
`;

class PokeInfo extends React.Component<Props> {
  public render() {
    const { pokemon } = this.props;
    return (
      <Container visible={this.props.pokemon}>
        {
          pokemon ?
            <Card>
              <CloseIcon type="close" onClick={this.props.onClose} />
              <Carousel autoplay={true}>
                {
                  Object.keys(pokemon.sprites)
                    .filter((sprite) => pokemon.sprites[sprite] !== null)
                    .map((sprite, index) => (
                      <ImageCard src={pokemon.sprites[sprite]} key={index} />
                    ))
                }
              </Carousel>
              <InfoContainer>
                <InfoRow style={{ marginBottom: 32 }}>
                  {
                    pokemon.types.map(({ type }: { type: any }) => (
                      <PokeType key={type.name} type={type.name} />
                    ))
                  }
                </InfoRow>
                <InfoRow>
                  <span>ID:</span>
                  <span>
                    {pokemon.id}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span>Name:</span>
                  <span>
                    {pokemon.name}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span>Name:</span>
                  <span>
                    {pokemon.name}
                  </span>
                </InfoRow>
              </InfoContainer>
            </Card>
            :
            null
        }
      </Container>
    );
  }
}

export default PokeInfo;