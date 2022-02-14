import React, { useEffect, useRef } from "react";

function Paginate(props) {
  const observingDiv = useRef();
  useEffect(() => {
    const observerElement = observingDiv.current;
    if (!observerElement) return;
    const observer = new IntersectionObserver((data) => {
      const isIntersecting = data[0].isIntersecting;
      console.log(data);
      if (props.onIntersected) props.onIntersected(isIntersecting);
    });
    observer.observe(observerElement);

    return () => {
      observer.unobserve(observerElement);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {props.children}
      <div
        ref={observingDiv}
        style={{
          position: "absolute",
          bottom: "0",
          height: `${window.innerHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}

export default Paginate;
