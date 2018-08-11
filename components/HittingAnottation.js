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
    lastVisHome: 1
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
    let { lastVisHitter, lastVisHome } = this.state;
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
        battingHome[lastVisHome].AB += 1;
        this.setState({ battingVisitor });
      } else {
        battingHome[lastVisHome].AB += 1;
        battingHome[lastVisHome].H += 1;
        this.setState({ battingHome });
      }
      if (lastVisHome < 9) lastVisHome += 1;
      else lastVisHome = 1;
      this.setState({ lastVisHome });
    }
  };

  render() {
    const { teamName } = this.props;
    const { battingVisitor, battingHome } = this.state;
    const battingList = teamName === 'Visitor' ? battingVisitor : battingHome;
    return (
      <React.Fragment>
        <div className="batting">
          <HitterList teamName={teamName} battingList={battingList} />
        </div>
      </React.Fragment>
    );
  }
}

export default HittingAnottation;
