import React from 'react'

export default function TabContent({tab,firstTab,secondTab}) {
  if(tab === 'tab1'){
    return(
        // <firstTab/>
        {firstTab}
    )
  }
  else if(tab === 'tab2'){
    return(
        <secondTab/>
    )
  }
}
