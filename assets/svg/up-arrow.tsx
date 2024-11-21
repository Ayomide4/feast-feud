import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const UpArrow = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "40"}
      height={height || "40"}
      viewBox="0 0 30 30"
      fill="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 3.75C15.3315 3.75 15.6495 3.8817 15.8839 4.11611L24.6339 12.8661C25.122 13.3542 25.122 14.1458 24.6339 14.6339C24.1457 15.122 23.3542 15.122 22.8661 14.6339L16.25 8.01776V25C16.25 25.6904 15.6904 26.25 15 26.25C14.3096 26.25 13.75 25.6904 13.75 25V8.01776L7.13389 14.6339C6.64572 15.122 5.85427 15.122 5.36611 14.6339C4.87796 14.1458 4.87796 13.3542 5.36611 12.8661L14.1161 4.11611C14.3505 3.8817 14.6685 3.75 15 3.75Z"
        fill="#3F3649"
      />
    </Svg>
  );
};

export default UpArrow;
