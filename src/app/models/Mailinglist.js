import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const Mailinglist = sequelize.define("emails", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Mailinglist;
