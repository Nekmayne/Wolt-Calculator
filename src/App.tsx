import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Notification from "./components/Notification";
import Result from "./components/Result";
import Form from "./components/Form";
import "./index.css";
import "./App.css";

interface data {
  cartValue: string | number;
  deliveryDistance: string | number;
  numberOfItems: string | number;
  deliveryFee: number;
  deliveryDate: Date | null;
}

const DeliveryFeeCalculator: React.FC = () => {
  const [field, setField] = useState<data>({
    cartValue: "",
    deliveryDistance: "",
    numberOfItems: "",
    deliveryFee: null,
    deliveryDate: null,
  });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [visible, setVisible] = useState(false);

  const rushHour = (deliveryDate: Date): boolean => {
    let isFriday: boolean = false;
    if (
      deliveryDate.getDay() === 5 &&
      deliveryDate.getHours() >= 15 &&
      deliveryDate.getHours() < 19
    ) {
      isFriday = true;
    }
    return isFriday;
  };

  const calculateDeliveryFee = (e: any) => {
    e.preventDefault();
    if (
      !field.cartValue ||
      !field.deliveryDistance ||
      !field.numberOfItems ||
      !field.deliveryDate
    ) {
      setMessage("Fill the missing fields!");
      setStatus("error");
      setTimeout(() => {
        setMessage(null);
      }, 3000);

      return;
    }
    let fee = 0;

    if (field.cartValue >= 100) {
      fee = 0;
    } else if (field.cartValue < 10) {
      fee = 10 - Number(field.cartValue);
    } else {
      if (field.deliveryDistance <= 1000) {
        fee = 2;
      } else {
        fee = 2 + Math.ceil((Number(field.deliveryDistance) - 1000) / 500);
      }

      if (field.numberOfItems >= 5) {
        fee += (Number(field.numberOfItems) - 4) * 0.5;
      }

      if (field.numberOfItems > 12) {
        fee += 1.2;
      }

      if (rushHour(field.deliveryDate)) {
        fee *= 1.1;
      }
      if (fee > 15) {
        fee = 15;
      }
    }
    setField({ ...field, deliveryFee: fee });
    setVisible(true);
  };

  const handleChange = (date: Date | null) => {
    setField({ ...field, deliveryDate: date });
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-screen-md py-1 px-3 bg-gradient-to-br from-blue to-black ">
      <h1 className="text-3xl text-white">Wolt Deliveryfee Calculator</h1>
      <Form
        calculateDeliveryFee={calculateDeliveryFee}
        field={field}
        setField={setField}
        handleChange={handleChange}
        DatePicker={DatePicker}
      />
      {visible ? <Result deliveryFee={field.deliveryFee.toFixed(2)} /> : null}
      <Notification message={message} status={status} />
    </div>
  );
};

export default DeliveryFeeCalculator;
