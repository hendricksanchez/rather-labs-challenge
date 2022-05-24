import Header from './Header';
import Content from './Content';

const MainContainer = () => {
  return (
    <div className="container flex flex-wrap max-w-full h-screen sm:p-5 lg:p-16">
      <div className="bg-slate-50 rounded-xl shadow-md overflow-hidden w-full sm:p-2 lg:p-5">
        <div className="flex flex-col">
          <Header />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;