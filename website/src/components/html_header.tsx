import Head from "next/head";

export default function HtmlHeader(props: any) {

    // Constants
    const currentPage = props.currentPage;
    const iconpath = "/media/images/logo.svg";

    return(
        <>
                <Head>
                    <title>{currentPage}</title>
                    <link rel="icon" href={iconpath}/>
                </Head>
        </>
    )
}