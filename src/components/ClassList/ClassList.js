import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const baseUrl = "http://localhost:3005/students?class=";

export default class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    }
    
  }

  componentDidMount(){
    //using the passed down props:
    // console.log(this.props.match.params.class); 
    //http axios get request passing in the property to make it display dynamically
    axios.get(`${baseUrl}${this.props.match.params.class}`).then((response) => {      
      this.setState({
        students: response.data
      })

    }).catch( (err) => {console.log(err)});  

  }

  render() {
    let studentNames = this.state.students.map( (curr, index) => {     
      return <Link to = {`/student/${curr.id}`} key = { index }><h3>{`${curr.first_name} ${curr.last_name}`}</h3> </Link>;   
    });
    

    return (
      <div className="box">
        <h1>{this.props.match.params.class}</h1>
        <h2>ClassList:</h2>
        {studentNames}
      </div>
    )
  }
}