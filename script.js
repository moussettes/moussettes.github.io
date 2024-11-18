// Function to handle filtering of songs based on selected genres and difficulties
document.getElementById('apply-filters').addEventListener('click', function() {
  // Get selected genres and difficulties
  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(checkbox => checkbox.value);
  const selectedDifficulties = Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(checkbox => checkbox.value);

  // Get all song links
  const songLinks = document.querySelectorAll('.song-list li a');

  // Loop through each song
  songLinks.forEach(song => {
    const songGenres = song.getAttribute('data-genres').split(', ');
    const songDifficulties = song.getAttribute('data-difficulties').split(', ');

    // Check if the song matches the selected filters
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(genre => songGenres.includes(genre));
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.some(difficulty => songDifficulties.includes(difficulty));

    // Show or hide the song based on the match
    if (matchesGenre && matchesDifficulty) {
      song.parentElement.style.display = 'list-item';
    } else {
      song.parentElement.style.display = 'none';
    }
  });
});

// Function to add a song to the "to be added" list (if relevant functionality exists on the main page)
document.getElementById('add-song-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const songName = document.getElementById('song-name-input').value.trim();
  if (songName) {
    const songList = document.getElementById('song-list');
    const newSong = document.createElement('li');
    newSong.textContent = songName;
    songList.appendChild(newSong);

    // Clear the input field after adding
    document.getElementById('song-name-input').value = '';
  }
});


