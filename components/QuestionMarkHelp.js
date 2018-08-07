/**
 *
 * QuestionMarkHelp.js
 *
 * Renders a question mark, if click show modal with batting help info
 */

import React from 'react';
import propTypes from 'prop-types';

import Img from './Img';
import QuestionMark from '../static/question-mark-button.svg';

class QuestionMarkHelp extends React.Component {
  static propTypes = {
    className: propTypes.string
  };

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className="flex justify-content-end">
          <button type="button" className="question-mark pt-1" onClick={this.handleOpenModal}>
            <Img src={QuestionMark} alt="Question" />
          </button>
        </div>

        <style jsx>
          {`
            .question-mark {
              width: 30px;
              // padding-right: 0.7em;
            }
          `}
        </style>
      </div>
    );
  }
}

export default QuestionMarkHelp;
