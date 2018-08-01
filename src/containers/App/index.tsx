import * as React from 'react';
import { Layout } from 'antd';
import Fetch from '../../components/Fetch';
import PokeCard from '../../components/PokeCard';
import PokeInfo from '../../components/PokeInfo';
import styled from 'styled-components';

const { Content, Footer } = Layout;

const Body = styled.div`
  background: transparent;
  padding: 24px;
  height: calc(100vh - 232px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0,10%));
  grid-gap: 15px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const CenteredHeader = styled.div`
  background: transparent !important;
  text-align: center;
  background-color: white;
  width: 100%;
  margin: 32px 0;
`;

interface State {
  selectedPokemon: any;
}

class App extends React.Component<any, State> {
  public state: State = {
    selectedPokemon: null
  }
  public render() {
    return (
      <Layout style={{ background: 'transparent' }}>
        <CenteredHeader>
          <img src="https://raw.githubusercontent.com/bloodstorms/pokedex/master/img/pokedex/logo-pokemon.png" />
        </CenteredHeader>
        <Content>
          <Body>
            <Fetch url="https://pokeapi.co/api/v2/pokemon/?limit=15">
              {(data, error) => {
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
        </Content>
        <Footer style={{ textAlign: 'center', background: 'transparent' }}>
          Pokedex created by Brais Piñeiro
        </Footer>
      </Layout >
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
