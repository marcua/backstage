function imdbTest() {
	$("[datasource]").each(function(i) {
		$(this).templateRemote($(this).attr('template'));
		$(this).renderRemote($(this).attr('datasource'));
	});	
}