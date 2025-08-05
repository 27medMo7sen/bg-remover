export const Button = ({ children, disabled, className, type, ...props }) => {
  return (
    <button
      className={` cursor-pointer ${className}`}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
