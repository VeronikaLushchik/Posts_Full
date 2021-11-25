/* eslint-disable */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Pagination from '@mui/material/Pagination';
import { Box, CircularProgress, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Header } from '../Header/Header';
import CreatePost from '../../pages/CreatePost';
import FavoriteList from '../FavoriteList/FavoriteList';
import '../../scss/postsList.scss';
import { storage } from '../../utils'
import { useCallback } from 'react';

type Props = {
  posts: Post[],
  loadPosts: (page:string, limit:string, order:string, query:string) => void;
  query: string;
  setSearchValue: (query: string) => void;
  select: string;
  setSelectValue: (select: string) => void;
  page: string;
  setSelectPage: (page: string) => void;
  view: string;
  setSelectView: (view: string) => void;
  favorite: number[];
  setFavoriteList: (favorite: number[]) => void;
  isFetching: boolean;
  count: number;
};

export const PostsList: React.FC<Props> = ({
  favorite,
  setFavoriteList,
  page,
  setSelectPage,
  setSelectValue,
  select,
  setSearchValue,
  query,
  posts,
  loadPosts,
  view,
  setSelectView,
  isFetching,
  count,
}) => {
  const [currentPage, setCurrentPage] = useState('1');
  const [maxWidth, setMaxWidth] = useState('370px')
  const user = storage.get('profile');

  const handleFavorite = useCallback((id: number) => {
    let newFavList = [...favorite];

    if (newFavList.includes(id)) {
      newFavList = newFavList.filter(current => current !== id);
    } else {
      newFavList.push(id);
    }
    storage.set('favorite', newFavList);

    setFavoriteList(newFavList);
  }, [favorite]);

  const handleChange = useCallback((event:any,val:any) => setCurrentPage(val), [])

  useEffect(() => {
    loadPosts(currentPage, page, select, query);
  }, [currentPage, page, select, query]);

  useEffect(() => {
    loadPosts(currentPage, page, select, query);
  }, []);

  useEffect(() => {
    let favoriteItems = storage.get('favorite')
    if (favoriteItems?.length) {
      setFavoriteList(favoriteItems);
    };
  }, []);

  useEffect(() => {
    if (view === 'list') {
      setMaxWidth('540px');
    } else {
      setMaxWidth('370px');
    }
    
  }, [posts, currentPage, page, view])

  const isFavoriteItem = (id?: number) => favorite.some(i => i === id);

  return (
    <>
    <FavoriteList favorite={favorite} posts={posts} setFavoriteList={setFavoriteList} />
    <Box className="header">
    <Header setSearchValue={setSearchValue} query={query} select={select} setSelectValue={setSelectValue} setSelectPage={setSelectPage} page={page} setSelectView={setSelectView} view={view} />
    </Box>
    {user && <CreatePost />}
    {isFetching ? <CircularProgress /> :
    <>
    <div style={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {posts.map((post:Post) => 
        <Card key={post._id} sx={{ width: maxWidth, margin: '10px' }} className="cards">
          <CardContent className="cardcontent">
            { isFavoriteItem(post._id) && <FavoriteOutlinedIcon onClick={() => handleFavorite(post._id as number)} className="like"/> }
            { !isFavoriteItem(post._id) && <FavoriteBorderOutlinedIcon onClick={() => handleFavorite(post._id as number)} className="like"/> }
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions >
            <Link to={`/posts/${post._id}`} className="link">
            Read more
            </Link>
          </CardActions>
        </Card>
    )}
      </div>
    <Stack spacing={2} m="auto" className="pagination">
       <Pagination size="large" count={count} page={currentPage} onChange={handleChange} />
    </Stack>
    </>
    }
    </>
  );
};
