// Function to handle filtering of songs based on selected genres, difficulties, decades, and favourites
document.getElementById('apply-filters').addEventListener('click', function() {
  // Get selected genres, difficulties, decades, and favourites
  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(checkbox => checkbox.value);
  const selectedDifficulties = Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(checkbox => checkbox.value);
  const selectedDecades = Array.from(document.querySelectorAll('input[name="decade"]:checked')).map(checkbox => checkbox.value);
  const showFavourites = document.getElementById('favourites').checked;

  // Get all song links
  const songLinks = document.querySelectorAll('.song-list li a');

  // Loop through each song
  songLinks.forEach(song => {
    const songGenres = song.getAttribute('data-genres').split(', ');
    const songDifficulties = song.getAttribute('data-difficulties').split(', ');
    const songDecades = song.getAttribute('data-decades').split(', ');
    const songIsFavourite = song.getAttribute('data-favourites') === 'true';

    // Check if the song matches the selected filters
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(genre => songGenres.includes(genre));
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.some(difficulty => songDifficulties.includes(difficulty));
    const matchesDecade = selectedDecades.length === 0 || selectedDecades.some(decade => songDecades.includes(decade));
    const matchesFavourites = !showFavourites || songIsFavourite;

    // Show or hide the song based on the match
    if (matchesGenre && matchesDifficulty && matchesDecade && matchesFavourites) {
      song.parentElement.style.display = 'list-item';
    } else {
      song.parentElement.style.display = 'none';
    }
  });
});

