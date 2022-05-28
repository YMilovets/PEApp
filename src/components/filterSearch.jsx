import React from 'react'

export default function FilterSearch(props) {        
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const query = e.target.value;
        const {setSearchParams} = props;
        setSearchParams({query});
        props.setDefaultPos();
    }
    const handleReset = () => props.setSearchParams({query: ""});
    return (
        <form onSubmit={null} className="d-flex mt-3 position-relative" autoComplete="off">
            <input placeholder="Начните вводить название упражнения" 
                onChange={handleSubmit} 
                className="form-control" 
                type="text" 
                name="search" />
            <button onClick={handleReset} 
                type="reset" 
                className="btn-close position-absolute top-50 end-0 translate-middle" 
                aria-label="Close"></button>
        </form>
    )
}
