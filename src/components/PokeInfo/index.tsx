import * as React from 'react';
import { Card as card, Carousel, Icon } from 'antd';
import styled from 'styled-components';

interface Props {
  pokemon?: any;
  onClose: () => void;
}

const ImageCard = styled.img`
  max-height: 15vh;
  max-width: 100%;
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  max-height: ${({ visible }: { visible: any }) => visible ? "20vh" : "0"};
	transition: max-height 1s;
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
  }

  .ant-carousel .slick-dots li button {
    background: red;
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: red;
  }

  @media only screen and (max-width: 768px) {
    .ant-carousel .slick-dots li {
      display: none;
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
                  Object.keys(pokemon.sprites).filter((sprite) => pokemon.sprites[sprite] !== null).map(sprite => (
                    <ImageCard src={pokemon.sprites[sprite]} />
                  ))
                }
              </Carousel>
              <InfoContainer>
                <span>
                  {pokemon.name}
                </span>
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