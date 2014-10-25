function go(process) {
	// Get
	var keep = document.getElementById("keep").value.toLowerCase().split("\n");
	var remove = document.getElementById("remove").value.toLowerCase().split("\n");
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

	if (process) {
		document.getElementById("remove").value = remove.join("\n");
		document.getElementById("status").innerHTML = initial - remove.length + " removed";
	} else {
		document.getElementById("remove").value = kept.join("\n");
		document.getElementById("status").innerHTML = initial - kept.length + " removed";
	}
}
