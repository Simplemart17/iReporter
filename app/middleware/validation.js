// let error = '';
const whiteSpace = /^\s+$/g;
const numReg = new RegExp(/^\+[0-9]{13}$|^[0-9]{11}$/);
const validEmail = new RegExp(/\S+@\S+\.\S/);

class Validation {
  // validation for records creation
  static inputDetails(req, res, next) {
    let error = [];
    const { title, type } = req.body;
    if (!title || title.match(whiteSpace)) {
      error.push({ title: 'Title field cannot be empty' });
    }
    if (!type || type === ' ' || type.match(whiteSpace)) {
      error.push({ type: 'Select a type of records to be submitted' });
    }
    if (error.length) {
      error = Object.assign({}, ...error);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  }

  // Validation for location
  static inputLocation(req, res, next) {
    let error = [];
    const { location } = req.body;
    if (!location || location.match(whiteSpace)) {
      error.push({ location: 'Location field is important!' });
    }
    if (error.length) {
      error = Object.assign({}, ...error);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  }

  // Validation for comment
  static inputComment(req, res, next) {
    let error;
    const { comment } = req.body;
    if (!comment || comment.match(whiteSpace) || comment.length < 20) {
      error.push({ comment: 'Enter detailed description of the report' });
    }
    if (error.length) {
      error = Object.assign({}, ...error);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  }

  // validation for users signup
  static userSignUp(req, res, next) {
    let error = [];
    const {
      fullname, email, phonenumber, username, password,
    } = req.body;
    if (!fullname || fullname.match(whiteSpace)) {
      error.push({ fullname: 'fullname field cannot be empty' });
    }
    if (!phonenumber || phonenumber.match(whiteSpace) || !phonenumber.match(numReg)) {
      error.push({ phonenumber: 'Enter a valid phone number' });
    }
    if (!username || username.match(whiteSpace)) {
      error.push({ username: 'Username is required!' });
    }
    if (!password || password.match(whiteSpace)) {
      error.push({ password: 'Password field cannot be empty' });
    }
    if (!email || email.match(whiteSpace) || !email.match(validEmail)) {
      error.push({ email: 'Enter a valid email address' });
    }
    if (error.length) {
      error = Object.assign({}, ...error);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  }

  // validation for users signin
  static userSignIn(req, res, next) {
    let error = [];
    const { email, password } = req.body;
    if (!email || email.match(whiteSpace) || !email.match(validEmail)) {
      error.push({ email: 'Email valid email' });
    }
    if (!password || password.match(whiteSpace)) {
      error.push({ password: 'Password field cannot be empty' });
    }
    if (error.length) {
      error = Object.assign({}, ...error);
      return res.status(400).json({ status: 400, error });
    }
    return next();
  }
}
export default Validation;
