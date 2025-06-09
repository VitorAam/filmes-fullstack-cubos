import type { SVGProps } from "react";
const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={19}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color ?? "#EAE6FD"}
      strokeOpacity={0.43}
      strokeWidth={2}
      d="m15.5 3.5-6 6 6 6"
    />
  </svg>
);
export default ChevronLeft;