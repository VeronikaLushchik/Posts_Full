/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import '../../scss/header.scss';
import { useCallback } from 'react';

type Props = {
  query: string;
  setSearchValue: (query: string) => void;
  select: string;
  setSelectValue: (select: string) => void;
  page: string;
  setSelectPage: (page: string) => void;
  view: string;
  setSelectView: (view: string) => void;
};

export const Header:React.FC<Props> = ({
  query,
  setSearchValue,
  select,
  setSelectValue,
  page,
  setSelectPage,
  setSelectView,
  view,
}) => {

  const handleChange = useCallback((event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(
      event.target.value
    )
  }, []);

  const handleSelect = useCallback((event: SelectChangeEvent<string>) => {
    setSelectValue(
      event.target.value
    )}, []);

  const handleSelectPage = useCallback((event: SelectChangeEvent<string>) => {
    setSelectPage(
      event.target.value
    )}, []);

  const handleChangeToggler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, value:any) => {
    setSelectView(
      value
    )}, []);

  return (
    <>
      <div className="header">
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            value={query}
            onChange={handleChange}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className="header__buttons">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Alphabet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              label="Alphabet"
              onChange={handleSelect}
            >
              <MenuItem value={'ASC'}>ASC</MenuItem>
              <MenuItem value={'DESC'}>DESC</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Posts</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={page}
              label="pagePosts"
              onChange={handleSelectPage}
            >
              <MenuItem value={'6'}>6</MenuItem>
              <MenuItem value={'12'}>12</MenuItem>
              <MenuItem value={'24'}>24</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <ToggleButtonGroup
          orientation="horizontal"
          value={view}
          exclusive
          onChange={handleChangeToggler}
        >
          <ToggleButton value="module" aria-label="module">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        </div>
      </div>
    </>
  );
}
