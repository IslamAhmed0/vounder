const verifyToken = (req:any, res:any, next:any) => {
  if (req.headers.lang) {
    let name = req.headers.lang;
    let title = "";
    let description = "description";
    if (name == "ar"){
      name = "name";
      title = "title";
      description = "description";
    }
    else {
      title = "title_en";
      name = "name_en";
      description = "description_en";

    }
    req.name = name;
    req.description = description;
    req.title = title;

    return next();
  }else {
    return res.status(403).send("A lang is required ");

  }
};

export default verifyToken