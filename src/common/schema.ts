import Joi from 'joi';

const profileBlueprint = {
  profileId: Joi.number().positive(),
  username: Joi.string().min(1).max(255),
  email: Joi.string().min(5).max(255).email(),
  password: Joi.string().min(8).max(255),
};

export const registrationSchema = {
  email: profileBlueprint.email.required(),
  username: profileBlueprint.username.required(),
  password: profileBlueprint.password.required(),
};

export const authorizationSchema = {
  username: profileBlueprint.username.required(),
  password: profileBlueprint.password.required(),
};
