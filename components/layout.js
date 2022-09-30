import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import GetImage from "@utils/getImage";
import Header from "@components/header";
import Footer from "@components/footer";
import MobileMenu from "./mobileMenu";
import styled from "styled-components";
// import PopupWidget from "../components/popupWidget";

const Main = styled.main`
  max-width: 1080px;
  margin: auto;
  padding: 48px 12px;
  margin-top: 72px;
`;

export default function Layout(props) {
  const { children, siteConfig, menu } = props;
  const ogimage = GetImage(props?.openGraphImage)?.src ?? "";

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.sanity.io/" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io//" />
      </Head>
      <NextSeo
        title={`${siteConfig?.title}`}
        description={siteConfig?.description || ""}
        canonical={siteConfig?.url}
        openGraph={{
          url: siteConfig?.url,
          title: `${siteConfig?.title}`,
          description: siteConfig?.description || "",
          images: [
            {
              url: ogimage,
              width: 800,
              height: 600,
              alt: ""
            }
          ],
          site_name: "Putty"
        }}
        twitter={{
          cardType: "summary_large_image"
        }}
      />

      <Header {...props} />
      <Main>{children}</Main>
      <MobileMenu menu={menu} />
      <Footer {...props} />
    </>
  );
}
