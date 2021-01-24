import React from 'react';

import {ProjectData} from '../assets/ProjectData';


class Projects extends React.Component{

    constructor(){
        super();
        this.state ={
            ProjectData:ProjectData,
            name:'',
            description:'',
            author:''
        }
    }


    // handleChange = (event) => {
    //     const { target: { name, value } } = event
    //     this.setState({ [name]: value })
    // }

    setProjectDetail= (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name:this.state.name,
            description:this.state.description,
            author:this.state.author
        }
        this.setState({
            ProjectData:[...this.state.ProjectData,data]
        })


    }
      
      
    render(){
        return(

            <div>
                <form onSubmit={this.handleSubmit} >
                    <input type='text' name='name' placeholder='Name' onChange={this.setProjectDetail} required/>
                    <textarea name='description' placeholder='description' onChange={this.setProjectDetail} required/>
                    <input type='text' name='author' placeholder='Author' onChange={this.setProjectDetail} required/>
                    <input type='submit' value='Add Project' />



                </form>
                 <div className='projects'>
                    {this.state.ProjectData.map((item,index)=>(<div key={index}>
                        {item.name} 
                        {item.description} 
                        {item.author}
                    </div>))}
                </div>

            </div>

           
        );
    }
    
}

export default Projects;