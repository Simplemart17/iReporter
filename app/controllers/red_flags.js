import dbase from "../dataStructure/dbase";

class RedflagController {
  getAllRedflags(req, res) {
    return res.status(200).json({ message: "red-flags retrieved successfully",
      status: 200,
      data: dbase,
    })
  }
  
  getRedflag (req, res) {
    const id = parseInt(req.params.id, 10);
    dbase.map((data) => {
      if (data.id === id) {
        return res.status(200).json({ message: "Red-flag record retrieved successfully",
          status: 200,
          data,
        });
      }
    });
    return res.status(404).json({ error: "The red-flag record does not exist",
      status: 404,    
    });
  }
  
  createRedflag (req, res) {
    if (!req.body.title) {
      return res.status(422).json({ error: "Title field is required!",
        status: 422,      
      });
    } else if (!req.body.type) {
      return res.status(422).json({ error: "Type field is required!",
        status: 422,      
      });
    } else if (!req.body.location) {
      return res.status(422).json({ error: "Location field is required!",
        status: 422,      
      });
    } else if (!req.body.comment) {
      return res.status(422).json({ error: "Comment field is required!",
        status: 422,      
      });
    } else {
    const data = {
      id: dbase.length + 1,
      title: req.body.title,
      type: req.body.type,
      location: req.body.location,
      Images: req.body.Images,
      Videos: req.body.Videos,
      comment: req.body.comment,
      };
      dbase.push(data);
      return res.status(201).json({ message: "The red-flag record added successfully",
      status: 201,
      data,
      });
    }    
  }
  
  updateRedflagComment (req, res) {
    const id = parseInt(req.params.id, 10);
    let foundDbase;
    let itemIndex;
    dbase.map((data, index) => {
      if (data.id === id) {
        foundDbase = data;
        itemIndex = index;
      }
    });
  
    if (!foundDbase) {
      return res.status(404).json({ error: "The record is not found!",
        status: 404,
      });
    }
  
    if (!req.body.comment) {
      return res.status(400).json({
        error: "This field is required",
        status: 400,
      });
    } else {
      const newData = {
      id: foundDbase.id,
      title: foundDbase.title,
      type: foundDbase.type,
      location: foundDbase.location,
      Images: req.body.Images,
      Videos: req.body.Videos,
      comment: req.body.comment || foundDbase.comment,
      };
  
      dbase.splice(itemIndex, 1, newData);
  
      return res.status(201).json({
      message: "Red-flag comment  was updated successfully",
      status: 201,
      newData,
      });
    }
  }

  updateRedflagLocation (req, res) {
    const id = parseInt(req.params.id, 10);
    let foundDbase;
    let itemIndex;
    dbase.map((data, index) => {
      if (data.id === id) {
        foundDbase = data;
        itemIndex = index;
      }
    });
  
    if (!foundDbase) {
      return res.status(404).json({ error: "The record is not found!",
        status: 404,
      });
    }
  
    if (!req.body.location) {
      return res.status(400).json({
        error: "location field is required",
        status: 400,
      });
    } else {
      const newData = {
      id: foundDbase.id,
      title: foundDbase.title,
      type: foundDbase.type,
      location: req.body.location || foundDbase.location,
      Images: req.body.Images,
      Videos: req.body.Videos,
      comment: foundDbase.comment,
      };
  
      dbase.splice(itemIndex, 1, newData);
  
      return res.status(201).json({
      message: "Red-flag location was updated successfully",
      status: 201,
      newData,
      });
    }
  }
  
  deleteRedflag (req, res) {
    const id = parseInt(req.params.id, 10);
    let foundDbase;
    let itemIndex;
    dbase.map((data, index) => {
      if (data.id === id) {
        foundDbase = data;
        itemIndex = index;
      }
    });
  
    if (!foundDbase) {
      return res.status(404).json({
        error: "The record is not found!",
        status: 404,
      });
    }
    dbase.splice(itemIndex, 1);
  
    return res.status(200).json({
      message: "The record deleted successfully",
      status: 200,
    });
  }
}

const redFlags = new RedflagController();
export default redFlags