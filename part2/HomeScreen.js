/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { View } from 'react-native';
import Mybutton from './components/uliButton';
import Mytext from './components/uliText';
import Realm from 'realm';
let realm;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({
      path: 'ingredients.realm',
      schema: [
        {
          name: 'ingredients',
          properties: {
            id: { type: 'int', default: 0 },
            product_name: 'string',
            image: 'string',
          },
        },
      ],
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column'
        }}>
        <Mytext text="Database + Ingredient search" />
        <Mybutton
          title="Add Ingredient"
          customClick={() => this.props.navigation.navigate('Add')}
        />
        <Mybutton
          title="View All Ingredient"
          customClick={() => this.props.navigation.navigate('ViewAll')}
        />
        <Mybutton
          title="Delete Ingredient"
          customClick={() => this.props.navigation.navigate('Delete')}
        />
      </View>
    );
  }
}