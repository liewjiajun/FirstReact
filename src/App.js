import React, { Component } from 'react';

import classes from './App.module.css';
import Person from './Person/Person.js';

class App extends Component {
  state = {
    persons: [
      {id: 'asd', name: 'Max', age: 28},
      {id: 'dsa', name: 'Manu', age: 29},
      {id: 'sad', name: 'Jane', age: 26}
    ],
    showPersons: false
  } 

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; //creates copy of state and assign to variable
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render(){
    let persons = null;
    let btnClass = '';

    if(this.state.showPersons){
      persons = (
        <div>
        {this.state.persons.map((person, index) => {
          return <Person 
          click={() => this.deletePersonHandler(index)}
          name={person.name} 
          age={person.age}
          key={person.id} 
          changed={(event) => this.nameChangeHandler(event, person.id)}  />
        })}
        </div>
      );
      
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.App}>
          <h1> Hi, I am a react app</h1>
          <p className={assignedClasses.join(' ')}>Is this working?</p>
          <button
          className= {btnClass} 
          onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
        </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;
