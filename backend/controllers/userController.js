const express = require("express");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

const admin = require("firebase-admin");

// create a database in test mo de and
const serviceAccount = require(" ");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://usermangement-1600e-default-rtdb.firebaseio.com",
});

const db = admin.database();
const ref = db.ref();

console.log(API_KEY);

const createUser = asyncHandler(async (req, res) => {
	const { name, zipCode } = req.body;
	const { data } = await axios.get(
		`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`
	);

	await ref.push(data, (err) => {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: "Success: User save", result: true });
		}
	});

	// res.status(200).json({
	// 	zip: data.zip,
	// 	name: data.name,
	// });
});

const getUser = asyncHandler(async (req, res) => {
	//const user = req.params.id;
	await ref.once("value", (err) => {
		if (err) {
			res.send(err);
		} else {
			res.status(200).json({ message: "Success", data: value });
		}
	});
});

const updateUser = asyncHandler(async (req, res) => {
	const uid = req.params.id;
	//const data = req.body;
	const { zip, lat, lon } = req.body;

	//console.log(req.body);
	let oldZip;

	await ref.once("value", (data) => {
		oldZip = data.child(uid).val();
	});

	if (zip != oldZip) {
		const { data } = await axios.get(
			`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${API_KEY}`
		);

		await ref.child(uid).update(data, (err) => {
			if (err) {
				res.send(err);
			} else {
				res.status(200).json({ message: "Updated successfully", data });
			}
		});
	}
});

const deleteUser = asyncHandler(async (req, res) => {
	const uid = req.params.id;
	//const user = req.params.id;
	await ref.child(uid).remove((err) => {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: "User deleted" });
		}
	});
});

module.exports = { createUser, getUser, updateUser, deleteUser };
