import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import config from "../config"

const AdsSidebar: React.FC<{ dataAdSlot: string }> = ({ dataAdSlot }) => {
  if (config.IS_DEVELOPMENT) {
    return <></>
  }

  useEffect(() => {
    try {
      if (typeof window === "object") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch {
      //
    }
  }, [])

  return (
    <>
      <Helmet>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8835129466793937"
          crossOrigin="anonymous"
        />
      </Helmet>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8835129466793937"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  )
}

export default AdsSidebar
