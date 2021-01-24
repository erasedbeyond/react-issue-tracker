import React from 'react';
import {IssueData} from '../assets/IssueData';
import '../css/Issues.css'


class Issues extends React.Component{

    render(){
        return(
            <div className='issues'>
                {IssueData.map((item,index)=>(<div className='issues-container'>
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
        );
    }
    
}

export default Issues;