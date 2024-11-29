import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const Eye = ({ width, height }: Props) => {
  return (
    <Svg width="27" height="25" viewBox="0 0 27 25" fill="none">
      <Path
        d="M2.04175 12.5C2.04175 12.5 6.20842 4.16666 13.5001 4.16666C20.7917 4.16666 24.9584 12.5 24.9584 12.5C24.9584 12.5 20.7917 20.8333 13.5001 20.8333C6.20842 20.8333 2.04175 12.5 2.04175 12.5Z"
        stroke="#1E1E1E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5001 15.625C15.226 15.625 16.6251 14.2259 16.6251 12.5C16.6251 10.7741 15.226 9.375 13.5001 9.375C11.7742 9.375 10.3751 10.7741 10.3751 12.5C10.3751 14.2259 11.7742 15.625 13.5001 15.625Z"
        stroke="#1E1E1E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Eye;
