import { HttpStatus } from '@nestjs/common';

export const PRISMA_ERRORS: Record<
  string,
  { message: string; userMessage: string; status: HttpStatus }
> = {
  P2000: {
    message:
      "The provided value for the column is too long for the column's type.",
    userMessage:
      'The provided value is too long. Please shorten it and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2001: {
    message: 'The record searched for in the where condition does not exist.',
    userMessage: 'The requested record does not exist.',
    status: HttpStatus.NOT_FOUND,
  },
  P2002: {
    message: 'Unique constraint failed on the field(s): {target}',
    userMessage: 'Operation failed as the {target} already exists.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2003: {
    message: 'Foreign key constraint failed on the field: {field}',
    userMessage:
      'Foreign key constraint failed on {field}. Please check the related records.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2004: {
    message: 'A constraint failed on the database: {database_error}',
    userMessage:
      'A database constraint was violated. Please check your data and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2005: {
    message:
      "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type",
    userMessage:
      'The provided value of {field_name} is invalid. Please correct it and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2006: {
    message:
      'The provided value {field_value} for {model} field {field_name} is not valid.',
    userMessage:
      'The provided value {field_value} is not valid. Please correct it and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2007: {
    message: 'Data validation error: {database_error}',
    userMessage:
      'Data validation failed. Please check your input and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2008: {
    message: 'Failed to parse the query: {query_parsing_error}',
    userMessage: 'Failed to process the request. Please try again later.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2009: {
    message: 'Failed to validate the query: {query_validation_error}',
    userMessage: 'Failed to process the request. Please try again later.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2010: {
    message: 'Raw query failed. Code: {code}. Message: {message}',
    userMessage: 'An unexpected error occurred. Please try again later.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  P2011: {
    message: 'Null constraint violation on the {constraint}',
    userMessage:
      'A required field is missing. Please fill it out and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2012: {
    message: 'Missing a required value at {path}',
    userMessage:
      'A required value is missing. Please provide it and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2013: {
    message:
      'Missing the required argument {argument_name} for field {field_name} on {object_name}.',
    userMessage:
      'A required argument is missing. Please provide it and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2014: {
    message:
      'The change you are trying to make would violate the required relation between the {relation_name} and {model_name}.',
    userMessage:
      'The requested operation would violate a database constraint. Please check your input and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2015: {
    message: 'A related record could not be found. {details}',
    userMessage:
      'A related record could not be found. Please check the data and try again.',
    status: HttpStatus.NOT_FOUND,
  },
  P2016: {
    message: 'Query interpretation error. {details}',
    userMessage:
      'An error occurred while processing the request. Please try again later.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  P2017: {
    message:
      'The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.',
    userMessage:
      'The requested operation could not be completed due to a relationship issue. Please check the data and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2018: {
    message: 'The required connected records were not found. {details}',
    userMessage:
      'The required records were not found. Please check the data and try again.',
    status: HttpStatus.NOT_FOUND,
  },
  P2019: {
    message: 'Input error. {details}',
    userMessage:
      'There was an error with the input. Please check it and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2020: {
    message: 'Value out of range for the type. {details}',
    userMessage:
      'The provided value is out of range. Please correct it and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2021: {
    message: 'The table {table} does not exist in the current database.',
    userMessage:
      'The requested table does not exist. Please check the data and try again.',
    status: HttpStatus.NOT_FOUND,
  },
  P2022: {
    message: 'The column {column} does not exist in the current database.',
    userMessage:
      'The requested column does not exist. Please check the data and try again.',
    status: HttpStatus.NOT_FOUND,
  },
  P2023: {
    message: 'Inconsistent column data: {details}',
    userMessage:
      'There is inconsistent data in the database. Please try again later.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  P2024: {
    message: 'Timed out fetching a new connection from the connection pool.',
    userMessage: 'The request timed out. Please try again later.',
    status: HttpStatus.REQUEST_TIMEOUT,
  },
  P2025: {
    message:
      'An operation failed because it depends on one or more records that were required but not found. {cause}',
    userMessage:
      'A required record was not found. Please check the data and try again.',
    status: HttpStatus.NOT_FOUND,
  },
  P2026: {
    message:
      "The current database provider doesn't support a feature that the query used: {feature}",
    userMessage:
      'The requested operation is not supported by the database. Please contact support.',
    status: HttpStatus.NOT_IMPLEMENTED,
  },
  P2027: {
    message:
      'Multiple errors occurred on the database during query execution: {errors}',
    userMessage:
      'Multiple errors occurred during the operation. Please try again later.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  P2028: {
    message: 'Transaction API error: {error}',
    userMessage:
      'An error occurred during the transaction. Please try again later.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  P2029: {
    message: 'Query parameter limit exceeded error: {message}',
    userMessage:
      'The query exceeded the parameter limit. Please reduce the number of parameters and try again.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2030: {
    message:
      'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema',
    userMessage:
      'A full-text index is required for the search. Please update the database schema.',
    status: HttpStatus.NOT_FOUND,
  },
  P2031: {
    message:
      'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set',
    userMessage:
      'The database needs to be configured as a replica set for transactions. Please update the database configuration.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2033: {
    message:
      "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers",
    userMessage:
      'The number used in the query is too large. Please use a smaller number or a BigInt field type.',
    status: HttpStatus.BAD_REQUEST,
  },
  P2034: {
    message:
      'Transaction failed due to a write conflict or a deadlock. Please retry your transaction',
    userMessage: 'The transaction failed due to a conflict. Please try again.',
    status: HttpStatus.CONFLICT,
  },
  P2035: {
    message: 'Assertion violation on the database: {database_error}',
    userMessage: 'An unexpected error occurred. Please try again later.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  P2036: {
    message: 'Error in external connector (id {id})',
    userMessage:
      'An error occurred in an external connector. Please try again later.',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  P2037: {
    message: 'Too many database connections opened: {message}',
    userMessage:
      'The database has too many open connections. Please try again later.',
    status: HttpStatus.SERVICE_UNAVAILABLE,
  },
};
