jQuery.fn.template = function(value) {
    if (value === undefined) {
        return this.data("backstage_template");        
    }
    else {
        this.data("backstage_template", value);
        return this;
    }
};

jQuery.fn.render = function(value) {
    var templateString = this.template();
    var template = jsontemplate.Template(templateString);
    var rendered = template.expand(value);
    this.html(rendered);
}
