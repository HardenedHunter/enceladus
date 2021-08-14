import Joi from 'joi';
import CustomRouter from '../common/customRouter';
import validate from '../middleware/validation';

const router = new CustomRouter();

export const cookieName = 'refresh_token';

export const cookieTTL = 1000 * 60 * 60 * 24 * 30; // 30 days

export const cookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: cookieTTL,
};

const schema = {
  idToken: Joi.string().min(1).required(),
};

router.post('/thirdparty/vk', validate.body(schema), async (req, res) => {
  const { idToken } = req.body;

  res.cookie(cookieName, 'stub_token', cookieOptions);
  res.sendStatus(200);
});

export default router.expressRouter;
