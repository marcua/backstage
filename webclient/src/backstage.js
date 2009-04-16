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
	var template = '{# This is a comment and will be removed from the output.}{.section songs}<h2>Songs in {playlist-name}</h2>      <table width="100%">      {.repeated section @}        <tr>          <td><a href="{url-base|htmltag}{url|htmltag}">Play</a>          <td><i>{title}</i></td>          <td>{artist}</td>        </tr>      {.end}      </table>    {.or}      <p><em>(No page content matches)</em></p>    {.end}';
	$("[datasource]").each(function(i) {
		var template = $(this).innerHTML;
		$(this).templateRemote($(this).attr('template'));
		$(this).renderRemote($(this).attr('datasource'));
	});	
}