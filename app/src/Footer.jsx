import React, { useEffect, useState, useSyncExternalStore } from "react";
// import "./footer.css";
// import CommonButton from "../common button/CommonButton";
// import { BiMoon, BiSun } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import { themeData } from "../../Slices/ThemeSlice";
import { Dropdown } from "react-bootstrap";
// import { footerLists } from "./footerData";
import { Link } from "react-router-dom";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import logo from "../src/image/logo.png"

const Footer = () => {
  const [signInShow, setSignInShow] = useState(false);
  useEffect(() => {
    let scrollWidt = (e) => {
      window.innerWidth <= 992 ? setSignInShow(false) : setSignInShow(true);
    };
    scrollWidt();
    window.addEventListener("resize", scrollWidt);
  }, []);
  // // theme Change Toggle
  // let themeChanging = useSelector((state) => state.theme);
  // let [theme, setTheme] = useState(false);
  // let disp = useDispatch();
  // let themeChange = () => {
  //   setTheme((prev) => !prev);
  //   localStorage.setItem("theme", !theme);
  //   disp(themeData());
  // };
  let footerLists = [
    {
      title: "Mindchain",
      links: [
        { title: "Terms", url: "http://example.com/link1" },
        { title: "Privacy", url: "http://example.com/link2" },
      ],
    },
    {
      title: "Community",
      links: [{ title: "Documents", url: "http://example.com/link1" }],
    },
    {
      title: "Products",
      links: [{ title: "Validator", url: "http://example.com/link1" }],
    },
  ];
  return (
    <div className="relative px-[10px] ">
      <div className=" footer after:absolute  after:top-0 after:w-[100%]  after:h-[100%] after:bg-transparentLayer">
        <div className="container text-white relative z-10 py-4  mx-auto flex flex-col md:flex-row gap-y-5 gap-x-3">
          <div className="md:flex  w-[100%]">
            <div className="w-full h-full md:w-[30%] xs:mb-{[]} sm:mb-5 md:mb-0">
              <img
                src={logo}
                className={
                  !signInShow
                    ? "w-[150px] h-auto mb-1"
                    : "w-[190px] h-auto mb-1"
                }
              />
              <div className="mb-4">
                <small className="font-normal ">
                  Mindchain Scan is a Block Explorer and Analytics <br />{" "}
                  Platform for Core Mindchain
                </small>
              </div>
              <div className="flex gap-x-2">
                {/* <CommonButton
                  // onClick={() => console.log("1")}
                  title={"add mindchain network"}
                /> */}
                {/* <CommonButton
                  className={"!text-[24px]"}
                  onClick={themeChange}
                  title={
                    themeChanging.themeState === "true" ? <BiMoon /> : <BiSun />
                  }
                /> */}
              </div>
            </div>
            {footerLists.map((list, index) => (
              <div
                key={index}
                className="w-full h-full md:w-[23.99999%] flex justify-end"
              >
                <div className="w-full md:w-[80%]">
                  <h6 className="font-normal">{list.title}</h6>
                  <hr />
                  <ul className="p-0 flex flex-col  gap-y-1">
                    {list.links.map((link, i) => (
                      <li key={i}>
                        <a
                          className="text-ashText !text-[14px] hover:text-white"
                          to={link.url}
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container relative z-10 text-white pb-3 ">
          <hr className="mt-0 mb-3 relative z-10 bg-white" />
          <h6 className="font-normal flex items-center gap-x-2 text-center justify-center ">
            Mindchain <AiOutlineCopyrightCircle className="w-[20px] h-auto"/> 2023
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;