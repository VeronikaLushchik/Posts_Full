/* eslint-disable */
import { connect } from 'react-redux';
import { PostsList } from './PostsList';
import {
  loadPosts, setSearchValue, setSelectValue, setSelectPage, setSelectView, setFavoriteList,
} from '../../redux/actions/postActions';

const mapStateToProps = ({ query, select, page, view, favorite, isFetching, post, posts }: RootState) =>
  ({ query, select, page, view, favorite, isFetching, post, posts, })

export default connect(mapStateToProps, {
  loadPosts, setSearchValue, setSelectValue, setSelectPage, setSelectView, setFavoriteList,
})(PostsList);
