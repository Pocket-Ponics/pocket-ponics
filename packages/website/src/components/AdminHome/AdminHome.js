import React from 'react';
import { render } from 'react-dom';
import ApiUtil from '../../util/api-util';
import ReactDOM from 'react-dom';

const token = localStorage.getItem('token')

const HeadingComponent = props => React.createElement("h1", null, props.data);

class AsyncComponent extends React.Component {
	constructor(props) {
	  	super(props);
	    this.state = {
	      	resolvedError: false,
	      	resolvedSuccess: false,
	      	data: '',
	      	plant: '',
	      	error: '' 
	    };
	    this.handleClick = this.handleClick.bind(this);
	    this.renderChildren = this.renderChildren.bind(this);
	}

  	componentDidMount() {
    	this.props.promise()
    	.then(data => this.setState({ resolvedSuccess: true, data }))
    	.catch(error => this.setState({ resolvedError: true, error }));
  	}

	renderChildren() {
	    const plants = this.state.data
	  	console.log(this.state.data)
	  	console.log(this.state.data.length)
	    const array = plants.map((obj, index) => obj.name);
	    console.log(this.state.data)
	    return array
	}
	handleClick(item,array) {
    localStorage.setItem('plant', item)
    const plant = localStorage.getItem('plant')
    localStorage.setItem('plantnames', array)
    const plantnames = localStorage.getItem('plantnames')
    console.log('The link was clicked.', plant);
     console.log('The link was clicked.', plantnames);

  }
  handleAdd() {
    window.location.href="http://localhost:3000/Admin"
  }


	render() {
	    if (this.state.resolvedError) 
	    {
	      	return React.createElement("h1", null, "Error Encountered");
	    } 
	    else if (this.state.resolvedSuccess) 
	    {
	    	const array = this.renderChildren()
	    	console.log(this.renderChildren())
	    	console.log(this.state.data)
	      	return <ul>
		        {array.map(item => {
		          	return <li key = {item}>
			          	<a href="adminplant" onClick={() => this.handleClick(item, array)}>
			          		{item}
			          	</a>
		          	</li>;
		        })}

		        <button onClick={() => this.handleAdd()}>
  Add
</button>
	     	</ul>

	    } 
	    else 
	    {
	      	return React.createElement("h1", null, "Loading...");
	    }
	}
}


const HeadingAPI = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve(ApiUtil.getPlants(token)), 5000);
});


export const AdminHome = () =>
React.createElement("div", null,
React.createElement(AsyncComponent, { promise: HeadingAPI },
React.createElement(HeadingComponent, null)));






