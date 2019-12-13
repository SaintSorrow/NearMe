import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { PageActionCreators } from '../Redux/Actions/Pages';

export class WikipediaArticle extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: props.page,
    }
  }

  openLink = async() => {
    await WebBrowser.openBrowserAsync("http://en.wikipedia.org/?curid=" + this.state.page.pageId);
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openLink}>
          <Text style={styles.text}>{this.state.page.title}</Text>
          <Text style={styles.text}>Distance: {this.state.page.distance}</Text>
        </TouchableOpacity>
        {this.props.canAdd === true && 
          (<Icon style={styles.icon} 
                  size={25} 
                  name={'md-add'} 
                  onPress={() => this.props.addPage(this.state.page)}/>)}
        {this.props.canDelete === true && 
          (<Icon style={styles.icon}
                  size={25} 
                  name={'md-trash'} 
                  onPress={() => this.props.removePage(this.state.page)}/>)}
      </View>
    )
  }
}

const { addPage, removePage } = PageActionCreators;

function mapDispatchToProps(dispatch) {
  return {
    addPage: (page) => dispatch(addPage(page)),
    removePage: (page) => dispatch(removePage(page))
  }
}

function mapStateToProps(state) {
  return {
    readingList: state.items.readingList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WikipediaArticle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    width: Dimensions.get('window').width,
    height: 100,
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    left: 20
  }
})