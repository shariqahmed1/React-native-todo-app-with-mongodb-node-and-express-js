import React from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, ToastAndroid, Modal, Alert, TouchableHighlight, } from 'react-native';
import { Content, List, ListItem, Text, Icon, Left, Item, Input, Right } from 'native-base';
import { allTodos, addTodo, deleteTodo, updateTodo } from '../constant/index';
import { ScrollView } from 'react-native-gesture-handler';

export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      text: '',
      isEdit:false,
      editId:'',
      editIndex:'',
      txtFocus:false,
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.fetchTodos();
  }

  async fetchTodos() {
    allTodos()
      .then(data => {
        this.setState({
          data,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  async add() {
    const {
      text,
      data
    } = this.state;

    if (text !== "") {
      addTodo(text)
        .then(res => {
          this.setState({
            data: [...data, res],
            text:'',
          })
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    else {
      ToastAndroid.show("Please enter some text", ToastAndroid.SHORT);
    }
  }

  async update() {
    let {
      text,
      data,
      editId,
      editIndex,
    } = this.state;

    if (text !== "") {
      updateTodo(editId, text)
        .then(res => {
          data[editIndex].title = text;
          this.setState({
            data,
            isEdit:false,
            text:'',
            editId:'',
            editIndex:'',
            txtFocus:false,
          })
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    else {
      ToastAndroid.show("Please enter some text", ToastAndroid.SHORT);
    }
  }

  async delete(index, id) {
    let {
      data
    } = this.state;
    deleteTodo(id)
      .then(res => {
        data.splice(index, 1);
        this.setState({
          data,
        })
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  renderTodosList(data) {
    return (
      <Content style={styles.listContainer}>
        <ScrollView>
          <List>
            {
              data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <ListItem key={index} noIndent>
                      <Left>
                        <Text style={styles.size}>{item.title}</Text>
                      </Left>
                      <Right>
                        {
                          this.state.editIndex === index ?
                            <Icon active onPress={() => 
                              this.setState({ 
                                isEdit: false, 
                                editIndex:'', 
                                text:'', 
                                editId: '',
                                txtFocus:false,
                              })
                            } type="MaterialIcons" name="clear" style={{ fontSize: 25, color: '#000' }} />
                          :
                            <Icon onPress={() => {
                                this.setState({
                                  isEdit:true, 
                                  text:item.title, 
                                  editId: item._id, 
                                  editIndex : index,
                                  txtFocus:true,
                                }) 
                              }} 
                            type="MaterialCommunityIcons" style={{ fontSize: 25, color: '#0086b3' }} name="square-edit-outline" />
                        }
                      </Right>
                      <Right>
                          <Icon onPress={this.delete.bind(this, index, item._id)} type="MaterialCommunityIcons" name="trash-can-outline" style={{ fontSize: 25, color: 'red' }} />
                      </Right>
                    </ListItem>
                  )
                })
                :
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={[styles.size, { fontWeight: 'bold' }]}>No Todos Available !</Text>
                </View>
            }
          </List>
        </ScrollView>
      </Content>
    );
  }

  render() {

    const {
      data,
      isLoading,
      isEdit,
      text,
      txtFocus
    } = this.state;
    
    return (
      <View style={styles.container}>

        <View style={{ margin: 20 }}>
          <Item>
            <Input style={styles.size} value={text} autoFocus={txtFocus ? true : false } ref={(ref) => this.input = ref} onChangeText={(text) => this.setState({ text })} placeholder='Enter Text' />
            {
              isEdit ?
                <TouchableOpacity onPress={() => this.update()}>
                  <Icon active name="update" type="MaterialCommunityIcons" style={{ fontSize: 30, color: '#005086' }} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => this.add()}>
                  <Icon active name="ios-add" type="Ionicons" style={{ fontSize: 30, color: '#2F4F4F' }} />
                </TouchableOpacity>
            }
          </Item>
        </View>

        {
          isLoading ?
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#005086" />
            </View>
            :
            this.renderTodosList(data)
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  size: {
    fontSize: 15,
  },
  listContainer: {
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
  }
});
