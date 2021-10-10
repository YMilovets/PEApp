import React, { Component } from 'react'
import Card from "./card"

export default class listEx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: props.pos,
            items: []
        }
    }
    //Записать состояние items из props и отслеживать изменение props.resource
    static getDerivedStateFromProps(props, state) {
        return {
            items: props.resource.posts.read()
        }
    }
    componentDidUpdate(prevProps) {
        //Сравнение текущего props с предыдущим значением
        if (this.props.pos !== prevProps.pos) {
            let position = this.props.pos
            this.setState({pos: position})
        }
    }
    render() {
        try {
            if (this.items === "error") 
                throw new Error("Не удается поключиться к json-файлу")
        } catch (e) {
            return <p>{e.message}</p>
        }
        const styles = {
            transform: `translateX(${this.state.pos}px)`
        }
        return (
            <div style={styles} className="list-exercises">
                <div className="g-4 mt-2 d-inline-flex overflow-hidden card-deck">
                    { this.state.items.map((item, i) => <Card key={i} item={item} /> ) }
                </div>
            </div>
        )
    }
}