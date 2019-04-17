import React, { Component } from 'react'
import foods from '../foods.json'
import SearchBar from './SearchBar'

class FoodBox extends Component {

  state = {
    foods: foods,
    search: '',
    filteredFoods: foods,
    order: [],
    quantity: 0
  }

  showFoods() {
    console.log(this)
    let foodList = this.state.filteredFoods.map((food, i) => {
      return (
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={food.image} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{food.name}</strong> <br />
                  <small>{food.calories}</small>
                </p>
              </div>
            </div>
            <div className="media-right">
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    type="number"
                  />
                </div>
                <div className="control">
                  <button className="button is-info" onClick={() => this.pushOrder(food)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      )
    })
    return foodList
  }

  addFood = (e) => {
    e.preventDefault();

    let addedFood = {
      name: e.target.food.value,
      calories: e.target.calories.value,
      image: e.target.image.value
    }

    let newFoods = [...this.state.foods]
    newFoods.push(addedFood)

    this.setState({
      foods: newFoods
    })
  }

  handleChange = (e) => {
    e.preventDefault()
    let search = e.target.value
    console.log(search, 'search')
    let filteredFoods = this.state.foods.filter(food => food.name.toLowerCase().includes(search.toLowerCase()))
    console.log(filteredFoods, 'filteredFoods')
    this.setState({
      search,
      filteredFoods: filteredFoods
    })
  }

  pushOrder = (food) => {
    console.log(food)
    this.setState({
      order: [...this.state.order, ...[food]]
    })
  }

  showOrder = () => {
    let yourOrder = this.state.order.map((o) => {
      return <li>{o.name}, {o.calories} </li>
    })
    return yourOrder
  }
  

  render() {
    
    return (
      <div>
        <SearchBar handleChange={this.handleChange}/>
        <form onSubmit={this.addFood}>
          <label htmlFor="food">Name</label>
          <input name="food" type="text" />

          <label htmlFor="calories">Calories</label>
          <input name="calories" type="text" />
          
          <label htmlFor="image">Add an Image</label>
          <input name="image" type="text" />

          {/* <input name="food" type="text" onChange={(e) => this.handleChange(e)}/> */}
          <button>Add Food</button>
        </form>
        <div className="food-container">
          <div>
            {this.showFoods()}
          </div>
          <div>
            <h2>Today's Foods</h2>
            {this.showOrder()}
          </div>
        </div>   
      </div>
    )
  }
}

export default FoodBox