function databaseNameFromUrl(url) {
    var local = url.slice(url.lastIndexOf('/') + 1);
    local = local.slice(0,local.indexOf('.'));
    return local;
}

function tableExists(table) {
    var result = db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?;", [table]);
    return result.isValidRow();
}

function resetDatabase() {
    db.remove();
    db.open('backstage');
}

function bulkload(url, data) {
    console.time("Bulkloading " + url);
	var rows = data.split('\n');
	var fields = rows[0].split(',');
	var name = databaseNameFromUrl(url);
	db.execute("CREATE TABLE IF NOT EXISTS " + name + " (" + fields.toString() + ");");
	for (var i=1; i<rows.length; i++) {
        var rowfields = rows[i].split(',');
        if (rowfields.length != fields.length) {
            continue; // Simple error checking
        }
        for (var j=0; j<rowfields.length; j++) {
            rowfields[j] = "'" + rowfields[j] + "'";
        }
        var sql = "INSERT INTO " + name + " (" + fields.toString() + ") VALUES (" + rowfields.join() + ");";
        db.execute(sql);
	}
	console.timeEnd("Bulkloading " + url);
}

jQuery.fn.templateRemote = function(link) {
	var me = this;
	$.get(link, function(data){$(me).template(data);});
}

jQuery.fn.template = function(value) {
	if (value === undefined) {
    	return this.data("backstage_template");        
    }
    else {
        this.data("backstage_template", value);
        return this;
    }
};

jQuery.fn.renderLocal = function(datasource, dataset, query) {
	// First download any data source we don't already have
	var datasources = dataset.split(",");
	for (var i=0; i<datasources.length; i++) {
	    var datasource = databaseNameFromUrl(datasources[i]);
		if (! tableExists(datasource)) {
			console.time("Downloading " + datasources[i]);
			$.get(datasources[i],
				function(data){
					console.timeEnd("Downloading " + this.url);
					bulkload(this.url, data);					
				}
			);
		}
	}
}

jQuery.fn.renderRemote = function(datasource, dataset, query) {
	var me = this;
	console.time("Querying Server");
	if ((dataset === undefined) && (query === undefined)) {
		// Render with just the datasource
		$.getJSON(
			datasource,
			function(data){
				console.timeEnd("Querying Server");
				$(me).render(data);
			}
		);		
	}
	else if (query === undefined) {
		// Render with datasource and dataset
		$.getJSON(
			datasource,
			{
				"uri":dataset
			},
			function(data){
				console.timeEnd("Querying Server");
				$(me).render(data);
			}
		);		
	}
	else {
		// Render with datasource, dataset, and query
		$.getJSON(
			datasource,
			{
				"uri":dataset,
				"query":query
			},
			function(data){
				console.timeEnd("Querying Server");
				$(me).render(data);
			}
		);		
	}
}

jQuery.fn.render = function(value) {
	console.time("Rendering Template");
    var templateString = this.template();
    var template = jsontemplate.Template(templateString);
	console.log("Template Size: " + templateString.length);
    var rendered = template.expand(value);
	console.log("Rendered Size: " + rendered.length);
    this.html(rendered);
	console.timeEnd("Rendering Template");
}
function mergeTemplates() {
    window.db = google.gears.factory.create('beta.database');
    db.open('backstage');

	$("[datasource]").each(function(i) {
		$(this).templateRemote($(this).attr('template'));
		$(this).renderLocal($(this).attr('datasource'), $(this).attr('dataset'), $(this).attr('query'));
	});	
}