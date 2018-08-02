import * as React from 'react';
import { message } from 'antd';
import Fetch, { Loading } from '../../components/Fetch';
import styled from 'styled-components';
import FilterableGrid from '../../components/FilterableGrid';
import Carousel from '../../components/Carousel';
import PokeInfo from '../../components/PokeInfo';

const Body = styled.div`
  background: transparent;
  padding: 24px;
  height: 70%;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const CenteredHeader = styled.div`
  background: transparent !important;
  text-align: center;
  background-color: white;
  width: 100%;
  height: 20%;
  padding: 32px 0;
  @media only screen and (max-width: 768px) {
    padding: 16px 0;
  }
`;

const CenteredFooter = styled.div`
    background: transparent;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface State {
  selectedPokemon: any;
  offset: number;
}

class App extends React.Component<any, State> {
  public state: State = {
    selectedPokemon: null,
    offset: 0
  }
  private API_LIMIT = window.matchMedia("only screen and (max-width: 768px)").matches ? 4 : 10;
  public render() {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.API_LIMIT}&offset=${this.state.offset * this.API_LIMIT}`;
    return (
      <div style={{ background: 'transparent', height: '100%', margin: 0 }}>
        <CenteredHeader>
          <img height="100%" src="https://raw.githubusercontent.com/bloodstorms/pokedex/master/img/pokedex/logo-pokemon.png" />
        </CenteredHeader>
        <Body>
          <Fetch url={url}>
            {(loading, data, error) => {
              if (loading) {
                return (
                  <Carousel
                    onPrevious={this.previous}
                    onNext={this.next}
                    position={this.state.offset}
                    disabled={true}
                  >
                    <Loading />
                  </Carousel>
                );
              }
              if (error) {
                message.error(error.message, 10000);
                return  <Loading />;
              }
              return (
                <Carousel onPrevious={this.previous} onNext={this.next} position={this.state.offset}>
                  <FilterableGrid
                    data={data.results}
                    onClick={this.selectPokemon}
                  />
                </Carousel>
              );
            }}
          </Fetch>
          <PokeInfo
            pokemon={this.state.selectedPokemon}
            onClose={this.deselectPokemon}
          />
        </Body>
        <CenteredFooter>
          <span>Pokedex created by Brais Piñeiro</span>
        </CenteredFooter>
      </div>
    );
  }

  private selectPokemon = (pokemon: any) => {
    this.setState({ selectedPokemon: pokemon });
  }

  private deselectPokemon = () => {
    this.setState({ selectedPokemon: null });
  }

  private previous = () => {
    if (this.state.offset === 0) {
      return;
    }
    this.setState({ offset: this.state.offset - 1 });
  }

  private next = () => {
    this.setState({ offset: this.state.offset + 1 });
  }
}

export default App;
