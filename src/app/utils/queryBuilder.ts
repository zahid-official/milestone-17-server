/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-dynamic-delete */

import { Query } from "mongoose";
import { excludeFields } from "./contants";

class QueryBuilder<T> {
  // Class properties
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, any>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    // Assign the parameters to class properties
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Method to filter the query results
  filter(): this {
    const filter = { ...this.query };

    // Remove fields that shouldn't be treated as filters
    excludeFields?.forEach((field) => delete filter[field]);

    // Extract fare filtering parameters
    const minFare = this.query?.minFare ? Number(this.query.minFare) : null;
    const maxFare = this.query?.maxFare ? Number(this.query.maxFare) : null;

    // Build fare filter if any fare-related query param exists
    if (minFare !== null || maxFare !== null) {
      filter["fare"] = {};

      if (minFare !== null) {
        filter["fare"]["$gte"] = minFare;
      }

      if (maxFare !== null) {
        filter["fare"]["$lte"] = maxFare;
      }
    }

    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }

  // Method to filter by date range
  dateRangeFilter(): this {
    const dateRange = this.query?.dateRange;

    if (!dateRange) {
      return this;
    }

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    let startDate: Date;

    switch (dateRange) {
      case "today": {
        startDate = startOfDay;
        break;
      }

      case "week": {
        const dayOfWeek = now.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate = new Date(startOfDay);
        startDate.setDate(startDate.getDate() - daysToMonday);
        break;
      }

      case "month": {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      }

      case "year": {
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      }

      default:
        return this;
    }

    // Apply date range filter
    this.modelQuery = this.modelQuery.find({
      createdAt: {
        $gte: startDate,
        $lte: now,
      },
    });

    return this;
  }

  // Method to select specific fields in the query (projection)
  fieldSelect(): this {
    const fields = this.query?.fields?.split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Method to sort the query results
  sort(): this {
    const sortBy = this.query?.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  // Method to implement search functionality
  search(searchFields: string[]): this {
    const searchTerm = this.query?.searchTerm || "";
    const searchQuery = {
      $or: searchFields?.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    };

    this.modelQuery = this.modelQuery.find(searchQuery);
    return this;
  }

  // Method to implement pagination
  paginate(): this {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Method to execute the built query
  build(): Query<T[], T> {
    return this.modelQuery;
  }

  // Method to get meta data
  async meta(): Promise<{
    page: number;
    limit: number;
    totalPage: number;
    totalDocs: number;
  }> {
    const queryConditions = this.modelQuery.getQuery();
    const totalDocs = await this.modelQuery.model.countDocuments(
      queryConditions
    );
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const totalPage = Math.ceil(totalDocs / limit);

    return { page, limit, totalPage, totalDocs };
  }
}

export default QueryBuilder;
