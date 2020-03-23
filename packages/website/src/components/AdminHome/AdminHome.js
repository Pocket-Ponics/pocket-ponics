import React, {useState, Component} from 'react';
import { render } from 'react-dom';
import ApiUtil from '../../util/api-util';
import ReactDOM from 'react-dom';

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

    const plants = this.state.data
  	console.log(this.state.data)
  	console.log(this.state.data.length)
  	console.log(plants[2].name)
    const array = plants.map((obj, index) => obj.name);
    console.log(array)
    return array
  }

  render() {
    if (this.state.resolvedError) {
      return React.createElement("h1", null, "Error Encountered");
    } else if (this.state.resolvedSuccess) {
    	const array = this.renderChildren()
    	console.log(this.renderChildren())
      return   <ul>
        {array.map(item => {
          return <li><a href="adminplant" onclick="console.log('The link was clicked.'); return false">{item}</a></li>;
        })}
      </ul>
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

