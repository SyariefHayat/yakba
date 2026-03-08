type grassProps = {
  className?: string;
};

const Grass = ({ className }: grassProps) => {
  return (
    <svg
      viewBox="0 0 69 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${className}`}
    >
      <path
        d="M11.6937 34.2725L2.83008 27.1146H12.2846L3.42099 13.9918L21.7392 26.5181L15.8301 9.21983L30.6028 24.1321L31.1937 0.272461L38.2846 25.3251L51.8755 11.6058L49.5119 26.5181L67.8301 19.3602L54.8301 34.2725"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Grass;
