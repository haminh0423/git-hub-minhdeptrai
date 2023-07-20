import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    "https://img.ws.mms.shopee.vn/b1dd6a2b37c5912e4d5ea95633270d06",
    "https://mensfolio.vn/wp-content/uploads/2021/11/20211112-MFOnline-Local-Dont-Miss-Leninn-Skate-Shop-27.jpg",
    "https://mensfolio.vn/wp-content/uploads/2021/11/20211112-MFOnline-Local-Dont-Miss-Leninn-Skate-Shop-9.jpg"
  ];

  useEffect(() => {
    // Chuyển đổi tự động các slide sau mỗi giây
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 3) % slides.length);
    }, 1000);

    // Xóa interval khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          {/* Slide ảnh thời trang lớn */}
          <div id="fashionCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              {slides.map((slide, index) => (
                <li
                  key={index}
                  data-target="#fashionCarousel"
                  data-slide-to={index}
                  className={index === slideIndex ? 'active' : ''}
                ></li>
              ))}
            </ol>
            <div className="carousel-inner">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === slideIndex ? 'active' : ''}`}
                >
                  <img src={slide} className="d-block w-100" alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </div>
            <a className="carousel-control-prev" href="#fashionCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#fashionCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      {/* Button Best Seller và New Arrival */}
      {/* Phần còn lại của mã */}
    </div>
  );
};

export default Slider;
