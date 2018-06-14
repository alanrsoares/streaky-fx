import React from "react";

const genreModifiers = [
  "success",
  "danger",
  "warning",
  "info",
  "primary",
  "secondary"
];

const link = x =>
  x && (
    <a href={x} className="btn btn-primary btn-block">
      visit the official website
    </a>
  );

const image = x => (
  <img
    className="card-img-top"
    width="286px"
    src={x.medium.replace(/https?/, "https")}
    alt="Card"
  />
);

const genrePill = (x, i) => (
  <span className={`badge badge-pill badge-${genreModifiers[i]} mr-1`}>
    {x}
  </span>
);

const ratingVariant = x => {
  if (x >= 8) {
    return "success";
  }
  if (x >= 6 && x < 8) {
    return "warning";
  }
  if (x < 6) {
    return "danger";
  }

  return "secondary";
};

const rating = x => {
  if (!x) {
    return;
  }

  const variant = ratingVariant(x);

  return <span className={`badge badge-${variant} float-right`}>{x} ★</span>;
};

const ShowCard = ({ show }) => (
  <div className="card mr-2" style={{ width: "18rem" }}>
    {image(show.image)}
    <div className="card-body">
      <h5 className="card-title">
        {show.name} {rating(show.rating.average)}
      </h5>
      <div>{show.genres && show.genres.map(genrePill)}</div>
      <p
        assName="card-text mt-2"
        dangerouslySetInnerHTML={{ __html: show.summary }}
      />
      {link(show.officialSite)}
    </div>
  </div>
);

export default ShowCard;
