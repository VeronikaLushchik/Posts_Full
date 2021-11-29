/* eslint-disable */
import {
  Box,
  ClickAwayListener,
  ListItemButton,
  Paper,
  Portal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import React, { useCallback } from 'react';
import '../../scss/favorite.scss';
import { storage } from '../../utils';

interface Props {
  favorite: number[];
  posts: Post[];
  setFavoriteList: (f: number[]) => void;
}

const FavoriteList:React.FC<Props> = ({ favorite, posts, setFavoriteList }) => {
  const [open, setOpen] = React.useState(false);

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

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClickAway = useCallback(() => {
    setOpen(false);
  }, []);

  const favoritePosts = posts.filter(post => favorite.includes(post._id as number));

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <button type="button" onClick={handleClick} className="button">
            <img className="button__like" src="https://icon-library.com/images/heart-icon-svg/heart-icon-svg-29.jpg" alt="" />
          </button>
          {open ? (
            <Portal>
              <Box className="box">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: '50%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>TITLE</TableCell>
                        <TableCell align="right">DELETE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {favoritePosts.map((row: Post) => (
                        <TableRow
                          key={row.title}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell align="right">
                            <ListItemButton onClick={() => handleFavorite(row._id as number)}>
                              <HighlightOffOutlinedIcon />
                            </ListItemButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Portal>
          ) : null}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default FavoriteList;
