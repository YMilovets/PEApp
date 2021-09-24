import React, { Component } from 'react'
import Card from "./card"

export default class listEx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: props.pos
        }
    }
    componentDidMount() {
        this.props.fetchQuery()  
    }
    componentDidUpdate(prevProps) {
        //Сравнение текущего props с предыдущим значением
        if (this.props.pos !== prevProps.pos) {
            let position = this.props.pos
            this.setState({pos: position})
        }
    }
    render() {
        const {error, isLoad, items} = this.props.data;
        const styles = {
            transform: `translateX(${this.state.pos}px)`
        }

        return (
            <div style={styles} className="list-exercises">
                {!isLoad && <p>Дождитесь окончания загрузки</p>}
                {error && <p>Ошибка: {error}</p>}
                <div className="g-4 mt-2 d-inline-flex overflow-hidden card-deck">
                    { items.map((item, i) => <Card key={i} item={item} /> ) }
                </div>
            </div>
        )
    }
}