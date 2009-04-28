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
		var haveDatasource = false;
		if (! haveDatasource) {
			console.time("Downloading " + datasources[i]);
			$.get(datasources[i],
				function(data){
					console.timeEnd("Downloading " + datasources[i]);
					console.time("Bulkloading " + datasources[i]);
					alert(data);
					console.timeEnd("Bulkloading " + datasources[i]);
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
	$("[datasource]").each(function(i) {
		$(this).templateRemote($(this).attr('template'));
		$(this).renderLocal($(this).attr('datasource'), $(this).attr('dataset'), $(this).attr('query'));
	});	
}