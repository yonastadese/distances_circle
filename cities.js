// const xlsxParser = require("xlsx-parse-json");
const elasticsearch = require("@elastic/elasticsearch");
// const jsonfile = require("jsonfile");
// var inputFile = require("./cities.json");
// const data = require("./data.json");
// xlsxj = require("xlsx-to-json-lc");
const formattedJson = require("./formatedData.json");

var client = new elasticsearch.Client({
	node: "http://localhost:9200",
});

// xlsxj(
// 	{
// 		input: "data-om.xlsx",
// 		output: "data-xlsx.json",
// 		lowerCaseHeaders: true, //converts excel header rows into lowercase as json keys
// 	},
// 	function (err, result) {
// 		if (err) {
// 			console.error(err);
// 		} else {
// 			console.log(result);
// 		}
// 	}
// );

// const FormattJson = () => {
// 	let copiedData = { ...data };
// 	Object.keys(data).map((key) => {
// 		data[key].map((d) => {
// 			d.geometry = {
// 				type: "Point",
// 				coordinates: [Number(d.lon), Number(d.lat)],
// 			};
// 		});
// 	});
// 	return copiedData;
// };

// let formattedJson = FormattJson();
// console.log(FormattJson());
// jsonfile.writeFile("./formatedData.json", formattedJson, {
// 	spaces: 2,
// });

const addressData = formattedJson.loc_address;
const addressDatapark = formattedJson.loc_park;
const addressDataschool = formattedJson.loc_school;
const addressDatagrocery = formattedJson.loc_grocery;
const addressDatamedical = formattedJson.loc_medical;
const addressDatarestaurant = formattedJson.loc_restaurant;

var bulkArr = [];
(async () => {
	try {
		const response = await client.indices.create({
			index: "geo_city_point",
			body: {
				mappings: {
					properties: {
						location: {
							type: "geo_shape",
							"strategy": "recursive"
						},
						name: {
							type: "text",
						},
						objectId: {
							type: "text",
						},
						GNIS: {
							type: "text",
						},
					},
				},
			},
		});
		console.log("geo_cities_point index status: ", response);
	} catch (e) {
		console.log("An error occurred while indexing geo_cities_point", e);
	}

	console.log("Loading Cities Data ----- ");
	try {
		let j = 1;

		for (let i in addressData) {
			bulkArr.push(
				{
					index: { _index: "geo_city_point", _id: j++ },
				},
				{
					name: addressData[i].street,
					location: {
						"type": "point",
						"coordinates": addressData[i].geometry.coordinates
					},
					objectId: addressData[i].address_id,
					GNIS: addressData[i].city_id,
				}
			);
		}

		const resp = client.bulk({
			index: "geo_city_point",
			body: bulkArr,
		});
		console.log(resp);
	} catch (e) {
		console.log("Exception => " + e);
	}
})();

(async () => { })();

// park
var bulkArr = [];
(async () => {
	try {
		const response = await client.indices.create({
			index: "geo_city_park",
			body: {
				mappings: {
					properties: {
						location: {
							type: "geo_shape",
							"strategy": "recursive"
						},
						name: {
							type: "text",
						},
						objectId: {
							type: "text",
						},
						GNIS: {
							type: "text",
						},
					},
				},
			},
		});
		console.log("geo_city_park index status: ", response);
	} catch (e) {
		console.log("An error occurred while indexing geo_city_park", e);
	}
	console.log("Loading Cities Data ----- ");
	try {
		let j = 1;

		for (let i in addressDatapark) {
			bulkArr.push(
				{
					index: { _index: "geo_city_park", _id: j++ },
				},
				{
					name: addressDatapark[i].park,
					location: {
						"type": "point",
						"coordinates": addressDatapark[i].geometry.coordinates
					},
					objectId: addressDatapark[i].park_id,
					GNIS: addressDatapark[i].area,
				}
			);
		}

		const resp = client.bulk({
			index: "geo_city_park",
			body: bulkArr,
		});
		console.log(resp);
	} catch (e) {
		console.log("Exception => " + e);
	}
})();

(async () => { })();


//medical 

var bulkArr = [];
(async () => {
	try {
		const response = await client.indices.create({
			index: "geo_city_medical",
			body: {
				mappings: {
					properties: {
						location: {
							"type": "geo_shape",
							"strategy": "recursive"
						},
						name: {
							type: "text",
						},
						objectId: {
							type: "text",
						},
						GNIS: {
							type: "text",
						},
					},
				},
			},
		});
		console.log("geo_city_medical index status: ", response);
	} catch (e) {
		console.log("An error occurred while indexing geo_city_medical", e);
	}
	console.log("Loading Cities Data ----- ");
	try {
		let j = 1;

		for (let i in addressDatamedical) {
			bulkArr.push(
				{
					index: { _index: "geo_city_medical", _id: j++ },
				},
				{
					name: addressDatamedical[i].street,
					location: {
						"type": "point",
						"coordinates": addressDatamedical[i].geometry.coordinates,
					},
					objectId: addressDatamedical[i].address_id,
					GNIS: addressDatamedical[i].house_number,
				}
			);
		}

		const resp = client.bulk({
			index: "geo_city_medical",
			body: bulkArr,
		});
		console.log(resp);
	} catch (e) {
		console.log("Exception => " + e);
	}
})();

(async () => { })();

//restaurant 

var bulkArr = [];
(async () => {
	try {
		const response = await client.indices.create({
			index: "geo_city_restaurant",
			body: {
				mappings: {
					properties: {
						location: {
							type: "geo_shape",
							"strategy": "recursive"
						},
						name: {
							type: "text",
						},
						objectId: {
							type: "text",
						},
						GNIS: {
							type: "text",
						},
					},
				},
			},
		});
		console.log("geo_city_restaurant index status: ", response);
	} catch (e) {
		console.log("An error occurred while indexing geo_city_restaurant", e);
	}
	console.log("Loading Cities Data ----- ");
	try {
		let j = 1;

		for (let i in addressDatarestaurant) {
			bulkArr.push(
				{
					index: { _index: "geo_city_restaurant", _id: j++ },
				},
				{
					name: addressDatarestaurant[i].street,
					location: {
						"type": "point",
						"coordinates": addressDatarestaurant[i].geometry.coordinates
					},
					objectId: addressDatarestaurant[i].address_id,
					GNIS: addressDatarestaurant[i].house_number,
				}
			);
		}

		const resp = client.bulk({
			index: "geo_city_restaurant",
			body: bulkArr,
		});
		console.log(resp);
	} catch (e) {
		console.log("Exception => " + e);
	}
})();

(async () => { })();

//school

var bulkArr = [];
(async () => {
	try {
		const response = await client.indices.create({
			index: "geo_city_school",
			body: {
				mappings: {
					properties: {
						location: {
							type: "geo_shape",
							"strategy": "recursive"
						},
						name: {
							type: "text",
						},
						objectId: {
							type: "text",
						},
						GNIS: {
							type: "text",
						},
					},
				},
			},
		});
		console.log("geo_city_school index status: ", response);
	} catch (e) {
		console.log("An error occurred while indexing geo_city_school", e);
	}
	console.log("Loading Cities Data ----- ");
	try {
		let j = 1;

		for (let i in addressDataschool) {
			bulkArr.push(
				{
					index: { _index: "geo_city_school", _id: j++ },
				},
				{
					name: addressDataschool[i].street,
					location: {
						"type": "point",
						"coordinates": addressDataschool[i].geometry.coordinates
					},
					objectId: addressDataschool[i].address_id,
					GNIS: addressDataschool[i].house_number,
				}
			);
		}

		const resp = client.bulk({
			index: "geo_city_school",
			body: bulkArr,
		});
		console.log(resp);
	} catch (e) {
		console.log("Exception => " + e);
	}
})();

(async () => { })();

//grocery

var bulkArr = [];
(async () => {
	try {
		const response = await client.indices.create({
			index: "geo_city_grocery",
			body: {
				mappings: {
					properties: {
						location: {
							type: "geo_shape",
							"strategy": "recursive"
						},
						name: {
							type: "text",
						},
						objectId: {
							type: "text",
						},
						GNIS: {
							type: "text",
						},
					},
				},
			},
		});
		console.log("geo_city_Grocery index status: ", response);
	} catch (e) {
		console.log("An error occurred while indexing geo_city_Grocery", e);
	}
	console.log("Loading Cities Data ----- ");
	try {
		let j = 1;

		for (let i in addressDatagrocery) {
			bulkArr.push(
				{
					index: { _index: "geo_city_grocery", _id: j++ },
				},
				{
					name: addressDatagrocery[i].street,
					location: {
						"type": "point",
						"coordinates": addressDatagrocery[i].geometry.coordinates
					},
					objectId: addressDatagrocery[i].address_id,
					GNIS: addressDatagrocery[i].house_number,
				}
			);
		}

		const resp = client.bulk({
			index: "geo_city_grocery",
			body: bulkArr,
		});
		console.log(resp);
	} catch (e) {
		console.log("Exception => " + e);
	}
})();

// (async () => { })();

