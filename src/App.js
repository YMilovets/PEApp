import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.js';
import Navigation from './components/nav';
import ListPE from './components/listEx';
import Exercise from "./components/exercise"
import "./index.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posSlider: 0,           //Положение слайдера, определенный CSS-свойством transform: translateX
      error: null,            //Информация об ошибках в результате запроса JSON
      isLoad: false,          //Состояние выполнения запроса загрузки
      items: []               //Результат получения JSON-объекта  
    };
    this.transformItem = this.transformItem.bind(this);
    this.fetchQuery = this.fetchQuery.bind(this) 
  }
  fetchQuery() {
    const src = "http://localhost:8080/exercises";
    fetch(src).then(result => {
      if (!result.ok)
        throw new Error("Не удается получить доступ к JSON-файлу")
      return result.json()
    })
      .then(
        resolved => {
          this.setState({
              items: resolved,
              isLoad: true
          })
      })
      .catch( err => {
        this.setState({
          isLoad: true,
          error: "Не удается получить доступ к JSON-файлу"
        })
      })
  }
  transformItem(e) {
    const widthItem = 316; //Ширина блока слайдера
    const cardWrap = document.querySelectorAll(".list-exercises .card-wrapper");
    this.arrow = (e.target.classList.contains("slider_right")) ? "right": "left";
    let position = 0; //Результат смещения позиции слайдов, определенный направлением перемещения
    //Если нажата кнопка "Сдвинуть вправо"
    if (this.arrow === "right") {
      //Ограничение начального значения положения слайдера для сдвига вправо
      if ( this.state.posSlider )
        position = widthItem;
      else position = 0;
    } //Если нажата кнопка "Сдвинуть влево"
    else {
      //Ограничение конечного значения положения слайдера для сдвига влево
      if ( this.state.posSlider <= -(cardWrap.length - 1) * widthItem )
        position = 0;
      else position = -widthItem
    }
    this.setState(state => { 
      return {
        posSlider: state.posSlider + position,
      } 
    })
  }
  render() {
    return (
      <div className="AppFitness overflow-hidden p-4">
        <Router>
          <Navigation transition={this.transformItem}/>
          <Switch>
            <Route exact path="/" 
              render = {
                (props) => <ListPE {...props} pos={this.state.posSlider} fetchQuery={this.fetchQuery} data={this.state} />
              } 
            />
            <Route path="/exercise/:id" 
              render = {
                (props) => <Exercise {...props} fetchQuery={this.fetchQuery} data={this.state} />
              } 
            />
            <Route component={ () => <p>NotFound</p> } />
          </Switch>
        </Router>
      </div>
    )
  }
}