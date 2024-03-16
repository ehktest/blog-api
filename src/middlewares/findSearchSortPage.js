"use strict";

module.exports = (req, res, next) => {
  console.log("🔭 ~ list: ~ req.query ➡ ➡ ", req.query);

  const {
    filter = {},
    search: rawSearch = {},
    sort = {},
    limit: rawLimit = process.env?.PAGE_SIZE,
    page: rawPage = 1,
    skip: rawSkip = 0,
  } = req.query;

  const search = Object.entries(rawSearch).reduce((acc, [key, value]) => {
    acc[key] = { $regex: value, $options: "i" };
    return acc;
  }, {});

  let limit = Number(rawLimit);
  limit = limit > 0 ? limit : process.env?.PAGE_SIZE;

  let page = Number(rawPage);
  page = page > 0 ? page - 1 : 0;

  let skip = Number(rawSkip);
  skip = skip > 0 ? skip : page * limit;

  res.getModelList = async function (Model, populate = null) {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  res.getModelListDetails = async (Model) => {
    const data = await Model.find({ ...filter, ...search });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };

    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;

    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };

  next();
};
