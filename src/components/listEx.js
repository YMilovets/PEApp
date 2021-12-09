import React, { Component } from 'react'
import Card from "./card"
import { withRouter } from './HOC/withRouter';
import FilterSearch from "./filterSearch";

class ListEx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: props.pos,
            items: [],
            search: ""
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
        if (this.props !== prevProps) {
            let position = this.props.pos
            this.setState({pos: position})

            const {searchParams} = this.props;
            this.setState({
                search: searchParams.get("query")
            });
        }
    }

    render() {
        try {
            if (this.state.items === "error") 
                throw new Error("Не удается поключиться к json-файлу")
        } catch (e) {
            return <p>{e.message}</p>
        }
        const styles = {
            transform: `translateX(${this.state.pos}px)`
        }
        return (
            <>
                <FilterSearch {...this.props} />
                <div style={styles} className="list-exercises">
                    <div className="g-4 mt-3 d-inline-flex overflow-hidden card-deck">
                        { 
                            this.state.items
                                .filter( post => post.title.includes(this.state.search) ) 
                                .map((item, i) => <Card key={i} item={item} /> ) 
                        }
                    </div>
                </div>
            </>

        )
    }
}

export default withRouter(ListEx);