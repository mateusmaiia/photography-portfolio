import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" px-4 h-full bg-[url('/photograpy-bg.png')] bg-top bg-cover">
      <header className="text-white flex justify-between items-center h-[90px]">
        <div className="text-transparent">
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
      <main className=" text-white w-full ">
        <div  className="flex justify-center ">
          <TabGroup>
            <TabList className="flex itemn gap-4">
              <Tab>All</Tab>
              <Tab>Oceans</Tab>
              <Tab>Forests</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Content 1</TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
        </div> 
      </main>
      <footer className="h-[60px]">
        palceholder footer
      </footer>
    </div>
 );
}
