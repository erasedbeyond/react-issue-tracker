import Header from './Header'
import Projects from './Projects'
import Issues from './Issues'
import '../css/App.css'
import React from 'react'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      tab:true
    }
  }

  setTab =(e)=>{

    var val =  e.target.getAttribute('setTab');
    if(val==='issue')
    this.setState({
      tab:false
    }) 
    if(val==='project')
    this.setState({
      tab:true
    })
  }

  render(){
    return (

      <div className="app">
      <Header setTab={this.setTab}/>
      <div className='app-main'>{this.state.tab? 
          <Projects setTab={this.setTab}/>: 
          <Issues/>
        }</div>
      </div>
    );
  }
 
}

export default App;
