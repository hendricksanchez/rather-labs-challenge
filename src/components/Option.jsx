import { useEffect } from "react";

const Option = ({ title, id, name, value, handlerOnChange, questionNumber, htmlFor }) => {
  useEffect(() => {
    console.log("handlerOnChange", handlerOnChange);
  }, [])
  return (
    <li className="flex flex-row items-center py-2">
      <input
        className="w-4 h-4 border-gray-300 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={(e) => handlerOnChange(questionNumber, e.target.value)}
      />
      <label
        htmlFor={htmlFor}
        className="block ml-2 text-xl text-gray-900 dark:text-gray-500"
      >
        {title}
      </label>
    </li>
  );
}
 
export default Option;
