import React from 'react';

import { fetchAll } from '../api';
import Wrapper from './Wrapper';
import CardContainer from './cards/CardContainer';

class App extends React.PureComponent {
  state = {
    error: null,
    cards: []
  };

  componentDidMount() {
    fetchAll(this.requestDone);
  }

  requestDone = (error, cards = []) =>
    this.setState({ error, cards });

  render() {
    return (
      <Wrapper>
        <CardContainer
          cards={this.state.cards}
          refresh={this.requestDone}
        />
      </Wrapper>
    );
  }
}

export default App;
