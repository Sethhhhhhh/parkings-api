import { Component } from 'react';
import API from './utils/api';

export default class App extends Component {
	state = {
		parkings: []
	}

	componentDidMount() {
		API.get('/parkings')
			.then(response => {
				this.setState({ parkings: response.data });
		})
	}

	
	render() {
		return (
			<ul>
				{this.state.parkings.map (parking => 
					<li>{parking.name}</li>
				)}
			</ul>
		)
	}
}
