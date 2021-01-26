import React from 'react';
import {IssueData} from '../assets/IssueData';
import RaiseIssue from './RaiseIssue'
import '../css/Issues.css'
import IssueFilter from './IssueFilter'
import exclamation from '../assets/exclamation.svg'
import warning from '../assets/warning.svg'



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

            //switch between tabs
            issueTab:false,

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

    toggle = (e)=>{
        if(e.target.value==='issue-page')
            this.setState({
                issueTab:false
            })
        if(e.target.value==='raise-issue')
            this.setState({
                issueTab:true
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

            {
                this.state.issueTab ? 

                <RaiseIssue 
                    addIssue={this.addIssue}
                    toggle={this.toggle}
                /> :

                <div className='issues-main'>
                    <div>
                        <h2>Issue</h2>    
                        <button value='raise-issue' onClick={this.toggle}>Add Issues</button>
                    </div> 
                    <div className='issues-main-container'>
                        <div className='issue-block'>
                            <input name='search' onChange={this.setSearch} placeholder='search'/>
                            <div className='issue-block-container'>
                                {finalData.map((item,index)=>(<div className='issues-container'>
                                    
                                    <div className='issue-serial-number'>
                                        <span>
                                            <img className='issue-svg' src={exclamation}/>
                                         </span>
                                         <span>
                                             {item.number}
                                         </span>
                                        

                                    </div>
                                    <div className='issue-title'>{item.title}</div>
                                    <div className='issue-description'>
                                        <div className='description-detail'>{item.description}</div>
                                        <div className='description-tag'>{item.tags.map((tag)=>(<span>#{tag} </span>))}</div>
                                    </div>
                                    <div className='issue-labels'>
                                        <div className={item.labels.type+' label-tag-block'}>{item.labels.type}</div>
                                        <div className={item.labels.progress+' label-tag-block'}>{item.labels.progress}</div>
                                        <div className={item.labels.priority+' label-tag-block'}>{item.labels.priority}</div>
                                    </div>
                                    <div className='issue-author'>{item.author}</div>
                                    
                                </div>))}
                            </div>
                        </div>
                    

                        <IssueFilter 
                            allAuthor={this.state.allAuthor} 
                            allTags={this.state.allTags} 
                            setFilter={this.setFilter}
                            setAuthor={this.setAuthor}
                            setSearch={this.setSearch}
                            
                        />
                    </div>
                </div>
                
            }
            </div>
        );
    }
    
}

export default Issues;