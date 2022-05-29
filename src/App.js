import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.js';
import React, { Suspense, Component } from "react";
import Exercise from "./components/exercise"
import ListPE from "./components/listEx"
import UseResource from "./resources"
import PreloadExercises from './components/preloadExercises';

import "./index.css"
import {
  HashRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import { Layout } from './components/layout';

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
    e.preventDefault();
    const widthItem = 316; //Ширина блока слайдера
    const displayWidth = document.querySelector(".list-exercises").getBoundingClientRect().width;
    const marginItem = 16;
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
      //Определим ширину максимального количества элементов слайдера, помещающихся на странице
      const maxDisplayWidthItemOfList = Math.trunc(displayWidth / widthItem) * (widthItem + marginItem);
      if ( -this.state.posSlider >= cardWrap.length * widthItem - maxDisplayWidthItemOfList )
        position = 0;
      else position = -widthItem
    }
    this.setState(state => { 
      return {
        posSlider: state.posSlider + position,
      } 
    })
  }

  setDefaultPos() {
    this.setState({
        posSlider: 0,
    })
  }

  render() {
    return (
      <div className="AppFitness overflow-hidden">
        <Router>
          <Switch>
            <Route path="/" element={
              <Layout transformItem={this.transformItem} />
            } >
              <Route index 
                element = {
                  <Suspense fallback={<PreloadExercises />}>
                    <ListPE 
                      pos={this.state.posSlider} 
                      resource={resource} 
                      setDefaultPos={this.setDefaultPos.bind(this)}
                    />      
                  </Suspense> 
                } 
              />
              <Route path="exercise/:id" 
                element = {
                  <Suspense fallback={<p>Loading...</p>}>
                    <Exercise resource={resource} />
                  </Suspense>
                } 
              />  
              <Route path="*" element={ <p className="mx-4">NotFound</p> } />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}