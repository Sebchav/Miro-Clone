"use client";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    }
}

import React from 'react'
import EmptySearch from './empty-search';
import EmptyFavorites from './empty-favorites';
import EmptyBoards from './empty-boards';

const BoardList = ({ orgId, query }:BoardListProps) => {

  const data = []; //TODO: Fetch data
  
  if(!data?.length && query.search) {
    return (
        <EmptySearch />
    )
  }

  if(!data?.length && query.favorites) {
    return (
        <EmptyFavorites />
    )
  }

  if(!data?.length) {
    return (
        <EmptyBoards />
    )
  }

  return (
    <div>
     {JSON.stringify(query)}
    </div>
  )
}

export default BoardList