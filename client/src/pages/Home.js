import React from 'react';
import io from 'socket.io-client';
const socket = io(`http://${window.location.hostname}:5000`);

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageToSendToServer: '',
      incomingMessageFromServer: '',
      allMessages: []
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
  }

  componentDidMount() {
    socket.on('messageFromServer', (incomingMessageFromServer) => {
      this.setState((prevState) => {
        return {
          incomingMessageFromServer,
          allMessages: [...prevState.allMessages, incomingMessageFromServer]
        };
      });
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
    const formTop = this.refs.messageInput.offsetTop;
    window.scrollTo(0,formTop);
  }

  scrollToBottom() {
    console.log('this: ', this);
    console.log('scrollToBottom');
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
      socket.emit('messageFromClient', this.state.messageToSendToServer);

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
      <div className="wrapper-page-home wrapper">
        {/* <h1>Chat App || Socket.io</h1> */}

        <div className="wrapper-content">
          {/* <div className="wrapper-users">
            <h3>Online Users:</h3>
            <ul className="users" />
          </div> */}

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
      </div>
    );
  }
}

export default Home;
