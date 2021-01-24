import React from 'react';
import '../css/RaiseIssue.css'

class RaiseIssue extends React.Component{
    constructor(){
        super();
        this.state = {
            title:'',
            description:'',
            type:'',
            progress:'',
            priority:'',
            author:'',
            tags:'',
            allTags:[]
        }
    }

    setLabels = (e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    addTags = (e) =>{
        e.preventDefault();

        this.setState({
            allTags:[...this.state.allTags,this.state.tags]
        })
        document.getElementById('add-tag-form').reset();
    }

    removeTag = (e) =>{
        var value=e.target.getAttribute('value');

        this.setState({
            allTags:[...this.state.allTags.filter((tag)=>tag!==value)]
        })
    }

    addIssue = () =>{
        const issue = {
            title:this.state.title,
            description:this.state.description,
            labels:{
                type:this.state.type,
                progress:this.state.progress,
                priority:this.state.priority
            },
            tags:this.state.allTags,
            author:this.state.author

        }
        this.props.addIssue(issue);
    }

    render(){

        return(
            <div className='raise-issue'>
            
                <h3>Raise an Issue</h3>
                <form>
                    <input type='text' name='title' placeholder='Enter Title' onChange={this.setLabels} required/>
                    <textarea name='description' placeholder='Description'onChange={this.setLabels} required/>
                    <select name='priority' onChange={this.setLabels} required>
                        <option selected hidden>Select Priority</option>
                        <option value='high'>High</option>
                        <option value='medium'>Medium</option>
                        <option value='low'>Low</option>
                    </select>
                    
                    <select name='type' onChange={this.setLabels} required>
                        <option selected hidden>Select type</option>
                        <option value='bug'>bug</option>
                        <option value='error'>error</option>
                        <option value='features'>features</option>
                    </select>
                    
                    <select name='progress' onChange={this.setLabels} required>
                        <option selected hidden>Select progress</option>
                        <option value='new'>new</option>
                        <option value='in-progress'>In progress</option>
                        <option value='on-hold'>On hold</option>
                        <option value='closed'>closed</option>

                    </select>

                    
                    <input type='text' name='author' placeholder='Author' onChange={this.setLabels} required/>

                </form>

                <form id='add-tag-form' onSubmit={this.addTags}>
                        <div> Tags: {this.state.allTags.map((tag,index)=>(<span className='added-tag' name='allTags' value={tag} key={'tag'+index} onClick={this.removeTag} >{tag} <span>x</span> </span>))} </div>
                        <input name='tags' onChange={this.setLabels} placeholder='enter tag' required/>
                        <input type='submit' value='add tags' />
                </form>

                <button onClick={this.addIssue}>Add Issue</button>
                
            </div>
        )
    }
}

export default RaiseIssue;