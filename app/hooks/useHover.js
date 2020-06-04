import React, { useState } from "react";

export default function useHover() {
  const [hovering, setHovering] = React.useState(false);
  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);
  const attrs = {
    onMouseOut,
    onMouseOver,
  };

  return [hovering, attrs];
}
