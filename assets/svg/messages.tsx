import * as React from "react";
import Svg, { Ellipse, Path, Rect } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const Messages = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "53"}
      height={height || "48"}
      viewBox="0 0 53 48"
      fill="none"
    >
      <Path
        d="M45.6267 30C45.6267 31.0609 45.1689 32.0783 44.354 32.8284C43.539 33.5786 42.4338 34 41.2813 34H15.2089L6.51807 42V10C6.51807 8.93913 6.97588 7.92172 7.79081 7.17157C8.60573 6.42143 9.711 6 10.8635 6H41.2813C42.4338 6 43.539 6.42143 44.354 7.17157C45.1689 7.92172 45.6267 8.93913 45.6267 10V30Z"
        fill="#E8E8FB"
        stroke="#E8E8FB"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Messages;
