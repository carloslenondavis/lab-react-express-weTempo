import React, { Component } from 'react';

class Persons extends Component {
    constructor() {
        super()

        this.state = {
            persons: []
        }
    }

    componentDidMount() {
        fetch('/api/persons')
            .then(res => res.json())
            .then(persons => this.setState({ persons }, () => {
                console.log('fetched persons', persons);
            }));
    }
  render() {
      const { persons } = this.state;
    return (
      <div>
          <h1>Persons</h1>
          <ul>
              {
                persons.map(person => <li key={person.id}>{ person.name }</li>)
              }
          </ul>
      </div>
    );
  }
}

export default Persons;
