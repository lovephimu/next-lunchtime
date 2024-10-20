import { AriaAttributes, SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & AriaAttributes;

const Logo = ({ className, ...htmlProps }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 37 37"
      version="1.1"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2,
      }}
      {...htmlProps}
    >
      <g transform="matrix(1,0,0,1,-0.5,0.5)">
        <path
          d="M32.5,9L32.5,27C32.5,29.208 30.708,31 28.5,31L9.5,31C7.292,31 5.5,29.208 5.5,27L5.5,9C5.5,6.792 7.292,5 9.5,5L28.5,5C30.708,5 32.5,6.792 32.5,9Z"
          style={{ fill: 'rgb(164,204,144)' }}
        />
      </g>
      <g transform="matrix(0.707107,0.707107,-0.707107,0.707107,5.41852,-13.0815)">
        <path
          d="M44.663,4L44.663,22.163C44.663,24.371 42.871,26.163 40.663,26.163L22.5,26.163C20.292,26.163 18.5,24.371 18.5,22.163L18.5,4C18.5,1.792 20.292,0 22.5,0L40.663,0C42.871,0 44.663,1.792 44.663,4Z"
          style={{ fill: 'rgb(115,192,194)' }}
        />
      </g>
      <g transform="matrix(1.04208,1.04208,-1.04208,1.04208,14.4497,-21.4565)">
        <rect
          x="15.117"
          y="11.23"
          width="11.995"
          height="11.995"
          style={{ fill: 'white' }}
        />
      </g>
    </svg>
  );
};

export default Logo;
