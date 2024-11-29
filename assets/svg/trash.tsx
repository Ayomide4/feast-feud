import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const Trash = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "40"}
      height={height || "40"}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Path
        d="M5 9.99992H8.33333M8.33333 9.99992H35M8.33333 9.99992V33.3333C8.33333 34.2173 8.68452 35.0652 9.30964 35.6903C9.93477 36.3154 10.7826 36.6666 11.6667 36.6666H28.3333C29.2174 36.6666 30.0652 36.3154 30.6904 35.6903C31.3155 35.0652 31.6667 34.2173 31.6667 33.3333V9.99992M13.3333 9.99992V6.66659C13.3333 5.78253 13.6845 4.93468 14.3096 4.30956C14.9348 3.68444 15.7826 3.33325 16.6667 3.33325H23.3333C24.2174 3.33325 25.0652 3.68444 25.6904 4.30956C26.3155 4.93468 26.6667 5.78253 26.6667 6.66659V9.99992M16.6667 18.3333V28.3333M23.3333 18.3333V28.3333"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Trash;