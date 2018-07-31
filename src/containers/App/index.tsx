import * as React from 'react';
import PokeCard from '../../components/PokeCard';
import Fetch from '../../hocs/Fetch';

interface Props {
  data: any;
}

class App extends React.Component<Props> {
  public render() {
    return (
      <div>
        {
          this.props.data.results.map((p: any) => {
            return <PokeCard key={p.name} url={p.url} name={p.name} />
          })
        }
      </div>
    );
  }
}

export default Fetch(App)('https://pokeapi.co/api/v2/pokemon/');
