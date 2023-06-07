import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      article_details: {}
    }
  }

  get_articles_details = () => {
    const url = 'http://127.0.0.1:5000/get-articles'
    axios
    .get(url)
    .then((response) => {
      let details = response.data.Data
    
      this.setState({
        article_details: details
      })
    })
    .catch((error) => {
      console.log("This is the error: ", error)
    })
  }

  likedArticle = () => {
    const url = "http://localhost:5000/liked-articles";
    axios
      .post(url)
      .then(response => {
        this.get_articles_details();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  unlikedArticle = () => {
    const url = "http://localhost:5000/unliked-articles";
    axios
      .post(url)
      .then(response => {
        this.get_articles_details();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  componentDidMount(){
    this.get_articles_details()
  }


  render(){
    const { article_details } = this.state
    let title, url, lang, text

    if(article_details){
      title = article_details.title
      url = article_details.url
      lang = article_details.lang
      text = article_details.text

      console.log(title)
    }

    return(
      <SafeAreaProvider style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            centerComponent={{
              text: 'Article Recommendation',
              style: styles.headerTitle,
            }}
            rightComponent={{
              icon: "book",
              color: "#fff",
              type: "material-community",
              onPress: () =>
                this.props.navigation.navigate("RecommendedArticles")
            }}
            backgroundColor={"#d500f9"}
            containerStyle={{ flex: 1 }}
          />
        </View>

        <View style={styles.subContainer}>
          <View style={styles.subTopContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity style = {styles.linkText} onPress={() => Linking.openURL(url)}>
              Link: {url}
              </TouchableOpacity>

            <View style={styles.lowerBottomContainer}>
              <View style={styles.iconButtonContainer}>
                <TouchableOpacity onPress={this.likedArticle}>
                  <Icon
                    reverse
                    name={"check"}
                    type={"entypo"}
                    size={RFValue(15)}
                    color={"#76ff03"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.unlikedArticle}>
                  <Icon
                    reverse
                    name={"cross"}
                    type={"entypo"}
                    size={RFValue(15)}
                    color={"#ff1744"}
                    />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9df2d2'},
  headerContainer: { flex: 0.1 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: RFValue(18) },
  subContainer: { flex: 0.9},
  subTopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2c09d',
    borderColor: 'white',
    borderWidth: 10,
    borderRadius: RFValue(20),
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(30)
    
  },
  subBottomContainer: { flex: 0.6 },
  upperBottomContainer: { flex: 0.2, alignItems: 'center' },
  title: { fontSize: RFValue(20), fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: RFValue(14), fontWeight: '300' },
  middleBottomContainer: { flex: 0.35 },
  overview: {
    fontSize: RFValue(13),
    textAlign: 'center',
    fontWeight: '300',
    color: 'gray',
  },
  lowerBottomContainer: { flex: 0.45 },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  buttonCotainer: { justifyContent: 'center', alignItems: 'center' },
  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: RFValue(15),
  },
  buttonText: { fontSize: RFValue(15), fontWeight: 'bold' },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: RFValue(15),
    justifyContent: 'center',
    fontStyle: 'italic',
  },
  linkText: {color: 'blue', fontSize: RFValue(11)},
  text: {color: '#161716', fontSize: RFValue(7), fontWeight: '470'}
});
