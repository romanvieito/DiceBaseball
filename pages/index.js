import React from "react";
import PropTypes from "prop-types";
import HistoryRender from "../components/HistoryRender"
class Index extends React.Component {

  state = {
    historyDices: {},
  };

  static propTypes = {
    historyDices: PropTypes.object
  };

  rollDice = event => {
    event.preventDefault();
    const x = 4;
    this.addNewDiceNumber(x);
  }

  addNewDiceNumber = numberDice => {
    const historyDices = { ...this.state.historyDices };
    historyDices[`dices${Date.now()}`] = numberDice;
    this.setState({ historyDices });
  };

  render() {
    return (
      <>
        <ul>
          {Object.keys(this.state.historyDices).map(key => (
            <HistoryRender
              key={key}
              index={key}
              details={{ key: this.state.historyDices[key] }}
            />
          ))}
          <li></li>
        </ul>
        <form className="xxx" onSubmit={this.rollDice}>
          <button type="submit">Roll dices→</button>
        </form>
      </>
    );
  }
}

export default Index;