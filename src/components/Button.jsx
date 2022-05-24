const Button = ({ type, title, onClick }) => {
  return (
    <button
      type={type}
      className="btn btn-blue"
      onClick={() => onClick()}
    >
      {title}
    </button>
  );
}
 
export default Button;