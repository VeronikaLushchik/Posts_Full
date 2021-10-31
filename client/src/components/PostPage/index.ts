/* eslint-disable */
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { loadPost } from '../../redux/actions/postActions';
// import { loadComments } from '../../redux/actions/commentsActions';
import { addNewComment } from '../../redux/actions/commentsActions';
import PostPage from './PostPage';

const mapStateToProps = (state:any) => ({post: state.post, comments: state.comments, comment: state.comment})
  
  
  export default withRouter(connect(mapStateToProps, { loadPost, addNewComment })(PostPage))