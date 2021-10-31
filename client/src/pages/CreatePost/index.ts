import { connect } from 'react-redux';
import { CreatePost } from './CreatePost';
import { addNewPost } from '../../redux/actions/postActions';

export default connect(null, { addNewPost })(CreatePost);
