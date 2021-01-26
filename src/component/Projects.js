import React from 'react';
import '../css/Projects.css';
import link from '../assets/link.svg';
import developer from '../assets/developer.svg';
import img from '../assets/images/react.png'
import project from '../assets/project.svg'

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
            link:'https://reactjs.org/docs/getting-started.html',
            img:img,
            author:this.state.author

        }
        this.setState({
            ProjectData:[...this.state.ProjectData,data]
        })

        document.getElementById('add-project').reset()


    }
      
      
    render(){
        return(

            <div className='projects'>
                <form id='add-project' onSubmit={this.handleSubmit} >

                    <div className='paper-handle'></div>

                    <h2>Add More Project</h2>
                    <label>
                        <h3>Tittle:</h3>
                        <input type='text' name='name' placeholder='Name of the project' onChange={this.setProjectDetail} required/>
                    </label>
                    <textarea name='description' placeholder='Write description about the project.' onChange={this.setProjectDetail} required/>
                    <label>
                        <h3>Author:</h3>
                        <input type='text' name='author' placeholder='Author' onChange={this.setProjectDetail} required/>
                    </label>
                    <input className='button add-project-btn' type='submit' value='Add Project' />



                </form>
                 <div className='projects-section'>
                    {this.state.ProjectData.map((item,index)=>(<div className='project-container'  key={index}>
                        <div className='project-name'><img className='svg-medium' src={project} />{item.name}</div>
                        <div className='project-description'>
                            <h4>Description: </h4>
                            <div><span>{item.description}</span></div>
                        </div>
                        <div className='project-image' setTab='issue' onClick={this.props.setTab}>
                            <img setTab='issue' onClick={this.props.setTab} src={item.img}/>
                        </div>
                        <div className='project-link'>
                            <a target='_blank' href={item.link}>{item.link.slice(8)}</a>
                            <img className='svg' src={link} />
                        </div>
                        <div className='project-author'>
                            <img className='svg' src={developer}/>
                            <span>{item.author}</span>
                        </div>
                        
                        
                        
                    </div>))}
                </div>

            </div>

           
        );
    }
    
}

export default Projects;