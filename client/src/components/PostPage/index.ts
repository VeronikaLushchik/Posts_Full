/* eslint-disable */
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { loadPost } from '../../redux/actions/postActions';
import { addNewComment } from '../../redux/actions/commentsActions';
import PostPage from './PostPage';

const mapStateToProps = ({ postsReducer }: any) => {
  const { post, comments, comment } = postsReducer
  return { post, comments, comment }
}

  export default withRouter(connect(mapStateToProps, { loadPost, addNewComment })(PostPage))