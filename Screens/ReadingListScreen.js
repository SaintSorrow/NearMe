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

export class ReadingListScreen extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          {this.props.readingList.length > 0 && 
            (this.props.readingList.map(page => <WikipediaArticle page={page} key={page.pageId} canDelete={true}/>))}
          {this.props.readingList.length === 0 && 
            (<Text>Reading list is empty</Text>)}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    readingList: state.items.readingList
  }
}

export default connect(mapStateToProps)(ReadingListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  }
})