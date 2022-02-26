const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();

const parkings = './parkings.json'

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	next();
});
app.use(express.json());

app.get('/parkings', (req, res) => {
	const parkings = JSON.parse(fs.readFileSync('./parkings.json', 'utf8'));

	res.status(200).json(parkings);
})

app.get('/parkings/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const parkings = JSON.parse(fs.readFileSync('./parkings.json', 'utf8'));

	const parking = parkings.find(e => e.id === id);
	if (!parking) return;

	res.status(200).json(parking);
})

app.post('/parkings', (req, res) => {
	const body = req.body;
	const parkings = JSON.parse(fs.readFileSync('./parkings.json', 'utf8'));

	body.id = parkings.length;
	parkings.push(body);
	fs.writeFileSync('./parkings.json', JSON.stringify(parkings));

	res.status(200).json(parkings);
})

app.put('/parkings/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const parkings = JSON.parse(fs.readFileSync('./parkings.json', 'utf8'));

	let parking = parkings.find(e => e.id == id);
	if (!parking) return;

	const body = req.body;
	parking.name = body.name;

	fs.writeFileSync('./parkings.json', JSON.stringify(parkings));

	res.status(200).json(parking);
})

app.delete('/parkings/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const parkings = JSON.parse(fs.readFileSync('./parkings.json', 'utf8'));

	let parking = parkings.find(e => e.id == id);
	if (!parking) return;

	parkings.splice(parkings.indexOf(parking), 1);

	fs.writeFileSync('./parkings.json', JSON.stringify(parkings));

	res.status(200).json(parkings);
})

app.listen(8080, () => {
	console.log("Server listen in port 8080!")
})