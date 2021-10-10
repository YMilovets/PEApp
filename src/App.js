import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.js';
import React, { Suspense, Component } from "react";
import Navigation from './components/nav';
import Exercise from "./components/exercise"
import ListPE from "./components/listEx"
import UseResource from "./resources"
import PreloadExercises from './components/preloadExercises';

import "./index.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const resource = UseResource()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posSlider: 0,           //Положение слайдера, определенный CSS-свойством transform: translateX
      error: null,            //Информация об ошибках в результате запроса JSON
      isLoad: false,          //Состояние выполнения запроса загрузки
    };
    this.transformItem = this.transformItem.bind(this);
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
                (props) => 
                  <Suspense fallback={<PreloadExercises />}>
                    <ListPE {...props} pos={this.state.posSlider} resource={resource} />      
                  </Suspense> 
              } 
            />
            <Route path="/exercise/:id" 
              render = {
                (props) => 
                  <Suspense fallback={<p>Loading...</p>}>
                    <Exercise {...props} resource={resource} />
                  </Suspense>
              } 
            />  
            <Route component={ () => <p>NotFound</p> } />
          </Switch>
        </Router>
      </div>
    )
  }
}