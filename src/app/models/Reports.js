import { DataTypes, Sequelize } from "sequelize";
import sequelize from "@/lib/db";

const Reports = sequelize.define("reports", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  authors: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abstract: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  bannerImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Reports;
