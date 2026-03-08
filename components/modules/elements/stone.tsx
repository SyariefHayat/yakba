type stoneProps = {
  className?: string;
};

const Stone = ({ className }: stoneProps) => {
  return (
    <svg
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${className}`}
    >
      <ellipse cx="20" cy="15" rx="20" ry="15" fill="#F2C303" />
    </svg>
  );
};

export default Stone;
