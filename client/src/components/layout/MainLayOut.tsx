

import Header from '../header/Header';

const MainLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-6  ">
        {children}
      </main>
    </div>  
  )
}

export default MainLayOut
