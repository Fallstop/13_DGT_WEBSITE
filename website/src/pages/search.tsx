import Navbar from "@/components/navbar";
import HtmlHeader from "@/components/html_header";
import React from "react";

export default function Search(){
    const pageName = "Search"

    return(
        <>
            <HtmlHeader currentPage={pageName}/>
            <Navbar currentPage={pageName}/>
        </>
    )
}