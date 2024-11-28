import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const Camera = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "42"}
      height={height || "40"}
      viewBox="0 0 42 40"
      fill="none"
    >
      <Path
        d="M39.3333 31.6667C39.3333 32.5507 38.9821 33.3986 38.357 34.0237C37.7319 34.6488 36.884 35 36 35H5.99996C5.1159 35 4.26806 34.6488 3.64294 34.0237C3.01782 33.3986 2.66663 32.5507 2.66663 31.6667V13.3333C2.66663 12.4493 3.01782 11.6014 3.64294 10.9763C4.26806 10.3512 5.1159 10 5.99996 10H12.6666L16 5H26L29.3333 10H36C36.884 10 37.7319 10.3512 38.357 10.9763C38.9821 11.6014 39.3333 12.4493 39.3333 13.3333V31.6667Z"
        stroke="#3F3649"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 28.3333C24.6819 28.3333 27.6666 25.3486 27.6666 21.6667C27.6666 17.9848 24.6819 15 21 15C17.3181 15 14.3333 17.9848 14.3333 21.6667C14.3333 25.3486 17.3181 28.3333 21 28.3333Z"
        stroke="#3F3649"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Camera;
