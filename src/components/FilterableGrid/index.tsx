import * as React from 'react';
import styled from 'styled-components';
import PokeCard from '../PokeCard';

const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(2, 50%);
  grid-gap: 15px;
  padding: 0 10%;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 50%));
  }
`;

interface Props {
  data: any;
  onClick?: (pokemon: any) => void;
}

interface State {
  selectedPokemon: any;
}

class FilterableGrid extends React.Component<Props, State> {
  public state: State = {
    selectedPokemon: null
  }
  public render() {
    const { data, onClick } = this.props;
    return (
      <Grid>
        {data.map((p: any) => (
          <PokeCard
            key={p.name}
            url={p.url}
            name={p.name}
            onClick={onClick}
          />
        ))}
      </Grid>
    );
  }
}

export default FilterableGrid;
