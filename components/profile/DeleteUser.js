import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Delete from "@material-ui/icons/Delete";


import { signoutUser } from "../../lib/auth";
import { deleteUser } from "../../lib/api";

class DeleteUser extends React.Component {
  state = {
    open: false,
    isDeleting: false
  };

  handleDeleteUser = () => {
    const { user } = this.props;

    this.setState({ isDeleting: true });
    deleteUser(user._id)
      .then(() => {
        signoutUser();
      })
      .catch(err => {
        console.error(err);
        this.setState({ isDeleting: false });
      });
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const { open, isDeleting } = this.state;
    return (
      <div>
        <IconButton onClick={this.handleOpen} color="secondary">
          <Delete />
        </IconButton>

        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>حدف اکانت</DialogTitle>
          <DialogContent>
            <DialogContentText>
              آیا مطمئن هستید می خواهید اکانت حود را حذف نمایید؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
            خیر
            </Button>
            <Button
              onClick={this.handleDeleteUser}
              color="secondary"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting" : "بله"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteUser;
