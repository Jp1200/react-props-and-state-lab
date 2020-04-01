import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  changeType = (newType) =>{
    this.setState({
      filters:{type: newType}
    })
  }
  changePet = ()=>{

    if (this.state.filters.type === 'all'){
    fetch('/api/pets')
    .then(r=>r.json())
    .then(json =>{
      console.log(json)
      this.setState({
        pets: json
      })
    })
  } else{
  fetch(`/api/pets?type=${this.state.filters.type}`)
  .then(r=>r.json())
  .then(json =>{
    console.log(json)
    this.setState({
      pets: json
      })
    })
  }
}
onAdoptPet = petId => {
  const pets = this.state.pets.map(p => {
    return p.id === petId ? { ...p, isAdopted: true } : p;
  });
  this.setState({ pets: pets });
};
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} handlePetsChange={this.changePet}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
