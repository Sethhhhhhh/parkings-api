import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default class App extends React.Component {
	const [parkings, setParkings] = useState([]);

	componentDidMount() {
		axios.get(`http://127.0.0.1:8080/parkings`)
		.then(res => {
			const persons = res.data;
			setParkings({ persons });
		})
	}

	render() {
		return (
			<ul>
				{ this.state.persons.map(person => <li>{person.name}</li>)}
			</ul>
		)
	}
}
