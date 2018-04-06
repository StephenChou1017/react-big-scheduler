import React, {Component} from 'react';
import {PropTypes} from 'prop-types'

class ViewSrcCode extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        srcCodeUrl: PropTypes.string.isRequired
    }

    render(){
        const {srcCodeUrl} = this.props;
        return (
            <span style={{marginLeft: '10px'}} className="help-text">(<a href={srcCodeUrl} target="_blank">&lt;/&gt;View example source code</a>)</span>
        )
    }
}

export default ViewSrcCode