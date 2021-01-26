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

    addIssue = (e) =>{

        e.preventDefault();
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
        this.setState({allTags:[]})
        document.getElementById('add-issue-form').reset();

    }

    render(){

        return(
            <div className='raise-issue'>

                <div className='paper-handle'></div>

                <div className='raise-issue-heading'>
                    <h2>Raise an Issue</h2>
                    <button className='button back-to-issue-button' value='issue-page' onClick={this.props.toggle}>go back to issues</button>

                </div>

                <form id='add-issue-form' onSubmit={this.addIssue}>
                    <label>
                        <h3>Tittle:</h3>
                        <input type='text' name='title' placeholder='Enter Title' onChange={this.setLabels} required/>
                    </label>
                    <label>
                        <h3>Description:</h3>
                        <textarea name='description' placeholder='Description'onChange={this.setLabels} required/>
                    </label>
                    <label>
                        <h3>Labels:</h3>
                        <div id='label-selects'>
                            <select name='priority' onChange={this.setLabels} required>
                                <option selected hidden>Select Priority</option>
                                <option value='high'>High</option>
                                <option value='medium'>Medium</option>
                                <option value='low'>Low</option>
                            </select>
                            
                            <select name='type' onChange={this.setLabels} required>
                                <option selected hidden>Select type</option>
                                <option value='bug'>Bug</option>
                                <option value='error'>Error</option>
                                <option value='features'>Features</option>
                            </select>
                            
                            <select name='progress' onChange={this.setLabels} required>
                                <option selected hidden>Select progress</option>
                                <option value='new'>New</option>
                                <option value='in-progress'>In progress</option>
                                <option value='on-hold'>On hold</option>
                                <option value='closed'>Closed</option>
                            </select>
                        </div>
                    </label>

                    <label>
                        <h3>Author: </h3>
                        <input type='text' name='author' placeholder='Author' onChange={this.setLabels} required/>
                    </label>

                    <input className='button add-issue-button' id='add-issue-button' type='submit' value='add Issue' />
                </form>


                <form id='add-tag-form' onSubmit={this.addTags}>
                    <label>
                        <div >
                            <h3>Tags:</h3>
                            {this.state.allTags.map((tag,index)=>(<span className='added-tag' key={'tag'+index} >
                                {tag} 
                                <span className='delete' name='allTags' value={tag} onClick={this.removeTag}> x 
                                    <span className='hidden'>remove</span> 
                                </span>
                                
                            </span>))} 
                        </div>
                        <div id='tag-input'>
                            <input name='tags' onChange={this.setLabels} placeholder='enter tag' required/>
                            <input className='button tag-button' type='submit' value='add tags' />
                        </div>
                    </label>

                </form>

                
            </div>
        )
    }
}

export default RaiseIssue;