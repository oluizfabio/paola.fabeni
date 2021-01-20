import React, { useEffect } from 'react'

function Ads(props) {
  const { dataAdClient, dataAdSlot } = props
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={dataAdClient}
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-ad-test="on"
    />
  )
}

export default Ads
