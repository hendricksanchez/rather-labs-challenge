const Button = ({ type, title, onClick, disable = false }) => {
  return (
    <button
      type={type}
      className="btn btn-blue"
      onClick={() => onClick()}
      disabled={disable}
    >
      {title}
    </button>
  );
}
 
export default Button;