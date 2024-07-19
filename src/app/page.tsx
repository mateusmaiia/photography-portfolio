'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import backgorunImage from '/public/photograpy-bg.png'
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Masonry from "react-masonry-css";
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import type { LightGallery as TypeGallery } from "lightgallery/lightgallery";
import { useRef, useState, useEffect } from "react";

type ImageData = {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string;
    ext: string;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium?: { url: string };
    };
    hash: string;
    height: number;
    mime: string;
    name: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    size: number;
    updatedAt: string;
    url: string;
    width: number;
  };
};

type Category = {
  id: number;
  attributes: {
    categoryImageName: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    Images: {
      data: ImageData[];
    };
  };
};
export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lightBoxRef = useRef<TypeGallery | null>(null);

  useEffect(() => {
    const url = 'https://strapi-photography-t64p.onrender.com/api/category-with-images?populate=*';
    const token = '8301e7f6e59cb824a190bc669376a156162a0cc404e9398ff4d34c892ae4e1c613e7e0031b5e51dce0f19cd59dde3d878cb75309e4f9823a1677088dac8d03d52a0da7fdd6637f1322f0bbe5c4db8d2543d39ba46853eadddcfe9196891e8b887716eeee5a9b949187ac143caece1cd8b7967820876875ebab489e8ff01d70f4';
    // const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json'
      }
    })
    .then(response => { 
      console.log(response.status)
      return response.json()
     } )
    .then(data => {
      setCategories(data.data);
      console.log(data.data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-full h-full bg-top bg-cover overflow-auto">
      <Image 
        src={backgorunImage}
        alt="placeholder"
        className="fixed left-0 top-0 z-0 h-full overflow-auto"
        priority
      />
      <div className="fixed top-0 left-0 z-10 from-stone-900 bg-gradient-to-t overflow-auto"></div>

      <header className=" px-10 fixed w-full z-30 top-0 text-white flex justify-between items-center h-[90px]">
        <div className="hidden">hm</div>
        <div className="uppercase text-lg font-medium">Bruna Brasil</div>
        <Link href="#" className="rounded-3xl bg-white text-stone-700 px-3 py-2 text-md hover:bg-opacity-90">
          Marcar Ensaio
        </Link>
      </header>
      <main className="relative pt-[110px] z-20">
        <div className="flex justify-center items-center w-full h-full">
          <TabGroup className="h-full w-full flex items-center flex-col">
            <TabList className="flex items-center gap-12 justify-center w-full">
              {categories?.map((category) => (
                <Tab key={category.id} className="uppercase text-lg data-[selected]:text-white text-stone-600 p-2">
                  {category.attributes.categoryImageName}
                </Tab>
              ))}
            </TabList>
            <TabPanels className=" bg-opacity-80 h-full w-full max-w-[900px] p-2 sm:p-4 my-6 ">
              {categories?.map((category) => (
                <TabPanel key={category.id}>
                  <Masonry className="flex gap-4" breakpointCols={2}>
                    {category.attributes.Images.data.map((image, idx) => {
                      const imageUrl = `https://strapi-photography-t64p.onrender.com${image.attributes.url}`;
                      return (
                        <Image 
                          src={imageUrl}
                          key={image.id}
                          alt={image.attributes.alternativeText || 'Imagem'}
                          className="my-4 bg:hover:"
                          width={image.attributes.width}
                          height={image.attributes.height}
                          onClick={() => {
                            lightBoxRef.current?.openGallery(idx);
                          }}
                        />
                      );
                    })}
                    <LightGallery
                      onInit={(ref) => {
                        if (ref) {
                          lightBoxRef.current = ref.instance;
                        }
                      }}
                      plugins={[lgThumbnail, lgZoom]}
                      speed={500}
                      dynamic
                      dynamicEl={category.attributes.Images.data.map((image) => ({
                        src: `https://strapi-photography-t64p.onrender.com${image.attributes.url}`,
                        thumb: `https://strapi-photography-t64p.onrender.com${image.attributes.url}`
                      }))}
                    />
                  </Masonry>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div> 
      </main>
      <footer className="relative mt-10 text-white h-[90px] text-lg uppercase font-medium flex items-center justify-center">
        <p>Photography Portfolio</p>
      </footer>
    </div>
  );
}
