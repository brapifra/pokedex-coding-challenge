import * as React from 'react';
import { Layout } from 'antd';
import Fetch from '../../components/Fetch';
import PokeCard from '../../components/PokeCard';
import styled from 'styled-components';

const { Content, Footer } = Layout;

const Body = styled.div`
  background: transparent;
  padding: 24px;
  height: calc(100vh - 168px);
  overflow-y: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0,10%));
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
`;

class App extends React.Component<any> {
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
                    {data.results.map((p: any) => {
                      return <PokeCard key={p.name} url={p.url} name={p.name} />
                    })}
                  </Grid>
                );
              }}
            </Fetch>
          </Body>
        </Content>
        <Footer style={{ textAlign: 'center', background: 'transparent' }}>
          Pokedex created by Brais Piñeiro
        </Footer>
      </Layout >
    );
  }
}

export default App;
