import React from 'react';
import '../css/Projects.css';
import addDocument from '../assets/icon/add-documents.svg'
import link from '../assets/icon/link.svg';

import developer from '../assets/icon/developer.svg';
import img from '../assets/images/react.png'
import project from '../assets/icon/project.svg'

import {ProjectData} from '../assets/file/ProjectData';


class Projects extends React.Component{

    constructor(){
        super();
        this.state ={
            ProjectData:ProjectData,
            name:'',
            description:'',
            author:'',

            visibility:false,
        }
    }


    // handleChange = (event) => {
    //     const { target: { name, value } } = event
    //     this.setState({ [name]: value })
    // }

    setAddProjectVisibility = ()=>{
        if(this.state.visibility){
            this.setState({visibility:false})
            document.getElementById('add-project').style.display = 'none'

        }else{
            this.setState({visibility:true})
            document.getElementById('add-project').style.display = 'flex'



        }
    }

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

                <div className='menu-option add-project-menu' onClick={this.setAddProjectVisibility}><img className='svg-large' src={addDocument} onClick={this.setFilterVisibility}/></div>

                <form id='add-project' onSubmit={this.handleSubmit} >

                    <div className='paper-handle'></div>

                    <h2>Add More Project</h2>
                    <label>
                        <h3>Tittle:</h3>
                        <input type='text' name='name' placeholder='Name of the project' onChange={this.setProjectDetail} required/>
                    </label>
                    <label>
                        <h3>Description:</h3>
                        <textarea name='description' placeholder='Write description about the project.' onChange={this.setProjectDetail} required/>
                   
                    </label>
                     <label>
                        <h3>Author:</h3>
                        <input type='text' name='author' placeholder='Author' onChange={this.setProjectDetail} required/>
                    </label>
                    <input className='button add-project-btn' type='submit' value='Add Project' />



                </form>
                 <div className='projects-section'>
                    {this.state.ProjectData.map((item,index)=>(<div className='project-container'  key={index}>
                        <div className='project-name'><img className='svg-medium' src={project} /> {item.name}</div>
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