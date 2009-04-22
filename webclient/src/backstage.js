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

jQuery.fn.renderRemote = function(link) {
	var me = this;
	$.getJSON(link,function(data){$(me).render(data);});
}

jQuery.fn.render = function(value) {
    var templateString = this.template();
    var template = jsontemplate.Template(templateString);
    var rendered = template.expand(value);
    this.html(rendered);
}

function mergeTemplates() {
	$("[datasource]").each(function(i) {
		$(this).templateRemote($(this).attr('template'));
		$(this).renderRemote($(this).attr('datasource'));
	});	
}