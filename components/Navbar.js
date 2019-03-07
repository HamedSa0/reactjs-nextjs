import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareOutlined from "@material-ui/icons/Share";
import withStyles from "@material-ui/core/styles/withStyles";
import ActiveLink from "./ActiveLink";
import { signoutUser } from "../lib/auth";

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};
  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === "/" ? "fixed" : "static"}
    >
      <Toolbar>
        {/* Main Title / Home Button */}
        <ActiveLink href="/">
          <ShareOutlined className={classes.icon} />
        </ActiveLink>

        <Typography
          variant="h5"
          component="h1"
          className={classes.toolbarTitle}
        >
          <ActiveLink href="/"> Social Network</ActiveLink>
        </Typography>

        {user._id ? (
          // Auth Navigation
          <div>
            <Button className={classes.btSize} variant="outlined">
              <ActiveLink href={`/profile/${user._id}`}>پروفایل</ActiveLink>
            </Button>

            <Button onClick={signoutUser} className={classes.btSize} variant="outlined">
              خروج
            </Button>
          </div>
        ) : (
          //unAuth Navigation
          <div>
            <Button className={classes.btSize} variant="outlined">
              <ActiveLink href="/signin">ورود</ActiveLink>
            </Button>

            <Button className={classes.btSize} variant="outlined">
              <ActiveLink href="/signup">عضویت</ActiveLink>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  appBar: {
    // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarTitle: {
    flex: 1
  },
  icon: {
    marginRight: theme.spacing.unit
  },

  btSize: {
    fontSize: 16,
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(Navbar);
