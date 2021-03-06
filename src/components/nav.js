import React, { Component } from "react"
import { Link, NavLink } from "react-router-dom";

export default class Navigation extends Component {
    //Конструктор класса для определения его состояния
    constructor(props) {
        super(props);
        this.collapse = React.createRef();
        //Объект состояния компонента
        this.state = {
            clicked: false,
            path: props.path,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.path !== state.path)
            return {
                path: props.path,
            }
        return null;
    }
    handleClick() {
        //Обновление состояния конструктора this.state
        this.setState({
            clicked: !this.state.clicked
        });
    }
    //Добавление CSS-переменных после рендеринга компонента на html-странице
    componentDidMount() {
        let root = document.querySelector(":root");
        //Определяем длину всплывающего меню и добавляем его в CSS-переменную
        root.style.setProperty('--collapse-height', this.collapse.current.clientHeight + "px");
    }
    aboutIsActive(isActive, classNames) {
        return `${classNames} ${isActive && "disabled"}`
    }
    render() {
        return (
            <>
                <nav id="navigation" className="navbar navbar-dark mx-4 mt-4">
                    <div className="d-flex">
                        <button onClick={this.handleClick} className="btn bg-primary" type="button" data-toggle="collapse" data-target="#collapse-menu" >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="logo ms-3">
                            <Link className="navbar-brand text-dark fw-bold" to="/">PEApp</Link>
                            <div className="small">Движение - жизнь</div>
                        </div>
                    </div>
                    {this.state.path !== "/" ||
                        <div className="slider-btn">
                            <button type="submit" 
                                className="slider_left btn btn-primary me-2" 
                                onClick={this.props.transition}>
                                &lt;
                            </button>
                            <button type="submit" 
                                className="slider_right btn btn-primary" 
                                onClick={this.props.transition}>
                                &gt;
                            </button>          
                        </div>
                    }  
                </nav>
                <div className={(this.state.clicked) ? "active compact-menu" : "compact-menu" } id="collapse-menu">
                    <ul className="navbar-nav" ref={this.collapse}>
                        <li className="nav-item mx-4">
                            <NavLink 
                                className={ ({ isActive }) => 
                                    this.aboutIsActive(isActive, "nav-link")} 
                                to="about">О приложении</NavLink>
                        </li>
                    </ul>
                </div>
            </>
        );
    }

}