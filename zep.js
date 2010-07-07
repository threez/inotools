var days = [],
    currentDay = null;
    
Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}
    
$("#ProjektzeitTableDiv").find(".content table tr").each(function(i, e) {
  var work = $($(e).find("td")[7]).text().match(/Reisen/)
  
  if (!work) {
    // new entry
    var td = $(e).find("td.textkurz span");
    if ($(td).text() != "") {
      currentDay.items.push($(td).text());
    }
  } else {
    // new day
    var td = $(e).find("td div.wochentag sup");
    if ($(td).text() != "") {
      var day = {
        date: $(td).text(),
        items: []
      };
      currentDay = day;
      days.push(day);
    }
  }
})

function generateHtmlTable(daysArray) {
  for (var i = 0; i < daysArray.length; ++i) {
    daysArray[i].items = daysArray[i].items.unique();
  }
  daysArray = daysArray.reverse();

  html = "<div style='position:absolute;top: 0px; left: 0px; margin: 20px auto; width: 50%; padding: 10px; background-color: 10px'>" + 
    "<table style='border: 1px solid gray'>";

  for (var i = 0; i < daysArray.length; ++i) {
    html += "<tr><td>" + daysArray[i].date + "</td><td>";
    for (var j = 0; j < daysArray[i].items.length; ++j) {
     html += daysArray[i].items[j] + "<br>";
    }
    html += "</td></tr>";
  }

  return html + "</table>" + 
  "</div>";
}

document.write(generateHtmlTable(days));