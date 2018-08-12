import React from 'react';
import propTypes from 'prop-types';

class TopView extends React.Component {
  static propTypes = {
    sidebarOpen: propTypes.bool
  };

  state = {
    sidebarOpen: false
  };

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    const { sidebarOpen } = this.state;

    const renderSide = () => <b>Sidebar dd</b>;

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
