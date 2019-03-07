import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import Delete from "@material-ui/icons/Delete";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "next/link";
import moment from "moment";

class Comments extends React.Component {
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = event => {
    const { text } = this.state;
    const { postId, handleAddComment } = this.props;

    event.preventDefault();
    handleAddComment(postId, text);
    this.setState({ text: "" });
  };

  showComment = comment => {
    const { postId, auth, classes, handleDeleteComment } = this.props;
    const isCommentCreator = comment.postedBy._id === auth.user._id;

    return (
      <div>
        <Link href={`/profile/${comment.postedBy._id}`}>
          <a>{comment.postedBy.name}</a>
        </Link>
        <br />
        {comment.text}
        <span className={classes.commentDate}>
          {moment(comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          {isCommentCreator && (
            <Delete
              color="secondary"
              className={classes.commentDelete}
              onClick={() => handleDeleteComment(postId, comment)}
            />
          )}
        </span>
      </div>
    );
  };

  render() {
    const { auth, comments, classes } = this.props;
    const { text } = this.state;

    return (
      <div className={classes.comments}>
        {/* comments input */}
        <CardHeader
          avatar={
            <Avatar className={classes.smallAvatar} src={auth.user.avatar} />
          }
          title={
            <form onSubmit={this.handleSubmit}>
              <FormControl margin="normal" fullWidth required>
                <InputLabel htmlFor="add-comment">نوشتن نطر</InputLabel>
                <Input
                  id="add-comment"
                  name="text"
                  placeholder="نوشتن نطر در مورد این پست"
                  value={text}
                  onChange={this.handleChange}
                />
              </FormControl>
            </form>
          }
          className={classes.cardHeader}
        />

        {/* comments */}
        {comments.map(comment => (
          <CardHeader
            key={comment._id}
            avatar={
              <Avatar
                className={classes.smallAvatar}
                src={comment.postedBy.avatar}
              />
            }
            title={this.showComment(comment)}
            className={classes.cardHeader}
          />
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  comments: {
    backgroundColor: "rgba(11, 61, 130, 0.06)"
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  smallAvatar: {
    margin: 10
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em"
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer"
  }
});

export default withStyles(styles)(Comments);
