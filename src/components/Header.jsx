import Company from "./Company";
import BalanceAccount from "./BalanceAccount";

const Header = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <Company />
        <BalanceAccount />
      </div>
    </div>
  );
}
 
export default Header;