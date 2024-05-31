import toast from 'react-hot-toast';

const handleError = (error) => {

  let message = 'An unexpected error occurred. Please try again later.';

  if (error) {

    switch (error) {
      case 400:
        message = 'Invalid input data.';
        break;
      case 401:
        message = 'Please log in and try again.';
        break;
      case 403:
        message = 'Forbidden. You do not have permission to perform this action.';
        break;
      case 404:
        message = 'Not Found.';
        break;
      case 500:
        message = 'Internal Server Error. Please try again later.';
        break;
      case 503:
        message = 'Service Unavailable. Please try again later.';
        break;
      default:
        message = `Error: ${error.response.status}. Please try again later.`;
    }
  } else if (error.request) {
    // The request was made but no response was received
    message = 'No response from the server. Please check your internet connection and try again.';
  } else {
    // Something happened in setting up the request that triggered an Error
    message = `Error: ${error.message}. Please try again later .`;
  }

  // Display toast notification
  toast.error(message);

  return message;
};

export default handleError;
