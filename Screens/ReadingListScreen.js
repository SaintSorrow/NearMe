import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReadingListScreen extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

  }
}

function mapStateToProps(state) {
  return {
    readingList: state.readingList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromReadingList: () => ({ type: 'REMOVE_FROM_READING'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingListScreen);