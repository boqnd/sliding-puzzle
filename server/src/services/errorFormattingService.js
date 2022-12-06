class ErrorFormattingService {
  getErrorMessage(err) {
    if (err.message) {
      return err.message;
    }
    return null;
  }
}

export const errorFormattingService = new ErrorFormattingService();
