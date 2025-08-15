import mongoose from "mongoose";

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Patient name is required."],
  },
  birthDate: {
    type: Date,
    required: [true, "Birth Date is required."],
  },
  email: {
    type: String,
    required: [true, "Email contact is required."],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."],
    validate: {
      validator: function (v) {
        return /\d{2} 9\d{4}-\d{4}/.test(v);
      },
      message: (props) =>
        `${props.value} This is not a valid phone value. Please use the following format 99 91234-4567`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Patient = mongoose.model("patient", patientSchema);

export default Patient;
