import type { SVGProps } from "react";
const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="none"
        {...props}
    >
        <path stroke={props.color ?? "#fff"} strokeWidth={2} d="m9.5 6 6 6-6 6" />
    </svg>
);
export default ChevronRight;