const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = 'http://localhost:8000/api/v1/reviews/';

const title = $("#title");
const main = $("#section");

$(title).text(movieTitle);

returnReviews(APILINK);

function returnReviews(url) {
    fetch(`${url}movie/${movieId}`)
        .then(res => res.json())
        .then(function (data) {
            main.empty(); // Clear existing content

            data.forEach(review => {
                const div_row = $('<div>').addClass('row');
                const div_column = $('<div>').addClass('column');
                const div_card = $('<div>')
                    .addClass('card')
                    .attr('id', review._id);

                const reviewSection = $('<div>')
                    .addClass(`review-sec-${review._id}`)
                    .html(`
                        <p><strong>Review: </strong>${review.review}</p>
                        <p><strong>User: </strong>${review.user}</p>
                        <p>
                            <a href="#" class="edit-review" data-id="${review._id}" data-review="${review.review}" data-user="${review.user}">✏️</a>
                            <a href="#" class="delete-review" data-id="${review._id}">🗑</a>
                        </p>
                    `);

                main.append(div_row);
                div_row.append(div_column);
                div_column.append(div_card);
                div_card.append(reviewSection);
            });

            $(".edit-review").on("click", function (e) {
                e.preventDefault();
                const id = $(this).data("id");
                const review = $(this).data("review");
                const user = $(this).data("user");
                editReview(id, review, user);
            });
        });
}

function editReview(id, review, user) {
    const element = $("#" + id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.html(`
        <p><strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p><strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <p>
            <a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
        </p>
    `);
}