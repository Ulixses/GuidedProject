/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Text } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Mybutton from './components/uliButton';
import Realm from 'realm';
let realm;

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: '',
      image: '',
      ingredients: [],
      query: ''
    };
    realm = new Realm({ path: 'ingredients.realm' });
  }

  insertIngredient = () => {
    var that = this;
    const { product_name } = this.state;
    //Realm database
    if (product_name) {
          realm.write(() => {
            var ID = realm.objects('ingredients').sorted('id', true).length + 1;
            realm.create('ingredients', {id: ID,product_name: that.state.product_name,image: that.state.image,});
            Alert.alert('Success','You added the ingredient correctly',[{text: 'Ok',onPress: () => that.props.navigation.navigate('HomeScreen'),},],{ cancelable: false });
          });
      } else {
        alert('Please select an ingredient');
      }
  };

  findIngredient(query) {
    if (query === '') {
      return [];
    }
    const ingredients = this.state.ingredients;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return ingredients.filter(ingredient => ingredient.product_name.search(regex) >= 0);
  }

  selectIngredient(ing)
  {
    this.state.product_name = ing.product_name;
    this.state.image = ing.image_front_small_url;
  }
  render() {
    const { query } = this.state;
    const ingredients = this.findIngredient(query);
    //const ingredients = this.state.ingredients;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          data={ingredients.length === 1 && comp(query, ingredients[0].product_name) ? [] : ingredients}
          defaultValue={query}
          onChangeText={text => {
            this.setState({ query: text })
            const url = `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${text}&json=1`;
            fetch(url).then(res => res.json()).then((json) => {
              const { products: ingredients } = json;
              this.setState({ ingredients });
            });
          }}
          placeholder="Search for an ingredient"
          underlineColorAndroid="transparent"
          placeholderTextColor="#007FFF"

          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.setState({ query: item.product_name })}>
              <Text >
                {item.product_name}
              </Text>
            </TouchableOpacity>
          )}>

          {ingredients.length > 0 ? (this.selectIngredient(ingredients[0])) : (null)}
        </Autocomplete>
          <Mybutton
            title="Submit"
            customClick={this.insertIngredient.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }
}