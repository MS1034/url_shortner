enum RESPONSE_MESSAGES {
  NOT_FOUND = 'Requested resource was not found',
  CONFLICT = 'The resource already exists',
  INTERNAL_SERVER_ERROR = 'An internal server error occurred',
  BAD_REQUEST = 'The request could not be understood or was missing required parameters',
  UNAUTHORIZED = 'Authentication failed or user does not have permissions for the requested operation',
  FORBIDDEN = 'Access to the requested resource is forbidden',
  CREATED = 'The resource was successfully created',
  SUCCESS = 'The operation was successful',
}
export default RESPONSE_MESSAGES;
