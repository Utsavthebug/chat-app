import React, { useState } from 'react'
import SidebarHeader from './header/SidebarHeader'
import { Notifications } from './notifications'
import { Search, SearchResults } from './search'
import {Conversations} from './conversations'

const Sidebar = ({
  typing
}) => {
  const [searchResults,setSearchResults] = useState([])
  return (
    <div className='flex0030 max-w-[30%] h-full select-none'>
      {/* sidebar header */}
    <SidebarHeader/>

    <Notifications/>
    {/* Notifications */}


    {/* Search bar */}
    <Search searchLength={searchResults.length} setSearchResults={setSearchResults}/>

    {
      searchResults.length > 0 ? <SearchResults 
      setSearchResults={setSearchResults}
      searchResults={searchResults}
      /> : <Conversations/>
    }

    </div>
  )
}

export default Sidebar