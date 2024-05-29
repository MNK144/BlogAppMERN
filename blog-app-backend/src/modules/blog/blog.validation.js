import Joi from "joi";
import { errorMessage } from "../../constants/validationErrors.js";

export const BlogListSchema = Joi.object({
  search: Joi.string()
    .allow("")
    .max(250)
    .label("Search")
    .messages({ ...errorMessage }),
  sort: Joi.string()
    .label("Sort")
    .valid("asc", "desc")
    .messages({ ...errorMessage }),
  sort_field: Joi.string()
    .valid("createdAt")
    .label('SortField')
    .messages({ ...errorMessage }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .label("Limit")
    .messages({ ...errorMessage }),
  page: Joi.number()
    .integer()
    .min(1)
    .label("Page")
    .messages({ ...errorMessage }),
}).options({
  abortEarly: false,
});

export const BlogIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .label("ID")
    .messages({ ...errorMessage }),
}).options({
  abortEarly: false,
});

export const BlogSlugSchema = Joi.object({
  slug: Joi.string()
    .required()
    .label("Slug")
    .messages({ ...errorMessage }),
}).options({
  abortEarly: false,
});

export const BlogUpsertSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .label("ID")
    .messages({ ...errorMessage }),
  title: Joi.string()
    .max(500)
    .label("Title")
    .messages({ ...errorMessage }),
  description: Joi.string()
    .label("Description")
    .messages({ ...errorMessage }),
  category: Joi.string()
    .valid("Food", "Education", "Businessman", "Position")
    .label("Category")
    .messages({ ...errorMessage }),
}).when('.id', {
  not: Joi.exist(),
  then: Joi.object({
    title: Joi.string()
      .required()
      .max(500)
      .label("Title")
      .messages({ ...errorMessage }),
    description: Joi.string()
      .required()
      .label("Description")
      .messages({ ...errorMessage }),
    category: Joi.string()
      .required()
      .valid("Food", "Education", "Businessman", "Position")
      .label("Category")
      .messages({ ...errorMessage }),
  })
}).options({
  abortEarly: false,
});