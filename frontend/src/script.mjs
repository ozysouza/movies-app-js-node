const APILINK = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6dc8089de286cc6dc588972039e6b01b&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=6dc8089de286cc6dc588972039e6b01b&query=`;

const main = $('#section');
const form = $('#form');
const search = $('#query');

function returnMovies(url) {
	fetch(url)
		.then((res) => res.json())
		.then(function (data) {
			main.empty(); // Clear existing content

			data.results.forEach((element) => {
				const div_row = $('<div>').addClass('row');
				const div_column =
					$('<div>').addClass('column');
				const div_card = $('<div>').addClass('card');

				const image = $('<img>')
					.addClass('thumbnail')
					.attr('id', 'card-img')
					.attr(
						'src',
						IMG_PATH + element.poster_path
					);

				const title = $('<h3>').attr('id', 'card-title')
					.html(`${element.title}
                        <br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`);

				main.append(div_row);
				div_row.append(div_column);
				div_column.append(div_card);
				div_card.append(image, title);
			});
		});
}

// Initial call to load movies
returnMovies(APILINK);

form.on('submit', (event) => {
	event.preventDefault();
	main.empty(); // Clear existing content

	const searchItem = search.val();
	if (searchItem) {
		returnMovies(SEARCHAPI + searchItem);
		search.val('');
	}
});
