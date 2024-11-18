import * as React from "react";
import Svg, { Ellipse, Path, Rect } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const Add = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "44"}
      height={height || "40"}
      viewBox="0 0 44 40"
      fill="none"
    >
      <Ellipse cx="21.727" cy="20" rx="21.727" ry="20" fill="#E8E8FB" />

      <Path
        d="M20.3691 21.25H12.2214V18.75H20.3691V11.25H23.0849V18.75H31.2326V21.25H23.0849V28.75H20.3691V21.25Z"
        fill="#3F3649"
      />
    </Svg>
  );
};

export default Add;
