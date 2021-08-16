import authService, {
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_OPTIONS,
} from '../services/authService';
import validate from '../middleware/validation';
import CustomRouter from '../common/customRouter';
import { authorizationSchema } from '../common/schema';

const router = new CustomRouter();

router.post('/', validate.body(authorizationSchema), async (req, res) => {
  const { username, password } = req.body;
  const tokens = await authService.authorizeWithCredentials(username, password);
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, REFRESH_TOKEN_OPTIONS);
  res.status(200).send(tokens.accessToken);
});

router.post('/logout', async (req, res) => {
  res.cookie(REFRESH_TOKEN_COOKIE, null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).send('Logged out.');
});

router.post('/refresh-token', async (req, res) => {
  const oldRefreshToken = req.cookies['refresh_token'];
  if (!oldRefreshToken)
    return res.status(401).send('Refresh token was not provided.');

  const tokens = await authService.refresh(oldRefreshToken);
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, REFRESH_TOKEN_OPTIONS);
  res.status(200).send(tokens.accessToken);
});

export default router.expressRouter;
