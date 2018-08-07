/**
 *
 * Modal.js
 *
 * Renders a modal as a menu
 */

import React from 'react';
import propTypes from 'prop-types';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    right: 'auto',
    bottom: 'auto'
  }
};

ReactModal.setAppElement('.wrapper');

class Modal extends React.Component {
  static propTypes = {
    className: propTypes.string
  };

  state = {
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { className } = this.props;
    const { showModal } = this.state;
    return (
      <div className={className}>
        <button type="button" onClick={this.handleOpenModal}>
          |||
        </button>
        <ReactModal style={customStyles} isOpen={showModal} contentLabel="Minimal Modal Example">
          <button type="button" onClick={this.handleCloseModal}>
            x
          </button>
        </ReactModal>
        <style jsx>
          {`
            button {
              border: none;
              background: inherit;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Modal;
