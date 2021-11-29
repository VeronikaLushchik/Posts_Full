/* eslint-disable */
import { connect } from 'react-redux';
import { PostsList } from './PostsList';
import {
  loadPosts, setSearchValue, setSelectValue, setSelectPage, setSelectView, setFavoriteList,
} from '../../redux/actions/postActions';

const mapStateToProps = ({ postsReducer }: any) =>  {
  const {count, query, select, page, view, favorite, isFetching, post, posts  } = postsReducer;
  return { count, query, select, page, view, favorite, isFetching, post, posts }
}

export default connect(mapStateToProps, {
  loadPosts, setSearchValue, setSelectValue, setSelectPage, setSelectView, setFavoriteList,
})(PostsList);
