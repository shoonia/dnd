import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragSource } from 'react-dnd';

import { typeCard } from '../../types';

const Card = props => {
  const style = props.isDragging
    ? `card text-white border-light text-light`
    : `card text-${ props.color }`;

  return props.connectDropTarget(
    <article className="pt-1 pb-1">
      { props.connectDragSource(
          <div className={style}>
            <div className="card-body">
              <h5>{props.title}</h5>
            </div>
          </div>
      ) }
    </article>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

/**
 * DropTarget:
 */
const targetSpec = {
  drop(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

/**
 * DragSource:
 */
const sourceSpec = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const target = monitor.getDropResult();
    const source = monitor.getItem();
    if (target.id !== source.id) {
      props.moveCard(source.id, target.index);
    }
  }
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

/**
 * export:
 */
export default DropTarget(typeCard, targetSpec, targetCollect)(
  DragSource(typeCard, sourceSpec, sourceCollect)(Card)
);
