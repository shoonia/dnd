import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import Card from './Card';

class CardContainer extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    refresh: PropTypes.func.isRequired
  };

  moveCard = (id, index) => {
    const { cards, refresh } = this.props;
    const currentCard = cards.find(card => card.id === id);
    const sortCards = cards.filter(card => card.id !== id);

    sortCards.splice(index, 0, currentCard);
    refresh(null, sortCards);
  };

  renderCards = () => {
    const { cards } = this.props;
    return cards.map((card, i) => (
      <Card
        {...card}
        key={card.id}
        index={i}
        moveCard={this.moveCard}
      />
    ));
  };

  render() {
    return (
      <React.Fragment>
        {this.renderCards()}
      </React.Fragment>
    );
  }
}

export default DragDropContext(HTML5Backend)(CardContainer);
