import React from 'react';
import '../styles/partials/components/_NameModal.scss';
import Modal from 'react-responsive-modal/lib/css';
import { connect } from 'react-redux';
import { storeName } from '../actions/app';

class NameModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      name: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onOpenModal = () => {
    this.setState(() => {
      return {
        open: true
      };
    });
  };

  onCloseModal = () => {
    this.setState(() => {
      return {
        open: false
      };
    });
  };

  onInputChange(e) {
    const name = e.target.value;
    this.setState(() => {
      return {
        name
      };
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(storeName(this.state.name));
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        onClose={this.onCloseModal}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        little
        showCloseIcon={false}
      >
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="What's your name?" autoFocus onChange={this.onInputChange} />
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    );
  }
}

export default connect()(NameModal);
