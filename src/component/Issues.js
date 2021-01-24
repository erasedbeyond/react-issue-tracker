import React from 'react';
import {IssueData} from '../assets/IssueData';
import RaiseIssue from './RaiseIssue'
import '../css/Issues.css'


class Issues extends React.Component{


    constructor(){
        super();
        this.state = {

            issueData:IssueData,

            //to filter
            type:[],
            priority:[],
            progress:[],
            author:'',
            search:'',
            tags:[],
            sort:'',

            //to store
            allAuthor:[],
            allTags:[],
        }
    }

    setFilter =(e)=>{

        if(e.target.checked)
            this.setState({
                [e.target.name]:[...this.state[e.target.name],e.target.value]
            })
        else{ 
            this.setState({
                [e.target.name]:this.state[e.target.name].filter((item)=> item!==e.target.value)
            })
        }
    }

    addIssue = (e) =>{
        e.number = this.state.issueData.length+1;
        e.createdAt = Date.now();
        console.log(e);
        this.setState({
            issueData:[...this.state.issueData,e]
        },this.gettingAllTagsAndAuthor) //adding issue and updating tag and author array
    }

    setAuthor = (e)=>{
        e.preventDefault();
        this.setState({
            author:e.target.value
        })
    }
    setSearch = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    gettingAllTagsAndAuthor = () =>{
        const allAuthor=[];
        const allTags=[];
        this.state.issueData.forEach((item)=>{
            allAuthor.push(item.author);
            allTags.push.apply(allTags,item.tags)
           
        })
        const allAuthorSet =new Set(allAuthor);
        const allTagsSet =new Set(allTags);
        this.setState({
            allAuthor:[...allAuthorSet],
            allTags:[...allTagsSet]
        })

    }

    componentDidMount(){
        this.gettingAllTagsAndAuthor()
       
    }

    render(){
        var filters = {
            type: this.state.type,
            progress: this.state.progress,
            priority: this.state.priority
        }
        const filterKeys = Object.keys(filters);

        const finalData = this.state.issueData.filter(
            (eachObj)=>{
                //some and every method for array or object, some is used when even one value is passed true, and every is used to pass all the values as true 
                return filterKeys.every( //return true and false
                    (eachKey)=>{
                        if (!filters[eachKey].length) {
                            return true; 
                        }
                       return filters[eachKey].includes(eachObj['labels'][eachKey]) //return true and fasle
                    }
                ) 
                // &&  (this.state.tags.every((value)=>eachObj['tags'].indexOf(value)!==-1) ) //to have every tags
                &&  (this.state.tags.length ===0 || this.state.tags.some((value)=>eachObj['tags'].indexOf(value)!==-1) ) //to have one of the tags
                &&  (!this.state.author || eachObj.author === this.state.author)
                &&  (!this.state.search || eachObj.title.toLowerCase().includes(this.state.search) || eachObj.description.toLowerCase().includes(this.state.search))
            }
        )

            // finalData.sort((a,b)=> a.number-b.number);
            console.log(this.state.sort);
            if(this.state.sort==='ascending'){
                finalData.sort((a,b)=> a.number-b.number);
            }

            if(this.state.sort==='descending'){
                finalData.sort((a,b)=> b.number-a.number);
            }


        
        return(

            <div className='issues'>

                <RaiseIssue addIssue={this.addIssue} />

                <div className='issue-block'>
                    <input name='search' onChange={this.setSearch} placeholder='search'/>
                    {finalData.map((item,index)=>(<div className='issues-container'>
                        <div className='serial-number'>{item.number}</div>
                        <div className='issue-title'>{item.title}</div>
                        <div className='issue-description'>{item.description}</div>
                        <div className='issue-labels'>
                            <div >{item.labels.type}</div>
                            <div className={item.labels.progress}>{item.labels.progress}</div>
                            <div className={item.labels.priority}>{item.labels.priority}</div>
                        </div>
                        <div className='issue-author'>{item.author}</div>
                        
                    </div>))}
                </div>

                <div className='issue-filter'>

                    <div className='issue-sorting'>
                        <h3>Sort by issue Number</h3>
                        <label> Ascending
                            <input type='submit' value='ascending' name='sort'  onClick={this.setSearch}/><br/>
                        </label>
                        <label> Descending
                            <input type='submit' value='descending' name='sort'  onClick={this.setSearch}/><br/>
                        </label>
                    </div>

                    <div className='filter-by-type'>
                        <h3>filter-by type</h3>
                        <label> Bug
                            <input type='checkbox' value='bug' name='type'  onChange={this.setFilter}/><br/>
                        </label>
                        <label> Features
                            <input type='checkbox' value='features' name='type'  onChange={this.setFilter}/><br/>
                        </label>
                        <label> Error
                            <input type='checkbox' value='error' name='type' onChange={this.setFilter} />
                        </label>
                    </div>

                    <div className='filter-by-progress'>
                        <h3>Filter by Progress</h3>
                        <label> New
                            <input type='checkbox' value='new' name='progress' onChange={this.setFilter} /><br/>
                        </label>
                        <label> In progress
                            <input type='checkbox' value='in-progress' name='progress'  onChange={this.setFilter}/><br/>
                        </label>
                        <label> On hold
                            <input type='checkbox' value='on-hold' name='progress' onChange={this.setFilter} /><br/>
                        </label>
                        <label> Closed
                            <input type='checkbox' value='closed' name='progress' onChange={this.setFilter} />
                        </label>
                    </div>

                    <div className='filter-by-priority'>
                        <h3>Filter by priority</h3>
                        <label> High
                            <input type='checkbox' value='high' name='priority'  onChange={this.setFilter}/><br/>
                        </label>
                        <label> Medium
                            <input type='checkbox' value='medium' name='priority'  onChange={this.setFilter}/><br/>
                        </label>
                        <label> Low
                            <input type='checkbox' value='low' name='priority' onChange={this.setFilter} />
                        </label>
                    </div>

                    <div className='filter-by-author'>
                        <h3>Filter by Author</h3>
                        <select onChange={this.setAuthor}>
                            <option value='' selected>Choose author</option>
                            {this.state.allAuthor.map((author,index)=>(<option value={author}>
                                {author}
                            </option>))}
                        </select>
                    </div>

                    <div className='filter-by-tags'>
                        <h3>Filter by Tags</h3>
                        {this.state.allTags.map((tag,index)=>(<label>{tag}
                            <input type='checkbox' name='tags' value={tag} onChange={this.setFilter}/>
                        </label>))}           
                    </div>

                </div>
            </div>
        );
    }
    
}

export default Issues;