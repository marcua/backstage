

function demo1merge() {
    
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
    
    merge($('#template')[0], playlist);
}



query1: SELECT name, pet_name FROM people, pets WHERE (join happens);
query2: SELECT name, pet_name FROM people, pets WHERE (join happens);

