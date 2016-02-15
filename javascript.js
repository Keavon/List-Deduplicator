// Bind click event to buttons
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("remove-duplicates").addEventListener("click", function() { dedupe(true); });
	document.getElementById("remove-non-duplicates").addEventListener("click", function() { dedupe(false); });
}, false);

// Remove duplicates or non-duplicates from the secondary list
function dedupe(dupes) {
	// Notify and terminate if the secondary list is empty
	if (document.getElementById("secondary").value === "") {
		notify(0);
		return;
	}
	
	// Get input
	var primary = document.getElementById("primary").value.toLowerCase().split("\n");
	var secondary = document.getElementById("secondary").value.toLowerCase().split("\n");
	
	// Throw out preceding and succeeding whitespace
	var trim = function(x) { return x.trim(); };
	primary = primary.map(trim);
	secondary = secondary.map(trim);
	
	// Specify the difference and intersection filter functions
	var filterDupes = function(x) { return primary.indexOf(x) === -1; };
	var filterNonDupes = function(x) { return primary.indexOf(x) !== -1; };
	
	// Filter the list and show the result
	if (dupes) { result(secondary.filter(filterDupes), secondary); }
	else { result(secondary.filter(filterNonDupes), secondary); }
}

// Update the secondary list with the new list and notify about the removed lines
function result(newList, secondary) {
	document.getElementById("secondary").value = newList.join("\n");
	notify(secondary.length - newList.length);
}

// Create a notification with the specified number of lines removed
function notify(count) {
	// Select snackbar element
	var snackbar = document.getElementById("snackbar");
	
	// Update count and make it visible
	snackbar.innerHTML = count + " line" + (count === 1 ? "" : "s") + " removed";
	snackbar.className = "visible";
	
	// Clear and set timer to hide element
	clearTimeout(timer);
	timer = setTimeout(function () {
		document.getElementById("snackbar").className = "";
	}, 10000);
}

// Stored toast visibility timer
var timer;
