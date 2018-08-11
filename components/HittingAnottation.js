import React from 'react';
import propTypes from 'prop-types';
import HitterList from './HitterList';

class HittingAnottation extends React.Component {
  static propTypes = {
    teamName: propTypes.string,
    dice: propTypes.number,
    lastKeyHistoryDice: propTypes.string,
    isHomeAtBat: propTypes.bool
  };

  state = {
    isHomeAtBat: false,
    battingVisitor: {
      1: { AB: 0, H: 0 },
      2: { AB: 0, H: 0 },
      3: { AB: 0, H: 0 },
      4: { AB: 0, H: 0 },
      5: { AB: 0, H: 0 },
      6: { AB: 0, H: 0 },
      7: { AB: 0, H: 0 },
      8: { AB: 0, H: 0 },
      9: { AB: 0, H: 0 }
    },
    lastVisHitter: 1
  };

  componentDidUpdate(props, state) {
    const { lastKeyHistoryDice, isHomeAtBat } = this.props;
    if (lastKeyHistoryDice !== props.lastKeyHistoryDice) {
      this.convertDiceToAnott();
    }
    if (state.isHomeAtBat !== props.isHomeAtBat) {
      this.setStateIsHomeBat(isHomeAtBat);
    }
  }

  setStateIsHomeBat(isHomeAtBat) {
    this.setState({ isHomeAtBat });
  }

  // get convertDiceToAnott() {
  //   return this._convertDiceToAnott;
  // }
  // set convertDiceToAnott(value) {
  //   this._convertDiceToAnott = value;
  // }

  convertDiceToAnott = () => {
    const { dice } = this.props;
    const { battingVisitor, isHomeAtBat } = this.state;
    let { lastVisHitter } = this.state;
    if (!isHomeAtBat) {
      if (dice < 3) {
        battingVisitor[lastVisHitter].AB += 1;
        this.setState({ battingVisitor });
      } else {
        battingVisitor[lastVisHitter].AB += 1;
        battingVisitor[lastVisHitter].H += 1;
        this.setState({ battingVisitor });
      }
      if (lastVisHitter < 9) lastVisHitter += 1;
      else lastVisHitter = 1;
      this.setState({ lastVisHitter });
    }
  };

  render() {
    const { teamName, dice, isHomeAtBat } = this.props;
    const { battingVisitor } = this.state;
    return (
      <React.Fragment>
        <HitterList teamName={teamName} battingList={battingVisitor} />
        <style jsx>
          {`
            .ok {
              color: white;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default HittingAnottation;
