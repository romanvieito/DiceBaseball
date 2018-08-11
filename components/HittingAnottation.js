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
    lastVisHitter: 1,
    battingHome: {
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
    lastHomeHitter: 1
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

  convertDiceToAnott = () => {
    const { dice } = this.props;
    const { battingVisitor, battingHome, isHomeAtBat } = this.state;
    let { lastVisHitter, lastHomeHitter } = this.state;
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
    } else {
      if (dice < 3) {
        battingHome[lastHomeHitter].AB += 1;
        this.setState({ battingVisitor });
      } else {
        battingHome[lastHomeHitter].AB += 1;
        battingHome[lastHomeHitter].H += 1;
        this.setState({ battingHome });
      }
      if (lastHomeHitter < 9) lastHomeHitter += 1;
      else lastHomeHitter = 1;
      this.setState({ lastHomeHitter });
    }
  };

  render() {
    const { teamName } = this.props;
    const { battingVisitor, battingHome, lastVisHitter, lastHomeHitter, isHomeAtBat } = this.state;
    const battingList = teamName === 'Visitor' ? battingVisitor : battingHome;

    let lastHitter = '';
    if (isHomeAtBat) {
      lastHitter = teamName !== 'Visitor' ? lastHomeHitter : '';
    } else lastHitter = teamName === 'Visitor' ? lastVisHitter : '';

    return (
      <React.Fragment>
        <div className="batting">
          <HitterList
            teamName={teamName}
            battingList={battingList}
            lastHitter={lastHitter.toString()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default HittingAnottation;
