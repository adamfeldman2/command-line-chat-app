import React from 'react';
import NameModal from '../components/NameModal';
import Chat from '../components/Chat';
import { connect } from 'react-redux';

const Home = (props) => {
  return <div className="wrapper-page-home">{props.name ? <Chat /> : <NameModal />}</div>;
};

const mapStateToProps = (state) => {
  return {
    name: state.app.name
  };
};

export default connect(mapStateToProps)(Home);
