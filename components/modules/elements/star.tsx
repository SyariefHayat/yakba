type starProps = {
  className?: string;
};

const Star = ({ className }: starProps) => {
  return (
    <svg
      width="44"
      height="42"
      viewBox="0 0 44 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute ${className}`}
    >
      <path
        d="M21.9292 0C23.8553 1.51601 24.8266 8.53464 26.5584 11.195C30.4393 17.1566 37.5549 18.9789 44 20.5896C29.0342 25.2239 27.1087 26.3583 22.3066 41.1593C20.8935 39.1299 20.4433 34.953 18.3629 31.5671C13.5948 23.8072 8.28812 22.851 0 20.6288C15.1249 16.8006 17.5044 14.6578 21.9292 0Z"
        fill="#E85206"
      />
    </svg>
  );
};

export default Star;
