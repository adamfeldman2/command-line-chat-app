import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io(`http://${window.location.hostname}:5000`);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageToSendToServer: '',
      incomingMessageFromServer: false,
      allMessages: []
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }

  componentDidMount() {
    socket.emit('usernameFromClient', this.props.name);

    socket.on('messageFromServer', ({ name, message }) => {
      this.setState((prevState) => {
        return {
          incomingMessageFromServer: true,
          allMessages: [...prevState.allMessages, `${name}: ${message}`]
        };
      });
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const formTop = this.refs.messageInput.offsetTop;
    window.scrollTo(0, formTop);
  }

  onInputChange(e) {
    const message = e.target.value;
    this.setState(() => {
      return { messageToSendToServer: message };
    });
  }

  sendMessageToServer(e) {
    e.preventDefault();

    if (this.state.messageToSendToServer) {
      socket.emit('messageFromClient', {
        name: this.props.name,
        message: this.state.messageToSendToServer
      });

      this.setState(() => {
        return {
          messageToSendToServer: ''
        };
      });
    }
  }

  // refocuses the input onBlur so that it's always in focus
  onInputBlur() {
    this.nameInput.focus();
  }

  render() {
    const { incomingMessageFromServer, allMessages } = this.state;

    return (
      <div className="wrapper-component-chat wrapper">
        <div className="wrapper-chat">
          <div className="messages-output">
            <ul>
              {incomingMessageFromServer &&
                allMessages.map((message, i) => {
                  return <li key={i}>{message}</li>;
                })}
            </ul>
          </div>

          <form ref="messageInput" className="messages-input" onSubmit={this.sendMessageToServer}>
            <input
              type="text"
              autoFocus
              value={this.state.messageToSendToServer}
              onChange={this.onInputChange}
              onBlur={this.onInputBlur}
              ref={(input) => {
                this.nameInput = input;
              }}
            />
            <input type="submit" value="Send Message" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.app.name
  };
};

export default connect(mapStateToProps)(Chat);
