import React, { useState } from "react";

const PhotoGallery = ({ images }) => {
  const [bgimage, setBgimage] = useState(images);

  const ChangeThumbnail = (id) => {
    const newImage = images.find((item) => item.id === id);
    setBgimage([newImage]);
  };

  const BgImage = () => {
    return bgimage.map(({ image, id }) => (
      <div key={id}>
        <img
          src={image}
          alt="bg-img"
          className="img-BG"
        />
      </div>
    ));
  };

  const MobileImg = () => {
    const [index, setIndex] = useState(0);
    const { image, id } = images[index];

    const checkNumber = (number) => {
      if (number > images.length - 1) {
        return 0;
      }
      if (number < 0) {
        return images.length - 1;
      }
      return number;
    };

    const nextPerson = () => {
      setIndex((index) => {
        let newIndex = index + 1;
        return checkNumber(newIndex);
      });
    };

    const prevPerson = () => {
      setIndex((index) => {
        let newIndex = index - 1;
        return checkNumber(newIndex);
      });
    };

    return (
      <section className="mobileImg-hero">
        <button onClick={prevPerson} className="left-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <img key={id} src={image} alt="big-img" className="Mbig-img" />
        <button onClick={nextPerson} className="right-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>
    );
  };

  return (
    <>
      <section className="desktop">
        <BgImage />
        <div className="desktop-flex">
          {images.map(({ id, image }) => (
            <img
              key={id}
              src={image}
              alt="small-img"
              className="smallImg"
              onClick={() => ChangeThumbnail(id)}
            />
          ))}
        </div>
      </section>
      <section className="mobile">
        <MobileImg />
      </section>
    </>
  );
};

export default PhotoGallery;