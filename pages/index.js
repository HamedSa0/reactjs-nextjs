import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { authInitialProps } from "../lib/auth";
import Router from "next/router";

import PostFeed from "../components/index/PostFeed";

import UserFeed from "../components/index/UserFeed";

const Index = ({ classes, auth }) => (
  <main>
    {auth.user && auth.user._id ? (
      // Auth User Page
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <PostFeed auth={auth} />
          </Grid>
          <Grid item className={classes.drawerContainer}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="left"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <UserFeed auth={auth} />
            </Drawer>
          </Grid>
        </Grid>
      </div>
    ) : (
      <div className={classes.heroContent}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <img
              className={classes.paper}
              src="../static/images/pic.jpg"
              alt=""
            />
            <Typography align="center" className={classes.type} variant="h3" component="h1" gutterBottom>
              بهترین شبکه اجتماعی

            </Typography>
            <Typography align="center" component="p"  variant="h6" color="textSecondary">
             فناوری های به کار رفته: ReacJs_  NodeJs_  NextJs_  WebPack_  Material-Design-Ui
                <br/>
                <br/>
             <Button
              variant="contained"
              color="primary"
              onClick={() => Router.push("/signup")}
            >
              شروع کنید
            </Button>

            </Typography>



          </Grid>
        </Grid>
      </div>
    )}
  </main>
);

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 5,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing.unit * 5
    }
  },
  progressContainer: {
    height: "80vh"
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.secondary.light
  },
  drawerContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  drawer: {
    width: 350
  },
  drawerPaper: {
    marginTop: 70,
    width: 350
  },

  heroContent: {
    flexGrow: 1
  },
  paper: {
    width: "100%",
    height: " 100%",
    position: "fixed",
    opacity: 0.3,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  type: {
marginTop: 400
  }
});

Index.getInitialProps = authInitialProps();

export default withStyles(styles)(Index);
