import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class PopularArticlesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const url = "http://127.0.0.1:5000/popular-articles";
    axios
      .get(url)
      .then(async response => {
        this.setState({ data: response.data.Data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    return (
      <Card
        key={`card-${index}`}
        title={item.title}
        titleStyle={styles.styleTitle}
        subtitle={'Link: ' + item.url}
        subtitleStyle={styles.styleSubtitle}
      ></Card>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleTitle: {
    color: "black",
    alignSelf: "flex-start",
    fontSize: RFValue(13),
    marginBottom: RFValue(65),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  styleSubtitle: {
    fontWeight: "bold",
    color: 'blue',
    alignSelf: "flex-start",
    fontSize: RFValue(10)
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginBottom: RFValue(20),
  }
});
