import React from 'react';
import propTypes from 'prop-types';

import SidebarRender from 'react-sidebar';
import HitterAnottation from './HittingAnottation';

class SideBar extends React.Component {
  // static propTypes = {
  //   sidebarOpen: propTypes.bool
  // };

  state = {
    sidebarOpen: false
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    const { sidebarOpen } = this.state;

    const renderSide = () => (
      <HitterAnottation
        teamName="{teamNamesLong.vis}"
        lastKeyHistoryDice="3"
        dice="2"
        isHomeAtBat="true"
      />
    );

    return (
      <React.Fragment>
        <SidebarRender
          sidebar={renderSide()}
          open={sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: 'white' } }}
        >
          <button type="button" onClick={() => this.onSetSidebarOpen(true)}>
            +
          </button>
        </SidebarRender>

        <style jsx>
          {`
            .bases {
              position: absolute;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default SideBar;
