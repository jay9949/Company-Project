"use client"

import client from "@/client/sanity.client";
import { urlFor } from "@/imageBuilder/urlFor";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";

interface Iheader {
  _id: string;
  title: string;
  logo: string;
  nav_links: any;
  button: string;
  label: any;
  slug: string;
}

async function getData() {
  const query = `*[_type == 'header']{
    _id,
    logo,
    nav_links,
    button,
}`;
  const data = await client.fetch(query);
  return data as Iheader[];
}

const Header = async () => {
    const [showMen, setShowMenu] = useState(false);
    const handleMenu = () => {
      setShowMenu(!showMen);
    };
  // console.log(showMen)

  const data = (await getData()) as Iheader[];
  // console.log(data);

  return (
    <div className="bg-gradient">
      {data?.map((list) => {
          // console.log(list)
        return (
          <div
            key={list?._id}
            className="max-w-[90rem] m-auto  mb:pt-[3.06rem]  px-[1rem] flex items-center justify-between relative "
          >
            <div className="flex items-center gap-[0.56rem]">
            <Link href={"/"}>  <img
                src={urlFor(list?.logo).url()}
                alt=""
                width={180}
                height={180}
              />
              </Link>
              {/* <h3 className="text-[2.125rem] font-[500] leading-[2.65625rem] text-center text-blue max-w-[11.0625rem] font-dmSans">{data.logo.logo_text}</h3> */}
            </div>
            <nav className="md:flex items-center hidden">
              {list.nav_links.map((item: any) => {
                return (
                  <li
                    key={item?._id}
                    className="text-[1.125em] font-[300] list-none text-center text-blue w-[6.7rem] font-dmSans">
                    <Link href={item?.slug.current}>{item.label}</Link>
                  </li>
                );
              })}
              <Link  
                  href={list?.button?.slug.current}
              className="flex items-center justify-center px-[3.21rem] py-[1.25rem] rounded-[3.5rem] bg-buttoncolor text-[1.125rem] text-center font-[700] leading-[1.25rem] text-whitecolor font-dmSans ">
                {list?.button?.label}
              </Link>
            </nav>
            <HiOutlineMenu className="text-[2.375rem] md:hidden block text-buttoncolor" onClick={handleMenu} />


                            {/* { <div className=" bg-buttoncolor my-[1.5rem] w-[97%] rounded-[0.9375rem] md:hidden block  fixed top-[-4%] mb:top-[4%] z-[1] py-[1rem] px-[1rem] left-[51%] translate-x-[-50%] ">
                                <div className="flex items-end justify-end">
                                    <IoClose className="text-[2.375rem] m:hidden block text-whitecolor absolute top-[-3%] mb:top-[4%] " onClick={handleMenu} />
                                </div>
                                <nav className="flex flex-col gap-[1rem]">
                                    {
                                        list?.nav_links.map((item: any,inedx:number) => {

                                            return (
                                                <li key={inedx} className="text-[1.375rem] list-none font-[400] text-whitecolor w-[7.6875rem] font-dmSans">
                                                    <Link href={item.slug.current}>{list.label}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                    <button className="flex items-center w-fit justify-center px-[3.21rem] py-[1.25rem] rounded-[3.5rem] bg-blue text-[1.125rem] text-center font-[700] leading-[1.25rem] text-whitecolor font-dmSans ">
                                        {list.button}
                                    </button>
                                </nav>
                            </div>} */}
          </div>
        );
      })}
    </div>
  );
};

export default Header;
