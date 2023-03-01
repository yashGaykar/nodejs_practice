


module.exports = function (permittedRoles) {
    return function (req, res, next) {

      const user = req.userData;
  
      let isPermitted = false;

      permittedRoles.map((role) => {

        if (user.role.includes(role)) {
          isPermitted = true;
        }
      });
  
      if (!isPermitted) {
        return res.status(403).send({ message: "Permission denied" });
      }
      return next();
    };
  };