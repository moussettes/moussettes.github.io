// Sample song data (normally fetched from an API or external data source)
const songs = [
  { title: "Song 1", genres: ["rock", "pop"], difficulties: ["easy"], decades: ["1980s"], favourite: true, page: "song1.html" },
  { title: "Song 2", genres: ["rock"], difficulties: ["hard"], decades: ["1990s"], favourite: false, page: "song2.html" },
  { title: "Song 3", genres: ["pop"], difficulties: ["easy"], decades: ["2000s"], favourite: true, page: "song3.html" },
  { title: "Song 4", genres: ["rock"], difficulties: ["hard"], decades: ["1970s"], favourite: true, page: "song4.html" },
  { title: "Song 5", genres: ["pop"], difficulties: ["easy"], decades: ["2010s"], favourite: false, page: "song5.html" },
  // Add more songs as needed
];

// Select the song-list container
const songListContainer = document.getElementById('song-list');

// Loop through the song data and create song items dynamically
songs.forEach(song => {
  const songElement = document.createElement('div');
  songElement.classList.add('song-item');

  // Create the song link element with dynamic data attributes
  songElement.innerHTML = `
    <a href="${song.page}" class="song" 
       data-genres="${song.genres.join(', ')}" 
       data-difficulties="${song.difficulties.join(', ')}" 
       data-decades="${song.decades.join(', ')}" 
       data-favourites="${song.favourite}">
       ${song.title}
    </a>
  `;

  songListContainer.appendChild(songElement);
});

// Apply filters when the button is clicked
document.getElementById('apply-filters').addEventListener('click', () => {
  // Get selected filter values
  const selectedGenres = getSelectedValues('genre');
  const selectedDifficulties = getSelectedValues('difficulty');
  const selectedDecades = getSelectedValues('decade');
  const showFavourites = document.querySelector('input[name="favorites"]:checked') !== null;

  // Get all song links
  const songLinks = document.querySelectorAll('.song');

  // Loop through each song and check if it matches the filters
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
    song.style.display = (matchesGenre && matchesDifficulty && matchesDecade && matchesFavourites) ? '' : 'none';
  });
});

// Helper function to get selected values from checkboxes
function getSelectedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(checkbox => checkbox.value);
}

