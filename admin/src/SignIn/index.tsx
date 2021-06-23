import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import useState, { Login } from "./state";
import { useHttp } from "../App/Context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignInPure(props: Props) {
  const classes = useStyles();

  const [state, login] = useState();

  const missingCredetials = !state.user || !state.password;

  const label = state.loading ? (
    <CircularProgress size={25} />
  ) : state.message ? (
    state.message
  ) : (
    "Sign In"
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin
        </Typography>
        <form
          className={classes.form}
          onSubmit={(event) => {
            event.preventDefault();
            if (state.message) return;
            props.onSubmit(state.user, state.password, login);
          }}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User"
            name="user"
            autoComplete="Text"
            autoFocus
            onChange={({ currentTarget: { value } }) => login.user(value)}
            value={state.user}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ currentTarget: { value } }) => login.password(value)}
            value={state.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={state.message ? "secondary" : "primary"}
            className={classes.submit}
            disabled={state.loading || missingCredetials}
          >
            {label}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export function SignIn() {
  const http = useHttp();

  return (
    <SignInPure
      onSubmit={async (user, password, form) => {
        form.loading();

        try {
          await http.signIn(user, password);
        } catch (error) {
          form.message(error.message);
        }
      }}
    />
  );
}

export default SignIn;

/**
 * Types
 *
 */

interface Props {
  onSubmit: (name: string, password: string, login: Login) => void;
}
