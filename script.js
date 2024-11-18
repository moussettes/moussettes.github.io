// Function to filter songs based on selected genre and difficulty
function filterSongs() {
  const selectedGenres = Array.from(document.querySelectorAll('.genre:checked')).map(el => el.value);
  const selectedDifficulties = Array.from(document.querySelectorAll('.difficulty:checked')).map(el => el.value);

  const songs = document.querySelectorAll('.song');

  songs.forEach(song => {
    const songGenre = song.getAttribute('data-genre');
    const songDifficulty = song.getAttribute('data-difficulty');

    // Show song if it matches any of the selected genres and difficulties
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(songGenre);
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(songDifficulty);

    // Show or hide song based on filter match
    if (matchesGenre && matchesDifficulty) {
      song.style.display = 'block';
    } else {
      song.style.display = 'none';
    }
  });

  // Show feedback about how many songs are visible
  const visibleSongs = Array.from(songs).filter(song => song.style.display !== 'none').length;
  document.getElementById('song-count').textContent = `Songs shown: ${visibleSongs}`;
}

// Function to clear all filters and reset the song display
function clearFilters() {
  // Uncheck all checkboxes
  const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = false);

  // Reset song display to show all
  const songs = document.querySelectorAll('.song');
  songs.forEach(song => song.style.display = 'block');

  // Reset song count feedback
  document.getElementById('song-count').textContent = `Songs shown: ${songs.length}`;
}

// Listen for changes to checkboxes and apply filter immediately
document.querySelectorAll('.genre, .difficulty').forEach(checkbox => {
  checkbox.addEventListener('change', filterSongs);
});

// Initialize on page load
window.onload = filterSongs;
