
export const getHumanReadableError = (error: Error) => {
  if(typeof error === 'string') {
    return error;
  }

  if('status_message' in error) {
    return error.status_message as string;
  }

  return 'An error has occured. Please try again later.';
}
