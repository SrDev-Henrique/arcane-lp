import React from 'react'

const Personagens = () => {
  return (
    <section>
      <div className="text-white h-screen hidden md:flex gap-[1.7%] justify-center filter brightness-100 bg-piltover-character">
        <div className="min-w-[18%] bg-purple-50">PERSONAGENS</div>
        <div className="min-w-[18%] bg-purple-50">PERSONAGENS</div>
        <div className="min-w-[18%] bg-purple-50">PERSONAGENS</div>
        <div className="min-w-[18%] bg-purple-50">PERSONAGENS</div>
        <div className="min-w-[18%] bg-purple-50">PERSONAGENS</div>
      </div>
      <div className="text-white h-screen flex md:hidden gap-[1.7%] justify-center filter brightness-100 bg-piltover-character">
        <div className="min-w-[30%] bg-purple-500">PERSONAGENS</div>
        <div className="min-w-[30%] bg-purple-500">PERSONAGENS</div>
        <div className="min-w-[30%] bg-purple-500">PERSONAGENS</div>
      </div>
    </section>
  );
}

export default Personagens
