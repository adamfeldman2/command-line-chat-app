import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io(`https://${document.location.hostname}:${document.location.port}`);

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayUsers: false,
      users: []
    };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    socket.on('usersFromServer', (users) => {
      this.setState(() => {
        return {
          users
        };
      });
    });
  }

  onButtonClick() {
    this.setState((prevState) => {
      return {
        displayUsers: !prevState.displayUsers
      };
    });
  }

  render() {
    return (
      <div className={`wrapper-component-users ${this.state.displayUsers ? 'active' : ''}`}>
        <button onClick={this.onButtonClick}>
          {this.state.displayUsers ? 'Hide' : `Users (${this.state.users.length})`}
        </button>
        {this.state.displayUsers && (
          <ul>
            {this.state.users &&
              this.state.users.map((user, i) => {
                return <li key={i}>{user}</li>;
              })}
          </ul>
        )}
      </div>
    );
  }
}

export default connect()(Users);
