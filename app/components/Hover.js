import React from "react";
import useHover from '../hooks/useHover';

export default function Hover(props) {
  const [hovering, attrs] = useHover();
  const mouseOver = () => attrs.OnMouseOver(true);
  const mouseOut = () => attrs.onMouseOut(false);

  return (
    <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
      {props.children(hovering)}
    </div>
  );
}
