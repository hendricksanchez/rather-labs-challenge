import Image from 'next/image';

const Index = () => {
  return (
    <div className="container flex max-w-full sm:p-5 lg:p-16">
      <div className="bg-slate-50 rounded-xl shadow-md overflow-hidden w-full sm:p-2 lg:p-5">
        
        <div className="flex flex-col">

          {/* Logo and Survey Title */}
          <div className="flex flex-row">
            <div className="flex">
              <div>
                <Image src={'/logo.png'} width={45} height={45} alt={"Qwerty Company Logo"} />
              </div>
              <div>
                Qwerty Company
              </div>
            </div>
            <div>
              <p className="text-right">
                Participate at our Quiz and get earn some tokens!
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center justify-center h-80">
            <p className="text-3xl my-4">First, let's to connect to Metamask Wallet</p>
            <button type="button" className="btn btn-blue">Connect to Metamask</button>
          </div>
          
        </div>
        
      </div>

    </div>
  );
};

export default Index;
