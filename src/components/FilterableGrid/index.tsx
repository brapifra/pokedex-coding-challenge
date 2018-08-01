import * as React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import PokeCard from '../PokeCard';

const Grid = styled.div`
  display: grid;
  height: 90%;
  width: 100%;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(2, 50%);
  grid-gap: 15px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 50%);
    width: 80%;
    height: 80%;
  }
`;

const Container = styled.div`
  height: 100%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const Filter = styled(Input.Search)`
  &.ant-input-affix-wrapper{
    margin-bottom: 2%;
    height: 5%;
    width: 40%;
  }
  &.ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
    border-color: #c00d0d;
    border-right-width: 1px !important;
  }
  .ant-input:focus {
    border-color: #c00d0d;
    box-shadow: 0 0 0 2px rgba(139, 0, 0, 0.2);
  }
  @media only screen and (max-width: 768px) {
    &.ant-input-affix-wrapper{
      width: 60%;
    }
    .ant-input-suffix{
      display: none;
    }
  }
`;

interface Props {
  data: any;
  onClick?: (pokemon: any) => void;
}

interface State {
  selectedPokemon: any;
  filter: string;
}

class FilterableGrid extends React.Component<Props, State> {
  public state: State = {
    selectedPokemon: null,
    filter: ''
  }
  public render() {
    const { data, onClick } = this.props;
    const { filter } = this.state;
    return (
      <Container>
        <Filter onChange={this.onSearch} placeholder="Filter..." />
        <Grid>
          {data.map((p: any) => (
            <PokeCard
              key={p.name}
              url={p.url}
              name={p.name}
              onClick={onClick}
              visible={filter !== '' ?
                p.name.includes(filter.toLocaleLowerCase())
                :
                true
              }
            />
          ))}
        </Grid>
      </Container>
    );
  }
  private onSearch = (ev: any) => {
    this.setState({ filter: ev.target.value });
  }
}

export default FilterableGrid;
