const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = "http://localhost:8000/api/v1/reviews/";

const title = $("#title");
const mainNew = $("#new-section");
const mainReview = $("#review-section");

$(title).text(movieTitle);

newReview();

function newReview() {
    const div_new = $("<div>").html(`
        <div class="row">
            <div class="column">
            <div class="card">
                New Review
                <p><strong>Review: </strong>
                    <input type="text" id="new_review" value="">
                </p>
                <p><strong>User: </strong>
                    <input type="text" id="new_user" value="">
                </p>
                <p>
                    <a href="#" class="save-review" data-id="${movieId}">💾</a>
                </p>
            </div>
            </div>
        </div>
    `);

    mainNew.append(div_new);

    $(".save-review").on("click", function (e) {
        e.preventDefault();
        saveReview("", "new_review", "new_user");
    });
}

returnReviews(APILINK);

function returnReviews(url) {
    fetch(`${url}movie/${movieId}`)
        .then((res) => res.json())
        .then(function (data) {
            mainReview.empty(); // Clear existing content

            data.forEach((review) => {
                const div_row = $("<div>").addClass("row");
                const div_column = $("<div>").addClass("column");
                const div_card = $("<div>").addClass("card").attr("id", review._id);

                const reviewSection = $("<div>").addClass(`review-sec-${review._id}`)
                    .html(`
                        <p><strong>Review: </strong>${review.review}</p>
                        <p><strong>User: </strong>${review.user}</p>
                        <p>
                            <a href="#" class="edit-review" data-id="${review._id}" data-review="${review.review}" data-user="${review.user}">✏️</a>
                            <a href="#" class="delete-review" data-id="${review._id}">🗑</a>
                        </p>
                    `);

                mainReview.append(div_row);
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
            <a href="#" class="save-review" data-id="${id}">💾</a>
        </p>
    `);

    $(".save-review").on("click", function (e) {
        e.preventDefault();
        const id = $(this).data("id");
        const review = $(this).data("review");
        const user = $(this).data("user");
        saveReview(id, reviewInputId, userInputId);
    });
}

function saveReview(id = "", reviewInputId, userInputId) {
    const review = $("#" + reviewInputId).val();
    const user = $("#" + userInputId).val();

    if (id) {
        fetch(APILINK + id, {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user, review: review }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.info(res);
                location.reload();
            })
            .catch((error) => console.error("Error:", error));
    } else {
        fetch(APILINK + "new", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user, review: review, movieId: movieId }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.info(res);
                location.reload();
            })
            .catch((error) => console.error("Error:", error));
    }
}
