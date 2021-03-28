import React from "react";
import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <div className="bg-red-300">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto container pt-8 min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
