class Validation {

  // validation for records creation
  static input(req, res, next) {
    let error = '';
    let whiteSpace = /^\s+$/g;
    const { comment, title, type, location, isAdmin } = req.body;
    if (!comment || comment.match(whiteSpace)) {
      error = 'Comment field cannot be empty';
    } else if (comment.length < 20) {
      error = 'Enter detailed description of the report';
    } else if (!title || title.match(whiteSpace)) {
      error = 'Title field cannot be empty';
    } else if (!type || type === ' ') {
      error = 'Select a type of records to be submitted';
    } else if (!location || location.match(whiteSpace)) {
      error = 'Location field is important!';
    } else if (!isAdmin || isAdmin.match(whiteSpace)) {
      req.body.isAdmin = 'false';
    }
    if (error) {
      return res.status(400).json({error});
    }
    return next();
  }

  // validation for users signup and signin
  static userSignUp(req, res, next) {
    let error;
    let whiteSpace = /^\s+$/g;
    let numReg = new RegExp(/^\+[0-9]{13}$|^[0-9]{11}$/);
    let validEmail = new RegExp(/\S+@\S+\.\S/);
    const { firstname, lastname, othername, email, phoneNumber, username, password } = req.body;
    if (!firstname || firstname.match(whiteSpace)) {
      error = 'Firstname field cannot be empty';
    } else if (!lastname || lastname.match(whiteSpace)) {
      error = 'Enter your lastname';
    } else if (!othername || othername.match(whiteSpace)) {
      error = 'Enter your othername';
    } else if (!phoneNumber || phoneNumber.match(whiteSpace)) {
      error = 'Phone number is required!';
    } else if (!username || username.match(whiteSpace)) {
      error = 'Username is required!';
    } else if (!password || password.match(whiteSpace)) {
      error = 'Password field cannot be empty';
    } else if (!email || email.match(whiteSpace)) {
      error = 'Email field cannot be empty';
    } else if (!phoneNumber.match(numReg)) {
      error = 'Enter phone number in the right format'
    } else if (!email.match(validEmail)) {
      error = 'Enter a valid email address!'
    }
    if (error) {
      return res.status(400).json({error});
    }
    return next();
  }

  static userSignIn(req, res, next) {
    let error;
    let whiteSpace = /^\s+$/g;
    let validEmail = new RegExp(/\S+@\S+\.\S/);
    const { email, password } = req.body;
    if (!email || email.match(whiteSpace)) {
      error = 'email is required';
    } else if (!password || password.match(whiteSpace)) {
      error = 'Password field cannot be empty';
    } else if (!email.match(validEmail)) {
      error = 'Enter a valid email address!'
    }
    if (error) {
      return res.status(400).json({error});
    }
    return next();
  }
}
export default Validation;
