import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Link from "next/link";

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
  return (
    <div className="flex flex-col w-full px-4 h-full bg-[url('/photograpy-bg.png')]  bg-top bg-cover">
      <header className="text-white flex justify-between items-center h-[90px]">
        <div className="hidden">
          hm
        </div>
        <div>         
          Bruna Logo
        </div>
        <Link href="#" className="rounded-3xl bg-white text-stone-700 px-3 py-2 text-md  hover:bg-opacity-90">
          {/* <button className="rounded-3xl bg-white text-stone-700 px-3 py-2 text-md  hover:bg-opacity-90"> */}
            Get in touch
          {/* </button> */}
        </Link>
      </header>
      <main className="grow text-white">
        <div  className="flex justify-center items-center w-full h-full">
          <TabGroup  className="h-full w-full flex items-center flex-col">
            <TabList className="flex items-center gap-12 justify-center  w-full">
              {tabs.map((tab) => (
                <Tab key={tab.id} className="data-[selected]:text-white text-stone-600 p-2">
                  {tab.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="bg-blue-200 h-full w-full max-w-[900px] p-2 sm:p-4 my-6 ">
              <TabPanel >Content 1</TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
        </div> 
      </main>
      <footer className="mt-10 text-white h-[60px] flex items-center justify-center">
        <p>
          Photography Portfolio
        </p>
      </footer>
    </div>
 );
}
