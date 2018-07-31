import * as React from 'react';
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
            return <div key={p.name}>{p.name}</div>;
          })
        }
      </div>
    );
  }
}

export default Fetch(App)('https://pokeapi.co/api/v2/pokemon/');
