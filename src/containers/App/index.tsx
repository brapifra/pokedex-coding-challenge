import * as React from 'react';
import { Layout } from 'antd';
import LoadingComponent from '../../components/LoadingComponent';
import PokeCard from '../../components/PokeCard';
import styled from 'styled-components';

interface State {
  data?: any;
  loading: boolean;
}
const Body = styled.div`
  background: #fff;
  padding: 24px;
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

class App extends React.Component<any, State> {
  public state: State = {
    data: JSON.parse(localStorage.getItem("pokemons") || "{}"),
    loading: true
  }
  public async componentDidMount() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=15');
    const data = await res.json();
    this.setState({ data, loading: false });
  }
  public render() {
    return (
      <Layout>
        <Header>
          <H1>Pokedex</H1>
        </Header>
        <Content>
          <Body>
            <LoadingComponent loading={this.state.loading}>
              <Grid>
                {this.state.data && this.state.data.results ?
                  this.state.data.results.map((p: any) => {
                    return <PokeCard key={p.name} url={p.url} name={p.name} />
                  })
                  :
                  null
                }
              </Grid>
            </LoadingComponent>
          </Body>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Pokedex created by Brais Piñeiro
        </Footer>
      </Layout>
    );
  }
}

export default App;
