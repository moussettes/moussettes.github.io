// Sample song data (normally this might come from an API or external data source)
const songs = [
  { title: "Song 1", genres: ["rock", "pop"], difficulties: ["easy"], decades: ["1980s"], favourite: true },
  { title: "Song 2", genres: ["rock"], difficulties: ["hard"], decades: ["1990s"], favourite: false },
  { title: "Song 3", genres: ["pop"], difficulties: ["easy"], decades: ["2000s"], favourite: true },
  { title: "Song 4", genres: ["rock"], difficulties: ["hard"], decades: ["1970s"], favourite: true },
  { title: "Song 5", genres: ["pop"], difficulties: ["easy"], decades: ["2010s"], favourite: false },
  // Add more songs as needed
];

// Select the song-list container
const songListContainer = document.getElementById('song-list');

// Loop through the song data and create song items dynamically
songs.forEach(song => {
  const songElement = document.createElement('div');
  songElement.classList.add('song-item'); // Add a class to the song item

  // Create the song link element
  songElement.innerHTML = `
    <a href="#" class="song" 
       data-genres="${song.genres.join(', ')}" 
       data-difficulties="${song.difficulties.join(', ')}" 
       data-decades="${song.decades.join(', ')}" 
       data-favourites="${song.favourite}">
       ${song.title}
    </a>
  `;

  // Append the song element to the song list container
  songListContainer.appendChild(songElement);
});

// Apply filters when the button is clicked
document.getElementById('apply-filters').addEventListener('click', function() {
  // Get selected genres, difficulties, decades, and favourites
  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(checkbox => checkbox.value);
  const selectedDifficulties = Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(checkbox => checkbox.value);
  const selectedDecades = Array.from(document.querySelectorAll('input[name="decade"]:checked')).map(checkbox => checkbox.value);
  const showFavourites = document.querySelector('input[name="favorites"]:checked') !== null;

  // Log selected filter values to help with debugging
  console.log("Selected Filters: ");
  console.log("Genres: ", selectedGenres);
  console.log("Difficulties: ", selectedDifficulties);
  console.log("Decades: ", selectedDecades);
  console.log("Show Favorites Only: ", showFavourites);

  // Get all song links
  const songLinks = document.querySelectorAll('.song-container .song');

  // Loop through each song
  songLinks.forEach(song => {
    const songGenres = song.getAttribute('data-genres').split(', ');
    const songDifficulties = song.getAttribute('data-difficulties').split(', ');
    const songDecades = song.getAttribute('data-decades').split(', ');
    const songIsFavourite = song.getAttribute('data-favourites') === 'true';

    // Log each song's data for debugging
    console.log(`Checking song: ${song.textContent}`);
    console.log("Song Genres: ", songGenres);
    console.log("Song Difficulties: ", songDifficulties);
    console.log("Song Decades: ", songDecades);
    console.log("Is Favorite: ", songIsFavourite);

    // Check if the song matches the selected filters
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(genre => songGenres.includes(genre));
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.some(difficulty => songDifficulties.includes(difficulty));
    const matchesDecade = selectedDecades.length === 0 || selectedDecades.some(decade => songDecades.includes(decade));
    const matchesFavourites = !showFavourites || songIsFavourite;

    // Show or hide the song based on the match
    if (matchesGenre && matchesDifficulty &&
