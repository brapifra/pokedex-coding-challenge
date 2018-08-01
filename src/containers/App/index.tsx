import * as React from 'react';
import Fetch, { Loading } from '../../components/Fetch';
import PokeCard from '../../components/PokeCard';
import PokeInfo from '../../components/PokeInfo';
import styled from 'styled-components';

const Body = styled.div`
  background: transparent;
  padding: 24px;
  height: 70%;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(2, 50%);
  grid-gap: 15px;
  padding: 0 80px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-gap: 50px;
    padding: 0;
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
}

class App extends React.Component<any, State> {
  public state: State = {
    selectedPokemon: null
  }
  public render() {
    return (
      <div style={{ background: 'transparent', height: '100%', margin: 0 }}>
        <CenteredHeader>
          <img height="100%" src="https://raw.githubusercontent.com/bloodstorms/pokedex/master/img/pokedex/logo-pokemon.png" />
        </CenteredHeader>
        <Body>
          <Fetch url="https://pokeapi.co/api/v2/pokemon/?limit=10">
            {(loading, data, error) => {
              if (loading) {
                return <Loading />
              }
              if (error) {
                return <div>Error</div>
              }
              return (
                <Grid>
                  {data.results.map((p: any) => (
                    <PokeCard
                      key={p.name}
                      url={p.url}
                      name={p.name}
                      onClick={this.selectPokemon}
                    />
                  ))}
                </Grid>
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
}

export default App;
