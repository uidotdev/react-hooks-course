import React from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
  },
};

export default function Loading({ speed, text }) {
  const [content, setContent] = React.useState(text || "");
  let interval = React.useRef(null);
  // content === text + "..." ? setContent(text) : setContent(content + ".");
  console.log("rendering load");

  React.useEffect(() => {
    interval.current = window.setInterval(() => {
      console.log("load cycle", content+".");
      content === text + "..." ? setContent(text) : setContent((content) => content + ".");
    }, speed);

    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, [speed, text]);

  return <p style={styles.content}>{content}</p>;
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
