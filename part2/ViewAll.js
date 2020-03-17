
import React from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import Realm from 'realm';
let realm;

export default class ViewAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    realm = new Realm({ path: 'ingredients.realm' });
    var ingredients = realm.objects('ingredients');
    this.state = {
      FlatListItems: ingredients,
    };
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: 'white', padding: 20 }}>
              <Text>Id: {item.id}</Text>
              <Text>Name: {item.product_name}</Text>
              {/* <Text>Image: {item.image}</Text> */}
              <Image 
                source={{uri: `${item.image}`}}
                style={{width: 400, height: 400}}
              />
            </View>
          )}
        />
      </View>
    );
  }
}