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

type Props = {
  posts: Post[],
  loadPosts: () => void;
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
};

function sortPosts(posts: Post[], select:string) {
  return posts.sort((a: any, b: any) => {
    switch (select) {
      case 'ASC':
        return a.title.localeCompare(b.title);
      case 'DESC':
        return b.title.localeCompare(a.title);
      default:
        return posts;
    }
  });
}

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
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedList, setDisplayedList] = useState<Post[]>([]);
  const [maxWidth, setMaxWidth] = useState('370px')

  const indexOfLastPost = currentPage * +page;
  const indexOfFirstPost = indexOfLastPost - +page;
  const count = Math.ceil(displayedList.length / +page);

  const user = JSON.parse(localStorage.getItem('profile') as string);

  const handleFavorite = (id: number) => {
    let newFavList = [...favorite];

    if (newFavList.includes(id)) {
      newFavList = newFavList.filter(current => current !== id);
    } else {
      newFavList.push(id);
    }
    storage.set('key', newFavList);

    setFavoriteList(newFavList);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    let favoriteItems = storage.get('key')
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
    
    setDisplayedList(posts.slice(indexOfFirstPost, indexOfLastPost))
  }, [posts, currentPage, page, view])

  
  useEffect(() => {
    if(query.trim()){
      setDisplayedList(sortPosts(posts.slice(indexOfFirstPost, indexOfLastPost).filter(post => post.title.includes(query)), select))
    }else {
      setDisplayedList(sortPosts(posts.slice(indexOfFirstPost, indexOfLastPost), select))
    }
  }, [query, select]);

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
    {displayedList.map((post:Post) => 
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
      {!query ? <Pagination size="large" count={Math.ceil(posts.length / +page)} page={currentPage} onChange={(event,val)=> setCurrentPage(val)} />
      : <Pagination size="large" count={count} page={currentPage} onChange={(event,val)=> setCurrentPage(val)} />}
    </Stack>
    </>
    }
    </>
  );
};
