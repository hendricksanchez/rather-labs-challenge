import { alerts } from "../utils/const";

const Alert = ({ type, title, subtitle, children }) => {
  
  let cssClass;
  if (type == alerts.WARNING)
    cssClass = "bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 my-5 rounded relative text-xl";

  return (
    <div className={cssClass} role="alert">
      {title && (<strong className="font-bold">{title}</strong>)}
      {subtitle && (<span className="block sm:inline">{subtitle}</span>)}
      {children && (<span className="block sm:inline">{children}</span>)}
    </div>
  );
}
 
export default Alert;