const Film = require('../model/Film');

const { respone_ok_data, data_notfound } = require('../helper/http_response');

exports.createTittle = async (req, res, next) => {
  try {
    const {
      tconst,
      tittleType,
      primaryTittle,
      originalTittle,
      isAdult,
      startYear,
      endYear,
      runtimeMinutes,
      genres,
    } = req.body;
    const film = await new Film({
      tconst: tconst,
      tittleType: tittleType,
      primaryTittle: primaryTittle,
      originalTittle,
      originalTittle,
      isAdult: isAdult,
      startYear: startYear,
      endYear: endYear,
      runtimeMinutes: runtimeMinutes,
      genres: genres,
    }).save();
    respone_ok_data(res, 'Tittle movie successfully inputed', film);
  } catch (error) {
    next(error);
  }
};

exports.updateTittle = async (req, res, next) => {
  try {
    const findTittle = await Film.findById({ _id: req.query.id });
    if (!findTittle) {
      data_notfound(res);
    }
    const updateTittle = await Film.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true });
    respone_ok_data(res, 'Tittle movie successfully updated', updateTittle);
  } catch (error) {
    next(error);
  }
};

exports.deleteTittle = async (req, res, next) => {
  try {
    const findTittle = await Film.findById({ _id: req.query.id });
    if (!findTittle) {
      data_notfound(res);
    }
    const deleteTittle = await Film.findOneAndDelete({ _id: req.query.id });
    respone_ok_data(res, 'Tittle movie successfully deleted', deleteTittle);
  } catch (error) {
    next(error);
  }
};

exports.findTittle = async (req, res, next) => {
  try {
    const movie = await Film.find({});
    respone_ok_data(res, 'Movies founded', movie);
  } catch (error) {
    next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const movie = await Film.findOne({ _id: req.query.id });
    respone_ok_data(res, 'Movie founded', movie);
  } catch (error) {
    next(error);
  }
};
