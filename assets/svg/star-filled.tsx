import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const StarFilled = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "40"}
      height={height || "40"}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Path
        d="M9.70837 36.6667L12.4167 24.9583L3.33337 17.0833L15.3334 16.0417L20 5L24.6667 16.0417L36.6667 17.0833L27.5834 24.9583L30.2917 36.6667L20 30.4583L9.70837 36.6667Z"
        fill="#B292D8"
      />
    </Svg>
  );
};

export default StarFilled;
