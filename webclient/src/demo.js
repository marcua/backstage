

function demo1merge() {
    var template = '{# This is a comment and will be removed from the output.}{.section songs}<h2>Songs in {playlist-name}</h2>      <table width="100%">      {.repeated section @}        <tr>          <td><a href="{url-base|htmltag}{url|htmltag}">Play</a>          <td><i>{title}</i></td>          <td>{artist}</td>        </tr>      {.end}      </table>    {.or}      <p><em>(No page content matches)</em></p>    {.end}';
    
    // Data
    var playlist = {
      "url-base": "http://example.com/music/", 
      "playlist-name": "Epic Playlist", 
      "songs": [
        {
          "url": "1.mp3", 
          "artist": "Grayceon", 
          "title": "Sounds Like Thunder"
        }, 
        {
          "url": "2.mp3", 
          "artist": "Thou", 
          "title": "Their Hooves Carve Craters in the Earth"
        }
      ]
    };

    // Tempalte    
    var t = $('#playlist');
    t.template(template);
    t.render(playlist);
}



