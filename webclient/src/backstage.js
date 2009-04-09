
function merge(template, json) {
    template.innerHTML = "{# This is a comment and will be removed from the output.}\n\n{.section songs}\n  <h2>Songs in '{playlist-name}'</h2>\n\n  <table width=\"100%\">\n  {.repeated section @}\n    <tr>\n      <td><a href=\"{url-base|htmltag}{url|htmltag}\">Play</a>\n      <td><i>{title}</i></td>\n      <td>{artist}</td>\n    </tr>\n  {.end}\n  </table>\n{.or}\n  <p><em>(No page content matches)</em></p>\n{.end}\n";
    var templText = template.innerHTML;
    var templ = jsontemplate.Template(templText.toString());
    var rendered = templ.expand(json);
    template.innerHTML = rendered;
}