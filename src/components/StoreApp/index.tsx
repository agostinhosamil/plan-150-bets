import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

import logo from "../../assets/images/logo.svg";
import modelImage from "../../assets/images/pexels-alipazani-2836486.jpg";
import siaImage from "../../assets/images/sia.jpg";

import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { RangeSlider } from "../RangeSlider";
import { clothingSizes } from "./clothingSizes";
import { webColors } from "./colors";

type PriceRange = {
  min: number;
  max: number;
};

export const StoreApp = () => {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 100,
  });

  return (
    <div className="w-full h-auto flex flex-row flex-wrap">
      <header className="w-full min-h-20 flex flex-row gap-3 md:gap-5 lg:gap-10 xl:gap-16 items-center px-5 md:px-10 lg:px-20 py-3 border-solid border-b border-zinc-300">
        <div>
          <img
            src={logo}
            alt="Calunga Store logo"
            width={380}
            className="pointer-events-none select-none"
          />
        </div>
        <ul className="w-full inline-flex flex-row gap-8 items-center">
          <li className="inline-flex flex-row items-center">
            <a
              href="#"
              className="font-light [&.selected]:font-extrabold hover:underline font-sans leading-none text-sm"
            >
              Loja
            </a>
          </li>
          <li className="inline-flex flex-row items-center">
            <a
              href="#"
              className="font-light [&.selected]:font-extrabold hover:underline font-sans leading-none text-sm"
            >
              Homens
            </a>
          </li>
          <li className="inline-flex flex-row items-center">
            <a
              href="#"
              className="font-light [&.selected]:font-extrabold hover:underline font-sans leading-none text-sm"
            >
              Mulheres
            </a>
          </li>
          <li className="inline-flex flex-row items-center">
            <a
              href="#"
              className="font-light [&.selected]:font-extrabold hover:underline font-sans leading-none text-sm"
            >
              Crianças
            </a>
          </li>
        </ul>
        <div className="inline-flex items-center justify-end flex-row gap-6">
          <div className="w-[320px] relative">
            <input
              type="text"
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              autoCorrect="off"
              className="w-full bg-zinc-100 hover:bg-zinc-200 focus:bg-white border-solid border border-transparent focus:border-zinc-300 rounded-full pr-5 pl-11 pt-1.5 pb-2 text-zinc-800 font-semibold outline-0 transition-colors"
            />
            <i className="absolute text-sm flex flex-row items-center justify-center top-1/2 left-4 -translate-y-1/2 text-zinc-600">
              <FaSearch />
            </i>
          </div>
          <ol className="inline-flex flex-row items-center gap-6">
            <li className="size-10 inline-flex items-center flex-row">
              <img
                src={siaImage}
                className="size-10 rounded-full object-cover"
              />
            </li>
            <li className="size-10 relative inline-flex items-center flex-row">
              <i className="absolute -top-3 -right-3 bg-red-500 text-white rounded-xl px-2 py-1 text-[8px]">
                123
              </i>
              <button
                type="button"
                className="size-10 rounded-full bg-zinc-200 hover:bg-zin-300 active:scale-95 transition-transform flex flex-row justify-center items-center"
              >
                <IoCartOutline />
              </button>
            </li>
          </ol>
        </div>
      </header>
      <div className="w-full flex flex-row px-5 md:px-10 lg:px-20 py-5 gap-3 md:gap-6 lg:gap-10 xl:gap-12">
        <aside className="w-full max-w-56 relative flex flex-col gap-8">
          <div className="w-full flex flex-col gap-3">
            <strong className="font-bold text-lg">Filtros</strong>
            <ul className="w-full flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="w-full flex flex-row gap-2 items-center">
                  <a
                    href="#"
                    className="w-full flex flex-row gap-2 items-center justify-between hover:underline"
                  >
                    <span className="inline-flex">Categoria número {i}</span>
                    <i>
                      <FaAngleRight />
                    </i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full flex flex-col gap-3">
            <strong className="font-bold text-lg">Intervalo de preços</strong>
            <div className="w-full flex flex-col gap-3 pt-8 pb-5">
              <RangeSlider onChange={(e) => setPriceRange(e)} />
            </div>
            <div className="w-full flex flex-row items-center gap-5">
              <span className="w-full flex-grow p-2 rounded-3xl bg-zinc-50 border-solid text-center border-zinc-300 border text-xs">
                US$ {priceRange.min}
              </span>
              <span className="w-full flex-grow p-2 rounded-3xl bg-zinc-50 border-solid text-center border-zinc-300 border text-xs">
                US$ {priceRange.max}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <strong className="font-bold text-lg">Cores</strong>
            <ul className="w-full -ml-2 flex flex-row gap-y-4 flex-wrap">
              {webColors.map((color, colorIndex) => (
                <li
                  key={colorIndex}
                  className="w-1/4 px-2 flex flex-col gap-1 text-center justify-center items-center flex-grow"
                >
                  <i
                    className="block w-full h-9 rounded-md shadow-md"
                    style={{ backgroundColor: color.code }}
                  />
                  <span className="text-[9px] text-zinc-700">{color.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full flex flex-col gap-3">
            <strong className="font-bold text-lg">Tamanhos</strong>
            <ul className="w-full flex flex-row gap-4 flex-wrap">
              {clothingSizes.map((size, sizeIndex) => (
                <li
                  className="inline-flex py-1 px-2 justify-center font-semibold select-none rounded-md text-center w-1/4 flex-grow text-[9px] text-zinc-800 cursor-pointer bg-zinc-100 hover:bg-zinc-200 border border-solid border-zinc-200 hover:border-zinc-300"
                  key={sizeIndex}
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full flex flex-col gap-3">
            <strong className="font-bold text-lg">Estilos de roupa</strong>
            <ul className="w-full flex flex-col gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <li key={i} className="w-full flex flex-row gap-2 items-center">
                  <a
                    href="#"
                    className="w-full flex flex-row gap-2 items-center justify-between hover:underline"
                  >
                    <span className="inline-flex">
                      Estilo de roupa número {i}
                    </span>
                    <i>
                      <FaAngleRight />
                    </i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-row justify-between items-center pb-1.5">
            <strong className="font-bold text-lg">Roupas para mulheres</strong>
            <ol className="inline-flex items-center flex-row gap-4">
              <li>
                <a href="#">Novos</a>
              </li>
              <li>
                <a href="#">Recomendados</a>
              </li>
            </ol>
          </div>
          <div className="w-full flex flex-wrap flex-row gap-5">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="w-1/5 flex flex-col gap-4 flex-grow relative"
              >
                <img
                  src={modelImage}
                  className="w-full select-none rounded-lg pointer-events-none border-0 outline-none shadow-md"
                  alt="Item title should be here"
                />
                <button
                  type="button"
                  className="size-8 text-sm rounded-full bg-white shadow-md text-zinc-900 flex flex-row justify-center items-center absolute left-3 top-3 hover:scale-105 active:scale-90 transition-all"
                >
                  <IoHeartOutline />
                </button>
                <div className="w-full py-2 flex flex-row justify-between items-center">
                  <h4 className="w-full text-xs font-black text-zinc-900 whitespace-nowrap overflow-hidden text-ellipsis">
                    Produto número {i}
                    <i className="block text-zinc-400 font-semibold text-[9px]">
                      Nome da categoria
                    </i>
                  </h4>
                  <h5 className="text-xs bg-zinc-100 px-2 py-2 rounded-md text-right font-semibold text-zinc-900 whitespace-nowrap">
                    AKZ {i * 1000}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
