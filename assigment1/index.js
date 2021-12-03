document.getElementById("sort").onclick = function () {
	getData();
}

function getData() {
	document.getElementById("details").innerHTML = "";
	axios.get('https://www.gov.uk/bank-holidays.json')
		.then(function (response) {
			const england = response.data["england-and-wales"].events;
			const scotland = response.data["scotland"].events;
			const ireland = response.data["northern-ireland"].events;
			const events = england.concat(scotland, ireland);


			const value = document.getElementById('sortby').value

			if (value == "yesterday") {
				let dat = filterDate(events)
				if (dat.length == 0) {
					document.getElementById("details").innerHTML += "<h1>No data for yesterday</h1>"
				} else {
					document.getElementById("details").innerHTML += "<h1>Data for yesterday</h1>"
				}
				dat.forEach(function (item) {
					let li = document.createElement("li");
					li.innerHTML = item.date + " - " + item.title;
					document.getElementById("details").appendChild(li);
				});
			} else if (value == "week") {
				let dat = filterWeek(events)
				if (dat.length == 0) {
					document.getElementById("details").innerHTML += "<h1>No data for last week</h1>"
				} else {
					document.getElementById("details").innerHTML += "<h1>Data for last week</h1>"
				}
				dat.forEach(function (item) {
					let li = document.createElement("li");
					li.innerHTML = item.date + " - " + item.title;
					document.getElementById("details").appendChild(li);
				});

			} else if (value == "month") {
				let dat = filterMonth(events)
				if (dat.length == 0) {
					document.getElementById("details").innerHTML += "<h1>No data for last month</h1>"
				} else {

					document.getElementById("details").innerHTML += "<h1>Data for last month</h1>"
				}
				dat.forEach(function (item) {
					let li = document.createElement("li");
					li.innerHTML = item.date + " - " + item.title;
					document.getElementById("details").appendChild(li);
				});
			} else if (value == "inbetween") {
				let dat = filterDates(events)
				if (dat.length == 0) {
					document.getElementById("details").innerHTML += "<h1>No data for selected</h1>"
				} else {

					document.getElementById("details").innerHTML += "<h1>Data for selected </h1>"
				}
				dat.forEach(function (item) {
					let li = document.createElement("li");
					li.innerHTML = item.date + " - " + item.title;
					document.getElementById("details").appendChild(li);
				});
			}

		})
}

//Filter json data by yesterday
function filterDate(data) {
	let today = new Date();
	let yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	let yesterdayString = yesterday.toISOString().slice(0, 10);
	let filteredData = data.filter(function (item) {
		return item.date === yesterdayString;
	})
	return filteredData;
}


//Filter json data by last week
function filterWeek(data) {
	let today = new Date();
	let todayString = today.toISOString().slice(0, 10);
	let lastWeek = new Date();
	lastWeek.setDate(today.getDate() - 7);
	let lastWeekString = lastWeek.toISOString().slice(0, 10);
	let filteredData = data.filter(function (item) {
		return item.date >= lastWeekString && item.date <= todayString;
	})
	return filteredData;
}


//Filter json data by last month
function filterMonth(data) {
	let today = new Date();
	let todayString = today.toISOString().slice(0, 10);
	let lastMonth = new Date();
	lastMonth.setMonth(today.getMonth() - 1);
	let lastMonthString = lastMonth.toISOString().slice(0, 10);
	let filteredData = data.filter(function (item) {
		return item.date >= lastMonthString && item.date <= todayString;
	})
	return filteredData;
}


//Filter json data between two dates
function filterDates(data) {
	let startDate = new Date(document.getElementById("start").value);
	let startString = startDate.toISOString().slice(0, 10);
	let endDate = new Date(document.getElementById("end").value);
	let endString = endDate.toISOString().slice(0, 10);
	let filteredData = data.filter(function (item) {
		return item.date >= startString && item.date <= endString;
	})
	return filteredData;
}