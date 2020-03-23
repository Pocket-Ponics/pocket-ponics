import React, {useState, Component} from 'react';
import { render } from 'react-dom';
import ApiUtil from '../../util/api-util';
import ReactDOM from 'react-dom';
import displayplants from '../../displayplants'

/*
export function AdminHome() {

	const token = localStorage.getItem('token')
	const promise = getData()
	promise.then(successCallback, failureCallback)

	console.log(promise)

	function successCallback(result) {
		console.log("Audio file ready at URL: ", result);
		return result
	}

	function failureCallback(error) {
		console.error("Error generating audio file: " + error);
	}


	async function getData() {
		console.log('logging');
  		const plants = await ApiUtil.getPlants(token)
  		console.log(plants)
  		console.log(plants.length)

	    for(let i = 0; i < plants.length; i++)
	    {
	        console.log(plants[i].name)
	    }
	    return await plants[2].name
  	}



	return (
	  		<view>{JSON.stringify(promise)}
	  		</view>
	  	)

}
*/
const token = localStorage.getItem('token')

const HeadingComponent = props => React.createElement("h1", null, props.data);

const ParagaphComponent = props => React.createElement("p", null, props.data);

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resolvedError: false,
      resolvedSuccess: false,
      data: '',
      error: '' };

    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    this.props.promise().
    then(data => this.setState({ resolvedSuccess: true, data })).
    catch(error => this.setState({ resolvedError: true, error }));
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) =>
    React.cloneElement(child, {
      data: this.state.data }));


  }

  render() {
    if (this.state.resolvedError) {
      return React.createElement("h1", null, "Error Encountered");
    } else if (this.state.resolvedSuccess) {
      return React.createElement("div", null, this.renderChildren());
    } else {
      return React.createElement("h1", null, "Loading...");
    }
  }}


const HeadingAPI = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve(ApiUtil.getPlants(token)), 5000);
});

const ParagraphAPI = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve('Paragraph data'), 2000);
});

export const AdminHome = () =>
React.createElement("div", null,
React.createElement(AsyncComponent, { promise: HeadingAPI },
React.createElement(HeadingComponent, null)));




ReactDOM.render(<AdminHome />, document.getElementById("root"));

