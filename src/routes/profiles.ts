import validate from '../middleware/validation';
import profileService from '../services/profileService';
import authService from '../services/authService';
import CustomRouter from '../common/customRouter';
import { registrationSchema } from '../common/schema';

const router = new CustomRouter();

router.post('/', validate.body(registrationSchema), async (req, res) => {
  const { username, email, password } = req.body;
  const profile = await profileService.create(username, email, password);
  const tokens = await authService.createTokens(profile);
  res.cookie(
    authService.REFRESH_TOKEN_COOKIE,
    tokens.refreshToken,
    authService.REFRESH_TOKEN_OPTIONS
  );
  res.status(201).send(tokens.accessToken);
});

export default router.expressRouter;
