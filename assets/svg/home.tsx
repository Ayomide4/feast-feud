import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { bg } from "../../src/constants/colors";

interface Props {
  width?: number;
  height?: number;
}

const Home = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "40"}
      height={height || "33"}
      viewBox="0 0 40 33"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.888833 14.2487C0.321931 14.6945 0 15.3191 0 15.973V29.4643C0 31.4169 1.87602 33 4.19021 33H16.7608V25.9286C16.7608 24.6267 18.0115 23.5714 19.5543 23.5714C21.0971 23.5714 22.3478 24.6267 22.3478 25.9286V33H34.9184C37.2325 33 39.1086 31.4169 39.1086 29.4643V15.973C39.1086 15.3191 38.7868 14.6945 38.2198 14.2487L20.4633 0.283734C19.9402 -0.0945777 19.1684 -0.0945782 18.6453 0.283734L0.888833 14.2487Z"
        fill="#E8E8FB"
      />
    </Svg>
  );
};

export default Home;
