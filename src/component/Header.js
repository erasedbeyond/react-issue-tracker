import React from 'react';
import home from '../assets/icon/home.svg'
import '../css/Header.css'


class Header extends React.Component{
    render(){
        return(
            <div className='header'>
                <img id='home' src={home} setTab='project' onClick={this.props.setTab} />
                <h1>React Issue Tracker</h1>
            </div>
        );
    }
    
}

export default Header;