import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class card extends Component {
    render() {
        const {item} = this.props;
        return (
            <div className="me-3 card-wrapper">
                <div className="card">
                    <img className="card-img-top" src={item.img} alt="Здесь рыбы нет"></img>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.action}</p>
                        <Link to={"exercise/" + item.link} className="btn btn-primary">Выбрать</Link>
                    </div>
                </div>
            </div>
        )
    }
}
