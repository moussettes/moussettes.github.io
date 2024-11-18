function filterSongs() {
  const genreFilter = document.getElementById('genre').value;
  const difficultyFilter = document.getElementById('difficulty').value;

  const songs = document.querySelectorAll('.song');

  songs.forEach(song => {
    const songGenre = song.getAttribute('data-genre');
    const songDifficulty = song.getAttribute('data-difficulty');

    // Check if song matches selected filters
    const matchesGenre = (genreFilter === 'all' || songGenre === genreFilter);
    const matchesDifficulty = (difficultyFilter === 'all' || songDifficulty === difficultyFilter);

    // Show or hide song based on filter match
    if (matchesGenre && matchesDifficulty) {
      song.style.display = 'block';
    } else {
      song.style.display = 'none';
    }
  });
}
