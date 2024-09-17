const LoadingSpinner = ({ size = "md" }) => {
    const sizeClass = `loading-${size}`;

    <span className={`loading loading-ring ${sizeClass}`}></span>
};
export default LoadingSpinner;