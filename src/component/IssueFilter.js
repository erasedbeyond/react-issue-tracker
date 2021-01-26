import React from 'react';


class Projects extends React.Component{

    render(){
        return(

            <div className='issue-filter'>

            <div className='issue-sorting'>
                <h3>Sort by issue Number</h3>
                <label> Ascending
                    <input type='submit' value='ascending' name='sort'  onClick={this.props.setSearch}/><br/>
                </label>
                <label> Descending
                    <input type='submit' value='descending' name='sort'  onClick={this.props.setSearch}/><br/>
                </label>
            </div>

            <div className='filter-by-type'>
                <h3>filter-by type</h3>
                <label> Bug
                    <input type='checkbox' value='bug' name='type'  onChange={this.props.setFilter}/><br/>
                </label>
                <label> Features
                    <input type='checkbox' value='features' name='type'  onChange={this.props.setFilter}/><br/>
                </label>
                <label> Error
                    <input type='checkbox' value='error' name='type' onChange={this.props.setFilter} />
                </label>
            </div>

            <div className='filter-by-progress'>
                <h3>Filter by Progress</h3>
                <label> New
                    <input type='checkbox' value='new' name='progress' onChange={this.props.setFilter} /><br/>
                </label>
                <label> In progress
                    <input type='checkbox' value='in-progress' name='progress'  onChange={this.props.setFilter}/><br/>
                </label>
                <label> On hold
                    <input type='checkbox' value='on-hold' name='progress' onChange={this.props.setFilter} /><br/>
                </label>
                <label> Closed
                    <input type='checkbox' value='closed' name='progress' onChange={this.props.setFilter} />
                </label>
            </div>

            <div className='filter-by-priority'>
                <h3>Filter by priority</h3>
                <label> High
                    <input type='checkbox' value='high' name='priority'  onChange={this.props.setFilter}/><br/>
                </label>
                <label> Medium
                    <input type='checkbox' value='medium' name='priority'  onChange={this.props.setFilter}/><br/>
                </label>
                <label> Low
                    <input type='checkbox' value='low' name='priority' onChange={this.props.setFilter} />
                </label>
            </div>

            <div className='filter-by-author'>
                <h3>Filter by Author</h3>
                <select onChange={this.props.setAuthor}>
                    <option value='' selected>Choose author</option>
                    {this.props.allAuthor.map((author,index)=>(<option value={author}>
                        {author}
                    </option>))}
                </select>
            </div>

            <div className='filter-by-tags'>
                <h3>Filter by Tags</h3>
                {this.props.allTags.map((tag,index)=>(<label>{tag}
                    <input type='checkbox' name='tags' value={tag} onChange={this.props.setFilter}/>
                </label>))}           
            </div>

        </div>


           
        );
    }
    
}

export default Projects;