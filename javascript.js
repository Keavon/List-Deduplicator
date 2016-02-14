document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("remove-duplicates").addEventListener("click", function() { go(true); });
	document.getElementById("remove-non-duplicates").addEventListener("click", function() { go(false); });
}, false);

var timer;

function go(process) {
	// Get input
	var keep = document.getElementById("primary").value.toLowerCase().split("\n");
	var remove = document.getElementById("secondary").value.toLowerCase().split("\n");
	var kept = [];
	var initial = remove.length;
	var seen = {};
	
	// Sanitize
	for (var item1 in keep) {
		keep[item1] = keep[item1].replace(/\s/g, "");
	}
	for (var item2 in remove) {
		remove[item2] = remove[item2].replace(/\s/g, "");
	}
	
	remove = remove.filter(function (item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
	
	// Go through each line of keep
	for (var item in keep) {
		// Checks if the current line exists in the other list
		if (remove.indexOf(keep[item]) !== -1) {
			if (process) {
				// Removes it from the list
				remove.splice(remove.indexOf(keep[item]), 1);
			} else {
				// Adds it to the other list
				kept.push(keep[item]);
			}
		}
	}
	
	var s = "s";
		
	if (process) {
		document.getElementById("secondary").value = remove.join("\n");
		if (initial - remove.length === 1) {
			s = "";
		}
		document.getElementById("snackbar").innerHTML = initial - remove.length + " line" + s + " removed";
	} else {
		document.getElementById("secondary").value = kept.join("\n");
		if (initial - kept.length === 1) {
			s = "";
		}
		document.getElementById("snackbar").innerHTML = initial - kept.length + " line" + s + " removed";
	}
	document.getElementById("snackbar").className = "visible";
	clearTimeout(timer);
	timer = setTimeout(function () {
		document.getElementById("snackbar").className = "";
	}, 10000);
}
