import * as React from 'react';
import { Card } from 'antd';
import LoadingComponent from '../LoadingComponent';

interface Props {
  url: any;
  name?: string;
}

interface State {
  loading: any;
  data: any;
}

class PokeCard extends React.Component<Props, State> {
  public state: State = {
    loading: true,
    data: {
      name: "Loading Pokemon"
    }
  }
  public async componentDidMount() {
    const res = await fetch(this.props.url);
    const data = await res.json();
    this.setState({ data, loading: false });
  }
  public render() {
    console.log(this.state.data);
    return (
      <LoadingComponent loading={this.state.loading}>
        <Card>
          {this.state.data ?
            <div>
              <img src="d" />
              {this.state.data.name}
            </div>
            :
            null}
        </Card>
      </LoadingComponent>
    );
  }
}

export default PokeCard;
