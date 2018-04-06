import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Nav from './Nav'

class ComingSoon extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{textAlign: 'center'}}>Sorry, the example is on the way~</h3>
                </div>
            </div>
        )
    }
}

export default ComingSoon