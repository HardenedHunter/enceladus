export class RuntimeError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class EnvironmentVariableError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class HttpError extends RuntimeError {
  private _status: number;

  constructor(message: string, status: number) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

export class ThirdPartyOAuthError extends HttpError {
  constructor(
    message: string = 'Third party service error.',
    status: number = 401
  ) {
    super(message, status);
  }
}

export class EntityNotFoundError extends HttpError {
  constructor(message: string = 'Entity not found.', status: number = 404) {
    super(message, status);
  }
}

export class EntityAlreadyExistsError extends HttpError {
  constructor(
    message: string = 'Entity already exists.',
    status: number = 409
  ) {
    super(message, status);
  }
}

export class InvalidCredentialsError extends HttpError {
  constructor(
    message: string = 'Invalid username or password.',
    status: number = 401
  ) {
    super(message, status);
  }
}

export class InvalidRefreshTokenError extends HttpError {
  constructor(
    message: string = 'Invalid refresh token.',
    status: number = 401
  ) {
    super(message, status);
  }
}

export default {
  RuntimeError,
  EnvironmentVariableError,
  EntityNotFoundError,
  EntityAlreadyExistsError,
  ThirdPartyOAuthError,
  InvalidRefreshTokenError,
};
