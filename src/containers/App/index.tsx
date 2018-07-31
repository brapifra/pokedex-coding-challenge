import * as React from 'react';
import { Layout } from 'antd';
import Fetch from '../../components/Fetch';
import PokeCard from '../../components/PokeCard';
import styled from 'styled-components';

const Body = styled.div`
  background: #fff;
  padding: 24px;
  height: calc(100vh - 133px);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0,10%));
  grid-gap: 15px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const H1 = styled.h1`
  text-align: center;
  color: white;
`;

const { Header, Content, Footer } = Layout;

class App extends React.Component<any> {
  public render() {
    return (
      <Layout>
        <Header>
          <H1>Pokedex</H1>
        </Header>
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
        <Footer style={{ textAlign: 'center' }}>
          Pokedex created by Brais Piñeiro
        </Footer>
      </Layout >
    );
  }
}

export default App;
