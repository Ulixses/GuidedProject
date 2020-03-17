/*Screen to delete the user*/
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import Mytextinput from './components/uliInput';
import Mybutton from './components/uliButton';
import Realm from 'realm';
let realm;
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({ path: 'ingredients.realm' });
    this.state = {
      input_id: '',
    };
  }
  deleteUser = () => {
    var that = this;
    realm.write(() => {
      var ID = this.state.input_id;
      var ing = realm.objects('ingredients').filtered('id =' + ID);
      if (ing.length == 1)
      {
        realm.delete(ing);
        Alert.alert(
          'Success',
          'Ingredient deleted successfully',
          [
            {
              text: 'Ok',
              onPress: () => that.props.navigation.navigate('HomeScreen'),
            },
          ],
          { cancelable: false }
        );
      } else {
        alert('Please insert a valid id');
      }
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Enter Id"
          onChangeText={input_id => this.setState({ input_id })}
        />
        <Mybutton
          title="Delete Ingredient"
          customClick={this.deleteUser.bind(this)}
        />
      </View>
    );
  }
}