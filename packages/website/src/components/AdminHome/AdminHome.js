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
	getData(i) {
      console.log(i)
      console.log(this.state.data[i].cycle_time)
      localStorage.setItem('cycle_time', this.state.data[i].cycle_time)
      localStorage.setItem('light_time', this.state.data[i].light_time)
      localStorage.setItem('steps', this.state.data[i].steps)
      localStorage.setItem('hsteps', this.state.data[i].hsteps)
      localStorage.setItem('ph_level_low', this.state.data[i].ph_level_low)
      localStorage.setItem('ph_level_high', this.state.data[i].ph_level_high)
      localStorage.setItem('temp_low', this.state.data[i].temp_low)
      localStorage.setItem('ec_level_low', this.state.data[i].ec_level_low)
      localStorage.setItem('ec_level_high', this.state.data[i].ec_level_high)
      localStorage.setItem('temp_high', this.state.data[i].temp_high)
      localStorage.setItem('plant_url', this.state.data[i].plant_url)
      localStorage.setItem('harvest_url', this.state.data[i].harvest_url)
      localStorage.setItem('num_plants', this.state.data[i].num_plants)
      localStorage.setItem('cycle_time', this.state.data[i].cycle_time) 
	}

	handleClick(item,array) {
		console.log(item)
	for(let i = 0; i < this.state.data.length; i++)
      {
          var n = this.state.data[i].name.localeCompare(item);
          if(n==0)
          {
          	localStorage.setItem('i', i)
          	localStorage.setItem('id', this.state.data[i].plant_id)
          }}
    localStorage.setItem('plant', item)
    const plant = localStorage.getItem('plant')
    const id = localStorage.getItem('id')
    const i = localStorage.getItem('i')
     this.getData(i)
    console.log('The link was clicked.', i);
     console.log('The link was clicked.', id);
     return
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






