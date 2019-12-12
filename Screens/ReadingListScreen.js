import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Text
} from 'react-native';
import WikipediaArticle from './../Components/WikipediaArticle';

class ReadingListScreen extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          {this.props.readingList != null && (this.props.readingList.map(page => <WikipediaArticle page={page} key={page.pageId}/>))}
          {this.props.readingList == null && (<Text>Reading list is empty</Text>)}
        </ScrollView>
      </View>
    );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  }
})