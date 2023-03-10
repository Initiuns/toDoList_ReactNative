import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from "./components/Task";

export default function App() {

  const [ task, setTask ] = useState();
  const [ taskItems, setTaskItems ] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    
    if(!task) { 
      alert('Preencha o campo');
      return; 
    }
    setTaskItems([ ...taskItems, task ]);
    setTask(null);
  }

  const completeTask = (index) => {
      let itemsCopy = [ ...taskItems ];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas de hoje</Text>
      </View>

          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })}
          </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Adicione uma tarefa'}
          value={task}
          onChangeText={text => setTask(text)}  
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFDEE7',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#5E7CE2',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  items: {
    marginTop: 30,
    padding: 10
  },
  writeTaskWrapper: {
    position: 'absolute',
    backgroundColor: '#5E7CE2',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#CCC',
    borderWidth: 0.5,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#5E7CE2',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 36,
    alignContent: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
});
