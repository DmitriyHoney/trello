import React from 'react';
import ListCardPage from "./ListCardPage";
import { compose } from 'redux';
import { connect } from 'react-redux';
//import styled from "styled-components";

let mapStateToProps = state => ({
  listCardPage: state.listCardPage
});

class App extends React.Component {
  render() {
    return (
      <div>
        <ListCardPage listCardPage={this.props.listCardPage}/>
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps, {})
)(App);
