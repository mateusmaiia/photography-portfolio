import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { MasonryLayout } from "./components/masonry";
import foto1 from '/public/foto1.png'
import foto2 from '/public/foto2.png'
import foto3 from '/public/foto3.png'
import foto4 from '/public/foto4.png'
import foto5 from '/public/foto5.png'
export default function Home() {

  const  tabs = [
    {
      id: '1',
      title: "All",
    },
    {
      id: '2',
      title: "Ocean",
    },
    {
      id: '3',
      title: "Forest",
    },
  ]

  const images = [ 
    foto1,
    foto2,
    foto3,
    foto4,
    foto5,
  ]
  return (
    <div className=" w-full h-full bg-[url('/photograpy-bg.png')]  bg-top bg-cover overflow-auto">
      <header className=" px-10 fixed w-full z-10 top-0 text-white flex justify-between items-center h-[90px]">
        <div className="hidden">
          hm
        </div>
        <div className="uppercase text-lg font-medium">         
          Bruna Brasil
        </div>
        <Link href="#" className="rounded-3xl bg-white text-stone-700 px-3 py-2 text-md  hover:bg-opacity-90">
          {/* <button className="rounded-3xl bg-white text-stone-700 px-3 py-2 text-md  hover:bg-opacity-90"> */}
            Get in touch
          {/* </button> */}
        </Link>
      </header>
      <main className="pt-[110px]">
        <div  className="flex justify-center items-center w-full h-full">
          <TabGroup  className="h-full w-full flex items-center flex-col">
            <TabList className="flex items-center gap-12 justify-center  w-full">
              {tabs.map((tab) => (
                <Tab key={tab.id} className="uppercase text-lg data-[selected]:text-white text-stone-600 p-2">
                  {tab.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels className=" bg-opacity-80 h-full w-full max-w-[900px] p-2 sm:p-4 my-6 ">
              <TabPanel >
                <MasonryLayout>
                  {images.map((image) => (
                    <Image 
                      src={image}
                      key={image.src}
                      alt="palceholder"
                      className="my-4"
                    />
                  ))}
                  {/* <Image src={foto1} alt="image" className="my-4"/>
                  <Image src={foto2} alt="image" className="my-4"/>
                  <Image src={foto3} alt="image" className="my-4"/>
                  <Image src={foto4} alt="image" className="my-4"/>
                  <Image src={foto5} alt="image" className="my-4"/> */}
                  {/* <img src="/photograpy-bg-copy-2.png"  alt="image" className="my-4"/> */}
                </MasonryLayout>
              </TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
        </div> 
      </main>
      <footer className="mt-10 text-white h-[90px] text-lg uppercase font-medium flex items-center justify-center">
        <p>
          Photography Portfolio
        </p>
      </footer>
    </div>
 );
}
