/**
 *
 * QuestionMarkHelp.js
 *
 * Renders a question mark, if click show modal with batting help info
 */

import React from 'react';
import propTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

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
          <button
            data-tip
            data-for="global"
            type="button"
            className="question-mark mr--1"
            onClick={this.handleOpenModal}
          >
            <Img src={QuestionMark} alt="Question" />
          </button>
        </div>
        <ReactTooltip id="global" type="dark" effect="solid" aria-haspopup="true" role="{role}">
          <p>Batting Help</p>
          <div>(smaller dice win)</div>
          <ul style={{ listStyleType: 'none' }}>
            <li>1: Out</li>
            <li>2: Out or Double Play</li>
            <li>3: Hit</li>
            <li>4: Double</li>
            <li>5: Triple</li>
            <li>6: Home Run</li>
          </ul>
        </ReactTooltip>
        <style jsx>
          {`
            .question-mark {
              width: 40px;
            }
            .mr--1 {
              margin-right: -1em;
            }
            button {
              border: none;
              background: inherit;
            }
            ul li {
              text-align: left;
            }
          `}
        </style>
      </div>
    );
  }
}

export default QuestionMarkHelp;
