import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { BsFillHeartFill } from "react-icons/bs";

const Gallery = (props) => {
  const [mainTitle] = useState("GALLERY - TooFan");
  const totalPhotos = 30;
  const defaultPhotos = {
    likes: "",
    urls: {
      regular: "",
    },
    tags: [
      {
        title: "",
      },
    ],
  };
  const [photos, setPhotos] = useState([defaultPhotos]);
  const [perpage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("nature");
  const [title, setTitle] = useState("TOOFAN GALLERIES");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const getPhotos = async () => {
    props.setProgress(30);
    const url = `https://api.unsplash.com/search/photos?client_id=${props.apiKey}&page=${page}&query=${query}&per_page=${perpage}&orientation=landscape`;
    let data = await fetch(url);
    props.setProgress(40);
    let AllPhotos = await data.json();
    props.setProgress(75);
    setPhotos(AllPhotos.results);
    if (!AllPhotos.results.length) {
      alert("No Photos found with " + query + " keyword");
    }
    props.setProgress(100);
  };
  useEffect(() => {
    getPhotos();
    document.title = mainTitle;
    // eslint-disable-next-line
  }, []);
  const fetchMoreData = async () => {
    const url = `https://api.unsplash.com/search/photos?client_id=${
      props.apiKey
    }&page=${
      page + 1
    }&query=${query}&per_page=${perpage}&orientation=landscape`;
    setPage(page + 1);
    setPerPage(perpage + 10);
    let data = await fetch(url);
    let parsedData = await data.json();
    setPhotos(photos.concat(parsedData.results));
  };

  const handleSubmit = () => {
    getPhotos();
    setTitle(query.toUpperCase());
  };

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "70px" }}>
        <p className="my-4 text-center fw-bold" style={{ fontSize: "50px" }}>
          {title}
        </p>
        <div className="my-3 d-flex justify-content-end col-12">
          <form className="d-flex" onSubmit={onSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Photos"
              aria-label="Search"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-success"
              onClick={handleSubmit}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <InfiniteScroll
          dataLength={photos.length}
          next={fetchMoreData}
          hasMore={perpage !== totalPhotos && photos.length}
          loader={<Spinner />}
        >
          <div className="row">
            {photos.map((photo) => {
              return (
                <div className="col-lg-4 col-md-6" key={Math.random()}>
                  <div className="card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        right: "10px",
                        position: "absolute",
                        top: "10px",
                      }}
                    >
                      <span
                        id={photo.id}
                        className="badge rounded-pill bg-success"
                      >
                        <BsFillHeartFill /> {photo.likes}
                      </span>
                    </div>
                    <img
                      src={photo.urls.regular}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-center">
                        {!photo.description
                          ? "Unknown"
                          : photo.description.slice(0, 40)}
                        ..
                      </h5>
                      {photo.tags.map((tag) => {
                        return (
                          <span
                            className="badge rounded-pill bg-secondary mx-2 text-center"
                            style={{ height: "20px" }}
                            key={Math.random()}
                          >
                            {tag.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Gallery;
